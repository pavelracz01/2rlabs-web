# Deployment Guide

## Prerequisites

- VPS with Docker and Docker Compose installed
- Traefik reverse proxy configured
- Domain DNS pointing to VPS
- GitHub repository set up

## Initial VPS Setup

### 1. SSH to VPS

```bash
ssh claude@<VPS_IP>
```

### 2. Create app directory

```bash
sudo mkdir -p /opt/apps/2rlabs-prod
sudo chown $USER:$USER /opt/apps/2rlabs-prod
cd /opt/apps/2rlabs-prod
```

### 3. Clone repository

```bash
git clone <REPO_URL> .
```

### 4. Initial deploy

```bash
docker-compose up -d --build
```

## GitHub Setup

### Required Secrets

Set these in GitHub repository Settings → Secrets and variables → Actions:

- `VPS_HOST` = VPS IP address
- `VPS_USER` = SSH username (e.g., `claude`)
- `VPS_SSH_KEY` = SSH private key for deployment

### SSH Key Setup

On VPS:

```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github_actions  # Copy this to GitHub secret VPS_SSH_KEY
```

## DNS Configuration

Set A record:

```
2rlabs.com -> <VPS_IP>
www.2rlabs.com -> <VPS_IP>
```

## SSL Certificate

Traefik will automatically obtain Let's Encrypt certificate when:
- DNS is configured correctly
- Traefik is running with Let's Encrypt configuration
- Domain is accessible

## Environment Variables

Create `.env` file in `/opt/apps/2rlabs-prod`:

```
FORMSPREE_FORM_ID=your_form_id_here
NEXT_PUBLIC_SITE_URL=https://2rlabs.com
```

## Deployment Process

1. Push to `main` branch
2. GitHub Actions triggers
3. SSH to VPS
4. Pull latest code
5. Rebuild and restart containers
6. Cleanup old images

## Manual Deployment

If needed:

```bash
ssh claude@<VPS_IP>
cd /opt/apps/2rlabs-prod
git pull origin main
docker-compose down
docker-compose up -d --build
```

## Monitoring

Check logs:

```bash
docker-compose logs -f
```

Check status:

```bash
docker-compose ps
```

## Troubleshooting

**Container won't start:**
```bash
docker-compose logs
```

**SSL not working:**
- Verify DNS is correct
- Check Traefik logs
- Ensure port 80 and 443 are open

**Build fails:**
- Check Node version in Dockerfile
- Verify all dependencies are listed in package.json
```
