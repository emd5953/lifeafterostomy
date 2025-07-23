// app/cart/page.tsx
// Remove the ProtectedRoute wrapper - allow anyone to view cart
import CartPageContent from '@/components/cart/CartPageContent'

export default function CartPage() {
  return <CartPageContent />
}