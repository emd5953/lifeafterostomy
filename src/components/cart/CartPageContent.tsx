// src/components/cart/CartPageContent.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Package, Truck, Shield } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

export default function CartPageContent() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()

  const subtotal = totalPrice
  const savings = subtotal > 100 ? subtotal * 0.1 : 0
  const shipping = subtotal >= 50 ? 0 : 9.99
  const finalTotal = subtotal - savings + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="card-botanical p-12">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-foreground/40" strokeWidth={1.5} />
            </div>
            <h1 className="font-serif text-3xl font-semibold mb-4">Your cart is <span className="italic">empty</span></h1>
            <p className="text-foreground/60 mb-8 leading-relaxed">Start your journey to confident ostomy care with our specially curated products.</p>
            <Link href="/products" className="btn-botanical">
              <Package className="h-4 w-4 mr-2" strokeWidth={1.5} />
              Browse Products
            </Link>
            
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-border">
              {[{ icon: Shield, label: 'Secure Checkout' }, { icon: Truck, label: 'Fast Shipping' }, { icon: Package, label: 'Quality Products' }].map((item) => (
                <div key={item.label} className="text-center">
                  <item.icon className="h-6 w-6 mx-auto mb-2 text-foreground/40" strokeWidth={1.5} />
                  <p className="text-xs text-foreground/50">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link href="/products" className="inline-flex items-center text-foreground/60 hover:text-foreground transition-colors duration-300 mb-4 group">
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.5} />
            Continue Shopping
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold">Shopping <span className="italic">Cart</span></h1>
          <p className="text-foreground/60 mt-2">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.variant}`} className="card-botanical p-6">
                <div className="flex items-start gap-6">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    {item.image ? (
                      <div className="w-24 h-24 relative rounded-2xl overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-muted rounded-2xl flex items-center justify-center">
                        <Package className="h-8 w-8 text-foreground/30" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-lg font-semibold">{item.name}</h3>
                        {item.variant && <p className="text-sm text-foreground/50 mt-1 capitalize">{item.variant}</p>}
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-foreground/40 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-300" aria-label="Remove">
                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      <div className="flex items-center bg-muted rounded-full p-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center bg-background rounded-full hover:bg-white transition-colors duration-300">
                          <Minus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                        <span className="px-4 font-medium text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-background rounded-full hover:bg-white transition-colors duration-300">
                          <Plus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-foreground/50">${item.price.toFixed(2)} each</p>
                        <p className="font-serif text-xl font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end pt-4">
              <button onClick={clearCart} className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-full transition-all duration-300">
                Clear All
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-botanical p-6 sticky top-28">
              <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-foreground/70">
                  <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-foreground/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>

              {subtotal < 50 && (
                <div className="bg-muted rounded-2xl p-4 mb-6">
                  <p className="text-sm text-foreground/70">Add ${(50 - subtotal).toFixed(2)} more for free shipping!</p>
                  <div className="w-full bg-border rounded-full h-1.5 mt-2">
                    <div className="bg-foreground h-1.5 rounded-full transition-all duration-500" style={{ width: `${(subtotal / 50) * 100}%` }} />
                  </div>
                </div>
              )}

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-serif text-lg font-semibold">Total</span>
                  <span className="font-serif text-2xl font-semibold">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout" className="w-full btn-botanical py-4 text-center block">
                Proceed to Checkout
              </Link>

              <Link href="/products" className="block text-center mt-4 text-sm text-foreground/60 hover:text-foreground transition-colors duration-300">
                ← Continue Shopping
              </Link>

              <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-border text-foreground/50">
                <Shield className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-xs">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
