// src/app/login/page.tsx
import LoginForm from '@/components/auth/LoginForm'

export const metadata = {
  title: 'Login - Life After Ostomy',
  description: 'Sign in to your Life After Ostomy account to access your orders and personalized recommendations.',
}

export default function LoginPage() {
  return <LoginForm />
}