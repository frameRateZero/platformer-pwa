import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cartoony Platformer',
  description: 'A fun platformer game - Progressive Web App',
  manifest: '/manifest.json',
  themeColor: '#111827',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Platformer',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <script src="/register-sw.js" defer></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
