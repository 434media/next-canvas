"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { ArrowRight, Lock, FileText, X, CheckCircle2, Loader2 } from "lucide-react"

interface SponsorCard {
  id: string
  name: string
  tagline: string
  logo: string
  image: string
  slug: string
  available: boolean
  comingSoon?: boolean
}

const sponsorDecks: SponsorCard[] = [
  {
    id: "devsa",
    name: "DEVSA",
    tagline: "From Community to Content",
    logo: "https://devsa-assets.s3.us-east-2.amazonaws.com/devsa-white.svg",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/devsa-group.jpg",
    slug: "/sponsors/devsa",
    available: true,
  },
  {
    id: "vemos-vamos",
    name: "Vemos Vamos",
    tagline: "Bicultural Media for a new generation",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/vemos-vamos/vemos-vamos-logo.png",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/Website+VV+Assets.png",
    slug: "/sponsors/vemos-vamos",
    available: false,
    comingSoon: true,
  },
  {
    id: "txmx-boxing",
    name: "TXMX Boxing",
    tagline: "Levantamos Los Puños",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/txmx-logo.png",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/bam2.jpg",
    slug: "/sponsors/txmx-boxing",
    available: false,
    comingSoon: true,
  },
]

export default function SponsorsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formError, setFormError] = useState('')

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    setFormError('')

    try {
      const response = await fetch('/api/sponsor-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'sponsor-digitalcanvas'
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit')
      }

      setFormStatus('success')
      setFormData({ firstName: '', lastName: '', company: '', email: '', phone: '', message: '' })
    } catch (error) {
      setFormStatus('error')
      setFormError(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <main className="min-h-dvh bg-black overflow-x-hidden overflow-y-auto pt-20 md:pt-32 lg:pt-40">
      {/* Hero Section with Digital Canvas Logo */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 border-b border-white/10">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-black via-zinc-900/50 to-black" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/digital-canvas-dark.svg"
              alt="Digital Canvas"
              className="w-80 sm:w-[500px] max-w-[90vw] h-auto mx-auto invert"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
          >
            <FileText className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-semibold tracking-wider uppercase text-white/70">
              Sponsorship Opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4"
          >
            Partner With Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Explore sponsorship opportunities across our creative network. 
            Each property offers unique ways to connect with our most engaged communities in San Antonio and beyond.
          </motion.p>
        </div>
      </section>

      {/* Pitch Decks Directory */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-wider uppercase text-amber-500 mb-3">
              Pitch Deck Directory
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Select a Property
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Click on an available property to view detailed sponsorship tiers, 
              benefits, and investment opportunities.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sponsorDecks.map((deck, index) => (
              <motion.div
                key={deck.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {deck.available ? (
                  <Link
                    href={deck.slug}
                    className="group block relative bg-zinc-900/50 border border-white/10 overflow-hidden transition-all hover:border-amber-500/50 hover:bg-zinc-800/50"
                  >
                    {/* Gradient accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-500 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="p-6 sm:p-8">
                      {/* Property Image Box */}
                      <div className="relative h-40 mb-6 overflow-hidden rounded-lg">
                        <img 
                          src={deck.image} 
                          alt={deck.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                        {/* Logo overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img 
                            src={deck.logo} 
                            alt={deck.name}
                            className="max-h-12 max-w-[80%] object-contain drop-shadow-lg"
                          />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2 text-center">
                        {deck.name}
                      </h3>
                      <p className="text-sm text-white/50 text-center mb-6">
                        {deck.tagline}
                      </p>
                      
                      <div className="flex items-center justify-center gap-2 text-amber-500 text-sm font-semibold group-hover:gap-3 transition-all">
                        <span>View Pitch Deck</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="relative bg-zinc-900/30 border border-white/5 overflow-hidden opacity-50 cursor-not-allowed">
                    {/* Coming Soon Badge */}
                    {deck.comingSoon && (
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2 py-1 bg-black/50 border border-white/10 rounded-full">
                        <Lock className="w-3 h-3 text-white/40" />
                        <span className="text-[10px] font-semibold tracking-wider uppercase text-white/40">
                          Coming Soon
                        </span>
                      </div>
                    )}
                    
                    <div className="p-6 sm:p-8">
                      {/* Property Image Box */}
                      <div className="relative h-40 mb-6 overflow-hidden rounded-lg grayscale">
                        <img 
                          src={deck.image} 
                          alt={deck.name}
                          className="w-full h-full object-cover opacity-40"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
                        {/* Logo overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img 
                            src={deck.logo} 
                            alt={deck.name}
                            className="max-h-12 max-w-[80%] object-contain opacity-30"
                          />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white/40 mb-2 text-center">
                        {deck.name}
                      </h3>
                      <p className="text-sm text-white/30 text-center mb-6">
                        {deck.tagline}
                      </p>
                      
                      <div className="flex items-center justify-center gap-2 text-white/20 text-sm font-semibold">
                        <Lock className="w-4 h-4" />
                        <span>Coming Soon</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-white/50 mb-4">
              Interested in a custom partnership? Let&apos;s talk.
            </p>
            <button
              onClick={() => { setIsFormOpen(true); setFormStatus('idle'); setFormError(''); }}
              className="inline-flex items-center gap-2 bg-white hover:bg-white/90 px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Sponsor Inquiry Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setIsFormOpen(false) }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-black border border-white/20 rounded-lg shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-white">Partner With Digital Canvas</h2>
                  <p className="text-sm text-white/50 mt-1">Tell us about your sponsorship interests</p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close form"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {formStatus === 'success' ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Thank You!</h3>
                    <p className="text-white/50 mb-6">We&apos;ve received your inquiry and will be in touch soon.</p>
                    <button
                      onClick={() => setIsFormOpen(false)}
                      className="px-6 py-2 bg-white hover:bg-white/90 text-black font-semibold rounded transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-white/70 mb-1">
                          First Name <span className="text-white/50">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-white/70 mb-1">
                          Last Name <span className="text-white/50">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-white/70 mb-1">
                        Company <span className="text-white/50">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                        placeholder="Company name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
                        Work Email <span className="text-white/50">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                        placeholder="you@company.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none"
                        placeholder="Tell us about your sponsorship interests, goals, or questions..."
                      />
                    </div>

                    {formStatus === 'error' && (
                      <div className="p-3 bg-white/5 border border-white/20 rounded text-white/70 text-sm">
                        {formError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-white/90 disabled:bg-white/50 disabled:cursor-not-allowed text-black font-bold uppercase tracking-wider transition-colors"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
