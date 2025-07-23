// src/components/navigation/Navbar.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, User, Menu, X, ChevronDown, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const { user, loading, signOut } = useAuth()
  const { totalItems } = useCart()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    setIsUserDropdownOpen(false)
  }

  const handleCartClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault()
      // Redirect to login with cart as the return URL
      router.push('/login?redirectTo=/cart')
    }
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-10 w-auto mr-3">
                <Image 
                  src="/assets/LAOLogo_3.jpg" 
                  alt="Life After Ostomy Logo" 
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-emerald-700">Life After Ostomy</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              About Us
            </Link>
            
            {/* Shop Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                Shop
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isShopDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link 
                    href="/products?category=individual-item" 
                    className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    onClick={() => setIsShopDropdownOpen(false)}
                  >
                    Post Ostomy Care Items (A la Carte)
                  </Link>
                  <Link 
                    href="/products?category=care-kit" 
                    className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    onClick={() => setIsShopDropdownOpen(false)}
                  >
                    Post Ostomy Care Kits
                  </Link>
                  <Link 
                    href="/products?category=book" 
                    className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    onClick={() => setIsShopDropdownOpen(false)}
                  >
                    Life After Ostomy Books
                  </Link>
                </div>
              )}
            </div>

            <Link href="/contact" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Contact Us
            </Link>
            <Link href="/ostomy-news" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Latest Ostomy News
            </Link>
            <Link href="/ostomy-knowledge" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Ostomy Knowledge
            </Link>
            <Link href="/conferences" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Conferences
            </Link>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Icon with Item Count */}
            <Link 
              href="/cart" 
              className="relative text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
            ) : user ? (
              /* User is logged in */
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <User className="h-5 w-5 mr-1" />
                  <span className="font-medium">
                    {user.user_metadata?.username || user.user_metadata?.full_name || 'Account'}
                  </span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {isUserDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button 
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* User is not logged in */
              <Link href="/login" className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors">
                <User className="h-5 w-5 mr-1" />
                <span className="font-medium">Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              
              {/* Mobile Shop Section */}
              <div className="px-4">
                <div className="font-medium text-gray-900 mb-2">Shop</div>
                <div className="pl-4 space-y-2">
                  <Link 
                    href="/products?category=individual-item" 
                    className="block text-gray-700 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Post Ostomy Care Items (A la Carte)
                  </Link>
                  <Link 
                    href="/products?category=care-kit" 
                    className="block text-gray-700 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Post Ostomy Care Kits
                  </Link>
                  <Link 
                    href="/products?category=book" 
                    className="block text-gray-700 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Life After Ostomy Books
                  </Link>
                </div>
              </div>
              
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link 
                href="/ostomy-news" 
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Latest Ostomy News
              </Link>
              <Link 
                href="/ostomy-knowledge" 
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Ostomy Knowledge
              </Link>
              <Link 
                href="/conferences" 
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Conferences
              </Link>
              
              <div className="flex items-center space-x-4 px-4 py-2">
                {/* Mobile Cart Icon with Item Count */}
                <Link 
                  href="/cart" 
                  onClick={handleCartClick}
                  className="relative text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                      {totalItems}
                    </span>
                  )}
                </Link>
                
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <Link href="/dashboard" className="text-gray-700 hover:text-emerald-600 transition-colors">
                      Dashboard
                    </Link>
                    <Link href="/profile" className="text-gray-700 hover:text-emerald-600 transition-colors">
                      Profile
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="text-left text-red-600 hover:text-red-800 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link href="/login" className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors">
                    <User className="h-5 w-5 mr-1" />
                    <span className="font-medium">Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Overlays to close dropdowns when clicking outside */}
      {(isShopDropdownOpen || isUserDropdownOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsShopDropdownOpen(false)
            setIsUserDropdownOpen(false)
          }}
        />
      )}
    </nav>
  )
}