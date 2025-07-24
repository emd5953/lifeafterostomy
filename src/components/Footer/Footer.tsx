// src/components/Footer/Footer.tsx
'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      // TODO: Replace with your actual newsletter API endpoint
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setMessage('Thank you for subscribing!')
        setEmail('')
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-emerald-900 text-white py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
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

            <div>
              <h5 className="text-md font-semibold mb-2 text-white">
                LAO Newsletter
              </h5>
              <p className="text-sm text-emerald-100 mb-3">
                Stay updated with tips and resources
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex w-full max-w-sm"
              >
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-gray-900 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                  disabled={isSubmitting}
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-r-md text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              {message && (
                <p
                  className={`mt-2 text-sm ${
                    message.includes('Thank you')
                      ? 'text-emerald-300'
                      : 'text-red-300'
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3 text-emerald-100">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ostomy-knowledge"
                    className="hover:text-white transition-colors"
                  >
                    Ostomy Knowledge
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ostomy-news"
                    className="hover:text-white transition-colors"
                  >
                    Latest Ostomy News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/conferences"
                    className="hover:text-white transition-colors"
                  >
                    Conferences
                  </Link>
                </li>
              </ul>
            </nav>

            <h4 className="text-lg font-semibold mb-4 mt-6 text-white">Shop</h4>
            <nav aria-label="Shop navigation">
              <ul className="space-y-3 text-emerald-100">
                <li>
                  <Link
                    href="/products?category=individual-item"
                    className="hover:text-white transition-colors"
                  >
                    Post Ostomy Care Items
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=care-kit"
                    className="hover:text-white transition-colors"
                  >
                    Post Ostomy Care Kits
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=book"
                    className="hover:text-white transition-colors"
                  >
                    Life After Ostomy Books
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Connect With Us
            </h4>
            <nav aria-label="Social media links">
              <div className="space-y-3 text-emerald-100">
                <div>
                  <a
                    href="https://www.facebook.com/share/1AgNMCnNQD/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center"
                    aria-label="Visit our Facebook page"
                  >
                    Facebook
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.instagram.com/lifeafterostomy?igsh=MW1hY28waG5ldnd1eQ%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center"
                    aria-label="Visit our Instagram page"
                  >
                    Instagram
                  </a>
                </div>
                <div>
                  <a
                    href="https://youtube.com/@lifeafterostomy?si=az-DxT4ATUFG5zAi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center"
                    aria-label="Visit our YouTube channel"
                  >
                    YouTube
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.tiktok.com/@life.after.ostomy?_t=ZP-8xlSMtGI1Ko&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center"
                    aria-label="Visit our TikTok page"
                  >
                    TikTok
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.linkedin.com/company/life-after-ostomy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center"
                    aria-label="Visit our LinkedIn page"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-emerald-800 text-center text-emerald-200">
          <p>&copy; 2025 Life After Ostomy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}