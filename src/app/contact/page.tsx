// src/app/contact/page.tsx
'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '', inquiryType: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitMessage('Thank you for your message! We will get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '', inquiryType: 'general' })
    } catch {
      setSubmitMessage('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: Mail, title: 'Email Us', subtitle: 'Send us a message anytime', value: 'lifeafterostomyllc@gmail.com', href: 'mailto:lifeafterostomyllc@gmail.com' },
    { icon: Phone, title: 'Call Us', subtitle: 'Mon-Fri, 9 AM - 5 PM EST', value: '(555) 123-4567', href: 'tel:+1-555-0123' },
    { icon: MapPin, title: 'Visit Us', subtitle: '123 Healthcare Drive, Suite 100', value: 'Your City, ST 12345', href: null },
    { icon: Clock, title: 'Business Hours', subtitle: 'Monday - Friday: 9 AM - 5 PM', value: 'Saturday: 10 AM - 2 PM', href: null },
  ]

  const faqs = [
    { q: 'How quickly do you ship orders?', a: 'We process and ship most orders within 1-2 business days. Standard shipping typically takes 3-5 business days.' },
    { q: 'Do you accept insurance?', a: 'We work with many insurance providers. Contact us with your insurance information and we will help verify coverage.' },
    { q: 'Can I return products?', a: 'Yes, we offer a 30-day return policy for unopened products. Your satisfaction is our priority.' },
    { q: 'Do you offer educational resources?', a: 'Absolutely! We have books, guides, and a comprehensive knowledge base to support your ostomy journey.' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="section-botanical pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-4">Get in <span className="italic">Touch</span></h1>
            <p className="text-lg text-foreground/70 leading-relaxed">We are here to help you on your ostomy journey. Reach out with any questions, concerns, or feedback.</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-3xl font-semibold mb-8">Contact <span className="italic">Information</span></h2>
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex items-start group">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mr-4 transition-transform duration-500 group-hover:scale-110">
                    <item.icon className="h-5 w-5 text-foreground/60" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-foreground/60 text-sm mb-1">{item.subtitle}</p>
                    {item.href ? (
                      <a href={item.href} className="text-foreground hover:text-foreground/70 transition-colors duration-300">{item.value}</a>
                    ) : (
                      <p className="text-foreground/80">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <h3 className="font-serif text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex flex-wrap gap-3">
                {['Facebook', 'Instagram', 'YouTube', 'LinkedIn'].map((social) => (
                  <a key={social} href="#" className="px-4 py-2 rounded-full bg-muted text-sm text-foreground/70 hover:bg-foreground hover:text-background transition-all duration-300">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="card-botanical p-8">
              <h2 className="font-serif text-2xl font-semibold mb-6">Send a <span className="italic">Message</span></h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-foreground/70 mb-2">Inquiry Type</label>
                  <select id="inquiryType" name="inquiryType" value={formData.inquiryType} onChange={handleInputChange} className="input-botanical">
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="order">Order Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-2">Full Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="input-botanical" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-2">Email *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="input-botanical" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground/70 mb-2">Subject *</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className="input-botanical" placeholder="Brief subject" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-2">Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="input-botanical rounded-3xl" placeholder="How can we help?" />
                </div>
                {submitMessage && (
                  <div className={`p-4 rounded-2xl text-sm ${submitMessage.includes('error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {submitMessage}
                  </div>
                )}
                <button type="submit" disabled={isSubmitting} className="w-full btn-botanical py-4 disabled:opacity-50">
                  {isSubmitting ? 'Sending...' : <><Send className="h-4 w-4 mr-2" strokeWidth={1.5} />Send Message</>}
                </button>
              </form>
            </div>

            {/* Quick Help */}
            <div className="mt-6 card-botanical p-6 bg-muted border-0">
              <h3 className="font-serif text-lg font-semibold mb-2">Need Quick Help?</h3>
              <p className="text-foreground/60 text-sm mb-3">Check our knowledge base for immediate answers.</p>
              <Link href="/ostomy-knowledge" className="inline-flex items-center text-sm font-medium text-foreground hover:text-foreground/70 transition-colors duration-300">
                Visit Knowledge Base <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <h2 className="font-serif text-3xl font-semibold text-center mb-12">Frequently Asked <span className="italic">Questions</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="card-botanical p-6">
                <h3 className="font-serif text-lg font-semibold mb-2">{faq.q}</h3>
                <p className="text-foreground/60 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
