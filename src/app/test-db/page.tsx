// src/app/test-db/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestDatabase() {
  const [products, setProducts] = useState<any[]>([])
  const [content, setContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<string>('Testing...')

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      // Test basic connection
      const { data: healthCheck, error: healthError } = await supabase
        .from('products')
        .select('count')
        .limit(1)

      if (healthError) {
        setConnectionStatus('❌ Connection Failed')
        setError(healthError.message)
        setLoading(false)
        return
      }

      setConnectionStatus('✅ Connected Successfully')

      // Test products table
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .limit(5)

      if (productsError) {
        setError(`Products Error: ${productsError.message}`)
      } else {
        setProducts(productsData || [])
      }

      // Test content table
      const { data: contentData, error: contentError } = await supabase
        .from('content')
        .select('*')
        .limit(5)

      if (contentError) {
        setError(`Content Error: ${contentError.message}`)
      } else {
        setContent(contentData || [])
      }

    } catch (err: any) {
      setConnectionStatus('❌ Connection Failed')
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Database Connection Test</h1>
          
          {/* Connection Status */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
            <div className="p-4 rounded-lg bg-gray-100">
              <p className="text-lg">{connectionStatus}</p>
              {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Testing database connection...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Products Test */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Products Table ({products.length} items)</h2>
                {products.length > 0 ? (
                  <div className="grid gap-4">
                    {products.map((product) => (
                      <div key={product.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-gray-600">${product.price} - {product.category}</p>
                        <p className="text-sm text-gray-500">Stock: {product.stock_quantity}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No products found</p>
                )}
              </div>

              {/* Content Test */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Content Table ({content.length} items)</h2>
                {content.length > 0 ? (
                  <div className="grid gap-4">
                    {content.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-gray-600">{item.type} by {item.author}</p>
                        <p className="text-sm text-gray-500">{item.excerpt}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No content found</p>
                )}
              </div>

              {/* Environment Variables Check */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
                  <p>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}