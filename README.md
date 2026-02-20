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

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
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
```

## Content Management

All content is managed via MDX files and JSON:

- **Products:** `content/products/{category}/{locale}/{slug}.mdx`
- **Team:** `content/team/team-members.json`
- **Company Story:** `content/about/company-story-{locale}.mdx`
- **Blog:** `content/blog/{locale}/{slug}.mdx`
- **Case Studies:** `content/case-studies/{locale}/{slug}.mdx`

## Deployment

Automatic deployment via GitHub Actions on push to `main`.

See [docs/deployment.md](docs/deployment.md) for full setup guide.

## Environment Variables

```bash
FORMSPREE_FORM_ID=<your-form-id>
NEXT_PUBLIC_SITE_URL=https://2rlabs.com
```

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

## License

© 2026 2R Labs. All rights reserved.
