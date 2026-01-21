// src/app/profile/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { User, Mail, Calendar, Heart, ShoppingBag, BookOpen, LogOut, Edit2, Save, X } from 'lucide-react'
import type { Profile } from '@/types/database'

interface UserProfile { id: string; email: string; full_name: string; username: string; ostomy_type: string; created_at: string }

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ full_name: '', username: '', ostomy_type: '' })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const checkUser = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      
      let profileData: UserProfile = { id: user.id, email: user.email || '', full_name: user.user_metadata?.full_name || '', username: user.user_metadata?.username || '', ostomy_type: user.user_metadata?.ostomy_type || '', created_at: user.created_at }
      
      try {
        const { data: dbProfile } = await supabase.from('profiles').select('*').eq('id', user.id).single() as { data: Profile | null }
        if (dbProfile) profileData = { ...profileData, username: dbProfile.username || profileData.username, full_name: dbProfile.full_name || profileData.full_name, ostomy_type: dbProfile.ostomy_type || profileData.ostomy_type }
      } catch { /* use metadata */ }
      
      setProfile(profileData)
      setEditData({ full_name: profileData.full_name, username: profileData.username, ostomy_type: profileData.ostomy_type })
    } catch { /* error */ }
    finally { setLoading(false) }
  }, [router])

  useEffect(() => { checkUser() }, [checkUser])

  const handleSignOut = async () => { await supabase.auth.signOut(); router.push('/') }

  const handleSaveProfile = async () => {
    setSaving(true); setMessage('')
    try {
      if (editData.username && editData.username.length < 3) throw new Error('Username must be at least 3 characters')
      if (editData.username && !/^[a-zA-Z0-9_]+$/.test(editData.username)) throw new Error('Invalid username format')
      
      const { error: authError } = await supabase.auth.updateUser({ data: { full_name: editData.full_name, username: editData.username, ostomy_type: editData.ostomy_type } })
      if (authError) throw authError
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from('profiles') as any).upsert({ id: profile!.id, username: editData.username, full_name: editData.full_name, ostomy_type: editData.ostomy_type, email: profile!.email })
      
      if (profile) setProfile({ ...profile, ...editData })
      setIsEditing(false)
      setMessage('Profile updated!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) { setMessage(err instanceof Error ? err.message : 'Error') }
    finally { setSaving(false) }
  }

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-2 border-foreground/20 border-t-foreground animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) return <div className="min-h-screen pt-20 flex items-center justify-center"><p className="text-foreground/60">Unable to load profile.</p></div>

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-background/10 flex items-center justify-center mr-6">
                <User className="h-8 w-8 text-background/80" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="font-serif text-3xl font-semibold">{profile.full_name || 'Welcome'}</h1>
                <p className="text-background/60">Member since {formatDate(profile.created_at)}</p>
              </div>
            </div>
            <button onClick={handleSignOut} className="px-4 py-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors duration-300 flex items-center text-sm">
              <LogOut className="h-4 w-4 mr-2" strokeWidth={1.5} />Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="card-botanical p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-semibold">Profile <span className="italic">Information</span></h2>
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="text-foreground/60 hover:text-foreground flex items-center text-sm transition-colors duration-300">
                    <Edit2 className="h-4 w-4 mr-1" strokeWidth={1.5} />Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={handleSaveProfile} disabled={saving} className="btn-botanical py-2 px-4 text-xs"><Save className="h-3 w-3 mr-1" strokeWidth={1.5} />{saving ? '...' : 'Save'}</button>
                    <button onClick={() => { setIsEditing(false); setEditData({ full_name: profile.full_name, username: profile.username, ostomy_type: profile.ostomy_type }) }} className="btn-botanical-outline py-2 px-4 text-xs"><X className="h-3 w-3 mr-1" strokeWidth={1.5} />Cancel</button>
                  </div>
                )}
              </div>

              {message && <div className="mb-6 p-4 rounded-2xl bg-green-50 text-green-600 text-sm">{message}</div>}

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-foreground/40 mr-4 mt-0.5" strokeWidth={1.5} />
                  <div><label className="block text-sm text-foreground/50 mb-1">Email</label><p>{profile.email}</p><p className="text-xs text-foreground/40 mt-1">Cannot be changed here</p></div>
                </div>
                <div className="flex items-start">
                  <User className="h-5 w-5 text-foreground/40 mr-4 mt-0.5" strokeWidth={1.5} />
                  <div className="flex-1"><label className="block text-sm text-foreground/50 mb-1">Username</label>
                    {isEditing ? <input type="text" value={editData.username} onChange={(e) => setEditData(p => ({ ...p, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') }))} className="input-botanical" /> : <p>{profile.username ? `@${profile.username}` : 'Not set'}</p>}
                  </div>
                </div>
                <div className="flex items-start">
                  <User className="h-5 w-5 text-foreground/40 mr-4 mt-0.5" strokeWidth={1.5} />
                  <div className="flex-1"><label className="block text-sm text-foreground/50 mb-1">Full Name</label>
                    {isEditing ? <input type="text" value={editData.full_name} onChange={(e) => setEditData(p => ({ ...p, full_name: e.target.value }))} className="input-botanical" /> : <p>{profile.full_name || 'Not provided'}</p>}
                  </div>
                </div>
                <div className="flex items-start">
                  <Heart className="h-5 w-5 text-foreground/40 mr-4 mt-0.5" strokeWidth={1.5} />
                  <div className="flex-1"><label className="block text-sm text-foreground/50 mb-1">Ostomy Type</label>
                    {isEditing ? (
                      <select value={editData.ostomy_type} onChange={(e) => setEditData(p => ({ ...p, ostomy_type: e.target.value }))} className="input-botanical">
                        <option value="">Select type</option>
                        <option value="colostomy">Colostomy</option>
                        <option value="ileostomy">Ileostomy</option>
                        <option value="urostomy">Urostomy</option>
                      </select>
                    ) : <p className="capitalize">{profile.ostomy_type || 'Not provided'}</p>}
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-foreground/40 mr-4 mt-0.5" strokeWidth={1.5} />
                  <div><label className="block text-sm text-foreground/50 mb-1">Member Since</label><p>{formatDate(profile.created_at)}</p></div>
                </div>
              </div>
            </div>

            <div className="card-botanical p-6">
              <h3 className="font-serif text-lg font-semibold mb-4">Account Actions</h3>
              <div className="space-y-3">
                {[{ icon: Mail, title: 'Change Email', desc: 'Update your email address' }, { icon: User, title: 'Change Password', desc: 'Update your password' }].map((action) => (
                  <button key={action.title} className="w-full text-left p-4 rounded-2xl border border-border hover:bg-muted transition-colors duration-300 flex items-center">
                    <action.icon className="h-5 w-5 text-foreground/40 mr-4" strokeWidth={1.5} />
                    <div><p className="font-medium">{action.title}</p><p className="text-sm text-foreground/50">{action.desc}</p></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card-botanical p-6">
              <h3 className="font-serif text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                {[{ icon: ShoppingBag, label: 'Orders', value: '0' }, { icon: BookOpen, label: 'Resources', value: '0' }, { icon: Heart, label: 'Wishlist', value: '0' }].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div className="flex items-center"><stat.icon className="h-4 w-4 text-foreground/40 mr-2" strokeWidth={1.5} /><span className="text-foreground/70">{stat.label}</span></div>
                    <span className="font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-botanical p-6">
              <h3 className="font-serif text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={() => router.push('/products')} className="w-full btn-botanical py-3">Shop Products</button>
                <button onClick={() => router.push('/knowledge')} className="w-full btn-botanical-outline py-3">Browse Resources</button>
                <button onClick={() => router.push('/contact')} className="w-full btn-botanical-outline py-3">Contact Support</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
