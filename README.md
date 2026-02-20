# Testar Consulting Website

Marketing website for Testar Consulting at [testarconsulting.cz](https://testarconsulting.cz).

## Stack

- Next.js 16 + TypeScript + Tailwind CSS v4
- next-intl (CS + EN)
- framer-motion
- MDX blog + case studies
- Docker + Nginx + Traefik

## Local Development

```bash
npm install
npm run dev
```

## Deployment

Automatic via GitHub Actions on push to `main`.

### First-time VPS setup

1. SSH to VPS: `ssh claude@46.36.38.188`
2. Create app directory: `mkdir -p /opt/apps/testar-prod`
3. Add GitHub deploy key to repo (Settings → Deploy keys)
4. Set DNS A record: `testarconsulting.cz` → `46.36.38.188`

### GitHub Secrets required

- `VPS_HOST` = `46.36.38.188`
- `VPS_USER` = `claude`
- `VPS_SSH_KEY` = contents of `~claude/.ssh/github_actions` on VPS

### Contact Form

Sign up at [formspree.io](https://formspree.io), create a form for `info@testarconsulting.cz`, get the form ID, then replace `YOUR_FORM_ID` in `components/sections/Contact.tsx`.
