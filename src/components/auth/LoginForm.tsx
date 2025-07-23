// src/components/auth/LoginForm.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Loader2, CheckCircle, XCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'
import { debounce } from 'lodash'

interface FormErrors {
  email?: string
  password?: string
  fullName?: string
  username?: string
  general?: string
}

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

  // Get redirect URL from query params
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push(redirectTo)
    }
  }, [user, router, redirectTo])

  // Password strength calculator
  const calculatePasswordStrength = (pass: string): number => {
    let strength = 0
    if (pass.length >= 8) strength++
    if (pass.length >= 12) strength++
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++
    if (/\d/.test(pass)) strength++
    if (/[^a-zA-Z\d]/.test(pass)) strength++
    return strength
  }

  // Update password strength when password changes
  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password))
  }, [password])

  // Debounced username availability check
  const checkUsernameAvailability = useCallback(
    debounce(async (usernameToCheck: string) => {
      if (!usernameToCheck || usernameToCheck.length < 3) {
        setUsernameAvailable(null)
        return
      }

      setCheckingUsername(true)
      try {
        const { data } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', usernameToCheck)
          .maybeSingle()

        setUsernameAvailable(!data)
      } catch (error) {
        console.error('Username check error:', error)
        setUsernameAvailable(null)
      } finally {
        setCheckingUsername(false)
      }
    }, 500),
    []
  )

  // Check username availability when it changes
  useEffect(() => {
    if (!isLogin && username) {
      checkUsernameAvailability(username)
    }
  }, [username, isLogin, checkUsernameAvailability])

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
    }

    if (!isLogin) {
      // Full name validation
      if (!fullName.trim()) {
        newErrors.fullName = 'Full name is required'
      }

      // Username validation
      const usernameRegex = /^[a-zA-Z0-9_]+$/
      if (!username || username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters long'
      } else if (!usernameRegex.test(username)) {
        newErrors.username = 'Username can only contain letters, numbers, and underscores'
      } else if (usernameAvailable === false) {
        newErrors.username = 'This username is already taken'
      }

      // Password strength check for signup
      if (passwordStrength < 3) {
        newErrors.password = 'Please choose a stronger password'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setErrors({})
    setMessage('')

    try {
      if (isLogin) {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (loginError) {
          if (loginError.message.includes('Invalid login credentials')) {
            throw new Error('Invalid email or password. Please try again.')
          }
          throw loginError
        }

        if (data.user && !data.user.email_confirmed_at) {
          setMessage('Please check your email to verify your account before logging in.')
          return
        }

        setMessage('Login successful! Redirecting...')
        setTimeout(() => router.push(redirectTo), 1000)
      } else {
        // Final username availability check
        const { data: existingUser } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', username)
          .maybeSingle()

        if (existingUser) {
          throw new Error('Username is already taken. Please choose a different one.')
        }

        const { data: signupData, error: signupError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              username: username,
              ostomy_type: ostomyType,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`,
          },
        })

        if (signupError) throw signupError

        // Create profile entry
        if (signupData.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: signupData.user.id,
              username: username,
              full_name: fullName,
              ostomy_type: ostomyType,
              email: email,
              created_at: new Date().toISOString(),
            })

          if (profileError && profileError.code !== '23505') { // Ignore duplicate key errors
            console.error('Profile creation error:', profileError)
          }
        }

        setMessage('Registration successful! Please check your email to verify your account.')
        
        // Clear form
        setEmail('')
        setPassword('')
        setFullName('')
        setUsername('')
        setOstomyType('')
      }
    } catch (submitError: unknown) {
      const errorMessage = submitError instanceof Error ? submitError.message : 'An error occurred'
      setErrors({ general: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (googleError) throw googleError
    } catch (googleSignInError: unknown) {
      const errorMessage = googleSignInError instanceof Error ? googleSignInError.message : 'An error occurred'
      setErrors({ general: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setErrors({ email: 'Please enter your email address first' })
      return
    }

    try {
      setLoading(true)
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      setMessage('Password reset instructions have been sent to your email.')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setErrors({ general: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  // Password strength indicator
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500'
    if (passwordStrength <= 2) return 'bg-orange-500'
    if (passwordStrength <= 3) return 'bg-yellow-500'
    if (passwordStrength <= 4) return 'bg-lime-500'
    return 'bg-green-500'
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return ''
    if (passwordStrength <= 1) return 'Very Weak'
    if (passwordStrength <= 2) return 'Weak'
    if (passwordStrength <= 3) return 'Fair'
    if (passwordStrength <= 4) return 'Good'
    return 'Strong'
  }

  // Don't render if user is already logged in
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          {/* LAO Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <Image 
                src="/assets/LAOLogo_3.jpg" 
                alt="Life After Ostomy Logo" 
                width={88}
                height={88}
                className="relative rounded-full object-contain"
              />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Join Our Community'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
            <button
              type="button"
              className="font-medium text-emerald-600 hover:text-emerald-500 ml-1 transition-colors"
              onClick={() => {
                setIsLogin(!isLogin)
                setErrors({})
                setMessage('')
                setUsernameAvailable(null)
              }}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      id="full-name"
                      name="fullName"
                      type="text"
                      required={!isLogin}
                      className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                        errors.fullName ? 'border-red-300' : 'border-gray-300'
                      } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors`}
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value)
                        if (errors.fullName) {
                          setErrors(prev => ({ ...prev, fullName: undefined }))
                        }
                      }}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <div className="relative">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        required={!isLogin}
                        className={`mt-1 appearance-none relative block w-full px-3 py-2 pr-10 border ${
                          errors.username ? 'border-red-300' : 
                          usernameAvailable === true ? 'border-green-300' : 
                          usernameAvailable === false ? 'border-red-300' : 
                          'border-gray-300'
                        } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors`}
                        placeholder="Choose a unique username"
                        value={username}
                        onChange={(e) => {
                          const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '')
                          setUsername(value)
                          if (errors.username) {
                            setErrors(prev => ({ ...prev, username: undefined }))
                          }
                        }}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        {checkingUsername && (
                          <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
                        )}
                        {!checkingUsername && usernameAvailable === true && username.length >= 3 && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {!checkingUsername && usernameAvailable === false && (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                    {errors.username && (
                      <p className="mt-1 text-xs text-red-600">{errors.username}</p>
                    )}
                    {!errors.username && (
                      <p className="mt-1 text-xs text-gray-500">
                        3+ characters, letters, numbers, and underscores only
                      </p>
                    )}
                  </div>
                </>
              )}

              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors`}
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) {
                      setErrors(prev => ({ ...prev, email: undefined }))
                    }
                  }}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-xs text-emerald-600 hover:text-emerald-500 transition-colors"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    required
                    className={`appearance-none relative block w-full px-3 py-2 pr-10 border ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) {
                        setErrors(prev => ({ ...prev, password: undefined }))
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                )}
                {!isLogin && password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Password strength:</span>
                      <span className={`font-medium ${
                        passwordStrength <= 2 ? 'text-red-600' : 
                        passwordStrength <= 3 ? 'text-yellow-600' : 
                        'text-green-600'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="ostomy-type" className="block text-sm font-medium text-gray-700">
                    Ostomy Type (Optional)
                  </label>
                  <select
                    id="ostomy-type"
                    name="ostomyType"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    value={ostomyType}
                    onChange={(e) => setOstomyType(e.target.value as typeof ostomyType)}
                  >
                    <option value="">Select your ostomy type</option>
                    <option value="colostomy">Colostomy</option>
                    <option value="ileostomy">Ileostomy</option>
                    <option value="urostomy">Urostomy</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    This helps us recommend the right products for you
                  </p>
                </div>
              )}
            </div>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-start">
                <XCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{errors.general}</span>
              </div>
            )}

            {message && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 px-4 py-3 rounded-lg flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{message}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading || (!isLogin && usernameAvailable === false)}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                {loading ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Processing...
                  </span>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="ml-2">Continue with Google</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-gray-500">
          By signing up, you agree to our{' '}
          <a href="/terms" className="text-emerald-600 hover:text-emerald-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-emerald-600 hover:text-emerald-500">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}