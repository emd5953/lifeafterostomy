// src/components/auth/SessionRefresh.tsx
'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function SessionRefresh() {
  useEffect(() => {
    // Refresh session every 30 minutes
    const refreshInterval = setInterval(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        await supabase.auth.refreshSession()
      }
    }, 30 * 60 * 1000) // 30 minutes

    return () => clearInterval(refreshInterval)
  }, [])

  return null
}