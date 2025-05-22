import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import UpdateNotification from '@/components/UpdateNotification'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#8B4513',
}

export const metadata: Metadata = {
  title: 'BLOSSOM - Медитації та духовні практики',
  description: 'Платформа для медитацій та духовного розвитку',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'BLOSSOM',
  },
  other: {
    'msapplication-TileColor': '#8B4513',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#8B4513" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful');
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <AuthProvider>
        <Navigation />
        <main className="min-h-[calc(100vh-4rem)] pt-16">
          {children}
        </main>
        <UpdateNotification />
        </AuthProvider>
      </body>
    </html>
  )
} 