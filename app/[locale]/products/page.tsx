import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { getProductsByLocale } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';

export default async function ProductsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allProducts = getProductsByLocale(locale);
  const softwareProducts = getProductsByLocale(locale, 'software');
  const consultingProducts = getProductsByLocale(locale, 'consulting');

  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Products & Services</h1>
        <p className="text-xl text-muted-foreground">
          Innovative software products and tailored consulting packages
        </p>
      </div>

      {/* Software Products */}
      {softwareProducts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Software Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softwareProducts.map((product) => (
              <ProductCard
                key={product.frontmatter.slug}
                product={product.frontmatter}
                locale={locale}
              />
            ))}
          </div>
        </section>
      )}

      {/* Consulting Packages */}
      {consultingProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">Consulting Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultingProducts.map((product) => (
              <ProductCard
                key={product.frontmatter.slug}
                product={product.frontmatter}
                locale={locale}
              />
            ))}
          </div>
        </section>
      )}

      {allProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products available yet.</p>
        </div>
      )}
    </div>
  );
}
