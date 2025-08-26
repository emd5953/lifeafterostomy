// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/Footer/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'
import { Analytics } from '@vercel/analytics/next'

// Initialize the Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
    'http://localhost:3000'
  ),
  title: 'Life After Ostomy - Ostomy Care Kits and Resources',
  description:
    'Complete ostomy care kits and resources for colostomy, ileostomy, and urostomy. Books, knowledge, and support for life after ostomy surgery.',
  keywords:
    'ostomy, colostomy, ileostomy, urostomy, ostomy care, ostomy supplies, ostomy support',
  openGraph: {
    title: 'Life After Ostomy',
    description: 'Supporting you through every step of your ostomy journey',
    type: 'website',
    siteName: 'Life After Ostomy',
    images: [
      {
        url: '/assets/LAOLogo_3.jpg',
        width: 1200,
        height: 630,
        alt: 'Life After Ostomy Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life After Ostomy',
    description: 'Supporting you through every step of your ostomy journey',
    images: ['/assets/LAOLogo_3.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}