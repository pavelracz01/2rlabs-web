// app/[locale]/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  title: {
    default: '2R Labs — AI-Powered Full-Stack Development',
    template: '%s | 2R Labs'
  },
  description: 'We build production-ready web applications using cutting-edge AI tools. From rapid prototyping to full-scale deployments.',
  keywords: ['AI development', 'full-stack development', 'web applications', 'AI-powered coding', 'rapid prototyping', 'Claude Code', 'Cursor AI'],
  authors: [{ name: '2R Labs' }],
  creator: '2R Labs',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://2rlabs.com',
    siteName: '2R Labs',
    title: '2R Labs — AI-Powered Full-Stack Development',
    description: 'We build production-ready web applications using cutting-edge AI tools.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '2R Labs — AI-Powered Development'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '2R Labs — AI-Powered Full-Stack Development',
    description: 'We build production-ready web applications using cutting-edge AI tools.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true
  }
};

const locales = ['cs', 'en'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
