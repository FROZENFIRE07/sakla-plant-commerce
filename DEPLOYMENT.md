# Verdant Grove — Vercel Deployment Guide

This guide walks you through deploying **Verdant Grove** to Vercel. Both **Vercel CLI** and **GitHub Integration** methods are provided.

---

## 🔑 Required Environment Variables

Before deploying, make sure you configure these 3 variables in your Vercel Project Settings:

| Variable Name | Description | Example / Recommended Value |
|---|---|---|
| `JWT_SECRET` | Secret key used to sign and verify admin session tokens. | A strong random string (e.g., `openssl rand -hex 32` or a 32+ char phrase) |
| `ADMIN_EMAIL` | Admin login email. | `admin@verdantgrove.com` |
| `ADMIN_PASSWORD` | Admin login password. | A strong custom password (default: `admin123`) |

> [!IMPORTANT]
> The `.env.local` file is in `.gitignore` and will **never** be pushed to GitHub or Vercel. You **must** set these environment variables in Vercel to allow admin login to function.

---

## Method 1: Instant Deployment via Vercel CLI (Fastest)

Since `vercel` CLI is already installed on your system, you can deploy directly from your terminal in `d:\project\Sakla_plant_commerce`:

### Step 1: Login to Vercel (if not already logged in)
```powershell
vercel login
```

### Step 2: Deploy to Preview
Run:
```powershell
vercel
```
* **Set up and deploy?** -> `Y`
* **Which scope?** -> Select your personal or team account
* **Link to existing project?** -> `N`
* **What’s your project’s name?** -> `sakla-plant-commerce` (or press Enter)
* **In which directory is your code located?** -> `./`
* Vercel will automatically detect **Next.js**. Select default settings.

### Step 3: Add Environment Variables
You can add them via CLI:
```powershell
vercel env add JWT_SECRET production
vercel env add ADMIN_EMAIL production
vercel env add ADMIN_PASSWORD production
```
*(Enter the values when prompted)*

### Step 4: Deploy to Production
```powershell
vercel --prod
```

Your website is now live! 🚀

---

## Method 2: GitHub + Vercel Dashboard (Continuous Deployment)

If you prefer automated deployments whenever you push to git:

### Step 1: Initialize Git Repository
In `d:\project\Sakla_plant_commerce`:
```powershell
git init
git add .
git commit -m "feat: initial release of Verdant Grove e-commerce and admin portal"
```

### Step 2: Push to GitHub
Create a new repository on [GitHub](https://github.com/new) (e.g. `sakla-plant-commerce`), then run:
```powershell
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/sakla-plant-commerce.git
git push -u origin main
```

### Step 3: Import into Vercel
1. Go to [vercel.com/new](https://vercel.com/new).
2. Click **Import** next to your `sakla-plant-commerce` repository.
3. In the **Configure Project** screen:
   * **Framework Preset**: Next.js (detected automatically).
   * **Root Directory**: `./`
   * Open the **Environment Variables** section and add:
     * `JWT_SECRET`: (your secure secret string)
     * `ADMIN_EMAIL`: `admin@verdantgrove.com`
     * `ADMIN_PASSWORD`: (your desired admin password)
4. Click **Deploy**.

---

## 🩺 Post-Deployment Health Check

Once Vercel gives you your production URL (e.g., `https://sakla-plant-commerce.vercel.app`):

1. **Client Storefront**:
   * Visit `https://your-domain.vercel.app/`
   * Visit `/shop` (Search, Category filters)
   * Visit `/shop/fiddle-leaf-fig` (Product detail view)
   * Visit `/services` (Services and contract inquiry)
2. **Admin Portal Security**:
   * Visit `/admin` — verify it redirects to `/admin/login`.
   * Log in with your configured `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
   * Verify the `/admin/dashboard` stats load correctly.
   * Verify `/admin/inventory` lists the plants.
