// src/components/auth/EmailVerificationReminder.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { Mail, X } from 'lucide-react'

export default function EmailVerificationReminder() {
  const { user } = useAuth()
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  if (!user || user.email_confirmed_at || dismissed) {
    return null
  }

  const resendVerificationEmail = async () => {
    setSending(true)
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email!,
      })

      if (error) throw error
      setSent(true)
    } catch (error) {
      console.error('Error resending verification email:', error)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-yellow-50 border-b border-yellow-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-yellow-600 mr-3" />
            <p className="text-sm text-yellow-800">
              Please verify your email address to access all features.
              {sent && <span className="ml-2 text-green-700">Verification email sent!</span>}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={resendVerificationEmail}
              disabled={sending || sent}
              className="text-sm text-yellow-600 hover:text-yellow-700 font-medium disabled:opacity-50"
            >
              {sending ? 'Sending...' : sent ? 'Email Sent' : 'Resend Email'}
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="text-yellow-600 hover:text-yellow-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}