// src/components/Footer/Footer.tsx
'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setMessage('Thank you for subscribing!')
        setEmail('')
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    } catch {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const quickLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/ostomy-knowledge', label: 'Knowledge Base' },
    { href: '/ostomy-news', label: 'Latest News' },
    { href: '/conferences', label: 'Conferences' },
  ]

  const shopLinks = [
    { href: '/products?category=individual-item', label: 'Care Items' },
    { href: '/products?category=care-kit', label: 'Care Kits' },
    { href: '/products?category=book', label: 'Books' },
  ]

  const socialLinks = [
    { href: 'https://www.facebook.com/share/1AgNMCnNQD/?mibextid=wwXIfr', label: 'Facebook' },
    { href: 'https://www.instagram.com/lifeafterostomy?igsh=MW1hY28waG5ldnd1eQ%3D%3D&utm_source=qr', label: 'Instagram' },
    { href: 'https://youtube.com/@lifeafterostomy?si=az-DxT4ATUFG5zAi', label: 'YouTube' },
    { href: 'https://www.tiktok.com/@life.after.ostomy?_t=ZP-8xlSMtGI1Ko&_r=1', label: 'TikTok' },
    { href: 'https://www.linkedin.com/company/life-after-ostomy/', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-foreground text-background" role="contentinfo">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & Newsletter - Spans more columns */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center mb-6 group">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-white/10 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/assets/LAOLogo_3.jpg"
                  alt="Life After Ostomy"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <span className="ml-3 font-serif text-xl font-semibold tracking-tight">
                Life After <span className="italic">Ostomy</span>
              </span>
            </Link>
            
            <p className="text-background/70 max-w-sm mb-8 leading-relaxed">
              Supporting you through every step of your ostomy journey with 
              quality care kits, educational resources, and community support.
            </p>

            {/* Newsletter */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-2">
                Stay <span className="italic">Connected</span>
              </h4>
              <p className="text-sm text-background/60 mb-4">
                Tips, resources, and community updates
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3 bg-white/10 border border-white/20 rounded-full text-sm text-background placeholder:text-background/50 focus:outline-none focus:border-white/40 transition-colors duration-300"
                  required
                  disabled={isSubmitting}
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-3 bg-white text-foreground rounded-full text-sm font-medium hover:bg-white/90 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? '...' : (
                    <>
                      Join
                      <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                    </>
                  )}
                </button>
              </form>
              {message && (
                <p className={`mt-3 text-sm ${message.includes('Thank') ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg font-semibold mb-6">Explore</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-background/70 hover:text-background transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg font-semibold mb-6">Shop</h4>
            <nav aria-label="Shop navigation">
              <ul className="space-y-3">
                {shopLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-background/70 hover:text-background transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg font-semibold mb-6">Connect</h4>
            <nav aria-label="Social media links">
              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-background/70 hover:text-background transition-colors duration-300 text-sm inline-flex items-center gap-2 group"
                      aria-label={`Visit our ${link.label} page`}
                    >
                      {link.label}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" strokeWidth={1.5} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              © {new Date().getFullYear()} Life After Ostomy. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-background/50 hover:text-background transition-colors duration-300">
                Privacy
              </Link>
              <Link href="/terms" className="text-background/50 hover:text-background transition-colors duration-300">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
