// src/app/login/page.tsx
import { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'
import { Suspense } from 'react'
import { Heart, Shield, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Login | Life After Ostomy',
  description: 'Sign in to your Life After Ostomy account to access personalized recommendations, connect with the community, and track your journey.',
}

function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-2 border-foreground/20 border-t-foreground animate-spin mx-auto mb-4" />
        <p className="text-foreground/60">Loading...</p>
      </div>
    </div>
  )
}

const features = [
  { icon: Heart, title: 'Personalized Support', description: 'Get recommendations tailored to your specific needs and ostomy type.' },
  { icon: Users, title: 'Community Connection', description: 'Connect with others who understand your journey and share experiences.' },
  { icon: Shield, title: 'Private & Secure', description: 'Your data is encrypted and your privacy is our top priority.' },
]

export default function LoginPage() {
  return (
    <div className="min-h-screen pt-20 flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-start justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <Suspense fallback={<LoginLoading />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>

      {/* Right - Features */}
      <div className="hidden lg:flex lg:flex-1 bg-muted items-start justify-center px-8 py-20">
        <div className="max-w-md">
          <h2 className="font-serif text-3xl font-semibold mb-8">
            Welcome to Your <span className="italic">Community</span>
          </h2>
          <div className="space-y-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start group">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mr-4 transition-transform duration-500 group-hover:scale-110">
                  <feature.icon className="h-5 w-5 text-foreground/60" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-1">{feature.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-12 border-t border-border">
            <blockquote className="text-foreground/70 italic font-serif text-lg leading-relaxed">
              &ldquo;Life After Ostomy gave me the confidence and support I needed during my recovery. The community here truly understands.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-foreground/50">— Sarah M., Community Member</p>
          </div>

          <div className="mt-12 pt-12 border-t border-border">
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/privacy" className="text-foreground/50 hover:text-foreground transition-colors duration-300">Privacy</Link>
              <Link href="/terms" className="text-foreground/50 hover:text-foreground transition-colors duration-300">Terms</Link>
              <Link href="/contact" className="text-foreground/50 hover:text-foreground transition-colors duration-300">Contact</Link>
            </div>
            <p className="mt-4 text-xs text-foreground/40">© {new Date().getFullYear()} Life After Ostomy</p>
          </div>
        </div>
      </div>
    </div>
  )
}
