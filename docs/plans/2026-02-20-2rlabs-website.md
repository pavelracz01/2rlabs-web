# 2R Labs Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build 2R Labs corporate website by cloning and customizing testar-web, adding Products catalog and Team/About page.

**Architecture:** Next.js 16 App Router with TypeScript, Tailwind CSS v4, next-intl for i18n, MDX for content (blog, case studies, products), Formspree for forms, Docker deployment.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, next-intl, Framer Motion, MDX, Docker, Nginx, GitHub Actions

---

## Phase 1: Foundation - Clone and Rebrand

### Task 1: Clone testar-web Repository

**Files:**
- Source: `/Users/mini/git/testar-web/`
- Destination: `/Users/mini/git/2rlabs-web/` (already exists)

**Step 1: Copy all files from testar-web**

```bash
cd /Users/mini/git
rsync -av --exclude='.git' --exclude='node_modules' --exclude='.next' testar-web/ 2rlabs-web/
```

**Step 2: Verify files copied**

```bash
cd /Users/mini/git/2rlabs-web
ls -la
```

Expected: See all testar-web files (app/, components/, content/, etc.)

**Step 3: Install dependencies**

```bash
npm install
```

Expected: Dependencies installed successfully

**Step 4: Test dev server**

```bash
npm run dev
```

Expected: Server runs on http://localhost:3000 (stop with Ctrl+C)

**Step 5: Commit initial clone**

```bash
git add .
git commit -m "chore: clone testar-web as foundation

Copy complete testar-web codebase to serve as foundation for 2R Labs
website. Will customize branding, content, and add Products + Team pages.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 2: Update Package Metadata

**Files:**
- Modify: `package.json`
- Modify: `README.md`

**Step 1: Update package.json**

Change lines 2-3:

```json
{
  "name": "2rlabs-web",
  "version": "0.1.0",
```

**Step 2: Update README.md**

Replace entire content:

```markdown
# 2R Labs Website

Corporate website for 2R Labs at [2rlabs.com](https://2rlabs.com).

## Stack

- Next.js 16 + TypeScript + Tailwind CSS v4
- next-intl (CS + EN)
- framer-motion
- MDX blog + case studies + products
- Docker + Nginx + Traefik

## Local Development

\`\`\`bash
npm install
npm run dev
\`\`\`

## Deployment

Automatic via GitHub Actions on push to \`main\`.
```

**Step 3: Verify changes**

```bash
cat package.json | head -5
cat README.md | head -10
```

**Step 4: Commit**

```bash
git add package.json README.md
git commit -m "chore: update package metadata for 2R Labs

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 3: Configure Dark Purple Brand Colors

**Files:**
- Modify: `app/globals.css` or Tailwind config

**Step 1: Find Tailwind config file**

```bash
ls -la | grep -E "(tailwind|postcss)"
```

Expected: `postcss.config.mjs` or `tailwind.config.ts`

**Step 2: Add brand colors to CSS variables**

If using `app/globals.css`, add after existing CSS variables:

```css
@layer base {
  :root {
    /* 2R Labs Brand Colors - Dark Purple */
    --brand-50: 250 245 255;   /* #faf5ff */
    --brand-100: 243 232 255;  /* #f3e8ff */
    --brand-200: 233 213 255;  /* #e9d5ff */
    --brand-300: 216 180 254;  /* #d8b4fe */
    --brand-400: 192 132 252;  /* #c084fc */
    --brand-500: 168 85 247;   /* #a855f7 */
    --brand-600: 147 51 234;   /* #9333ea - Primary */
    --brand-700: 126 34 206;   /* #7e22ce */
    --brand-800: 107 33 168;   /* #6b21a8 */
    --brand-900: 88 28 135;    /* #581c87 */
  }
}
```

**Step 3: Create custom Tailwind plugin (if needed)**

If there's a `tailwind.config.ts`, update theme extension:

```typescript
theme: {
  extend: {
    colors: {
      brand: {
        50: 'rgb(var(--brand-50) / <alpha-value>)',
        100: 'rgb(var(--brand-100) / <alpha-value>)',
        200: 'rgb(var(--brand-200) / <alpha-value>)',
        300: 'rgb(var(--brand-300) / <alpha-value>)',
        400: 'rgb(var(--brand-400) / <alpha-value>)',
        500: 'rgb(var(--brand-500) / <alpha-value>)',
        600: 'rgb(var(--brand-600) / <alpha-value>)',
        700: 'rgb(var(--brand-700) / <alpha-value>)',
        800: 'rgb(var(--brand-800) / <alpha-value>)',
        900: 'rgb(var(--brand-900) / <alpha-value>)',
      }
    }
  }
}
```

**Step 4: Test colors available**

Start dev server and check if `bg-brand-600` class is recognized:

```bash
npm run dev
```

Inspect any element and try adding `class="bg-brand-600"`

**Step 5: Commit**

```bash
git add app/globals.css tailwind.config.ts
git commit -m "feat: add 2R Labs dark purple brand colors

Define brand color palette from brand-50 to brand-900 with primary
at brand-600 (#9333ea).

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 4: Update i18n Messages - Company Name

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/cs.json`

**Step 1: Update English messages**

In `messages/en.json`, find and replace all "Testar" with "2R Labs":

```bash
sed -i '' 's/Testar/2R Labs/g' messages/en.json
```

**Step 2: Update Czech messages**

In `messages/cs.json`, find and replace:

```bash
sed -i '' 's/Testar/2R Labs/g' messages/cs.json
```

**Step 3: Manually review key sections**

```bash
cat messages/en.json | grep -i "2r labs"
cat messages/cs.json | grep -i "2r labs"
```

**Step 4: Update specific company description**

Edit `messages/en.json` - find the company description and update:

```json
{
  "hero": {
    "title": "Software Development Consulting & Products",
    "subtitle": "We help companies build better software and create our own innovative products"
  }
}
```

Edit `messages/cs.json`:

```json
{
  "hero": {
    "title": "Poradenství ve vývoji SW a vlastní produkty",
    "subtitle": "Pomáháme firmám vytvářet lepší software a vyvíjíme vlastní inovativní produkty"
  }
}
```

**Step 5: Commit**

```bash
git add messages/en.json messages/cs.json
git commit -m "feat: update i18n messages for 2R Labs branding

Replace Testar references with 2R Labs in both English and Czech
locales. Update hero messaging to reflect consulting + products focus.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 5: Rename WhyTestar Component to Why2RLabs

**Files:**
- Rename: `components/sections/WhyTestar.tsx` → `components/sections/Why2RLabs.tsx`
- Modify: `app/[locale]/page.tsx`

**Step 1: Rename the file**

```bash
git mv components/sections/WhyTestar.tsx components/sections/Why2RLabs.tsx
```

**Step 2: Update component name in file**

Edit `components/sections/Why2RLabs.tsx`:

```typescript
export default function Why2RLabs() {
  // ... rest stays the same
}
```

**Step 3: Update import in homepage**

Edit `app/[locale]/page.tsx`:

```typescript
import Why2RLabs from '@/components/sections/Why2RLabs';

// ...

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
      <BlogPreview />
      <Contact />
    </main>
  );
}
```

**Step 4: Test**

```bash
npm run dev
```

Visit http://localhost:3000 and verify page loads without errors

**Step 5: Commit**

```bash
git add components/sections/Why2RLabs.tsx app/[locale]/page.tsx
git commit -m "refactor: rename WhyTestar to Why2RLabs

Update component name to match 2R Labs branding.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 6: Update Navigation Links

**Files:**
- Modify: `components/Navbar.tsx`

**Step 1: Add Products and About links**

Edit `components/Navbar.tsx` and update the navigation items array:

```typescript
const navItems = [
  { href: '/', label: t('nav.home') },
  { href: '/blog', label: t('nav.blog') },
  { href: '/case-studies', label: t('nav.caseStudies') },
  { href: '/products', label: t('nav.products') },        // NEW
  { href: '/about', label: t('nav.about') },              // NEW
  { href: '/#contact', label: t('nav.contact') },
];
```

**Step 2: Add translations**

Edit `messages/en.json`:

```json
{
  "nav": {
    "home": "Home",
    "blog": "Blog",
    "caseStudies": "Case Studies",
    "products": "Products",
    "about": "About",
    "contact": "Contact"
  }
}
```

Edit `messages/cs.json`:

```json
{
  "nav": {
    "home": "Domů",
    "blog": "Blog",
    "caseStudies": "Případové studie",
    "products": "Produkty",
    "about": "O nás",
    "contact": "Kontakt"
  }
}
```

**Step 3: Test navigation**

```bash
npm run dev
```

Visit http://localhost:3000 and check navbar shows all links

**Step 4: Commit**

```bash
git add components/Navbar.tsx messages/en.json messages/cs.json
git commit -m "feat: add Products and About navigation links

Add new navigation items for Products catalog and About/Team page
in both English and Czech.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 7: Update Footer

**Files:**
- Modify: `components/Footer.tsx`

**Step 1: Update company name and links**

Edit `components/Footer.tsx`:

```typescript
export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-bold mb-4">2R Labs</h3>
            <p className="text-sm text-muted-foreground">
              {t('description')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('company')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about">{t('about')}</a></li>
              <li><a href="/products">{t('products')}</a></li>
              <li><a href="/case-studies">{t('caseStudies')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('resources')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/blog">{t('blog')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('contact')}</h4>
            <p className="text-sm">info@2rlabs.com</p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} 2R Labs. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Add footer translations**

Edit `messages/en.json`:

```json
{
  "footer": {
    "description": "Software development consulting and innovative products",
    "company": "Company",
    "about": "About Us",
    "products": "Products",
    "caseStudies": "Case Studies",
    "resources": "Resources",
    "blog": "Blog",
    "contact": "Contact",
    "rights": "All rights reserved."
  }
}
```

Edit `messages/cs.json`:

```json
{
  "footer": {
    "description": "Poradenství ve vývoji softwaru a inovativní produkty",
    "company": "Společnost",
    "about": "O nás",
    "products": "Produkty",
    "caseStudies": "Případové studie",
    "resources": "Zdroje",
    "blog": "Blog",
    "contact": "Kontakt",
    "rights": "Všechna práva vyhrazena."
  }
}
```

**Step 3: Test**

```bash
npm run dev
```

Scroll to footer and verify all sections display correctly

**Step 4: Commit**

```bash
git add components/Footer.tsx messages/en.json messages/cs.json
git commit -m "feat: update footer with 2R Labs branding and new links

Update footer company name, description, and add Products/About links.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Phase 2: New Features - Products Catalog

### Task 8: Create Product Content Structure

**Files:**
- Create: `content/products/software/en/.gitkeep`
- Create: `content/products/software/cs/.gitkeep`
- Create: `content/products/consulting/en/.gitkeep`
- Create: `content/products/consulting/cs/.gitkeep`

**Step 1: Create directory structure**

```bash
mkdir -p content/products/software/en
mkdir -p content/products/software/cs
mkdir -p content/products/consulting/en
mkdir -p content/products/consulting/cs
```

**Step 2: Add .gitkeep files**

```bash
touch content/products/software/en/.gitkeep
touch content/products/software/cs/.gitkeep
touch content/products/consulting/en/.gitkeep
touch content/products/consulting/cs/.gitkeep
```

**Step 3: Verify structure**

```bash
tree content/products
```

Expected:
```
content/products/
├── consulting/
│   ├── cs/
│   │   └── .gitkeep
│   └── en/
│       └── .gitkeep
└── software/
    ├── cs/
    │   └── .gitkeep
    └── en/
        └── .gitkeep
```

**Step 4: Commit**

```bash
git add content/products/
git commit -m "feat: create products content directory structure

Add directories for software and consulting products in both EN and CS.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 9: Create Product Utility Functions

**Files:**
- Create: `lib/products.ts`

**Step 1: Create products utility file**

Create `lib/products.ts`:

```typescript
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
```

**Step 2: Verify no syntax errors**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add lib/products.ts
git commit -m "feat: add product utility functions

Add functions to load products by locale, category, and slug.
Supports filtering, sorting (featured/order/date), and MDX parsing.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 10: Create ProductCard Component

**Files:**
- Create: `components/products/ProductCard.tsx`

**Step 1: Create products components directory**

```bash
mkdir -p components/products
```

**Step 2: Create ProductCard component**

Create `components/products/ProductCard.tsx`:

```typescript
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ProductFrontmatter } from '@/lib/products';

interface ProductCardProps {
  product: ProductFrontmatter;
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      {product.image && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-xl">{product.title}</CardTitle>
          {product.featured && (
            <Badge variant="secondary" className="shrink-0">Featured</Badge>
          )}
        </div>
        <CardDescription>{product.tagline}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground mb-4 flex-1">
          {product.description}
        </p>

        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Link href={`/${locale}/products/${product.slug}`}>
          <Button variant="default" className="w-full bg-brand-600 hover:bg-brand-700">
            Learn More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
```

**Step 3: Verify no syntax errors**

```bash
npx tsc --noEmit
```

**Step 4: Commit**

```bash
git add components/products/ProductCard.tsx
git commit -m "feat: add ProductCard component

Display product with image, title, tagline, description, tags, and
CTA button. Supports featured badge and brand colors.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 11: Create Products Listing Page

**Files:**
- Create: `app/[locale]/products/page.tsx`

**Step 1: Create products directory**

```bash
mkdir -p app/[locale]/products
```

**Step 2: Create products listing page**

Create `app/[locale]/products/page.tsx`:

```typescript
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
```

**Step 3: Test page renders (will be empty without products)**

```bash
npm run dev
```

Visit http://localhost:3000/products - should show "No products available yet."

**Step 4: Commit**

```bash
git add app/[locale]/products/page.tsx
git commit -m "feat: add products listing page

Display products organized by category (software/consulting).
Shows empty state when no products exist.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 12: Create Product Detail Page

**Files:**
- Create: `app/[locale]/products/[slug]/page.tsx`

**Step 1: Create slug directory**

```bash
mkdir -p app/[locale]/products/[slug]
```

**Step 2: Create product detail page**

Create `app/[locale]/products/[slug]/page.tsx`:

```typescript
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProductBySlug, getAllProductSlugs, getProductsByLocale } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import Link from 'next/link';

export async function generateStaticParams() {
  const locales = ['en', 'cs'];
  const params: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    const slugs = getAllProductSlugs(locale);
    slugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });

  return params;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  const { frontmatter, content } = product;

  // Get related products (same category, excluding current)
  const relatedProducts = getProductsByLocale(locale, frontmatter.category)
    .filter((p) => p.frontmatter.slug !== slug)
    .slice(0, 3);

  return (
    <article className="container py-12 md:py-24">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href={`/${locale}`} className="hover:text-foreground">Home</Link>
        {' / '}
        <Link href={`/${locale}/products`} className="hover:text-foreground">Products</Link>
        {' / '}
        <span className="text-foreground">{frontmatter.title}</span>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="capitalize">
            {frontmatter.category}
          </Badge>
          {frontmatter.featured && <Badge variant="default">Featured</Badge>}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {frontmatter.title}
        </h1>

        <p className="text-xl text-muted-foreground mb-6">
          {frontmatter.tagline}
        </p>

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        )}

        {frontmatter.image && (
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
            <img
              src={frontmatter.image}
              alt={frontmatter.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert mb-12">
        <MDXRemote source={content} />
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto text-center py-8 border-t border-b mb-12">
        <h2 className="text-2xl font-bold mb-4">Interested in {frontmatter.title}?</h2>
        <p className="text-muted-foreground mb-6">
          Contact us to learn more or get started
        </p>
        <Link href={`/${locale}/#contact`}>
          <Button size="lg" className="bg-brand-600 hover:bg-brand-700">
            Contact Us
          </Button>
        </Link>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.frontmatter.slug}
                product={p.frontmatter}
                locale={locale}
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
```

**Step 3: Verify no syntax errors**

```bash
npx tsc --noEmit
```

**Step 4: Test (will 404 without products)**

```bash
npm run dev
```

**Step 5: Commit**

```bash
git add app/[locale]/products/[slug]/page.tsx
git commit -m "feat: add product detail page

Display full product details with MDX content, breadcrumb navigation,
tech badges, CTA, and related products section.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 13: Create Sample Product - Software (English)

**Files:**
- Create: `content/products/software/en/devops-automation-platform.mdx`

**Step 1: Create sample software product**

Create `content/products/software/en/devops-automation-platform.mdx`:

```mdx
---
title: "DevOps Automation Platform"
slug: "devops-automation-platform"
category: "software"
tagline: "Streamline your CI/CD pipeline with intelligent automation"
description: "A comprehensive platform for automating DevOps workflows, from code to deployment, with built-in monitoring and rollback capabilities."
image: "/images/products/devops-platform.jpg"
tags: ["DevOps", "CI/CD", "Kubernetes", "Docker", "Automation"]
featured: true
order: 1
inquiryEmail: "info@2rlabs.com"
published: true
date: "2026-02-20"
---

## Overview

Our DevOps Automation Platform is designed to simplify and accelerate your software delivery process. Built on modern cloud-native technologies, it provides everything you need to automate builds, tests, deployments, and monitoring.

## Key Features

### Intelligent CI/CD Pipelines
- Visual pipeline builder with drag-and-drop interface
- Support for parallel execution and advanced workflows
- Integration with GitHub, GitLab, and Bitbucket

### Container Orchestration
- Native Kubernetes integration
- Docker registry management
- Automated scaling and load balancing

### Monitoring & Observability
- Real-time performance metrics
- Distributed tracing
- Automated alerting and notifications

### Rollback & Recovery
- One-click rollback to previous versions
- Automated backup and disaster recovery
- Blue-green and canary deployments

## Technical Stack

Built with:
- **Backend:** Go, gRPC
- **Frontend:** React, TypeScript
- **Infrastructure:** Kubernetes, Docker, Terraform
- **Monitoring:** Prometheus, Grafana

## Use Cases

- **Startups:** Get from code to production in minutes
- **Enterprises:** Scale complex workflows across teams
- **Agencies:** Manage multiple client deployments

## Pricing

Contact us for custom pricing based on your team size and requirements.
```

**Step 2: Create placeholder image directory**

```bash
mkdir -p public/images/products
touch public/images/products/.gitkeep
```

**Step 3: Test product appears**

```bash
npm run dev
```

Visit http://localhost:3000/products - should show 1 product card
Visit http://localhost:3000/products/devops-automation-platform - should show details

**Step 4: Commit**

```bash
git add content/products/software/en/devops-automation-platform.mdx public/images/products/
git commit -m "feat: add sample DevOps Automation Platform product

Add first software product as example with full MDX content.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 14: Create Sample Product - Software (Czech)

**Files:**
- Create: `content/products/software/cs/devops-automation-platform.mdx`

**Step 1: Create Czech version**

Create `content/products/software/cs/devops-automation-platform.mdx`:

```mdx
---
title: "DevOps Automatizační Platforma"
slug: "devops-automation-platform"
category: "software"
tagline: "Zefektivněte své CI/CD procesy pomocí inteligentní automatizace"
description: "Kompletní platforma pro automatizaci DevOps workflow, od kódu po nasazení, s vestavěným monitoringem a možností rollbacku."
image: "/images/products/devops-platform.jpg"
tags: ["DevOps", "CI/CD", "Kubernetes", "Docker", "Automatizace"]
featured: true
order: 1
inquiryEmail: "info@2rlabs.com"
published: true
date: "2026-02-20"
---

## Přehled

Naše DevOps Automatizační Platforma je navržena tak, aby zjednodušila a urychlila proces dodávání softwaru. Postavená na moderních cloud-native technologiích poskytuje vše, co potřebujete k automatizaci buildů, testů, nasazení a monitoringu.

## Klíčové Funkce

### Inteligentní CI/CD Pipelines
- Vizuální nástroj pro tvorbu pipeline s drag-and-drop rozhraním
- Podpora paralelního provádění a pokročilých workflow
- Integrace s GitHub, GitLab a Bitbucket

### Kontejnerová Orchestrace
- Nativní integrace s Kubernetes
- Správa Docker registry
- Automatické škálování a load balancing

### Monitoring & Observability
- Metriky výkonu v reálném čase
- Distribuované trasování
- Automatizované upozornění a notifikace

### Rollback & Recovery
- Návrat k předchozí verzi jedním kliknutím
- Automatizované zálohování a disaster recovery
- Blue-green a canary nasazení

## Technologický Stack

Postaveno s:
- **Backend:** Go, gRPC
- **Frontend:** React, TypeScript
- **Infrastruktura:** Kubernetes, Docker, Terraform
- **Monitoring:** Prometheus, Grafana

## Použití

- **Startupy:** Od kódu do produkce během minut
- **Podniky:** Škálování komplexních workflow napříč týmy
- **Agentury:** Správa nasazení více klientů

## Ceny

Kontaktujte nás pro cenovou nabídku přizpůsobenou velikosti vašeho týmu a požadavkům.
```

**Step 2: Test Czech version**

```bash
npm run dev
```

Visit http://localhost:3000/cs/products - should show Czech version

**Step 3: Commit**

```bash
git add content/products/software/cs/devops-automation-platform.mdx
git commit -m "feat: add Czech translation for DevOps product

Add Czech localized version of DevOps Automation Platform.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Phase 2: New Features - Team/About Page

### Task 15: Create Team Data Structure

**Files:**
- Create: `content/team/team-members.json`

**Step 1: Create team directory**

```bash
mkdir -p content/team
```

**Step 2: Create team members JSON**

Create `content/team/team-members.json`:

```json
{
  "members": [
    {
      "id": "founder-1",
      "name": "John Doe",
      "role": "Founder & CEO",
      "bio": "Software architect with 15+ years of experience building scalable systems. Passionate about clean code and helping teams deliver better software.",
      "photo": "/images/team/john-doe.jpg",
      "linkedin": "https://linkedin.com/in/johndoe",
      "github": "https://github.com/johndoe",
      "email": "john@2rlabs.com",
      "order": 1
    },
    {
      "id": "founder-2",
      "name": "Jane Smith",
      "role": "Co-Founder & CTO",
      "bio": "Full-stack developer and DevOps expert. Loves automating everything and building developer tools that make life easier.",
      "photo": "/images/team/jane-smith.jpg",
      "linkedin": "https://linkedin.com/in/janesmith",
      "github": "https://github.com/janesmith",
      "email": "jane@2rlabs.com",
      "order": 2
    }
  ]
}
```

**Step 3: Create placeholder team images**

```bash
mkdir -p public/images/team
touch public/images/team/.gitkeep
```

**Step 4: Commit**

```bash
git add content/team/team-members.json public/images/team/
git commit -m "feat: add team members data structure

Create JSON structure for team member profiles with sample data.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 16: Create Team Member Utility Functions

**Files:**
- Create: `lib/team.ts`

**Step 1: Create team utility**

Create `lib/team.ts`:

```typescript
import fs from 'fs';
import path from 'path';

const teamDataPath = path.join(process.cwd(), 'content/team/team-members.json');

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin?: string;
  github?: string;
  email?: string;
  order: number;
}

export interface TeamData {
  members: TeamMember[];
}

export function getTeamMembers(): TeamMember[] {
  if (!fs.existsSync(teamDataPath)) {
    return [];
  }

  const fileContents = fs.readFileSync(teamDataPath, 'utf8');
  const data: TeamData = JSON.parse(fileContents);

  // Sort by order field
  return data.members.sort((a, b) => a.order - b.order);
}

export function getTeamMemberById(id: string): TeamMember | null {
  const members = getTeamMembers();
  return members.find((member) => member.id === id) || null;
}
```

**Step 2: Verify no syntax errors**

```bash
npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add lib/team.ts
git commit -m "feat: add team member utility functions

Add functions to load and access team member data from JSON.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 17: Create TeamMemberCard Component

**Files:**
- Create: `components/team/TeamMemberCard.tsx`

**Step 1: Create team components directory**

```bash
mkdir -p components/team
```

**Step 2: Create TeamMemberCard**

Create `components/team/TeamMemberCard.tsx`:

```typescript
import { Card, CardContent } from '@/components/ui/card';
import { LinkedinIcon, GithubIcon, MailIcon } from 'lucide-react';
import type { TeamMember } from '@/lib/team';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="mb-4">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-muted">
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-muted-foreground">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className="text-sm text-brand-600 font-medium mb-3">{member.role}</p>
        <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>

        <div className="flex justify-center gap-3">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-600 transition-colors"
            >
              <LinkedinIcon size={20} />
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-600 transition-colors"
            >
              <GithubIcon size={20} />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-muted-foreground hover:text-brand-600 transition-colors"
            >
              <MailIcon size={20} />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

**Step 3: Verify no syntax errors**

```bash
npx tsc --noEmit
```

**Step 4: Commit**

```bash
git add components/team/TeamMemberCard.tsx
git commit -m "feat: add TeamMemberCard component

Display team member with photo, name, role, bio, and social links.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 18: Create Company Story Content

**Files:**
- Create: `content/about/company-story-en.mdx`
- Create: `content/about/company-story-cs.mdx`

**Step 1: Create about directory**

```bash
mkdir -p content/about
```

**Step 2: Create English company story**

Create `content/about/company-story-en.mdx`:

```mdx
# About 2R Labs

## Our Mission

At 2R Labs, we believe that great software is built through a combination of technical excellence, clear communication, and deep understanding of business needs. Our mission is to help companies build better software while creating innovative products that solve real-world problems.

## What We Do

We specialize in two key areas:

**Software Development Consulting** - We partner with companies to improve their development processes, architecture, and team capabilities. Whether you need help scaling your infrastructure, improving code quality, or accelerating delivery, we bring deep technical expertise and proven methodologies.

**Product Development** - We build our own software products that address common challenges in the software development lifecycle. From DevOps automation to testing tools, our products are designed by developers, for developers.

## Our Approach

We follow a pragmatic, results-oriented approach:
- **Listen first** - Understand your unique challenges and constraints
- **Deliver incrementally** - Show value early and often
- **Build for the long term** - Create maintainable, scalable solutions
- **Share knowledge** - Empower your team to succeed independently

## Our Values

- **Excellence** - We strive for quality in everything we do
- **Transparency** - Clear communication builds trust
- **Innovation** - We embrace new technologies and methodologies
- **Partnership** - Your success is our success

## Why "2R Labs"?

The name "2R Labs" represents our dual focus: **Research** and **Results**. We continuously explore new technologies and approaches (Research) while maintaining a laser focus on delivering tangible business outcomes (Results).
```

**Step 3: Create Czech company story**

Create `content/about/company-story-cs.mdx`:

```mdx
# O společnosti 2R Labs

## Naše Mise

Ve společnosti 2R Labs věříme, že skvělý software vzniká kombinací technické excelence, jasné komunikace a hlubokého pochopení obchodních potřeb. Naší misí je pomáhat firmám vytvářet lepší software a zároveň vyvíjet inovativní produkty, které řeší reálné problémy.

## Co Děláme

Specializujeme se na dvě klíčové oblasti:

**Poradenství ve Vývoji Softwaru** - Spolupracujeme s firmami na zlepšování jejich vývojových procesů, architektury a schopností týmů. Ať už potřebujete pomoc se škálováním infrastruktury, zlepšením kvality kódu nebo zrychlením dodávek, přinášíme hluboké technické znalosti a osvědčené metodiky.

**Vývoj Produktů** - Vytváříme vlastní softwarové produkty, které řeší běžné výzvy v životním cyklu vývoje softwaru. Od DevOps automatizace po testovací nástroje - naše produkty jsou navrženy vývojáři pro vývojáře.

## Náš Přístup

Následujeme pragmatický přístup zaměřený na výsledky:
- **Nejdřív nasloucháme** - Rozumíme vašim jedinečným výzvám a omezením
- **Dodáváme postupně** - Ukazujeme hodnotu brzy a často
- **Stavíme pro dlouhodobé období** - Vytváříme udržovatelná a škálovatelná řešení
- **Sdílíme znalosti** - Dáváme vašemu týmu možnost uspět samostatně

## Naše Hodnoty

- **Excelence** - Usilujeme o kvalitu ve všem, co děláme
- **Transparentnost** - Jasná komunikace buduje důvěru
- **Inovace** - Přijímáme nové technologie a metodiky
- **Partnerství** - Váš úspěch je náš úspěch

## Proč "2R Labs"?

Název "2R Labs" reprezentuje naše duální zaměření: **Research** (Výzkum) a **Results** (Výsledky). Neustále zkoumáme nové technologie a přístupy (Research), zatímco udržujeme zaměření na dodávání hmatatelných obchodních výsledků (Results).
```

**Step 4: Commit**

```bash
git add content/about/
git commit -m "feat: add company story content in EN and CS

Add MDX content for About page with mission, approach, and values.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 19: Create About Page

**Files:**
- Create: `app/[locale]/about/page.tsx`

**Step 1: Create about directory**

```bash
mkdir -p app/[locale]/about
```

**Step 2: Create About page**

Create `app/[locale]/about/page.tsx`:

```typescript
import { setRequestLocale } from 'next-intl/server';
import { getTeamMembers } from '@/lib/team';
import { TeamMemberCard } from '@/components/team/TeamMemberCard';
import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const teamMembers = getTeamMembers();

  // Load company story
  const storyPath = path.join(
    process.cwd(),
    'content/about',
    `company-story-${locale}.mdx`
  );

  let storyContent = '';
  if (fs.existsSync(storyPath)) {
    storyContent = fs.readFileSync(storyPath, 'utf8');
  }

  return (
    <div className="container py-12 md:py-24">
      {/* Company Story */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {storyContent ? (
            <MDXRemote source={storyContent} />
          ) : (
            <>
              <h1>About 2R Labs</h1>
              <p>Content coming soon...</p>
            </>
          )}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-xl text-muted-foreground">
            Meet the people behind 2R Labs
          </p>
        </div>

        {teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Team information coming soon.</p>
          </div>
        )}
      </section>
    </div>
  );
}
```

**Step 3: Test About page**

```bash
npm run dev
```

Visit http://localhost:3000/about - should show company story and team

**Step 4: Commit**

```bash
git add app/[locale]/about/page.tsx
git commit -m "feat: add About page with company story and team

Display company story from MDX and team member grid.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 20: Add ProductsPreview Section to Homepage

**Files:**
- Create: `components/sections/ProductsPreview.tsx`
- Modify: `app/[locale]/page.tsx`

**Step 1: Create ProductsPreview component**

Create `components/sections/ProductsPreview.tsx`:

```typescript
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getProductsByLocale } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';

export default function ProductsPreview({ locale }: { locale: string }) {
  const t = useTranslations('productsPreview');
  const featuredProducts = getProductsByLocale(locale)
    .filter((p) => p.frontmatter.featured)
    .slice(0, 3);

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Products
          </h2>
          <p className="text-lg text-muted-foreground">
            Innovative software products and tailored consulting packages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.frontmatter.slug}
              product={product.frontmatter}
              locale={locale}
            />
          ))}
        </div>

        <div className="text-center">
          <Link href={`/${locale}/products`}>
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Update homepage**

Edit `app/[locale]/page.tsx` to add ProductsPreview:

```typescript
import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Why2RLabs from '@/components/sections/Why2RLabs';
import Process from '@/components/sections/Process';
import ProductsPreview from '@/components/sections/ProductsPreview';
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
      <Why2RLabs />
      <Process />
      <ProductsPreview locale={locale} />
      <References />
      <BlogPreview />
      <Contact />
    </main>
  );
}
```

**Step 3: Test homepage**

```bash
npm run dev
```

Visit http://localhost:3000 - should see ProductsPreview section

**Step 4: Commit**

```bash
git add components/sections/ProductsPreview.tsx app/[locale]/page.tsx
git commit -m "feat: add ProductsPreview section to homepage

Display featured products on homepage with CTA to products page.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 21: Add TeamPreview Section to Homepage

**Files:**
- Create: `components/sections/TeamPreview.tsx`
- Modify: `app/[locale]/page.tsx`

**Step 1: Create TeamPreview component**

Create `components/sections/TeamPreview.tsx`:

```typescript
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getTeamMembers } from '@/lib/team';
import { TeamMemberCard } from '@/components/team/TeamMemberCard';
import { Button } from '@/components/ui/button';

export default function TeamPreview({ locale }: { locale: string }) {
  const t = useTranslations('teamPreview');
  const teamMembers = getTeamMembers().slice(0, 4);

  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-muted-foreground">
            Experienced professionals dedicated to your success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        <div className="text-center">
          <Link href={`/${locale}/about`}>
            <Button variant="outline" size="lg">
              Learn More About Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Update homepage**

Edit `app/[locale]/page.tsx`:

```typescript
import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Why2RLabs from '@/components/sections/Why2RLabs';
import Process from '@/components/sections/Process';
import ProductsPreview from '@/components/sections/ProductsPreview';
import TeamPreview from '@/components/sections/TeamPreview';
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
      <Why2RLabs />
      <Process />
      <ProductsPreview locale={locale} />
      <TeamPreview locale={locale} />
      <References />
      <BlogPreview />
      <Contact />
    </main>
  );
}
```

**Step 3: Test homepage**

```bash
npm run dev
```

Visit http://localhost:3000 - should see both ProductsPreview and TeamPreview

**Step 4: Commit**

```bash
git add components/sections/TeamPreview.tsx app/[locale]/page.tsx
git commit -m "feat: add TeamPreview section to homepage

Display team members on homepage with CTA to About page.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Phase 3: Content & Polish

### Task 22: Clean Up Testar Content

**Files:**
- Delete: `content/blog/*`
- Delete: `content/case-studies/*`

**Step 1: Remove testar blog content**

```bash
rm -rf content/blog/en/*
rm -rf content/blog/cs/*
```

**Step 2: Remove testar case studies**

```bash
rm -rf content/case-studies/en/*
rm -rf content/case-studies/cs/*
```

**Step 3: Add .gitkeep files**

```bash
touch content/blog/en/.gitkeep
touch content/blog/cs/.gitkeep
touch content/case-studies/en/.gitkeep
touch content/case-studies/cs/.gitkeep
```

**Step 4: Commit**

```bash
git add content/blog/ content/case-studies/
git commit -m "chore: remove testar-specific content

Clear out testar blog posts and case studies, ready for 2R Labs content.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 23: Update Metadata and SEO

**Files:**
- Modify: `app/[locale]/layout.tsx`

**Step 1: Update metadata in layout**

Edit `app/[locale]/layout.tsx` and find the metadata export:

```typescript
export const metadata: Metadata = {
  title: {
    default: '2R Labs - Software Development Consulting & Products',
    template: '%s | 2R Labs',
  },
  description:
    'We help companies build better software through expert consulting and create innovative products that solve real-world development challenges.',
  keywords: [
    'software development',
    'consulting',
    'DevOps',
    'software products',
    'CI/CD',
    'automation',
  ],
  authors: [{ name: '2R Labs' }],
  creator: '2R Labs',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://2rlabs.com',
    title: '2R Labs - Software Development Consulting & Products',
    description:
      'Expert software development consulting and innovative products',
    siteName: '2R Labs',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2R Labs - Software Development Consulting & Products',
    description:
      'Expert software development consulting and innovative products',
  },
};
```

**Step 2: Test metadata**

```bash
npm run dev
```

View page source at http://localhost:3000 and check `<title>` and meta tags

**Step 3: Commit**

```bash
git add app/[locale]/layout.tsx
git commit -m "feat: update metadata and SEO for 2R Labs

Update page titles, descriptions, and OpenGraph tags.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 24: Apply Brand Colors to Components

**Files:**
- Modify: `components/ui/button.tsx`
- Modify: `components/sections/Hero.tsx`

**Step 1: Update button primary variant**

Edit `components/ui/button.tsx` and update the default variant to use brand colors:

```typescript
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        default: "bg-brand-600 text-white hover:bg-brand-700",
        // ... other variants
      },
    },
  }
);
```

**Step 2: Update Hero CTA button**

Edit `components/sections/Hero.tsx` and ensure CTA button uses brand color:

```typescript
<Button size="lg" className="bg-brand-600 hover:bg-brand-700">
  {t('cta')}
</Button>
```

**Step 3: Test visual changes**

```bash
npm run dev
```

Check that primary buttons and Hero section use purple branding

**Step 4: Commit**

```bash
git add components/ui/button.tsx components/sections/Hero.tsx
git commit -m "feat: apply brand colors to buttons and Hero section

Use dark purple (brand-600) for primary buttons and key CTAs.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 25: Add Placeholder Logo

**Files:**
- Create: `public/logo.svg` (placeholder)
- Modify: `components/Navbar.tsx`

**Step 1: Create simple text-based logo placeholder**

Create `public/logo.svg`:

```svg
<svg width="120" height="40" xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="30" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#9333ea">
    2R Labs
  </text>
</svg>
```

**Step 2: Update Navbar to use logo**

Edit `components/Navbar.tsx`:

```typescript
<Link href="/" className="flex items-center space-x-2">
  <img src="/logo.svg" alt="2R Labs" className="h-8" />
</Link>
```

**Step 3: Test logo appears**

```bash
npm run dev
```

Check navbar shows logo

**Step 4: Commit**

```bash
git add public/logo.svg components/Navbar.tsx
git commit -m "feat: add placeholder 2R Labs logo

Add simple SVG text logo as placeholder until final design ready.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 26: Production Build Test

**Files:**
- None (testing only)

**Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes successfully with no errors

**Step 2: Test production build locally**

```bash
npm run start
```

Expected: Site runs on http://localhost:3000

**Step 3: Check all routes**

Visit:
- http://localhost:3000
- http://localhost:3000/products
- http://localhost:3000/about
- http://localhost:3000/blog
- http://localhost:3000/case-studies

All should load without errors

**Step 4: Stop server**

```bash
# Press Ctrl+C
```

**Step 5: Document test results**

Create `docs/testing-log.md`:

```markdown
# Testing Log

## 2026-02-20 - Production Build Test

**Build:** ✅ Success
**Routes tested:**
- ✅ Homepage (/)
- ✅ Products (/products)
- ✅ About (/about)
- ✅ Blog (/blog)
- ✅ Case Studies (/case-studies)

**Locales tested:**
- ✅ English (en)
- ✅ Czech (cs)

All routes load successfully in production mode.
```

**Step 6: Commit**

```bash
git add docs/testing-log.md
git commit -m "test: verify production build and all routes

Document successful production build and route testing.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Phase 4: Deployment Setup

### Task 27: Create Deployment Configuration

**Files:**
- Verify: `Dockerfile` exists (from testar-web)
- Verify: `docker-compose.yml` exists
- Verify: `nginx.conf` exists

**Step 1: Check Docker files exist**

```bash
ls -la | grep -E "(Dockerfile|docker-compose|nginx)"
```

Expected: All three files present from testar-web clone

**Step 2: Update docker-compose.yml app name**

Edit `docker-compose.yml` and update service name:

```yaml
services:
  2rlabs-web:
    build: .
    container_name: 2rlabs-web
    restart: unless-stopped
    environment:
      NODE_ENV: production
      NEXT_PUBLIC_SITE_URL: https://2rlabs.com
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.2rlabs.rule=Host(`2rlabs.com`)"
      - "traefik.http.routers.2rlabs.entrypoints=websecure"
      - "traefik.http.routers.2rlabs.tls.certresolver=letsencrypt"
```

**Step 3: Verify Dockerfile is correct**

```bash
cat Dockerfile
```

Should be multi-stage build with Next.js

**Step 4: Commit**

```bash
git add docker-compose.yml
git commit -m "chore: update docker-compose for 2R Labs deployment

Update service name and domain configuration.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 28: Create GitHub Actions Workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: Create workflows directory**

```bash
mkdir -p .github/workflows
```

**Step 2: Create deployment workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /opt/apps/2rlabs-prod
            git pull origin main
            docker-compose down
            docker-compose up -d --build
            docker system prune -f
```

**Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions deployment workflow

Auto-deploy to VPS on push to main branch.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 29: Create Deployment Documentation

**Files:**
- Create: `docs/deployment.md`

**Step 1: Create deployment guide**

Create `docs/deployment.md`:

```markdown
# Deployment Guide

## Prerequisites

- VPS with Docker and Docker Compose installed
- Traefik reverse proxy configured
- Domain DNS pointing to VPS
- GitHub repository set up

## Initial VPS Setup

### 1. SSH to VPS

\`\`\`bash
ssh claude@<VPS_IP>
\`\`\`

### 2. Create app directory

\`\`\`bash
sudo mkdir -p /opt/apps/2rlabs-prod
sudo chown $USER:$USER /opt/apps/2rlabs-prod
cd /opt/apps/2rlabs-prod
\`\`\`

### 3. Clone repository

\`\`\`bash
git clone <REPO_URL> .
\`\`\`

### 4. Initial deploy

\`\`\`bash
docker-compose up -d --build
\`\`\`

## GitHub Setup

### Required Secrets

Set these in GitHub repository Settings → Secrets and variables → Actions:

- \`VPS_HOST\` = VPS IP address
- \`VPS_USER\` = SSH username (e.g., \`claude\`)
- \`VPS_SSH_KEY\` = SSH private key for deployment

### SSH Key Setup

On VPS:

\`\`\`bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github_actions  # Copy this to GitHub secret VPS_SSH_KEY
\`\`\`

## DNS Configuration

Set A record:

\`\`\`
2rlabs.com -> <VPS_IP>
www.2rlabs.com -> <VPS_IP>
\`\`\`

## SSL Certificate

Traefik will automatically obtain Let's Encrypt certificate when:
- DNS is configured correctly
- Traefik is running with Let's Encrypt configuration
- Domain is accessible

## Environment Variables

Create \`.env\` file in \`/opt/apps/2rlabs-prod\`:

\`\`\`
FORMSPREE_FORM_ID=your_form_id_here
NEXT_PUBLIC_SITE_URL=https://2rlabs.com
\`\`\`

## Deployment Process

1. Push to \`main\` branch
2. GitHub Actions triggers
3. SSH to VPS
4. Pull latest code
5. Rebuild and restart containers
6. Cleanup old images

## Manual Deployment

If needed:

\`\`\`bash
ssh claude@<VPS_IP>
cd /opt/apps/2rlabs-prod
git pull origin main
docker-compose down
docker-compose up -d --build
\`\`\`

## Monitoring

Check logs:

\`\`\`bash
docker-compose logs -f
\`\`\`

Check status:

\`\`\`bash
docker-compose ps
\`\`\`

## Troubleshooting

**Container won't start:**
\`\`\`bash
docker-compose logs
\`\`\`

**SSL not working:**
- Verify DNS is correct
- Check Traefik logs
- Ensure port 80 and 443 are open

**Build fails:**
- Check Node version in Dockerfile
- Verify all dependencies are listed in package.json
\`\`\`
```

**Step 2: Commit**

```bash
git add docs/deployment.md
git commit -m "docs: add deployment guide

Complete guide for VPS setup, GitHub Actions, and troubleshooting.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 30: Final Checklist and README Update

**Files:**
- Modify: `README.md`

**Step 1: Update README with full information**

Edit `README.md`:

```markdown
# 2R Labs Website

Corporate website for 2R Labs - Software Development Consulting & Products.

🌐 **Live:** [2rlabs.com](https://2rlabs.com)

## Features

- 🌍 **Bilingual** - Czech + English (next-intl)
- 📦 **Products Catalog** - Software products and consulting packages
- 👥 **Team Profiles** - Meet our team
- 📝 **Blog & Case Studies** - MDX-powered content
- 🎨 **Dark Purple Branding** - Custom 2R Labs design
- 🐳 **Docker Deployment** - Production-ready containerization
- 🚀 **Auto-Deploy** - GitHub Actions CI/CD

## Tech Stack

- **Framework:** Next.js 16 + TypeScript + App Router
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Internationalization:** next-intl
- **Animations:** Framer Motion
- **Content:** MDX (blog, case studies, products)
- **Forms:** Formspree
- **Deployment:** Docker + Nginx + Traefik

## Local Development

\`\`\`bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
\`\`\`

## Project Structure

\`\`\`
app/[locale]/          # Next.js App Router
  page.tsx             # Homepage
  products/            # Products catalog
  about/               # Team/About page
  blog/                # Blog
  case-studies/        # Case studies

components/
  sections/            # Homepage sections
  products/            # Product components
  team/                # Team components
  ui/                  # shadcn/ui components

content/
  products/            # Product MDX files
    software/          # Software products
    consulting/        # Consulting packages
  team/                # Team data (JSON)
  about/               # Company story (MDX)
  blog/                # Blog posts (MDX)
  case-studies/        # Case studies (MDX)

lib/
  products.ts          # Product utilities
  team.ts              # Team utilities
\`\`\`

## Content Management

All content is managed via MDX files and JSON:

- **Products:** \`content/products/{category}/{locale}/{slug}.mdx\`
- **Team:** \`content/team/team-members.json\`
- **Company Story:** \`content/about/company-story-{locale}.mdx\`
- **Blog:** \`content/blog/{locale}/{slug}.mdx\`
- **Case Studies:** \`content/case-studies/{locale}/{slug}.mdx\`

## Deployment

Automatic deployment via GitHub Actions on push to \`main\`.

See [docs/deployment.md](docs/deployment.md) for full setup guide.

## Environment Variables

\`\`\`bash
FORMSPREE_FORM_ID=<your-form-id>
NEXT_PUBLIC_SITE_URL=https://2rlabs.com
\`\`\`

## Scripts

\`\`\`bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
\`\`\`

## License

© 2026 2R Labs. All rights reserved.
```

**Step 2: Commit**

```bash
git add README.md
git commit -m "docs: update README with complete project information

Add features, structure, content management, and deployment info.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Implementation Complete! 🎉

### Summary

You now have a fully functional 2R Labs website with:

✅ **Phase 1: Foundation**
- Cloned and rebranded from testar-web
- Dark purple brand colors configured
- Navigation and footer updated
- i18n messages customized

✅ **Phase 2: New Features**
- Products catalog with categories (software/consulting)
- Individual product pages with MDX content
- Team/About page with company story and team profiles
- ProductsPreview and TeamPreview on homepage

✅ **Phase 3: Content & Polish**
- Sample products created (EN + CS)
- Team member data structure
- Company story content
- Production build tested
- Brand colors applied to components

✅ **Phase 4: Deployment**
- Docker configuration ready
- GitHub Actions workflow created
- Deployment documentation complete

### Next Steps

1. **Add Real Content:**
   - Replace sample products with actual 2R Labs products
   - Add real team member photos and bios
   - Create blog posts and case studies

2. **Design Assets:**
   - Replace placeholder logo with final design
   - Add product screenshots/images
   - Add team member photos

3. **Formspree Setup:**
   - Create Formspree account
   - Get form ID
   - Update Contact component

4. **Deploy:**
   - Set up VPS following `docs/deployment.md`
   - Configure GitHub secrets
   - Push to main to trigger deployment

5. **Domain & DNS:**
   - Point domain to VPS
   - Wait for SSL certificate

### File Checklist

All files created/modified:
- ✅ 30+ components and pages
- ✅ Product catalog system
- ✅ Team management system
- ✅ Sample content (EN + CS)
- ✅ Deployment configuration
- ✅ Documentation

**The website is ready for content population and deployment!**
