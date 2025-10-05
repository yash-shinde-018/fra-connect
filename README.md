# FRA Atlas & WebGIS DSS

Forest Rights Act Atlas & WebGIS Decision Support System

## Deployment to Vercel

This application is configured for deployment to Vercel with the following settings:

1. **Build Command**: `npm run vercel-build`
2. **Output Directory**: `dist`
3. **Framework**: Vite

The `vercel-build` script handles dependency conflicts by using `--legacy-peer-deps` flag during installation.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

No environment variables are required for basic functionality.

## Project Structure

- `src/` - Source code
- `src/pages/` - Page components
- `src/components/` - Reusable components
- `src/data/demo/` - Demo GeoJSON data
- `src/lib/` - Utility functions
- `dist/` - Production build output

## Features

- Interactive map visualization with MapLibre GL
- Dashboard with role-based access (Admin, Field Officer, User)
- Claim processing workflow
- Asset mapping
- Decision support system engine
- Reporting capabilities

## Demo Credentials

- Admin: `admin` / `password`
- Field Officer: `field-officer` / `password`
- User: `user` / `password`

## Note

This is a demonstration application. All data and features shown are for demonstration purposes only. Real-world applications will have more accurate and working features.