# Quick Deployment Guide

## Deploy to Vercel in 5 Minutes

### 1. Push to GitHub

```bash
# Navigate to your project folder
cd platformer-pwa

# Initialize git
git init
git add .
git commit -m "Initial commit: Platformer PWA"

# Create a new repository on GitHub, then:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/platformer-pwa.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to **https://vercel.com**
2. Click **"Sign Up"** (or **"Log In"** if you have an account)
3. Connect your GitHub account
4. Click **"Add New Project"**
5. **Import** your `platformer-pwa` repository
6. Click **"Deploy"** (Vercel auto-detects Next.js settings)

**That's it!** Your game will be live in 2-3 minutes. 🎉

### 3. Access Your PWA

Once deployed, Vercel gives you a URL like:
- `https://platformer-pwa.vercel.app`

You can also add a custom domain in Vercel settings.

### 4. Install as PWA

**On Mobile:**
- Visit your deployed URL
- Tap the browser menu
- Select "Add to Home Screen"

**On Desktop (Chrome/Edge):**
- Visit your deployed URL
- Click the install icon (⊕) in the address bar

---

## Troubleshooting

### Build Fails
- Check that all files are committed to GitHub
- Ensure `package.json` dependencies are correct
- Check Vercel build logs for specific errors

### PWA Not Installing
- Ensure you're using HTTPS (Vercel provides this automatically)
- Check that `manifest.json` and icons are accessible
- Clear browser cache and try again

### Game Not Loading
- Check browser console for errors
- Ensure TypeScript/React components compiled correctly
- Verify all imports in `FlatPlatformer.tsx` are correct

---

## Making Updates

After making changes:

```bash
git add .
git commit -m "Update: description of changes"
git push
```

Vercel automatically redeploys when you push to the main branch!

---

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

---

**Need help?** Check the full README.md for detailed information.
