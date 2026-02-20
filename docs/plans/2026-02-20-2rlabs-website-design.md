# 2R Labs Website Design Document

**Date:** 2026-02-20
**Project:** 2R Labs Corporate Website
**Approach:** Clone & customize testar-web

---

## Overview

2R Labs is a software development consulting company that also builds its own products. The website will showcase both consulting services and a product catalog, built on the proven foundation of the testar-web codebase.

### Key Requirements
- Software products and consulting packages catalog
- Showcase + inquiry form (no e-commerce)
- Czech + English internationalization
- Team/About page with company story and team profiles
- Case studies to demonstrate expertise
- Similar design to testar-web with dark purple branding
- Same deployment infrastructure (VPS + Docker + GitHub Actions)

---

## 1. Architecture & Tech Stack

### Foundation
Clone the complete testar-web codebase and customize for 2R Labs.

### Technology Stack
- **Framework:** Next.js 16 with App Router + TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui components
- **Internationalization:** next-intl (Czech + English)
- **Animations:** Framer Motion
- **Content:** MDX for blog, case studies, and products
- **Forms:** Formspree for contact/inquiry forms
- **Deployment:** Docker + Nginx + GitHub Actions
- **Icons:** Lucide React

### Key Principle
Reuse everything that works from testar-web, only modify what needs to be different for 2R Labs (branding, content, new sections).

---

## 2. Project Structure & File Organization

### Directory Structure

```
app/
  [locale]/
    page.tsx                    # Homepage (expanded with Products/Team previews)
    about/                      # NEW - Team/About page
      page.tsx
    products/                   # NEW - Products catalog
      page.tsx                  # Products listing with 2 categories
      [slug]/
        page.tsx                # Individual product detail pages
    blog/                       # Keep from testar-web
      page.tsx
      [slug]/
        page.tsx
    case-studies/              # Keep from testar-web
      page.tsx
      [slug]/
        page.tsx
    layout.tsx

content/
  blog/                        # Keep from testar-web
    en/
    cs/
  case-studies/               # Keep from testar-web
    en/
    cs/
  products/                    # NEW - MDX files for products
    software/                  # Category: Software Products
      en/
        product-1.mdx
      cs/
        product-1.mdx
    consulting/                # Category: Consulting Packages
      en/
        package-1.mdx
      cs/
        package-1.mdx
  team/                        # NEW - Team member data
    team-members.json          # Team member profiles
  about/                       # NEW - Company story
    company-story.mdx

components/
  sections/
    Hero.tsx                   # Customize for 2R Labs
    Services.tsx              # Customize services
    Why2RLabs.tsx            # Rename from WhyTestar
    Process.tsx               # Keep/customize
    ProductsPreview.tsx       # NEW - Homepage products preview
    TeamPreview.tsx           # NEW - Homepage team preview
    References.tsx            # Keep
    BlogPreview.tsx           # Keep
    Contact.tsx               # Keep/customize
  products/                    # NEW - Product components
    ProductCard.tsx           # Product listing card
    ProductCategory.tsx       # Category filter/display
  team/                        # NEW - Team components
    TeamMemberCard.tsx        # Team member grid card
  ui/                          # Keep shadcn/ui components
    button.tsx
    card.tsx
    badge.tsx
    separator.tsx
```

### Content Organization
- Products organized in two subdirectories: `software/` and `consulting/`
- Each product has localized versions (en/ and cs/)
- Team data in JSON for structured management
- Company story in MDX for rich formatting
- All content follows same pattern as blog/case studies

---

## 3. Content Types & Data Models

### Product MDX Frontmatter

```yaml
---
title: "Product Name"
slug: "product-slug"
category: "software" # or "consulting"
tagline: "Brief one-liner description"
description: "Detailed description (2-3 sentences)"
image: "/images/products/product-name.jpg"
tags: ["Next.js", "TypeScript", "Testing"] # Tech stack or features
featured: true # Show on homepage preview
order: 1 # Display order within category
inquiryEmail: "info@2rlabs.com"
published: true
date: "2026-02-20"
---

## Full product description in MDX

Features, benefits, use cases, technical details, etc.
```

### Team Member JSON Structure

```json
{
  "members": [
    {
      "id": "member-1",
      "name": "Full Name",
      "role": "Position/Title",
      "bio": "Short bio paragraph describing experience and expertise",
      "photo": "/images/team/name.jpg",
      "linkedin": "https://linkedin.com/in/username",
      "github": "https://github.com/username",
      "email": "name@2rlabs.com",
      "order": 1
    }
  ]
}
```

### Company Story
- Stored in `content/about/company-story.mdx`
- Allows rich formatting, images, and easy editing
- Can include mission, values, history, vision

### Inquiry Forms
- **General contact form:** Existing from testar-web
- **Product-specific inquiry form:** Pre-filled with product name as context
- Both use Formspree for backend handling

---

## 4. New Features Implementation

### Products Catalog Page (`/products`)

**Features:**
- Category tabs/filters: "All" | "Software Products" | "Consulting Packages"
- Grid layout of product cards (similar to case studies layout)
- Each card displays:
  - Product image
  - Title and tagline
  - Technology tags
  - "Learn More" button
- Featured products highlighted or shown first
- Sorting by order field
- Responsive grid: 3 columns desktop, 2 tablet, 1 mobile

**Implementation:**
- Filter products by category using frontmatter
- Sort by `featured` flag and `order` field
- Reuse card components from case studies with product-specific styling

### Individual Product Page (`/products/[slug]`)

**Structure:**
- Hero section: title, tagline, main image
- Full MDX content rendering (features, benefits, technical details)
- Tech stack/features displayed as badges
- "Contact Us About This Product" CTA button
  - Opens inquiry form modal or navigates to contact with pre-filled context
- Related products section (same category, excluding current)
- Breadcrumb navigation: Home → Products → [Category] → Product Name

**Implementation:**
- Use same MDX rendering as blog/case studies
- Dynamic routes with `generateStaticParams`
- Related products query by category match

### Team/About Page (`/about`)

**Sections:**

1. **Company Story Section**
   - Rendered from MDX content
   - Rich formatting with images, headings, lists
   - Mission, values, history, vision

2. **Team Grid Section**
   - Grid of team member cards
   - Each card shows:
     - Photo (circular or square)
     - Name and role
     - Short bio excerpt
     - Social links on hover/click (LinkedIn, GitHub, email)
   - Responsive grid: 4 columns desktop, 3 tablet, 2 mobile

**Implementation:**
- Load team members from JSON
- Sort by `order` field
- Link icons using Lucide React
- Responsive grid using Tailwind

### Homepage Updates

**New Section Order:**
1. Hero - Main value proposition
2. Services - Consulting services overview
3. Why 2R Labs - Why choose us
4. **Products Preview** - Featured products (3-4 cards)
5. Process - How we work
6. **Team Preview** - Leadership team or "Meet the Team" CTA
7. References - Client testimonials
8. Blog Preview - Recent blog posts
9. Contact - Contact form

**Products Preview Section:**
- Show 3-4 featured products (where `featured: true`)
- Mix of software products and consulting packages
- "View All Products" CTA button

**Team Preview Section:**
- Show 3-4 key team members (leadership/founders)
- "Meet the Full Team" CTA button → `/about`

---

## 5. Styling & Theming

### Color Scheme

**Primary Brand Color: Dark Purple**

Tailwind configuration example:

```javascript
colors: {
  brand: {
    50: '#faf5ff',   // Very light purple (backgrounds)
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',  // Mid purple (accents)
    600: '#9333ea',  // Dark purple (primary brand color)
    700: '#7e22ce',  // Darker purple (hover states)
    800: '#6b21a8',
    900: '#581c87',  // Very dark purple (text)
  }
}
```

**Supporting Colors:**
- **Neutral:** Grays for text and backgrounds (inherit from Tailwind)
- **Secondary/Accent:** Light purple or complementary color for highlights
- **Success/Info/Warning:** Standard utility colors

### Customization Tasks

1. **Branding Assets**
   - Replace logo with 2R Labs logo
   - Update favicon
   - Add brand colors to Tailwind config

2. **Visual Updates**
   - Gradient backgrounds using purple tones
   - Button styles with purple primary color
   - Link hover states in purple
   - Card borders and accents in purple
   - Navigation active states in purple

3. **Component Styling**
   - Keep testar-web's clean, professional layout
   - Reuse all shadcn/ui components (buttons, cards, badges, separators)
   - Maintain spacing and typography scale
   - Keep Framer Motion animations (adjust colors only)

### Typography
- Keep testar-web font choices
- Ensure good contrast with purple branding
- Maintain accessibility standards (WCAG AA minimum)

---

## 6. Deployment & CI/CD

### Infrastructure (Same as testar-web)

- **Host:** VPS (same server or separate directory)
- **Containerization:** Docker with Nginx
- **Automation:** GitHub Actions for CI/CD
- **Routing:** Traefik for SSL and routing
- **SSL:** Let's Encrypt via Traefik

### Deployment Configuration

```
VPS Directory: /opt/apps/2rlabs-prod
Domain: TBD (e.g., 2rlabs.com or 2rlabs.cz)
GitHub Repo: 2rlabs/2rlabs-web (or similar)
Branch: main (auto-deploy on push)
```

### GitHub Secrets Required

```
VPS_HOST = <VPS IP address>
VPS_USER = claude (or deployment user)
VPS_SSH_KEY = <SSH private key for deployment>
```

### CI/CD Pipeline

1. **Trigger:** Push to `main` branch
2. **Build:** GitHub Actions builds Docker image
3. **Deploy:** SSH to VPS, pull latest code
4. **Start:** Docker compose up (zero-downtime)
5. **Verify:** Health check endpoint

### Environment Variables

```bash
FORMSPREE_FORM_ID=<form-id>              # Contact/inquiry forms
NEXT_PUBLIC_SITE_URL=<production-url>    # SEO/metadata
NODE_ENV=production
```

### Initial Setup Steps

1. Clone testar-web deployment scripts
2. Update app name and domain references
3. Create `/opt/apps/2rlabs-prod` directory on VPS
4. Configure DNS A records
5. Set up Traefik routing rules
6. Generate SSL certificates
7. Test deployment pipeline

---

## 7. Development Workflow

### Initial Setup

1. **Clone Repository**
   ```bash
   cd /Users/mini/git
   cp -r testar-web 2rlabs-web
   cd 2rlabs-web
   ```

2. **Update Git Remote**
   ```bash
   git remote remove origin
   git remote add origin <new-2rlabs-repo-url>
   ```

3. **Clean Testar-specific Content**
   - Remove testar blog posts and case studies
   - Clear out testar-specific images
   - Update package.json name

4. **Initialize 2R Labs Branding**
   - Update Tailwind config with purple colors
   - Replace logo and favicon
   - Update company name throughout codebase

### Development Phases

#### Phase 1 - Foundation (Rebrand Existing)

**Goal:** Transform testar-web into 2R Labs branding

**Tasks:**
- [ ] Update all "Testar" references to "2R Labs"
- [ ] Apply dark purple color scheme to Tailwind config
- [ ] Replace logo and favicon
- [ ] Update navigation (add Products, About links)
- [ ] Customize homepage content:
  - [ ] Hero section
  - [ ] Services section
  - [ ] Rename WhyTestar → Why2RLabs
  - [ ] Update Process section
  - [ ] Update References
  - [ ] Update Contact form
- [ ] Configure i18n messages for 2R Labs (Czech + English)
- [ ] Update metadata (title, description, OG tags)

#### Phase 2 - New Features

**Goal:** Build Products catalog and Team page

**Tasks:**
- [ ] Create products content structure
  - [ ] `content/products/software/` directory
  - [ ] `content/products/consulting/` directory
- [ ] Build product components
  - [ ] ProductCard component
  - [ ] ProductCategory filter component
- [ ] Create products pages
  - [ ] `/products` listing page
  - [ ] `/products/[slug]` detail page
  - [ ] Category filtering logic
- [ ] Build Team/About page
  - [ ] Create `/about` page
  - [ ] TeamMemberCard component
  - [ ] Team data loader from JSON
  - [ ] Company story MDX rendering
- [ ] Add homepage sections
  - [ ] ProductsPreview component
  - [ ] TeamPreview component
  - [ ] Update homepage layout
- [ ] Create product inquiry form variant

#### Phase 3 - Content & Polish

**Goal:** Populate with initial content and refine

**Tasks:**
- [ ] Add sample products
  - [ ] 1-2 software products (en + cs)
  - [ ] 1-2 consulting packages (en + cs)
- [ ] Add team members data
  - [ ] Team member photos
  - [ ] Bios and roles (en + cs)
  - [ ] Social links
- [ ] Write company story (en + cs)
- [ ] Create sample case studies (1-2)
- [ ] Add blog posts (optional, 1-2 samples)
- [ ] Test all interactions
  - [ ] Forms submission
  - [ ] Navigation and links
  - [ ] Locale switching
  - [ ] Product filtering
- [ ] Responsive testing
  - [ ] Mobile devices
  - [ ] Tablet devices
  - [ ] Desktop sizes
- [ ] Accessibility audit
  - [ ] Keyboard navigation
  - [ ] Screen reader compatibility
  - [ ] Color contrast

#### Phase 4 - Deployment

**Goal:** Deploy to production

**Tasks:**
- [ ] Set up VPS directory structure
- [ ] Configure deployment scripts
- [ ] Set up GitHub Actions workflow
- [ ] Configure GitHub secrets
- [ ] Set up DNS records
- [ ] Configure Traefik routing
- [ ] Deploy to production
- [ ] Verify SSL certificates
- [ ] Test production deployment
- [ ] Monitor for errors

### Testing Strategy

**Local Testing:**
- Test both Czech and English locales
- Verify all internal links and navigation
- Test contact and inquiry forms
- Check mobile responsiveness
- Cross-browser testing (Chrome, Firefox, Safari)

**Content Validation:**
- All MDX files render correctly
- Images load properly
- Links are not broken
- Metadata is correct

**Performance:**
- Lighthouse score check
- Image optimization
- Bundle size analysis

**Accessibility:**
- WCAG AA compliance
- Keyboard navigation
- Screen reader testing

---

## Success Criteria

The 2R Labs website is considered complete when:

1. ✅ All sections from testar-web are customized for 2R Labs
2. ✅ Products catalog is functional with categories and individual pages
3. ✅ Team/About page displays company story and team members
4. ✅ Both Czech and English locales work correctly
5. ✅ All forms are functional and connected to Formspree
6. ✅ Dark purple branding is applied consistently
7. ✅ Site is deployed and accessible at production domain
8. ✅ SSL certificate is active
9. ✅ Responsive on mobile, tablet, and desktop
10. ✅ Lighthouse score > 90 for performance, accessibility, SEO

---

## Future Enhancements (Out of Scope)

Potential features for later iterations:

- Product demos/screenshots gallery
- Customer testimonials per product
- Newsletter subscription
- Advanced product filtering (by technology, industry)
- Product comparison tool
- Case study linking to products used
- Team member individual pages
- Careers/jobs section
- Product changelog or updates feed

---

## Notes

- This design prioritizes speed to launch by reusing proven patterns from testar-web
- Content (products, team bios, company story) will need to be written separately
- Images (logo, team photos, product screenshots) will need to be provided
- Domain name and DNS setup should be determined before deployment
- Formspree account should be set up and form IDs obtained before deployment
