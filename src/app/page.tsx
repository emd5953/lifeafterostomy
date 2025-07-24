// src/app/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, BookOpen, Users, Heart } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Large logo in hero */}
            <div className="flex justify-center mb-8">
              <div className="rounded-xl p-4 shadow-lg">
                <Image 
                  src="/assets/LAOLogo_3.jpg" 
                  alt="Life After Ostomy Logo" 
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Website Under Development 
              Life After Ostomy
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Complete ostomy care kits and resources to help you thrive after surgery. 
              Supporting colostomy, ileostomy, and urostomy patients with quality products and knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
              >
                Shop Care Kits
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-700 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From complete care kits to educational resources, we&apos;re here to support your journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Complete Care Kits</h3>
              <p className="text-gray-600">
                Everything you need for ostomy care in convenient, organized kits
              </p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Educational Books</h3>
              <p className="text-gray-600">
                Books about life after ostomy for all age groups
              </p>
            </div>

            <div className="text-center">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Community Support</h3>
              <p className="text-gray-600">
                Connect with others and access valuable resources
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Ongoing Care</h3>
              <p className="text-gray-600">
                Easy reordering and personalized recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Product Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-emerald-500 to-emerald-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Complete Care Kits</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive kits with everything needed for ostomy care
                </p>
                <Link
                  href="/products?category=care-kit"
                  className="text-emerald-600 hover:text-emerald-800 font-semibold inline-flex items-center"
                >
                  Shop Care Kits →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-teal-400 to-teal-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Individual Items</h3>
                <p className="text-gray-600 mb-4">
                  Individual ostomy supplies for specific needs
                </p>
                <Link
                  href="/products?category=individual-item"
                  className="text-teal-600 hover:text-teal-800 font-semibold inline-flex items-center"
                >
                  Shop Individual Items →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-cyan-400 to-cyan-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Educational Books</h3>
                <p className="text-gray-600 mb-4">
                  Books about life after ostomy for all ages
                </p>
                <Link
                  href="/products?category=book"
                  className="text-cyan-600 hover:text-cyan-800 font-semibold inline-flex items-center"
                >
                  Shop Books →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of people who trust Life After Ostomy for their care needs
          </p>
          <Link
            href="/products"
            className="bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-block shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  )
}