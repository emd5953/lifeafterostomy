// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navigation/Navbar'
import { AuthProvider } from '@/contexts/AuthContext'
import Image from 'next/image'

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
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-emerald-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                  {/* Logo in footer */}
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-auto mr-3">
                      <Image 
                        src="/assets/LAOLogo_3.jpg" 
                        alt="Life After Ostomy Logo" 
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xl font-bold">Life After Ostomy</span>
                  </div>
                  <p className="text-emerald-100 max-w-md mb-6">
                    Supporting you through every step of your ostomy journey with 
                    quality care kits, educational resources, and community support.
                  </p>
                  
                  {/* Newsletter */}
                  <div>
                    <h5 className="text-md font-semibold mb-2 text-white">LAO Newsletter</h5>
                    <p className="text-sm text-emerald-100 mb-3">Stay updated with tips and resources</p>
                    <div className="flex w-100">
                      <input 
                        type="email" 
                        placeholder="Your email" 
                        className="flex-1 px-3 py-2 text-white-900 rounded-l-md text-sm"
                      />
                      <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-r-md text-xs font-medium transition-colors">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                  <ul className="space-y-3 text-emerald-100">
                    <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                    <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                    <li><a href="/ostomy-knowledge" className="hover:text-white transition-colors">Ostomy Knowledge</a></li>
                    <li><a href="/ostomy-news" className="hover:text-white transition-colors">Latest Ostomy News</a></li>
                    <li><a href="/conferences" className="hover:text-white transition-colors">Conferences</a></li>
                  </ul>
                  
                  <h4 className="text-lg font-semibold mb-4 mt-6 text-white">Shop</h4>
                  <ul className="space-y-3 text-emerald-100">
                    <li><a href="/products?category=individual-item" className="hover:text-white transition-colors">Post Ostomy Care Items</a></li>
                    <li><a href="/products?category=care-kit" className="hover:text-white transition-colors">Post Ostomy Care Kits</a></li>
                    <li><a href="/products?category=book" className="hover:text-white transition-colors">Life After Ostomy Books</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">Connect With Us</h4>
                  <div className="space-y-3 text-emerald-100">
                    <div>
                      <a 
                        href="https://www.facebook.com/share/1AgNMCnNQD/?mibextid=wwXIfr" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        Facebook
                      </a>
                    </div>
                    <div>
                      <a 
                        href="https://www.instagram.com/lifeafterostomy?igsh=MW1hY28waG5ldnd1eQ%3D%3D&utm_source=qr" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        Instagram
                      </a>
                    </div>
                    <div>
                      <a 
                        href="https://youtube.com/@lifeafterostomy?si=az-DxT4ATUFG5zAi" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        YouTube
                      </a>
                    </div>
                    <div>
                      <a 
                        href="https://www.tiktok.com/@life.after.ostomy?_t=ZP-8xlSMtGI1Ko&_r=1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        TikTok
                      </a>
                    </div>
                    <div>
                      <a 
                        href="https://www.linkedin.com/company/life-after-ostomy/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-emerald-800 text-center text-emerald-200">
                <p>&copy; 2025 Life After Ostomy. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}