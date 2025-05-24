import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blossom - Медитації та Розвиток',
  description: 'Платформа для медитацій та особистого розвитку',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} h-full bg-gray-50 antialiased`}>
        <SessionProvider>
          <AuthProvider>
            <Header />
            <main className="min-h-screen bg-gray-50">
              {children}
            </main>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  )
} 