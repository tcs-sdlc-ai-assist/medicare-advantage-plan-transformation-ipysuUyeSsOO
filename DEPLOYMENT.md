# Medicare Advantage Demo Deployment Guide

This document describes how to deploy the Medicare Advantage Demo application, including environment variables, Vercel configuration, and CI/CD notes.

---

## Deployment Overview

- **Stack:** Vite + React + Tailwind CSS
- **Hosting:** Vercel (recommended), Netlify, or any static hosting platform
- **Build Output:** Static files in `dist/`
- **Demo Only:** No real authentication, no backend, no PHI/PII

---

## Build Steps

1. **Install dependencies:**

   ```
   npm install
   ```

2. **Build for production:**

   ```
   npm run build
   ```

   - Output will be in the `dist/` folder.

3. **Preview production build locally:**

   ```
   npm run preview
   ```

   - Opens at [http://localhost:5173](http://localhost:5173)

---

## Environment Variables

- All environment variables must be prefixed with `VITE_` for Vite to expose them to the client.
- Example: `.env.production`

  ```
  VITE_API_BASE_URL=https://api.example.com
  VITE_APP_ENV=production
  ```

- **Note:** No real API endpoints are used in this demo.

---

## Vercel Configuration

- The project includes a `vercel.json` file:

  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/" }
    ]
  }
  ```

  - Ensures client-side routing works for SPA.
  - All routes are rewritten to `index.html`.

- **Build Command:**  
  ```
  npm run build
  ```

- **Output Directory:**  
  ```
  dist
  ```

- **Static Hosting:**  
  Vercel will serve the contents of `dist/` as a static site.

---

## CI/CD Notes

- **Recommended:** Use Vercel's Git integration for automatic deployments.
- **Branch Deployments:**  
  - Each branch pushed to GitHub can trigger a preview deployment.
- **Production Deploy:**  
  - Deploy from `main` branch or as configured in Vercel dashboard.
- **No backend:**  
  - All data is static/mock. No serverless functions or API routes required.

---

## Netlify Alternative

- **Build Command:**  
  ```
  npm run build
  ```
- **Publish Directory:**  
  ```
  dist
  ```
- **Redirects:**  
  Add `_redirects` file in `public/` or `dist/`:

  ```
  /*    /index.html   200
  ```

---

## Troubleshooting

- **Routing Issues:**  
  - Ensure rewrites/redirects are configured for SPA routing.
- **Environment Variables:**  
  - Must be prefixed with `VITE_` and set in Vercel/Netlify dashboard if needed.
- **Build Errors:**  
  - Node.js >= 16 required.
  - All dependencies listed in `package.json`.

---

## Demo Disclaimer

- **Private Project:**  
  - For demonstration purposes only.
  - No real PHI/PII, authentication, or production use.
  - Do not distribute or use in production.

---

© 2024 Medicare Advantage Demo. All rights reserved.