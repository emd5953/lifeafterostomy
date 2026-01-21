// src/app/layout.tsx
import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/Footer/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'
import { Analytics } from '@vercel/analytics/next'

// Botanical Design System Fonts
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans',
  weight: ['300', '400', '500', '600'],
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
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} light`} style={{ colorScheme: 'light' }}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {/* Paper Grain Texture Overlay - Critical for Botanical Feel */}
        <div
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen bg-white">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
