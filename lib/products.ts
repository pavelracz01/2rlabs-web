import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const productsDirectory = path.join(process.cwd(), 'content/products');

export type ProductCategory = 'software' | 'consulting';

export interface ProductFrontmatter {
  title: string;
  slug: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  image: string;
  tags: string[];
  featured: boolean;
  order: number;
  inquiryEmail: string;
  published: boolean;
  date: string;
}

export interface Product {
  frontmatter: ProductFrontmatter;
  content: string;
}

export function getProductsByLocale(locale: string, category?: ProductCategory): Product[] {
  const categories: ProductCategory[] = category ? [category] : ['software', 'consulting'];
  const products: Product[] = [];

  categories.forEach((cat) => {
    const categoryPath = path.join(productsDirectory, cat, locale);

    if (!fs.existsSync(categoryPath)) {
      return;
    }

    const files = fs.readdirSync(categoryPath);

    files.forEach((filename) => {
      if (!filename.endsWith('.mdx')) return;

      const filePath = path.join(categoryPath, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      if (data.published !== false) {
        products.push({
          frontmatter: data as ProductFrontmatter,
          content,
        });
      }
    });
  });

  // Sort by featured first, then by order, then by date
  return products.sort((a, b) => {
    if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
    if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
    if (a.frontmatter.order !== b.frontmatter.order) {
      return a.frontmatter.order - b.frontmatter.order;
    }
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

export function getProductBySlug(slug: string, locale: string): Product | null {
  const categories: ProductCategory[] = ['software', 'consulting'];

  for (const category of categories) {
    const filePath = path.join(productsDirectory, category, locale, `${slug}.mdx`);

    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        frontmatter: data as ProductFrontmatter,
        content,
      };
    }
  }

  return null;
}

export function getAllProductSlugs(locale: string): string[] {
  const categories: ProductCategory[] = ['software', 'consulting'];
  const slugs: string[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(productsDirectory, category, locale);

    if (!fs.existsSync(categoryPath)) {
      return;
    }

    const files = fs.readdirSync(categoryPath);

    files.forEach((filename) => {
      if (filename.endsWith('.mdx')) {
        slugs.push(filename.replace('.mdx', ''));
      }
    });
  });

  return slugs;
}
