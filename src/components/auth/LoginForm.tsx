// src/components/auth/LoginForm.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Loader2, CheckCircle, XCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'
import { debounce } from 'lodash'

interface FormErrors { email?: string; password?: string; fullName?: string; username?: string; general?: string }

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [ostomyType, setOstomyType] = useState<'colostomy' | 'ileostomy' | 'urostomy' | ''>('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'

  useEffect(() => { if (user) router.push(redirectTo) }, [user, router, redirectTo])

  const calculatePasswordStrength = (pass: string): number => {
    let strength = 0
    if (pass.length >= 8) strength++
    if (pass.length >= 12) strength++
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++
    if (/\d/.test(pass)) strength++
    if (/[^a-zA-Z\d]/.test(pass)) strength++
    return strength
  }

  useEffect(() => { setPasswordStrength(calculatePasswordStrength(password)) }, [password])

  const checkUsernameAvailability = useMemo(() => debounce(async (usernameToCheck: string) => {
    if (!usernameToCheck || usernameToCheck.length < 3) { setUsernameAvailable(null); return }
    setCheckingUsername(true)
    try {
      const { data } = await supabase.from('profiles').select('username').eq('username', usernameToCheck).maybeSingle()
      setUsernameAvailable(!data)
    } catch { setUsernameAvailable(null) }
    finally { setCheckingUsername(false) }
  }, 500), [])

  useEffect(() => { if (!isLogin && username) checkUsernameAvailability(username) }, [username, isLogin, checkUsernameAvailability])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email'
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    if (!isLogin) {
      if (!fullName.trim()) newErrors.fullName = 'Full name is required'
      if (!username || username.length < 3) newErrors.username = 'Username must be at least 3 characters'
      else if (!/^[a-zA-Z0-9_]+$/.test(username)) newErrors.username = 'Letters, numbers, underscores only'
      else if (usernameAvailable === false) newErrors.username = 'Username is taken'
      if (passwordStrength < 3) newErrors.password = 'Please choose a stronger password'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true); setErrors({}); setMessage('')

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw new Error(error.message.includes('Invalid') ? 'Invalid email or password' : error.message)
        if (data.user && !data.user.email_confirmed_at) { setMessage('Please verify your email first.'); return }
        setMessage('Success! Redirecting...')
        setTimeout(() => router.push(redirectTo), 1000)
      } else {
        const { data: existing } = await supabase.from('profiles').select('username').eq('username', username).maybeSingle()
        if (existing) throw new Error('Username is taken')
        const { data, error } = await supabase.auth.signUp({
          email, password,
          options: { data: { full_name: fullName, username, ostomy_type: ostomyType }, emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}` }
        })
        if (error) throw error
        if (data.user) {
          await supabase.from('profiles').insert({ id: data.user.id, username, full_name: fullName, ostomy_type: ostomyType, email, created_at: new Date().toISOString() })
        }
        setMessage('Check your email to verify your account.')
        setEmail(''); setPassword(''); setFullName(''); setUsername(''); setOstomyType('')
      }
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : 'An error occurred' })
    } finally { setLoading(false) }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}` } })
      if (error) throw error
    } catch (err) { setErrors({ general: err instanceof Error ? err.message : 'An error occurred' }) }
    finally { setLoading(false) }
  }

  const handleForgotPassword = async () => {
    if (!email) { setErrors({ email: 'Enter your email first' }); return }
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/reset-password` })
      if (error) throw error
      setMessage('Password reset email sent.')
    } catch (err) { setErrors({ general: err instanceof Error ? err.message : 'An error occurred' }) }
    finally { setLoading(false) }
  }

  const getStrengthColor = () => ['bg-gray-200', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'][passwordStrength] ?? 'bg-gray-200'
  const getStrengthText = () => ['', 'Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength] ?? ''

  if (user) return null

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
            <Image src="/assets/LAOLogo_3.jpg" alt="Life After Ostomy" width={80} height={80} className="object-cover" />
          </div>
        </div>
        <h2 className="font-serif text-3xl font-semibold">{isLogin ? 'Welcome Back' : 'Join Our Community'}</h2>
        <p className="mt-2 text-foreground/60">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button type="button" onClick={() => { setIsLogin(!isLogin); setErrors({}); setMessage(''); setUsernameAvailable(null) }} className="ml-1 font-medium text-foreground hover:text-foreground/70 transition-colors duration-300">
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>

      <div className="card-botanical p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">Full Name</label>
                <input type="text" value={fullName} onChange={(e) => { setFullName(e.target.value); setErrors(p => ({ ...p, fullName: undefined })) }} required={!isLogin} className={`input-botanical ${errors.fullName ? 'border-red-300' : ''}`} placeholder="Your name" />
                {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">Username</label>
                <div className="relative">
                  <input type="text" value={username} onChange={(e) => { setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '')); setErrors(p => ({ ...p, username: undefined })) }} required={!isLogin} className={`input-botanical pr-10 ${errors.username ? 'border-red-300' : usernameAvailable === true ? 'border-green-300' : ''}`} placeholder="Choose username" />
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    {checkingUsername && <Loader2 className="h-4 w-4 text-foreground/40 animate-spin" />}
                    {!checkingUsername && usernameAvailable === true && username.length >= 3 && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {!checkingUsername && usernameAvailable === false && <XCircle className="h-4 w-4 text-red-500" />}
                  </div>
                </div>
                {errors.username ? <p className="mt-1 text-xs text-red-600">{errors.username}</p> : <p className="mt-1 text-xs text-foreground/50">3+ chars, letters, numbers, underscores</p>}
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })) }} required className={`input-botanical ${errors.email ? 'border-red-300' : ''}`} placeholder="your@email.com" />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-foreground/70">Password</label>
              {isLogin && <button type="button" onClick={handleForgotPassword} className="text-xs text-foreground/50 hover:text-foreground transition-colors duration-300">Forgot?</button>}
            </div>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })) }} required className={`input-botanical pr-10 ${errors.password ? 'border-red-300' : ''}`} placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-4 flex items-center text-foreground/40 hover:text-foreground/60 transition-colors">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            {!isLogin && password && (
              <div className="mt-2">
                <div className="flex justify-between text-xs"><span className="text-foreground/50">Strength:</span><span className={passwordStrength <= 2 ? 'text-red-600' : passwordStrength <= 3 ? 'text-yellow-600' : 'text-green-600'}>{getStrengthText()}</span></div>
                <div className="mt-1 w-full bg-muted rounded-full h-1.5"><div className={`h-1.5 rounded-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: `${(passwordStrength / 5) * 100}%` }} /></div>
              </div>
            )}
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">Ostomy Type (Optional)</label>
              <select value={ostomyType} onChange={(e) => setOstomyType(e.target.value as typeof ostomyType)} className="input-botanical">
                <option value="">Select type</option>
                <option value="colostomy">Colostomy</option>
                <option value="ileostomy">Ileostomy</option>
                <option value="urostomy">Urostomy</option>
              </select>
              <p className="mt-1 text-xs text-foreground/50">Helps us recommend products</p>
            </div>
          )}

          {errors.general && <div className="p-4 rounded-2xl bg-red-50 text-red-600 text-sm flex items-start"><XCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />{errors.general}</div>}
          {message && <div className="p-4 rounded-2xl bg-green-50 text-green-600 text-sm flex items-start"><CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />{message}</div>}

          <button type="submit" disabled={loading || (!isLogin && usernameAvailable === false)} className="w-full btn-botanical py-4 disabled:opacity-50">
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Processing...</> : isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-background text-foreground/50">Or</span></div>
          </div>

          <button type="button" onClick={handleGoogleSignIn} disabled={loading} className="w-full btn-botanical-outline py-3 disabled:opacity-50">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>
        </form>
      </div>

      <p className="text-center text-xs text-foreground/50">
        By signing up, you agree to our <a href="/terms" className="text-foreground/70 hover:text-foreground">Terms</a> and <a href="/privacy" className="text-foreground/70 hover:text-foreground">Privacy Policy</a>
      </p>
    </div>
  )
}
