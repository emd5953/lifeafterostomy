// src/app/login/page.tsx
import { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'
import { Suspense } from 'react'
import { Heart, Shield, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Login | Life After Ostomy',
  description: 'Sign in to your Life After Ostomy account to access personalized recommendations, connect with the community, and track your journey.',
  openGraph: {
    title: 'Login | Life After Ostomy',
    description: 'Access your Life After Ostomy account',
    type: 'website',
  },
}

function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

const features = [
  {
    icon: Heart,
    title: 'Personalized Support',
    description: 'Get recommendations tailored to your specific needs and ostomy type.',
  },
  {
    icon: Users,
    title: 'Community Connection',
    description: 'Connect with others who understand your journey and share experiences.',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description: 'Your data is encrypted and your privacy is our top priority.',
  },
]

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-start justify-center px-4 sm:px-6 lg:px-8 pb-12">
        <div className="w-full max-w-md">
          <Suspense fallback={<LoginLoading />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>

      {/* Right side - Features (hidden on mobile) */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-emerald-50 to-teal-50 items-start justify-center px-8 pt-20 pb-12">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Welcome to Your Ostomy Community
          </h2>
          <div className="space-y-5">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-100 text-emerald-600">
                    <feature.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-10 border-t border-emerald-100">
            <blockquote className="text-gray-600 italic">
              {`"Life After Ostomy gave me the confidence and support I needed during my recovery. The community here truly understands what we go through."`}
            </blockquote>
            <div className="mt-3 text-sm text-gray-500">
              - Sarah M., Community Member
            </div>
          </div>

          {/* Links moved to right panel */}
          <div className="mt-10 pt-10 border-t border-emerald-100">
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-700 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-700 transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-700 transition-colors">
                Contact
              </Link>
            </div>
            <p className="mt-4 text-xs text-gray-400">
              © 2025 Life After Ostomy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}