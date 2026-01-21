// src/app/products/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { ShoppingCart, Search, Plus, Minus, Package, ArrowRight } from 'lucide-react'
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
      const { data, error } = await supabase.from('products').select('*').order('name')
      if (error) throw new Error(error.message)
      setProducts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])
  useEffect(() => { filterProducts() }, [filterProducts])

  const handleAddToCart = (product: Product) => {
    addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image_url, variant: product.ostomy_type })
  }

  const handleUpdateQuantity = (product: Product, newQuantity: number) => {
    if (newQuantity <= 0) removeFromCart(product.id)
    else updateQuantity(product.id, newQuantity)
  }

  const getItemQuantityInCart = (productId: string) => cartItems.find(item => item.id === productId)?.quantity || 0
  const clearFilters = () => { setSearchTerm(''); setSelectedCategory(''); setSelectedOstomyType('') }
  const formatCategoryName = (category: string) => category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-2 border-foreground/20 border-t-foreground animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="font-serif text-2xl font-semibold mb-3">Unable to Load Products</h2>
          <p className="text-foreground/60 mb-6">{error}</p>
          <button onClick={fetchProducts} className="btn-botanical">Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="section-botanical pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-4">Our <span className="italic">Products</span></h1>
            <p className="text-lg text-foreground/70 leading-relaxed">Complete ostomy care kits, individual supplies, and educational resources to support your journey</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="card-botanical p-6 md:p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" strokeWidth={1.5} />
              <input type="text" placeholder="Search products..." className="input-botanical pl-11" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <select className="input-botanical appearance-none cursor-pointer" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="care-kit">Care Kits</option>
              <option value="individual-item">Individual Items</option>
              <option value="book">Books</option>
            </select>
            <select className="input-botanical appearance-none cursor-pointer" value={selectedOstomyType} onChange={(e) => setSelectedOstomyType(e.target.value)}>
              <option value="">All Ostomy Types</option>
              <option value="colostomy">Colostomy</option>
              <option value="ileostomy">Ileostomy</option>
              <option value="urostomy">Urostomy</option>
              <option value="universal">Universal</option>
            </select>
            <button onClick={clearFilters} className="btn-botanical-outline">Clear Filters</button>
          </div>
        </div>

        <p className="text-foreground/60 mb-8">Showing {filteredProducts.length} of {products.length} products</p>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => {
              const quantityInCart = getItemQuantityInCart(product.id)
              return (
                <div key={product.id} className={`card-botanical overflow-hidden group ${index % 3 === 1 ? 'md:translate-y-6' : ''}`}>
                  <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
                    {quantityInCart > 0 && <div className="absolute top-3 right-3 bg-foreground text-background text-xs font-medium rounded-full h-6 w-6 flex items-center justify-center z-10">{quantityInCart}</div>}
                    <div className="text-center transition-transform duration-700 group-hover:scale-110">
                      <span className="text-4xl mb-2 block opacity-50">{product.category === 'care-kit' ? '📦' : product.category === 'book' ? '📚' : '🔧'}</span>
                      <span className="text-xs text-foreground/40 uppercase tracking-wider">Image Coming Soon</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 text-xs font-medium tracking-wide uppercase rounded-full bg-muted text-foreground/70">{formatCategoryName(product.category)}</span>
                      <span className="text-xs text-foreground/50 capitalize">{product.ostomy_type}</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold mb-2 line-clamp-2 leading-snug">{product.name}</h3>
                    <p className="text-foreground/60 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-xl font-semibold">${product.price.toFixed(2)}</span>
                      <span className={`text-xs font-medium ${product.stock_quantity > 10 ? 'text-green-600' : product.stock_quantity > 0 ? 'text-amber-600' : 'text-red-600'}`}>{product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}</span>
                    </div>
                    {quantityInCart > 0 ? (
                      <div className="flex items-center justify-between bg-muted rounded-full p-1">
                        <button onClick={() => handleUpdateQuantity(product, quantityInCart - 1)} className="w-10 h-10 flex items-center justify-center bg-background rounded-full hover:bg-white transition-colors duration-300"><Minus className="h-4 w-4" strokeWidth={1.5} /></button>
                        <span className="font-medium min-w-[3rem] text-center">{quantityInCart}</span>
                        <button onClick={() => handleUpdateQuantity(product, quantityInCart + 1)} disabled={quantityInCart >= product.stock_quantity} className="w-10 h-10 flex items-center justify-center bg-background rounded-full hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"><Plus className="h-4 w-4" strokeWidth={1.5} /></button>
                      </div>
                    ) : (
                      <button onClick={() => handleAddToCart(product)} disabled={product.stock_quantity === 0} className="w-full btn-botanical py-3 disabled:opacity-50 disabled:cursor-not-allowed"><ShoppingCart className="h-4 w-4 mr-2" strokeWidth={1.5} />{product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}</button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6"><Search className="h-8 w-8 text-foreground/30" strokeWidth={1.5} /></div>
            <h3 className="font-serif text-xl font-semibold mb-2">No products found</h3>
            <p className="text-foreground/60 mb-6">Try adjusting your search terms or filters</p>
            <button onClick={clearFilters} className="btn-botanical">Clear All Filters</button>
          </div>
        )}

        <div className="mt-24">
          <h2 className="font-serif text-2xl font-semibold text-center mb-8">Also Available <span className="italic">On</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a href="#" className="card-botanical p-8 text-center group">
              <Package className="h-10 w-10 mx-auto mb-4 text-foreground/40 group-hover:text-foreground/60 transition-colors duration-300" strokeWidth={1.5} />
              <h3 className="font-serif text-lg font-semibold mb-2">Amazon Store</h3>
              <p className="text-foreground/60 text-sm mb-4">Shop our books and select products</p>
              <span className="inline-flex items-center text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-300">Visit Store<ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} /></span>
            </a>
            <a href="#" className="card-botanical p-8 text-center group">
              <ShoppingCart className="h-10 w-10 mx-auto mb-4 text-foreground/40 group-hover:text-foreground/60 transition-colors duration-300" strokeWidth={1.5} />
              <h3 className="font-serif text-lg font-semibold mb-2">Shopify Store</h3>
              <p className="text-foreground/60 text-sm mb-4">Complete selection of care kits</p>
              <span className="inline-flex items-center text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-300">Visit Store<ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} /></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
