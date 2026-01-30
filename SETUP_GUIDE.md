# 🎮 Platformer PWA - Complete Setup Guide

## What You've Got

A complete Next.js project ready to deploy as a Progressive Web App! Your platformer game will work on any device and can be installed like a native app.

## Quick Start (5 Minutes)

### Step 1: Upload to GitHub

1. **Download** the `platformer-pwa` folder to your computer
2. Open **Terminal** (Mac/Linux) or **Command Prompt** (Windows)
3. Navigate to the folder:
   ```bash
   cd platformer-pwa
   ```

4. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it `platformer-pwa`
   - Click "Create repository" (don't add README, .gitignore, or license)

5. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Platformer PWA"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/platformer-pwa.git
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` with your GitHub username)

### Step 2: Deploy to Vercel

1. Go to **https://vercel.com**
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"**
4. Click **"Add New Project"**
5. Find and **import** `platformer-pwa`
6. Click **"Deploy"**

**Done!** Wait 2-3 minutes and your game will be live!

## What's Included

### Core Files
- **package.json** - All dependencies (Next.js, React, TypeScript, Tailwind)
- **next.config.js** - Next.js configuration
- **tsconfig.json** - TypeScript settings
- **vercel.json** - Deployment optimization

### App Structure
- **app/layout.tsx** - Root layout with PWA metadata
- **app/page.tsx** - Home page that loads the game
- **app/globals.css** - Global styles with Tailwind
- **components/FlatPlatformer.tsx** - Your platformer game!

### PWA Assets
- **public/manifest.json** - App manifest (name, icons, colors)
- **public/service-worker.js** - Enables offline play
- **public/register-sw.js** - Registers the service worker
- **public/icon-192.png** - Small app icon
- **public/icon-512.png** - Large app icon

### Documentation
- **README.md** - Full project documentation
- **DEPLOYMENT.md** - Deployment instructions
- **CHECKLIST.md** - Pre-deployment checklist
- **SETUP_GUIDE.md** - This file!

## Testing Locally (Optional)

Want to test before deploying?

1. **Install Node.js** (if you haven't already):
   - Download from https://nodejs.org (LTS version)

2. **Install dependencies:**
   ```bash
   cd platformer-pwa
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   - Go to http://localhost:3000
   - Play your game!

## Installing as PWA

Once deployed on Vercel:

### On iPhone/iPad
1. Open Safari and visit your deployed URL
2. Tap the **Share** button (box with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"**

### On Android
1. Open Chrome and visit your deployed URL
2. Tap the **menu** (three dots)
3. Tap **"Add to Home screen"**
4. Tap **"Add"**

### On Desktop (Chrome/Edge)
1. Visit your deployed URL
2. Look for the **install icon** (⊕) in the address bar
3. Click it and select **"Install"**

## Customization Ideas

### Change Colors
Edit `public/manifest.json`:
```json
"theme_color": "#7C3AED",  // Change this hex color
"background_color": "#111827"  // And this one
```

### Change App Name
Edit `public/manifest.json`:
```json
"name": "Your Game Name",
"short_name": "Game"
```

Also update `app/layout.tsx`:
```typescript
title: 'Your Game Name'
```

### Add More Levels
Edit `components/FlatPlatformer.tsx` and add to the `levels` object.

### Modify Icons
Replace `public/icon-192.png` and `public/icon-512.png` with your own images (must be PNG format, exact sizes).

## Updating Your Deployed App

Made changes? Just push to GitHub:

```bash
git add .
git commit -m "Description of changes"
git push
```

Vercel automatically redeploys! No extra steps needed.

## Troubleshooting

### "git: command not found"
Install Git: https://git-scm.com/downloads

### "npm: command not found"
Install Node.js: https://nodejs.org

### Build fails on Vercel
- Check Vercel build logs for errors
- Ensure all files are committed to GitHub
- Verify `package.json` syntax is correct

### PWA won't install
- Must be served over HTTPS (Vercel provides this)
- Check that manifest.json is accessible
- Try clearing browser cache

### Game doesn't load
- Check browser console (F12) for errors
- Verify all files uploaded to GitHub
- Ensure TypeScript compiled correctly

## File Structure Explained

```
platformer-pwa/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout + PWA setup
│   ├── page.tsx           # Home page
│   └── globals.css        # Tailwind imports
│
├── components/            
│   └── FlatPlatformer.tsx # Game logic & canvas rendering
│
├── public/                # Static assets
│   ├── manifest.json      # PWA configuration
│   ├── service-worker.js  # Offline functionality
│   ├── register-sw.js     # SW registration
│   ├── icon-192.png       # App icons
│   └── icon-512.png       
│
├── package.json           # Dependencies
├── next.config.js         # Next.js settings
├── tsconfig.json          # TypeScript config
├── tailwind.config.js     # Tailwind setup
├── vercel.json            # Deployment config
└── .gitignore             # Git ignore rules
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **HTML5 Canvas** - Game rendering
- **Service Workers** - Offline support
- **Vercel** - Hosting & deployment

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **PWA Guide**: https://web.dev/progressive-web-apps/
- **Tailwind CSS**: https://tailwindcss.com/docs

## Need Help?

1. Check the full **README.md** for detailed info
2. Review **DEPLOYMENT.md** for step-by-step deployment
3. Use **CHECKLIST.md** to verify everything is set up
4. Search for errors in browser console (F12)

---

## Summary

✅ **You have everything you need!**

1. Push to GitHub
2. Deploy on Vercel  
3. Share your game URL
4. Install as PWA on any device

**Questions?** Check the other documentation files or open an issue on GitHub.

**Happy gaming! 🎮**
