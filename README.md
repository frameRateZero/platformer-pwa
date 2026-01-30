# Cartoony Platformer PWA

A fun, cartoony platformer game built with React, Next.js, and deployed as a Progressive Web App (PWA).

## Features

- 🎮 10 challenging levels with increasing difficulty
- 📱 Mobile touch controls and keyboard support
- 🌐 Progressive Web App - installable on any device
- ⚡ Fast loading and offline support
- 🎨 Colorful, cartoony graphics
- 🏆 Level progression system

## Game Controls

### Keyboard Mode
- **Arrow Keys** or **WASD**: Move left/right and jump
- **Ctrl+I**: Toggle God Mode (invincibility + double jump)
- **Ctrl+1-9**: Quick level select (in God Mode)
- **Ctrl+← →**: Navigate levels (in God Mode)

### Mobile Mode
- Use on-screen buttons to move and jump

## Deployment to Vercel

### Prerequisites
- A GitHub account
- A Vercel account (free tier works great)

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. In your local project folder, run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

That's it! Vercel will build and deploy your app automatically.

#### Option B: Using Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

### Step 3: Configure as PWA

Your app is already configured as a PWA! Once deployed:

1. Visit your deployed URL
2. On mobile: Look for "Add to Home Screen" prompt
3. On desktop: Click the install icon in the address bar

## Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
platformer-pwa/
├── app/
│   ├── layout.tsx        # Root layout with PWA metadata
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   └── FlatPlatformer.tsx # Main game component
├── public/
│   ├── manifest.json     # PWA manifest
│   ├── service-worker.js # Service worker for offline support
│   ├── icon-192.png      # App icon (192x192)
│   └── icon-512.png      # App icon (512x512)
├── package.json
├── next.config.js
├── tsconfig.json
└── tailwind.config.js
```

## Environment Variables

No environment variables required! This is a client-side only application.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **HTML5 Canvas** - Game rendering
- **PWA** - Progressive Web App capabilities

## PWA Features

- ✅ Installable on any device
- ✅ Works offline
- ✅ Fast loading with caching
- ✅ App-like experience
- ✅ Responsive design

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - Feel free to use this project however you'd like!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check Vercel deployment logs for deployment issues

## Acknowledgments

Built with ❤️ using React and Next.js
