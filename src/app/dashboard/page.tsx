// src/app/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  User, 
  ShoppingBag, 
  BookOpen, 
  Heart, 
  Calendar, 
  Bell,
  ArrowRight,
  Plus,
  CheckCircle
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface UserProfile {
  id: string
  email: string
  full_name: string
  username: string
  ostomy_type: string
  created_at: string
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      const profileData: UserProfile = {
        id: user.id,
        email: user.email || '',
        full_name: user.user_metadata?.full_name || '',
        username: user.user_metadata?.username || '',
        ostomy_type: user.user_metadata?.ostomy_type || '',
        created_at: user.created_at
      }
      
      setProfile(profileData)
    }
  }, [user, loading, router])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const getDaysActive = () => {
    if (!profile) return 0
    return Math.floor((Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {getGreeting()}, {profile.username ? `@${profile.username}` : profile.full_name || 'there'}!
              </h1>
              <p className="text-gray-600">Welcome to your Life After Ostomy dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <Link 
                href="/profile"
                className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-emerald-100 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-teal-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Resources Read</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-cyan-100 p-3 rounded-full">
                <Heart className="h-6 w-6 text-cyan-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Wishlist Items</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Days Active</p>
                <p className="text-2xl font-bold text-gray-900">{getDaysActive()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                  href="/products"
                  className="group flex items-center p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
                >
                  <div className="bg-emerald-100 p-3 rounded-lg mr-4 group-hover:bg-emerald-200 transition-colors">
                    <ShoppingBag className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Shop Products</h3>
                    <p className="text-sm text-gray-600">Browse care kits & supplies</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                </Link>

                <Link 
                  href="/ostomy-knowledge"
                  className="group flex items-center p-4 border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-all duration-200"
                >
                  <div className="bg-teal-100 p-3 rounded-lg mr-4 group-hover:bg-teal-200 transition-colors">
                    <BookOpen className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Learn & Explore</h3>
                    <p className="text-sm text-gray-600">Educational resources</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-teal-600 transition-colors" />
                </Link>

                <Link 
                  href="/contact"
                  className="group flex items-center p-4 border border-gray-200 rounded-lg hover:border-cyan-300 hover:bg-cyan-50 transition-all duration-200"
                >
                  <div className="bg-cyan-100 p-3 rounded-lg mr-4 group-hover:bg-cyan-200 transition-colors">
                    <User className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Get Support</h3>
                    <p className="text-sm text-gray-600">Contact our team</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-cyan-600 transition-colors" />
                </Link>

                <button className="group flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4 group-hover:bg-purple-200 transition-colors">
                    <Plus className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Add to Calendar</h3>
                    <p className="text-sm text-gray-600">Schedule reminders</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Account created successfully</p>
                    <p className="text-sm text-gray-600">Welcome to Life After Ostomy!</p>
                  </div>
                  <span className="text-xs text-gray-500">Today</span>
                </div>
                
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Your activity will appear here as you explore our platform</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Personalized Recommendations */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended for You</h3>
              {profile.ostomy_type ? (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Starter Care Kit</h4>
                    <p className="text-sm text-gray-600 mb-3">Perfect for {profile.ostomy_type} care</p>
                    <Link 
                      href={`/products?category=care-kit&ostomy=${profile.ostomy_type}`}
                      className="text-emerald-600 hover:text-emerald-800 text-sm font-medium inline-flex items-center"
                    >
                      View Products <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Educational Guide</h4>
                    <p className="text-sm text-gray-600 mb-3">Life after {profile.ostomy_type} surgery</p>
                    <Link 
                      href="/ostomy-knowledge"
                      className="text-teal-600 hover:text-teal-800 text-sm font-medium inline-flex items-center"
                    >
                      Read More <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Heart className="h-8 w-8 mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-600 mb-3 text-sm">Complete your profile to get personalized recommendations</p>
                  <Link 
                    href="/profile"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm inline-block"
                  >
                    Update Profile
                  </Link>
                </div>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-emerald-500 pl-4">
                  <p className="font-medium text-gray-900">Monthly Support Group</p>
                  <p className="text-sm text-gray-600">Tomorrow at 7:00 PM</p>
                </div>
                <div className="border-l-4 border-teal-500 pl-4">
                  <p className="font-medium text-gray-900">Nutrition Workshop</p>
                  <p className="text-sm text-gray-600">Next week</p>
                </div>
                <Link 
                  href="/conferences"
                  className="block text-center py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                >
                  View All Events
                </Link>
              </div>
            </div>

            {/* Support Resources */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Our support team is here to help you every step of the way.
              </p>
              <div className="space-y-2">
                <Link 
                  href="/contact"
                  className="block w-full bg-emerald-600 text-white text-center py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                >
                  Contact Support
                </Link>
                <Link 
                  href="/ostomy-knowledge"
                  className="block w-full border border-emerald-300 text-emerald-700 text-center py-2 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium"
                >
                  Browse FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}