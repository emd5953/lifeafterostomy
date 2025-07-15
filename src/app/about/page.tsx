// src/app/about/page.tsx
import Link from 'next/link'
import { Heart, Users, Award, BookOpen, Shield, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <img 
                  src="/assets/LAOLogo_3.jpg" 
                  alt="Life After Ostomy Logo" 
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Life After Ostomy
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Empowering individuals to thrive after ostomy surgery through quality products, 
              educational resources, and compassionate support.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Life After Ostomy was founded with a simple yet powerful mission: to ensure that no one 
                  faces their ostomy journey alone. We understand that receiving an ostomy can be 
                  life-changing, and we're here to make that change as positive as possible.
                </p>
                <p>
                  Our founder's personal experience with ostomy surgery revealed a gap in comprehensive 
                  care and support. From that moment, we knew we had to create something better – a 
                  complete resource hub that provides not just products, but education, community, and hope.
                </p>
                <p>
                  Today, we serve thousands of individuals and families, helping them navigate their 
                  ostomy journey with confidence, dignity, and joy. Because life after ostomy isn't 
                  just about surviving – it's about thriving.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Founded on Experience</h3>
                <p className="text-gray-600">
                  Our journey began with personal experience, grew through community need, 
                  and continues with every person we help live their best life after ostomy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything we do is guided by our commitment to improving lives and building community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Compassionate Care</h3>
              <p className="text-gray-600">
                We understand the emotional and physical challenges of ostomy life and approach 
                every interaction with empathy and understanding.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Excellence</h3>
              <p className="text-gray-600">
                We carefully curate every product and resource to ensure the highest quality 
                and effectiveness for our community.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community First</h3>
              <p className="text-gray-600">
                Our community drives everything we do. We listen, learn, and evolve based on 
                the real needs and experiences of our members.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Education & Empowerment</h3>
              <p className="text-gray-600">
                Knowledge is power. We provide comprehensive educational resources to help 
                individuals make informed decisions about their care.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trust & Reliability</h3>
              <p className="text-gray-600">
                We build lasting relationships through consistent, reliable service and 
                transparent communication in everything we do.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Accessible Support</h3>
              <p className="text-gray-600">
                We believe quality ostomy care should be accessible to everyone, regardless 
                of location or circumstances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for every aspect of your ostomy journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-8">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Care Kits</h3>
              <p className="text-gray-600 mb-6">
                Thoughtfully curated kits containing everything you need for ostomy care, 
                organized and ready when you need them most.
              </p>
              <Link 
                href="/products?category=care-kit" 
                className="text-emerald-600 hover:text-emerald-800 font-semibold"
              >
                Shop Care Kits →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-8">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Educational Resources</h3>
              <p className="text-gray-600 mb-6">
                Books, guides, and knowledge bases covering everything from pre-surgery 
                preparation to long-term lifestyle management.
              </p>
              <Link 
                href="/ostomy-knowledge" 
                className="text-teal-600 hover:text-teal-800 font-semibold"
              >
                Explore Resources →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-8">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Support</h3>
              <p className="text-gray-600 mb-6">
                Connect with others who understand your journey through our social media 
                communities and educational events.
              </p>
              <Link 
                href="/contact" 
                className="text-cyan-600 hover:text-cyan-800 font-semibold"
              >
                Join Community →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Together, we're making a difference in the ostomy community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-300 mb-2">5,000+</div>
              <p className="text-emerald-100">Families Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-300 mb-2">50+</div>
              <p className="text-emerald-100">Educational Resources</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-300 mb-2">15,000+</div>
              <p className="text-emerald-100">Care Kits Delivered</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-300 mb-2">98%</div>
              <p className="text-emerald-100">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Whether you're preparing for surgery, newly post-op, or years into your ostomy journey, 
            we're here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
            >
              Shop Products
            </Link>
            <Link
              href="/ostomy-knowledge"
              className="border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors"
            >
              Learn More
            </Link>
            <Link
              href="/contact"
              className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-lg"
            >
              Get Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}