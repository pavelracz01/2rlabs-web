// lib/mdx.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  lang: string;
}

export function getPosts(type: 'blog' | 'case-studies', locale: string): PostMeta[] {
  const dir = path.join(process.cwd(), 'content', type, locale);
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace('.mdx', '');
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data } = matter(raw);
      return { slug, lang: locale, ...data } as PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(type: 'blog' | 'case-studies', locale: string, slug: string) {
  const filePath = path.join(process.cwd(), 'content', type, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { meta: { slug, lang: locale, ...data } as PostMeta, content };
}
