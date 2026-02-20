import { getPosts } from '@/lib/mdx';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return [{ locale: 'cs' }, { locale: 'en' }];
}

export default async function CaseStudiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getPosts('case-studies', locale);
  const t = await getTranslations({ locale, namespace: 'caseStudies' });

  return (
    <main className="min-h-screen bg-[#F1F5F9] pt-24 px-4 pb-16">
      <div className="max-w-4xl mx-auto">
        <Link href={`/${locale}`} className="flex items-center gap-1 text-[#2563EB] text-sm mb-8 hover:underline">
          <ArrowLeft size={16} /> Home
        </Link>
        <h1 className="text-4xl font-bold text-[#1E293B] mb-4">{t('title')}</h1>
        <p className="text-slate-500 mb-10">{t('subtitle')}</p>
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <time className="text-xs text-slate-400">{post.date}</time>
              <h2 className="text-xl font-semibold text-[#1E293B] mt-1 mb-2">{post.title}</h2>
              <p className="text-slate-500 text-sm mb-4">{post.excerpt}</p>
              <Link href={`/${locale}/case-studies/${post.slug}`} className="text-[#2563EB] text-sm font-medium hover:underline">
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
