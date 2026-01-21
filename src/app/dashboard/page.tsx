// src/app/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, ShoppingBag, BookOpen, Heart, Calendar, Bell, ArrowRight, CheckCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface UserProfile { id: string; email: string; full_name: string; username: string; ostomy_type: string; created_at: string }

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) { router.push('/login'); return }
    if (user) {
      setProfile({ id: user.id, email: user.email || '', full_name: user.user_metadata?.full_name || '', username: user.user_metadata?.username || '', ostomy_type: user.user_metadata?.ostomy_type || '', created_at: user.created_at })
    }
  }, [user, loading, router])

  const getGreeting = () => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening' }
  const getDaysActive = () => profile ? Math.floor((Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24)) : 0

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-2 border-foreground/20 border-t-foreground animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile) return <div className="min-h-screen pt-20 flex items-center justify-center"><p className="text-foreground/60">Redirecting...</p></div>

  const stats = [
    { icon: ShoppingBag, label: 'Orders', value: '0', color: 'bg-muted' },
    { icon: BookOpen, label: 'Resources', value: '3', color: 'bg-muted' },
    { icon: Heart, label: 'Wishlist', value: '0', color: 'bg-muted' },
    { icon: Calendar, label: 'Days Active', value: getDaysActive().toString(), color: 'bg-muted' },
  ]

  const quickActions = [
    { href: '/products', icon: ShoppingBag, title: 'Shop Products', desc: 'Browse care kits & supplies' },
    { href: '/ostomy-knowledge', icon: BookOpen, title: 'Learn & Explore', desc: 'Educational resources' },
    { href: '/contact', icon: User, title: 'Get Support', desc: 'Contact our team' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-semibold">
                {getGreeting()}, <span className="italic">{profile.username ? `@${profile.username}` : profile.full_name || 'there'}</span>
              </h1>
              <p className="text-foreground/60 mt-1">Welcome to your dashboard</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-3 rounded-full hover:bg-muted transition-colors duration-300">
                <Bell className="h-5 w-5 text-foreground/60" strokeWidth={1.5} />
                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
              </button>
              <Link href="/profile" className="btn-botanical py-2.5 px-5 text-xs">
                <User className="h-4 w-4 mr-2" strokeWidth={1.5} />Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="card-botanical p-6">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center mr-4`}>
                  <stat.icon className="h-5 w-5 text-foreground/60" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-foreground/50">{stat.label}</p>
                  <p className="font-serif text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="card-botanical p-6">
              <h2 className="font-serif text-xl font-semibold mb-6">Quick <span className="italic">Actions</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.href} href={action.href} className="group p-5 rounded-2xl border border-border hover:border-foreground/20 hover:bg-muted transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-muted group-hover:bg-background flex items-center justify-center mb-4 transition-colors duration-300">
                      <action.icon className="h-5 w-5 text-foreground/60" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold mb-1">{action.title}</h3>
                    <p className="text-sm text-foreground/50">{action.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card-botanical p-6">
              <h2 className="font-serif text-xl font-semibold mb-6">Recent <span className="italic">Activity</span></h2>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-muted rounded-2xl">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-4 flex-shrink-0" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="font-medium">Account created successfully</p>
                    <p className="text-sm text-foreground/50">Welcome to Life After Ostomy!</p>
                  </div>
                  <span className="text-xs text-foreground/40">Today</span>
                </div>
                <div className="text-center py-8">
                  <BookOpen className="h-10 w-10 mx-auto mb-3 text-foreground/20" strokeWidth={1.5} />
                  <p className="text-foreground/50">Your activity will appear here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recommendations */}
            <div className="card-botanical p-6">
              <h3 className="font-serif text-lg font-semibold mb-4">Recommended</h3>
              {profile.ostomy_type ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border border-border">
                    <h4 className="font-semibold mb-1">Starter Care Kit</h4>
                    <p className="text-sm text-foreground/50 mb-3">Perfect for {profile.ostomy_type} care</p>
                    <Link href={`/products?category=care-kit&ostomy=${profile.ostomy_type}`} className="inline-flex items-center text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300">
                      View <ArrowRight className="h-3 w-3 ml-1" strokeWidth={1.5} />
                    </Link>
                  </div>
                  <div className="p-4 rounded-2xl border border-border">
                    <h4 className="font-semibold mb-1">Educational Guide</h4>
                    <p className="text-sm text-foreground/50 mb-3">Life after {profile.ostomy_type} surgery</p>
                    <Link href="/ostomy-knowledge" className="inline-flex items-center text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300">
                      Read <ArrowRight className="h-3 w-3 ml-1" strokeWidth={1.5} />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Heart className="h-8 w-8 mx-auto mb-3 text-foreground/20" strokeWidth={1.5} />
                  <p className="text-foreground/50 text-sm mb-4">Complete your profile for personalized recommendations</p>
                  <Link href="/profile" className="btn-botanical py-2 px-4 text-xs">Update Profile</Link>
                </div>
              )}
            </div>

            {/* Events */}
            <div className="card-botanical p-6">
              <h3 className="font-serif text-lg font-semibold mb-4">Upcoming</h3>
              <div className="space-y-3">
                <div className="border-l-2 border-foreground/20 pl-4">
                  <p className="font-medium">Monthly Support Group</p>
                  <p className="text-sm text-foreground/50">Tomorrow at 7:00 PM</p>
                </div>
                <div className="border-l-2 border-foreground/20 pl-4">
                  <p className="font-medium">Nutrition Workshop</p>
                  <p className="text-sm text-foreground/50">Next week</p>
                </div>
                <Link href="/conferences" className="block text-center py-3 rounded-full border border-border hover:bg-muted transition-colors duration-300 text-sm">
                  View All Events
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="card-botanical p-6 bg-muted border-0">
              <h3 className="font-serif text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-foreground/60 text-sm mb-4">Our team is here to support you.</p>
              <div className="space-y-2">
                <Link href="/contact" className="block w-full btn-botanical py-3 text-center text-xs">Contact Support</Link>
                <Link href="/ostomy-knowledge" className="block w-full btn-botanical-outline py-3 text-center text-xs">Browse FAQ</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
