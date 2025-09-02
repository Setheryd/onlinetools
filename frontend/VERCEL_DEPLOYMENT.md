# Vercel Deployment Guide

## Important: Frontend Directory is the Root

Your Vercel project is configured to use the `frontend/` directory as the root of your web application. This means:

- ✅ All paths in your code are relative to the `frontend/` directory
- ✅ Vercel will run `npm install` and `npm run build` from the `frontend/` directory
- ✅ The `.next` output directory will be created in `frontend/`
- ✅ All static files (robots.txt, manifest.json, etc.) are served from `frontend/public/`

## Configuration Files

### 1. vercel.json
- Optimizes build and deployment settings
- Sets proper headers for SEO and security
- Configures function timeouts for API routes

### 2. next.config.mjs
- Removed `externalDir: true` to prevent import issues
- Optimized for production deployment
- Headers configured for security and performance

### 3. jsconfig.json
- Path aliases configured for `@/*` pointing to `./src/*`
- Removed external directory references

## Deployment Steps

1. **Connect to Vercel**: Point your Vercel project to the `frontend/` directory
2. **Build Command**: `npm run build` (automatically set in vercel.json)
3. **Output Directory**: `.next` (automatically set in vercel.json)
4. **Install Command**: `npm install` (automatically set in vercel.json)

## File Structure Verification

```
frontend/ (← Vercel Root)
├── public/           # Static files served at root (/)
├── src/              # Source code
├── next.config.mjs   # Next.js configuration
├── vercel.json       # Vercel deployment config
├── package.json      # Dependencies and scripts
└── .next/            # Build output (created during build)
```

## SEO Configuration

- ✅ Sitemaps: `/sitemap.xml`, `/sitemap-tools.xml`, `/sitemap-index.xml`
- ✅ Robots.txt: `/robots.txt`
- ✅ Manifest: `/manifest.json`
- ✅ All paths correctly reference `https://thetool.guru`

## Troubleshooting

If you encounter issues:

1. **Build Errors**: Check that all imports use relative paths within `frontend/`
2. **Path Issues**: Verify no absolute paths reference directories outside `frontend/`
3. **Import Errors**: Ensure no `../` paths go beyond the `frontend/` boundary

## Environment Variables

Set these in your Vercel dashboard if needed:
- `NEXT_PUBLIC_SITE_URL`: `https://thetool.guru`
- `NODE_ENV`: `production` (automatically set by Vercel)
