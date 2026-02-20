// components/sections/BlogPreview.tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const placeholderPosts = [
  { slug: 'getting-started-with-qa', title: 'Getting Started with QA in Your Team', date: '2026-01-15', excerpt: 'How to build a solid QA foundation from scratch.' },
  { slug: 'playwright-vs-cypress', title: 'Playwright vs Cypress in 2026', date: '2026-01-28', excerpt: 'A practical comparison for modern web apps.' },
  { slug: 'performance-testing-basics', title: 'Performance Testing Basics', date: '2026-02-05', excerpt: 'What you need to know before your first load test.' },
];

export default function BlogPreview() {
  const t = useTranslations('blog');
  const locale = useLocale();

  return (
    <section id="blog" className="bg-[#F1F5F9] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-[#1E293B]"
          >
            {t('title')}
          </motion.h2>
          <Link href={`/${locale}/blog`} className="flex items-center gap-1 text-[#2563EB] hover:underline text-sm font-medium">
            {t('allPosts')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholderPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <time className="text-xs text-slate-400">{post.date}</time>
              <h3 className="font-semibold text-[#1E293B] mt-2 mb-3 leading-snug">{post.title}</h3>
              <p className="text-slate-500 text-sm mb-4">{post.excerpt}</p>
              <Link href={`/${locale}/blog/${post.slug}`} className="text-[#2563EB] text-sm font-medium hover:underline flex items-center gap-1">
                {t('readMore')} <ArrowRight size={14} />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
