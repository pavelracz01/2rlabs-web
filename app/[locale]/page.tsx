// app/[locale]/page.tsx
import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import WhyTestar from '@/components/sections/WhyTestar';
import Process from '@/components/sections/Process';
import References from '@/components/sections/References';
import BlogPreview from '@/components/sections/BlogPreview';
import Contact from '@/components/sections/Contact';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <Services />
      <WhyTestar />
      <Process />
      <References />
      <BlogPreview />
      <Contact />
    </main>
  );
}
