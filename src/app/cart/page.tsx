'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Package, Truck, Shield } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  // Calculate savings (mock calculation - you can adjust this logic)
  const subtotal = totalPrice;
  const savings = subtotal > 100 ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const finalTotal = subtotal - savings + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-16 w-16 text-emerald-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-8 text-lg">
                Start your journey to confident ostomy care with our specially curated products.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Package className="h-5 w-5" />
                Browse Care Kits
              </Link>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mt-12 pt-12 border-t border-gray-200">
                <div className="text-center">
                  <Shield className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Secure Checkout</p>
                </div>
                <div className="text-center">
                  <Truck className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Fast Shipping</p>
                </div>
                <div className="text-center">
                  <Package className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Quality Products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.variant}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-6">
                  {/* Product Image */}
                  <div className="relative flex-shrink-0">
                    {item.image ? (
                      <div className="w-28 h-28 relative rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center">
                        <Package className="h-10 w-10 text-emerald-600" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-xl text-gray-900">{item.name}</h3>
                        {item.variant && (
                          <p className="text-sm text-gray-500 mt-1">
                            Type: <span className="capitalize font-medium">{item.variant}</span>
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        aria-label="Remove from cart"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Quantity:</span>
                        <div className="flex items-center bg-gray-100 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Unit price: ${item.price.toFixed(2)}</p>
                        <p className="text-xl font-bold text-emerald-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 font-medium hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
              >
                Clear All Items
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Summary Lines */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Savings</span>
                    <span className="font-medium">-${savings.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {subtotal < 50 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                  <p className="text-sm text-blue-800">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(subtotal / 50) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <Link
                href="/checkout"
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 transform hover:scale-[1.02] transition-all duration-200 text-center block shadow-lg hover:shadow-xl"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="w-full mt-3 text-center text-emerald-600 hover:text-emerald-700 font-medium block py-2"
              >
                ← Continue Shopping
              </Link>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-gray-200 text-gray-500">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}