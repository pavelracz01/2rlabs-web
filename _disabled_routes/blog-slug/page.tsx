import { getPosts, getPost } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';

export const dynamicParams = false;

export function generateStaticParams() {
  const params = [];
  for (const locale of ['cs', 'en']) {
    const posts = getPosts('blog', locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  // Return empty array if no posts - Next.js requires this for static export
  return params.length > 0 ? params : [];
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost('blog', locale, slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#F1F5F9] pt-24 px-4 pb-16">
      <div className="max-w-3xl mx-auto">
        <Link href={`/${locale}/blog`} className="flex items-center gap-1 text-[#2563EB] text-sm mb-8 hover:underline">
          <ArrowLeft size={16} /> Blog
        </Link>
        <article className="bg-white rounded-2xl p-8 shadow-sm prose prose-slate max-w-none">
          <time className="text-sm text-slate-400 not-prose">{post.meta.date}</time>
          <h1 className="text-3xl font-bold text-[#1E293B] mt-2 mb-6">{post.meta.title}</h1>
          <MDXRemote source={post.content} />
        </article>
      </div>
    </main>
  );
}
