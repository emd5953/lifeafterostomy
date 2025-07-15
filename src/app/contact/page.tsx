// src/app/contact/page.tsx
'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitMessage('Thank you for your message! We will get back to you soon.')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      })
    } catch (error) {
      setSubmitMessage('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              We are here to help you on your ostomy journey. Reach out with any questions, 
              concerns, or feedback.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-emerald-100 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600 mb-2">Send us a message anytime</p>
                  <a href="mailto:info@lifeafterostomy.com" className="text-emerald-600 hover:text-emerald-800 font-medium">
                    info@lifeafterostomy.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Call Us</h3>
                  <p className="text-gray-600 mb-2">Mon-Fri, 9 AM - 5 PM EST</p>
                  <a href="tel:+1-555-0123" className="text-teal-600 hover:text-teal-800 font-medium">
                    (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-cyan-100 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Visit Us</h3>
                  <p className="text-gray-600">
                    123 Healthcare Drive<br />
                    Suite 100<br />
                    Your City, ST 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-emerald-100 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Business Hours</h3>
                  <div className="text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 5:00 PM EST</p>
                    <p>Saturday: 10:00 AM - 2:00 PM EST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/share/1AgNMCnNQD/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-100 hover:bg-blue-200 p-3 rounded-full transition-colors"
                >
                  <span className="text-blue-600 text-xl">📘</span>
                </a>
                <a 
                  href="https://www.instagram.com/lifeafterostomy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-pink-100 hover:bg-pink-200 p-3 rounded-full transition-colors"
                >
                  <span className="text-pink-600 text-xl">📷</span>
                </a>
                <a 
                  href="https://youtube.com/@lifeafterostomy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-red-100 hover:bg-red-200 p-3 rounded-full transition-colors"
                >
                  <span className="text-red-600 text-xl">📺</span>
                </a>
                <a 
                  href="https://www.linkedin.com/company/life-after-ostomy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-100 hover:bg-blue-200 p-3 rounded-full transition-colors"
                >
                  <span className="text-blue-700 text-xl">💼</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="order">Order Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {submitMessage && (
                  <div className={`p-4 rounded-lg ${
                    submitMessage.includes('error') 
                      ? 'bg-red-50 border border-red-200 text-red-600' 
                      : 'bg-emerald-50 border border-emerald-200 text-emerald-600'
                  }`}>
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Send className="h-5 w-5 mr-2" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Quick Help */}
            <div className="mt-6 bg-emerald-50 rounded-xl p-6">
              <div className="flex items-start">
                <MessageCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Quick Help?</h3>
                  <p className="text-gray-600 mb-3">
                    Check out our comprehensive knowledge base for immediate answers to common questions.
                  </p>
                  <a 
                    href="/ostomy-knowledge" 
                    className="text-emerald-600 hover:text-emerald-800 font-medium"
                  >
                    Visit Knowledge Base →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How quickly do you ship orders?</h3>
              <p className="text-gray-600">
                We process and ship most orders within 1-2 business days. Standard shipping typically takes 3-5 business days.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you accept insurance?</h3>
              <p className="text-gray-600">
                We work with many insurance providers. Contact us with your insurance information and we will help verify coverage.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I return products?</h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day return policy for unopened products. Your satisfaction is our priority.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you offer educational resources?</h3>
              <p className="text-gray-600">
                Absolutely! We have books, guides, and a comprehensive knowledge base to support your ostomy journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}