// src/app/login/error.tsx
'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Use the error parameter
  console.error('Login page error:', error)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full text-center space-y-4">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600">
          {error.message || 'An unexpected error occurred while loading the login page.'}
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={reset}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors inline-block"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}