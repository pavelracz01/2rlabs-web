import { getPosts } from '@/lib/mdx';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return [{ locale: 'cs' }, { locale: 'en' }];
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getPosts('blog', locale);
  const t = await getTranslations({ locale, namespace: 'blog' });

  return (
    <main className="min-h-screen bg-[#F1F5F9] pt-24 px-4 pb-16">
      <div className="max-w-4xl mx-auto">
        <Link href={`/${locale}`} className="flex items-center gap-1 text-[#2563EB] text-sm mb-8 hover:underline">
          <ArrowLeft size={16} /> Home
        </Link>
        <h1 className="text-4xl font-bold text-[#1E293B] mb-10">{t('title')}</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <time className="text-xs text-slate-400">{post.date}</time>
              <h2 className="text-xl font-semibold text-[#1E293B] mt-1 mb-2">{post.title}</h2>
              <p className="text-slate-500 text-sm mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {post.tags?.map((tag) => (
                    <span key={tag} className="text-xs bg-[#2563EB]/10 text-[#2563EB] px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
                <Link href={`/${locale}/blog/${post.slug}`} className="text-[#2563EB] text-sm font-medium hover:underline">
                  {t('readMore')} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
