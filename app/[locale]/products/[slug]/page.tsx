import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProductBySlug, getAllProductSlugs, getProductsByLocale } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import Link from 'next/link';

export async function generateStaticParams() {
  const locales = ['en', 'cs'];
  const params: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    const slugs = getAllProductSlugs(locale);
    slugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });

  return params;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  const { frontmatter, content } = product;

  // Get related products (same category, excluding current)
  const relatedProducts = getProductsByLocale(locale, frontmatter.category)
    .filter((p) => p.frontmatter.slug !== slug)
    .slice(0, 3);

  return (
    <article className="container py-12 md:py-24">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href={`/${locale}`} className="hover:text-foreground">Home</Link>
        {' / '}
        <Link href={`/${locale}/products`} className="hover:text-foreground">Products</Link>
        {' / '}
        <span className="text-foreground">{frontmatter.title}</span>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="capitalize">
            {frontmatter.category}
          </Badge>
          {frontmatter.featured && <Badge variant="default">Featured</Badge>}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {frontmatter.title}
        </h1>

        <p className="text-xl text-muted-foreground mb-6">
          {frontmatter.tagline}
        </p>

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        )}

        {frontmatter.image && (
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
            <img
              src={frontmatter.image}
              alt={frontmatter.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert mb-12">
        <MDXRemote source={content} />
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto text-center py-8 border-t border-b mb-12">
        <h2 className="text-2xl font-bold mb-4">Interested in {frontmatter.title}?</h2>
        <p className="text-muted-foreground mb-6">
          Contact us to learn more or get started
        </p>
        <Link href={`/${locale}/#contact`}>
          <Button size="lg" className="bg-brand-600 hover:bg-brand-700">
            Contact Us
          </Button>
        </Link>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.frontmatter.slug}
                product={p.frontmatter}
                locale={locale}
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
