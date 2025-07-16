// src/app/profile/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { User, Mail, Calendar, Heart, ShoppingBag, BookOpen, LogOut, Edit2, Save, X } from 'lucide-react'

interface UserProfile {
  id: string
  email: string
  full_name: string
  username: string
  ostomy_type: string
  created_at: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    full_name: '',
    username: '',
    ostomy_type: ''
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const checkUser = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }
      
      // Get additional profile data from user metadata and database
      let profileData: UserProfile = {
        id: user.id,
        email: user.email || '',
        full_name: user.user_metadata?.full_name || '',
        username: user.user_metadata?.username || '',
        ostomy_type: user.user_metadata?.ostomy_type || '',
        created_at: user.created_at
      }

      // Try to get profile from database for more complete data
      try {
        const { data: dbProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (dbProfile) {
          profileData = {
            ...profileData,
            username: dbProfile.username || profileData.username,
            full_name: dbProfile.full_name || profileData.full_name,
            ostomy_type: dbProfile.ostomy_type || profileData.ostomy_type
          }
        }
      } catch {
        console.log('No profile found in database, using metadata')
      }
      
      setProfile(profileData)
      setEditData({
        full_name: profileData.full_name,
        username: profileData.username,
        ostomy_type: profileData.ostomy_type
      })
    } catch (userError) {
      console.error('Error fetching user:', userError)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    checkUser()
  }, [checkUser])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (signOutError) {
      console.error('Error signing out:', signOutError)
    }
  }

  const checkUsernameAvailability = async (username: string, currentUsername: string) => {
    if (!username || username.length < 3) return false
    if (username === currentUsername) return true // Same username is okay
    
    try {
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single()

      // If no data found, username is available
      return !data
    } catch {
      // If error (no matching record), username is available
      return true
    }
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    setMessage('')

    try {
      // Validate username
      if (editData.username && editData.username.length < 3) {
        throw new Error('Username must be at least 3 characters long')
      }

      // Validate username format
      if (editData.username) {
        const usernameRegex = /^[a-zA-Z0-9_]+$/
        if (!usernameRegex.test(editData.username)) {
          throw new Error('Username can only contain letters, numbers, and underscores')
        }

        // Check if username is available
        const isAvailable = await checkUsernameAvailability(editData.username, profile?.username || '')
        if (!isAvailable) {
          throw new Error('Username is already taken. Please choose a different one.')
        }
      }

      // Update auth metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: editData.full_name,
          username: editData.username,
          ostomy_type: editData.ostomy_type
        }
      })

      if (authError) throw authError

      // Update or insert profile in database
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: profile!.id,
          username: editData.username,
          full_name: editData.full_name,
          ostomy_type: editData.ostomy_type,
          email: profile!.email
        })

      if (profileError) throw profileError

      // Update local state
      if (profile) {
        setProfile({
          ...profile,
          full_name: editData.full_name,
          username: editData.username,
          ostomy_type: editData.ostomy_type
        })
      }

      setIsEditing(false)
      setMessage('Profile updated successfully!')
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000)
    } catch (saveError: unknown) {
      const errorMessage = saveError instanceof Error ? saveError.message : 'An error occurred'
      setMessage(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Unable to load profile. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 mr-6">
                <User className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {profile.full_name || 'Welcome'}
                </h1>
                <p className="text-emerald-100">
                  Member since {formatDate(profile.created_at)}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-emerald-600 hover:text-emerald-800 flex items-center transition-colors"
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="bg-emerald-600 text-white px-3 py-1 rounded-lg hover:bg-emerald-700 flex items-center transition-colors disabled:opacity-50"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false)
                        setEditData({
                          full_name: profile.full_name,
                          username: profile.username,
                          ostomy_type: profile.ostomy_type
                        })
                      }}
                      className="text-gray-600 hover:text-gray-800 flex items-center transition-colors"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {message && (
                <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-600 px-4 py-3 rounded-lg">
                  {message}
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <p className="text-gray-900">{profile.email}</p>
                    <p className="text-xs text-gray-500">Email cannot be changed here</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    {isEditing ? (
                      <div>
                        <input
                          type="text"
                          value={editData.username}
                          onChange={(e) => setEditData(prev => ({ 
                            ...prev, 
                            username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') 
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Choose a unique username"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          3+ characters, letters, numbers, and underscores only
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-900">
                        {profile.username ? `@${profile.username}` : 'No username set'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.full_name}
                        onChange={(e) => setEditData(prev => ({ ...prev, full_name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.full_name || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <Heart className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ostomy Type</label>
                    {isEditing ? (
                      <select
                        value={editData.ostomy_type}
                        onChange={(e) => setEditData(prev => ({ ...prev, ostomy_type: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="">Select your ostomy type</option>
                        <option value="colostomy">Colostomy</option>
                        <option value="ileostomy">Ileostomy</option>
                        <option value="urostomy">Urostomy</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 capitalize">{profile.ostomy_type || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Member Since</label>
                    <p className="text-gray-900">{formatDate(profile.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Change Email</p>
                      <p className="text-sm text-gray-500">Update your email address</p>
                    </div>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Change Password</p>
                      <p className="text-sm text-gray-500">Update your password</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ShoppingBag className="h-5 w-5 text-emerald-600 mr-2" />
                    <span className="text-gray-600">Orders</span>
                  </div>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-teal-600 mr-2" />
                    <span className="text-gray-600">Resources Viewed</span>
                  </div>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-gray-600">Wishlist Items</span>
                  </div>
                  <span className="font-semibold">0</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => router.push('/products')}
                  className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Shop Products
                </button>
                <button 
                  onClick={() => router.push('/ostomy-knowledge')}
                  className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Browse Resources
                </button>
                <button 
                  onClick={() => router.push('/contact')}
                  className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}