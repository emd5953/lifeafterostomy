// src/app/products/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { ShoppingCart, Search, Check, Plus, Minus } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: 'care-kit' | 'individual-item' | 'book'
  ostomy_type: 'colostomy' | 'ileostomy' | 'urostomy' | 'universal'
  stock_quantity: number
  created_at: string
  updated_at?: string
  image_url?: string
  sku?: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedOstomyType, setSelectedOstomyType] = useState<string>('')
  
  // Use the cart context
  const { addToCart, items: cartItems, updateQuantity, removeFromCart } = useCart()

  const filterProducts = useCallback(() => {
    let filtered = products

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    if (selectedOstomyType) {
      filtered = filtered.filter(product => 
        product.ostomy_type === selectedOstomyType || product.ostomy_type === 'universal'
      )
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, selectedOstomyType])

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name')

      if (error) {
        throw new Error(error.message)
      }
      
      setProducts(data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load products'
      setError(errorMessage)
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    filterProducts()
  }, [filterProducts])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image_url,
      variant: product.ostomy_type
    })
  }

  const handleUpdateQuantity = (product: Product, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(product.id)
    } else {
      updateQuantity(product.id, newQuantity)
    }
  }

  const getItemQuantityInCart = (productId: string) => {
    const item = cartItems.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedOstomyType('')
  }

  const formatCategoryName = (category: string) => {
    return category.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Products</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete ostomy care kits, individual supplies, and educational resources 
            to support your journey
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="care-kit">Care Kits</option>
              <option value="individual-item">Individual Items</option>
              <option value="book">Books</option>
            </select>

            {/* Ostomy Type Filter */}
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={selectedOstomyType}
              onChange={(e) => setSelectedOstomyType(e.target.value)}
            >
              <option value="">All Ostomy Types</option>
              <option value="colostomy">Colostomy</option>
              <option value="ileostomy">Ileostomy</option>
              <option value="urostomy">Urostomy</option>
              <option value="universal">Universal</option>
            </select>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-emerald-700 border border-emerald-300 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const quantityInCart = getItemQuantityInCart(product.id)
              
              return (
                <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
                  {/* Product Image Placeholder */}
                  <div className={`h-48 flex items-center justify-center relative ${
                    product.category === 'care-kit' ? 'bg-gradient-to-br from-emerald-100 to-emerald-200' :
                    product.category === 'book' ? 'bg-gradient-to-br from-teal-100 to-teal-200' :
                    'bg-gradient-to-br from-cyan-100 to-cyan-200'
                  }`}>
                    {/* Quantity in Cart Badge */}
                    {quantityInCart > 0 && (
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {quantityInCart}
                      </div>
                    )}
                    
                    <div className={`text-center ${
                      product.category === 'care-kit' ? 'text-emerald-700' :
                      product.category === 'book' ? 'text-teal-700' :
                      'text-cyan-700'
                    } text-sm font-medium`}>
                      <div className="text-2xl mb-2">
                        {product.category === 'care-kit' && '📦'}
                        {product.category === 'book' && '📚'}
                        {product.category === 'individual-item' && '🔧'}
                      </div>
                      Image Coming Soon
                    </div>
                  </div>

                  <div className="p-4">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        product.category === 'care-kit' ? 'bg-emerald-100 text-emerald-800' :
                        product.category === 'book' ? 'bg-teal-100 text-teal-800' :
                        'bg-cyan-100 text-cyan-800'
                      }`}>
                        {formatCategoryName(product.category)}
                      </span>
                      <span className="text-xs text-gray-500 capitalize font-medium">
                        {product.ostomy_type}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price and Stock */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className={`text-sm font-medium ${
                        product.stock_quantity > 10 ? 'text-emerald-600' :
                        product.stock_quantity > 0 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                      </span>
                    </div>

                    {/* Add to Cart Button / Quantity Controls */}
                    {quantityInCart > 0 ? (
                      <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() => handleUpdateQuantity(product, quantityInCart - 1)}
                          className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        
                        <span className="font-semibold text-gray-900 min-w-[3rem] text-center">
                          {quantityInCart}
                        </span>
                        
                        <button
                          onClick={() => handleUpdateQuantity(product, quantityInCart + 1)}
                          disabled={quantityInCart >= product.stock_quantity}
                          className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock_quantity === 0}
                        className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-medium"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you&apos;re looking for.
            </p>
            <button
              onClick={clearFilters}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* External Links Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Also Available On
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="#"
              className="flex items-center justify-center p-6 border-2 border-orange-200 rounded-xl hover:border-orange-400 hover:shadow-md transition-all duration-200"
            >
              <div className="text-center">
                <div className="text-4xl mb-3">📦</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Amazon Store</h3>
                <p className="text-gray-600 text-sm">Shop our books and select products on Amazon</p>
              </div>
            </a>
            
            <a
              href="#"
              className="flex items-center justify-center p-6 border-2 border-emerald-200 rounded-xl hover:border-emerald-400 hover:shadow-md transition-all duration-200"
            >
              <div className="text-center">
                <div className="text-4xl mb-3">🛒</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Shopify Store</h3>
                <p className="text-gray-600 text-sm">Complete selection of ostomy care kits</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}