// src/app/about/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Users, Award, BookOpen, Shield, Globe, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  const values = [
    { icon: Heart, title: 'Compassionate Care', desc: 'We understand the emotional and physical challenges of ostomy life and approach every interaction with empathy.' },
    { icon: Award, title: 'Quality Excellence', desc: 'We carefully curate every product and resource to ensure the highest quality for our community.' },
    { icon: Users, title: 'Community First', desc: 'Our community drives everything we do. We listen, learn, and evolve based on real needs.' },
    { icon: BookOpen, title: 'Education & Empowerment', desc: 'Knowledge is power. We provide comprehensive resources to help individuals make informed decisions.' },
    { icon: Shield, title: 'Trust & Reliability', desc: 'We build lasting relationships through consistent, reliable service and transparent communication.' },
    { icon: Globe, title: 'Accessible Support', desc: 'We believe quality ostomy care should be accessible to everyone, regardless of circumstances.' },
  ]

  const offerings = [
    { emoji: '📦', title: 'Complete Care Kits', desc: 'Thoughtfully curated kits containing everything you need for ostomy care.', href: '/products?category=care-kit', cta: 'Shop Care Kits' },
    { emoji: '📚', title: 'Educational Resources', desc: 'Books, guides, and knowledge bases covering pre-surgery to long-term care.', href: '/ostomy-knowledge', cta: 'Explore Resources' },
    { emoji: '🤝', title: 'Community Support', desc: 'Connect with others who understand your journey through our communities.', href: '/contact', cta: 'Join Community' },
  ]

  const stats = [
    { value: '5,000+', label: 'Families Served' },
    { value: '50+', label: 'Educational Resources' },
    { value: '15,000+', label: 'Care Kits Delivered' },
    { value: '98%', label: 'Customer Satisfaction' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="section-botanical">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-8">
              <Image src="/assets/LAOLogo_3.jpg" alt="Life After Ostomy" width={96} height={96} className="object-cover" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-6">
              About Life After <span className="italic">Ostomy</span>
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Empowering individuals to thrive after ostomy surgery through quality products, 
              educational resources, and compassionate support.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-botanical bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl font-semibold mb-6">Our <span className="italic">Story</span></h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  Life After Ostomy was founded with a simple yet powerful mission: to ensure that no one 
                  faces their ostomy journey alone. We understand that receiving an ostomy can be 
                  life-changing, and we&apos;re here to make that change as positive as possible.
                </p>
                <p>
                  Our founder&apos;s personal experience with ostomy surgery revealed a gap in comprehensive 
                  care and support. From that moment, we knew we had to create something better – a 
                  complete resource hub that provides not just products, but education, community, and hope.
                </p>
                <p>
                  Today, we serve thousands of individuals and families, helping them navigate their 
                  ostomy journey with confidence, dignity, and joy.
                </p>
              </div>
            </div>
            <div className="card-botanical p-10 text-center">
              <span className="text-6xl mb-6 block">🌱</span>
              <h3 className="font-serif text-2xl font-semibold mb-4">Founded on Experience</h3>
              <p className="text-foreground/60 leading-relaxed">
                Our journey began with personal experience, grew through community need, 
                and continues with every person we help live their best life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-botanical">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-semibold mb-4">Our <span className="italic">Values</span></h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Everything we do is guided by our commitment to improving lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={value.title} className={`card-botanical p-8 text-center ${index % 3 === 1 ? 'md:translate-y-6' : ''}`}>
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
                  <value.icon className="h-6 w-6 text-foreground/60" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section-botanical bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-semibold mb-4">What We <span className="italic">Offer</span></h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Comprehensive solutions for every aspect of your ostomy journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offerings.map((item) => (
              <div key={item.title} className="card-botanical p-8 group">
                <span className="text-5xl mb-6 block">{item.emoji}</span>
                <h3 className="font-serif text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-foreground/60 mb-6 leading-relaxed">{item.desc}</p>
                <Link href={item.href} className="inline-flex items-center text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                  {item.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="section-botanical bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-semibold mb-4">Our <span className="italic">Impact</span></h2>
            <p className="text-lg text-background/70 max-w-2xl mx-auto">
              Together, we&apos;re making a difference in the ostomy community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-4xl md:text-5xl font-semibold text-background/90 mb-2">{stat.value}</div>
                <p className="text-background/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-botanical">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-semibold mb-4">
            Ready to Start Your <span className="italic">Journey?</span>
          </h2>
          <p className="text-lg text-foreground/70 mb-10 leading-relaxed">
            Whether you&apos;re preparing for surgery, newly post-op, or years into your ostomy journey, 
            we&apos;re here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-botanical">
              Shop Products
              <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
            </Link>
            <Link href="/ostomy-knowledge" className="btn-botanical-outline">Learn More</Link>
            <Link href="/contact" className="btn-botanical-outline">Get Support</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
