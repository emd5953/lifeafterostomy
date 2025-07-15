// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navigation/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Life After Ostomy - Ostomy Care Kits and Resources',
  description: 'Complete ostomy care kits and resources for colostomy, ileostomy, and urostomy. Books, knowledge, and support for life after ostomy surgery.',
  keywords: 'ostomy, colostomy, ileostomy, urostomy, ostomy care, ostomy supplies, ostomy support',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Life After Ostomy</h3>
                <p className="text-gray-300">
                  Supporting you through every step of your ostomy journey with 
                  quality care kits, educational resources, and community support.
                </p>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="/about" className="hover:text-white">About Us</a></li>
                  <li><a href="/products" className="hover:text-white">Products</a></li>
                  <li><a href="/ostomy-knowledge" className="hover:text-white">Ostomy Knowledge</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
                  <a href="#" className="text-gray-300 hover:text-white">Instagram</a>
                  <a href="#" className="text-gray-300 hover:text-white">TikTok</a>
                  <a href="#" className="text-gray-300 hover:text-white">YouTube</a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
              <p>&copy; 2025 Life After Ostomy. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}