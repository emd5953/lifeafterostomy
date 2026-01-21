// src/components/navigation/Navbar.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, User, Menu, X, ChevronDown, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, loading, signOut } = useAuth()
  const { totalItems } = useCart()
  const router = useRouter()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setIsUserDropdownOpen(false)
  }

  const handleCartClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault()
      router.push('/login?redirectTo=/cart')
    }
  }

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/news', label: 'News' },
    { href: '/knowledge', label: 'Knowledge' },
    { href: '/conferences', label: 'Conferences' },
  ]

  const shopLinks = [
    { href: '/products?category=individual-item', label: 'Care Items' },
    { href: '/products?category=care-kit', label: 'Care Kits' },
    { href: '/products?category=book', label: 'Books' },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-sm' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="h-12 w-12 rounded-full overflow-hidden transition-transform duration-500 group-hover:scale-105">
              <Image 
                src="/assets/LAOLogo_3.jpg" 
                alt="Life After Ostomy" 
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <span className="ml-3 font-serif text-xl font-semibold text-foreground tracking-tight">
              Life After <span className="italic">Ostomy</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Shop Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                className="flex items-center px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300"
              >
                Shop
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isShopDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isShopDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-3xl shadow-lg border border-gray-200 py-3 z-50 animate-fade-up">
                  {shopLinks.map((link) => (
                    <Link 
                      key={link.href}
                      href={link.href}
                      className="block px-5 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
                      onClick={() => setIsShopDropdownOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Cart */}
            <Link 
              href="/cart"
              onClick={handleCartClick}
              className="relative p-2.5 rounded-full hover:bg-muted transition-colors duration-300"
            >
              <ShoppingCart className="h-5 w-5 text-foreground/80" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-foreground text-background text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-full hover:bg-muted transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-4 w-4 text-foreground/60" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-foreground/80">
                    {user.user_metadata?.username || 'Account'}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-foreground/60 transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isUserDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-3xl shadow-lg border border-gray-200 py-3 z-50 animate-fade-up">
                    <Link 
                      href="/dashboard" 
                      className="block px-5 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/profile" 
                      className="block px-5 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <div className="my-2 border-t border-gray-200" />
                    <button 
                      onClick={handleSignOut}
                      className="w-full text-left px-5 py-2.5 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" strokeWidth={1.5} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/login" 
                className="btn-botanical text-xs py-2.5 px-5"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2.5 rounded-full hover:bg-muted transition-colors duration-300"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" strokeWidth={1.5} />
            ) : (
              <Menu className="h-6 w-6 text-foreground" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-30 animate-fade-up">
          <div className="px-6 py-8 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-lg font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 border-b border-border-subtle"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Shop Section */}
            <div className="py-3 border-b border-border-subtle">
              <p className="font-serif text-lg font-semibold text-foreground mb-3">Shop</p>
              <div className="pl-4 space-y-2">
                {shopLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 text-foreground/70 hover:text-foreground transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-6 space-y-4">
              <Link
                href="/cart"
                onClick={(e) => {
                  handleCartClick(e)
                  setIsMenuOpen(false)
                }}
                className="flex items-center justify-between py-3 text-lg font-medium text-foreground/80"
              >
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="bg-foreground text-background text-sm font-medium rounded-full h-6 w-6 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              {user ? (
                <div className="space-y-2">
                  <Link 
                    href="/dashboard" 
                    className="block py-3 text-lg font-medium text-foreground/80 hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/profile" 
                    className="block py-3 text-lg font-medium text-foreground/80 hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={() => {
                      handleSignOut()
                      setIsMenuOpen(false)
                    }}
                    className="w-full text-left py-3 text-lg font-medium text-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login"
                  className="btn-botanical w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Dropdown Overlay */}
      {(isShopDropdownOpen || isUserDropdownOpen) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setIsShopDropdownOpen(false)
            setIsUserDropdownOpen(false)
          }}
        />
      )}
    </nav>
  )
}
