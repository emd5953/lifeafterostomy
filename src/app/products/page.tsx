// src/app/products/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Product } from '@/types/database'
import { ShoppingCart, Filter, Search } from 'lucide-react'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedOstomyType, setSelectedOstomyType] = useState<string>('')

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, searchTerm, selectedCategory, selectedOstomyType])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name')

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
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
  }

  const addToCart = async (product: Product) => {
    // For now, just show an alert. Later we'll implement cart functionality
    alert(`Added ${product.name} to cart!`)
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
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('')
                setSelectedOstomyType('')
              }}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
              {/* Product Image Placeholder */}
              <div className={`h-48 flex items-center justify-center ${
                product.category === 'care-kit' ? 'bg-gradient-to-br from-emerald-100 to-emerald-200' :
                product.category === 'book' ? 'bg-gradient-to-br from-teal-100 to-teal-200' :
                'bg-gradient-to-br from-cyan-100 to-cyan-200'
              }`}>
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
                    {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
                    ${product.price}
                  </span>
                  <span className={`text-sm font-medium ${
                    product.stock_quantity > 10 ? 'text-emerald-600' :
                    product.stock_quantity > 0 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock_quantity === 0}
                  className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-medium"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
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