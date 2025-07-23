// src/components/auth/ProtectedRoute.tsx
'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireEmailVerification?: boolean
  requireProfile?: boolean
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  requireEmailVerification = false,
  requireProfile = false,
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    if (!loading) {
      setAuthChecked(true)

      if (!user) {
        // Save the current path to redirect back after login
        const loginUrl = new URL(redirectTo, window.location.origin)
        loginUrl.searchParams.set('redirectTo', pathname)
        router.push(loginUrl.toString())
        return
      }

      // Check email verification if required
      if (requireEmailVerification && !user.email_confirmed_at) {
        router.push('/verify-email')
        return
      }

      // Check profile completion if required
      if (requireProfile && (!profile || !profile.username)) {
        router.push('/complete-profile')
        return
      }
    }
  }, [user, profile, loading, router, pathname, redirectTo, requireEmailVerification, requireProfile])

  // Show loading state
  if (loading || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render content if user doesn't meet requirements
  if (!user || (requireEmailVerification && !user.email_confirmed_at) || (requireProfile && (!profile || !profile.username))) {
    return null
  }

  return <>{children}</>
}