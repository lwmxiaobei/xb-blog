import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import AppHeader from '@/components/layout/AppHeader'
import AppFooter from '@/components/layout/AppFooter'

export const metadata: Metadata = {
  title: 'Codex Pet Share — The Pixel Companion Catalog',
  description: 'Browse, share, and import animated pixel art companion pets from the Codex universe.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="min-h-screen bg-pampas flex flex-col">
          <AppHeader />
          <main className="flex-1">{children}</main>
          <AppFooter />
        </body>
      </html>
    </ClerkProvider>
  )
}
