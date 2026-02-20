// app/[locale]/page.tsx
import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Why2RLabs from '@/components/sections/Why2RLabs';
import Process from '@/components/sections/Process';
import References from '@/components/sections/References';
import ProductsPreview from '@/components/sections/ProductsPreview';
import TeamPreview from '@/components/sections/TeamPreview';
import BlogPreview from '@/components/sections/BlogPreview';
import Contact from '@/components/sections/Contact';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <Services />
      <Why2RLabs />
      <Process />
      <References />
      <ProductsPreview locale={locale} />
      <TeamPreview locale={locale} />
      <BlogPreview />
      <Contact />
    </main>
  );
}
