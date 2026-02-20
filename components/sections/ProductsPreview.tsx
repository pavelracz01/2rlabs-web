import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getProductsByLocale } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';

export default function ProductsPreview({ locale }: { locale: string }) {
  const t = useTranslations('productsPreview');
  const featuredProducts = getProductsByLocale(locale)
    .filter((p) => p.frontmatter.featured)
    .slice(0, 3);

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Products
          </h2>
          <p className="text-lg text-muted-foreground">
            Innovative software products and tailored consulting packages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.frontmatter.slug}
              product={product.frontmatter}
              locale={locale}
            />
          ))}
        </div>

        <div className="text-center">
          <Link href={`/${locale}/products`}>
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
