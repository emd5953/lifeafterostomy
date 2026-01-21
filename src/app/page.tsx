// src/app/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, BookOpen, Users, Heart, ArrowRight } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: ShoppingBag,
      title: 'Complete Care Kits',
      description: 'Everything you need for ostomy care in convenient, organized kits',
    },
    {
      icon: BookOpen,
      title: 'Educational Books',
      description: 'Books about life after ostomy for all age groups',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with others and access valuable resources',
    },
    {
      icon: Heart,
      title: 'Ongoing Care',
      description: 'Easy reordering and personalized recommendations',
    },
  ]

  const categories = [
    {
      title: 'Complete Care Kits',
      description: 'Comprehensive kits with everything needed for ostomy care',
      href: '/products?category=care-kit',
      gradient: 'from-neutral-100 to-neutral-200',
    },
    {
      title: 'Individual Items',
      description: 'Individual ostomy supplies for specific needs',
      href: '/products?category=individual-item',
      gradient: 'from-stone-100 to-stone-200',
    },
    {
      title: 'Educational Books',
      description: 'Books about life after ostomy for all ages',
      href: '/products?category=book',
      gradient: 'from-zinc-100 to-zinc-200',
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-botanical overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <p className="text-sm font-medium tracking-widest uppercase text-foreground/60 mb-4">
                Website Under Development
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6">
                Life After{' '}
                <span className="italic">Ostomy</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-8 max-w-lg">
                Complete ostomy care kits and resources to help you thrive after surgery. 
                Supporting colostomy, ileostomy, and urostomy patients with quality products and knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="btn-botanical">
                  Shop Care Kits
                  <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
                </Link>
                <Link href="/about" className="btn-botanical-outline">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[3/4] md:aspect-square lg:aspect-[4/5] max-w-md mx-auto lg:max-w-none">
                {/* Arch-shaped image container */}
                <div className="absolute inset-0 arch-image bg-muted overflow-hidden transition-transform duration-700 hover:scale-[1.02]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image 
                      src="/assets/LAOLogo_3.jpg" 
                      alt="Life After Ostomy" 
                      width={300}
                      height={300}
                      className="object-contain opacity-90"
                      priority
                    />
                  </div>
                </div>
                {/* Decorative offset shape */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-muted -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-botanical bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
              Everything You Need in{' '}
              <span className="italic">One Place</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              From complete care kits to educational resources, we&apos;re here to support your journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={`text-center ${index % 2 === 1 ? 'md:translate-y-8' : ''}`}
              >
                <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mx-auto mb-5 shadow-sm transition-transform duration-500 hover:scale-110">
                  <feature.icon className="h-7 w-7 text-foreground/80" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="section-botanical">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
              Our <span className="italic">Collections</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.title}
                href={category.href}
                className={`group card-botanical overflow-hidden ${index === 1 ? 'md:translate-y-12' : ''}`}
              >
                <div className={`h-56 bg-gradient-to-br ${category.gradient} flex items-center justify-center transition-all duration-700 group-hover:scale-105`}>
                  <span className="text-6xl opacity-30">
                    {index === 0 && '📦'}
                    {index === 1 && '🔧'}
                    {index === 2 && '📚'}
                  </span>
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-foreground/80 transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-foreground/60 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium tracking-wide uppercase text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-botanical bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
              Ready to Get{' '}
              <span className="italic">Started?</span>
            </h2>
            <p className="text-xl text-background/70 mb-10 leading-relaxed">
              Join thousands of people who trust Life After Ostomy for their care needs
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground rounded-full text-sm font-medium tracking-widest uppercase hover:bg-background/90 transition-all duration-300"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
