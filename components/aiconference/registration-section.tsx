"use client"

import { useState } from "react"
import { motion } from "motion/react"

// Aztec-inspired geometric pattern for background
function AztecBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#fbbf24 1px, transparent 1px),
            linear-gradient(90deg, #fbbf24 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Gradient overlays */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#fbbf24]/5 blur-[200px]" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#ff9900]/5 blur-[200px]" />
    </div>
  )
}

// Corner decoration component
function AztecCornerLarge({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const rotations = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }
  
  return (
    <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 ${rotations[position]}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M0 0h8v64H0z" fill="#333" />
        <path d="M0 0h64v8H0z" fill="#333" />
        <path d="M16 16h4v24h-4z" fill="#fbbf24" opacity="0.6" />
        <path d="M16 16h24v4H16z" fill="#fbbf24" opacity="0.6" />
        <path d="M28 28h2v12h-2z" fill="#ff9900" opacity="0.4" />
        <path d="M28 28h12v2H28z" fill="#ff9900" opacity="0.4" />
      </svg>
    </div>
  )
}

// Border decoration
function AztecBorder() {
  return (
    <div className="h-1 w-full bg-linear-to-r from-[#fbbf24] via-[#ff9900] to-[#fbbf24] opacity-60" />
  )
}

export function RegistrationSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    subscribeToFeed: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/event-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      setIsSubmitted(true)
    } catch (err) {
      console.error("Registration error:", err)
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="register" className="relative py-20 sm:py-28 bg-[#0a0a0a] overflow-hidden" data-bg-type="dark">
      <AztecBackground />
      
      {/* Large corner decorations */}
      <div className="absolute top-0 left-0 z-10"><AztecCornerLarge position="top-left" /></div>
      <div className="absolute top-0 right-0 z-10"><AztecCornerLarge position="top-right" /></div>
      <div className="absolute bottom-0 left-0 z-10"><AztecCornerLarge position="bottom-left" /></div>
      <div className="absolute bottom-0 right-0 z-10"><AztecCornerLarge position="bottom-right" /></div>
      
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="max-w-md mx-auto mb-8">
            <AztecBorder />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight mb-4">
            Register
          </h2>
          <p className="text-[#a3a3a3] text-lg leading-relaxed">
            Join San Antonio's builders, dreamers, and technologists as we explore how AI is transforming the way we write code, test, automate, and ship
          </p>
          <p className="text-[#ff9900] text-base font-semibold mt-2 uppercase tracking-widest">
            February 28, 2026 • Geekdom
          </p>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isSubmitted ? (
            <div className="border border-[#27ca40]/50 bg-[#27ca40]/10 p-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 border border-[#27ca40] bg-[#0a0a0a]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#27ca40" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wide mb-3">
                You&apos;re Registered!
              </h3>
              <p className="text-[#a3a3a3] text-base leading-relaxed mb-2">
                Thank you for registering for More Human Than Human.
              </p>
              <p className="text-[#737373] text-sm leading-relaxed">
                We&apos;ll send event details and updates to your email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-[#333] bg-[#111] p-6 sm:p-8">
              {error && (
                <div className="mb-6 p-4 border border-[#ff5f56]/50 bg-[#ff5f56]/10 text-[#ff5f56] text-sm font-medium">
                  {error}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#737373] mb-2">
                    First Name <span className="text-[#ff9900]">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white text-sm font-normal leading-relaxed placeholder:text-[#525252] focus:outline-none focus:border-[#ff9900] transition-colors"
                    placeholder="John"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#737373] mb-2">
                    Last Name <span className="text-[#ff9900]">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white text-sm font-normal leading-relaxed placeholder:text-[#525252] focus:outline-none focus:border-[#ff9900] transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#737373] mb-2">
                  Email <span className="text-[#ff9900]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white text-sm font-normal leading-relaxed placeholder:text-[#525252] focus:outline-none focus:border-[#ff9900] transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              {/* Company */}
              <div className="mb-6">
                <label htmlFor="company" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#737373] mb-2">
                  Company <span className="text-[#525252]">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white text-sm font-normal leading-relaxed placeholder:text-[#525252] focus:outline-none focus:border-[#ff9900] transition-colors"
                  placeholder="Acme Inc."
                />
              </div>

              {/* Subscribe to Feed */}
              <div className="mb-8">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      name="subscribeToFeed"
                      checked={formData.subscribeToFeed}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border border-[#333] bg-[#0a0a0a] peer-checked:bg-[#ff9900] peer-checked:border-[#ff9900] transition-colors flex items-center justify-center">
                      {formData.subscribeToFeed && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="3">
                          <polyline points="20,6 9,17 4,12" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-[#a3a3a3] text-sm leading-relaxed group-hover:text-white transition-colors">
                    Subscribe to THE FEED and access our latest newsletters, articles, videos, and podcasts from the Digital Canvas community.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#fbbf24] text-[#0a0a0a] font-bold text-sm uppercase tracking-widest py-4 px-6 transition-all hover:bg-[#ff9900] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Register Now"
                )}
              </button>

              {/* Footer note */}
              <p className="mt-6 text-center text-[#525252] font-mono text-[10px] uppercase tracking-[0.15em]">
                Free Event • Limited Capacity
              </p>
            </form>
          )}
        </motion.div>

        {/* Bottom border */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-md mx-auto mt-12"
        >
          <AztecBorder />
        </motion.div>
      </div>
    </section>
  )
}
