// src/contexts/AuthContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface Profile {
  id: string
  username: string
  full_name: string | null
  email: string
  ostomy_type: 'colostomy' | 'ileostomy' | 'urostomy' | null
  avatar_url: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        // If profile doesn't exist, that's okay - user might be new
        if (error.code === 'PGRST116') {
          console.log('Profile not found for user:', userId)
          return null
        }
        console.error('Error fetching profile:', error)
        return null
      }

      return data as Profile
    } catch (error) {
      console.error('Error in fetchProfile:', error)
      return null
    }
  }

  // Refresh profile data
  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id)
      setProfile(profileData)
    }
  }

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          setLoading(false)
          return
        }
        
        if (session?.user) {
          setUser(session.user)
          const profileData = await fetchProfile(session.user.id)
          setProfile(profileData)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event)
        
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user)
          const profileData = await fetchProfile(session.user.id)
          setProfile(profileData)
          
          // If no profile exists and user has metadata, create one
          if (!profileData && session.user.user_metadata) {
            const { full_name, username, ostomy_type } = session.user.user_metadata
            if (username) {
              try {
                const { data: newProfile, error } = await supabase
                  .from('profiles')
                  .insert({
                    id: session.user.id,
                    username,
                    full_name: full_name || null,
                    email: session.user.email!,
                    ostomy_type: ostomy_type || null,
                  })
                  .select()
                  .single()
                
                if (!error && newProfile) {
                  setProfile(newProfile as Profile)
                }
              } catch (err) {
                console.error('Error creating profile:', err)
              }
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setProfile(null)
        } else if (event === 'USER_UPDATED' && session?.user) {
          setUser(session.user)
          // Refresh profile in case email was verified
          const profileData = await fetchProfile(session.user.id)
          setProfile(profileData)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      setUser(null)
      setProfile(null)
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    profile,
    loading,
    signOut,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Optional: Export types for use in other components
export type { Profile, AuthContextType }