# Quick Reference Card

## Essential Commands

### First Time Setup
```bash
# Navigate to project
cd platformer-pwa

# Install dependencies
npm install

# Run locally
npm run dev
```

### Git Commands
```bash
# Initialize repository
git init

# Stage all files
git add .

# Commit changes
git commit -m "your message here"

# Set main branch
git branch -M main

# Add remote repository
git remote add origin https://github.com/USERNAME/REPO.git

# Push to GitHub
git push -u origin main
```

### After Making Changes
```bash
git add .
git commit -m "describe your changes"
git push
```

### Development
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Check for errors
npm run lint
```

## Vercel CLI (Optional)
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## File Locations

| What | Where |
|------|-------|
| Game code | `components/FlatPlatformer.tsx` |
| PWA settings | `public/manifest.json` |
| App icons | `public/icon-*.png` |
| Styles | `app/globals.css` |
| Layout | `app/layout.tsx` |
| Config | `next.config.js` |

## URLs

- **Local dev**: http://localhost:3000
- **Vercel dashboard**: https://vercel.com/dashboard
- **GitHub**: https://github.com
- **Create repo**: https://github.com/new

## Need Help?

1. **SETUP_GUIDE.md** - Complete setup instructions
2. **DEPLOYMENT.md** - Deployment walkthrough  
3. **README.md** - Full documentation
4. **CHECKLIST.md** - Pre-deployment checklist

## Common Issues

**Problem**: `npm: command not found`  
**Solution**: Install Node.js from https://nodejs.org

**Problem**: `git: command not found`  
**Solution**: Install Git from https://git-scm.com

**Problem**: Build fails on Vercel  
**Solution**: Check build logs in Vercel dashboard

**Problem**: PWA won't install  
**Solution**: Must use HTTPS (Vercel provides this automatically)

---

**Keep this card handy for quick reference!**
