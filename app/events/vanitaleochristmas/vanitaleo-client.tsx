"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import { Laptop, Gift, Heart, CheckCircle2, Calendar, MapPin, Clock, AlertCircle } from "lucide-react"

const partnerLogos = [
  { name: "Velocity TX", abbr: "VTX" },
  { name: "Que es SDOH", abbr: "SDOH" },
  { name: "Human-IT", abbr: "HIT" },
  { name: "Levantatech", abbr: "LVT" },
  { name: "434 Media", abbr: "434" },
  { name: "DevSA", abbr: "DSA" },
]

const TOTAL_CHROMEBOOKS = 50

export default function VanitaLeoClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
    reason: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [availableCount, setAvailableCount] = useState<number | null>(null)
  const [isSoldOut, setIsSoldOut] = useState(false)

  // Check inventory on mount
  useEffect(() => {
    checkInventory()
  }, [])

  const checkInventory = async () => {
    try {
      const response = await fetch("/api/christmas-rsvp?action=check")
      const data = await response.json()
      setAvailableCount(data.available)
      setIsSoldOut(data.available <= 0)
    } catch (err) {
      console.error("Error checking inventory:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/christmas-rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit registration")
      }

      setIsSubmitted(true)
      setAvailableCount(data.available)
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="bg-white">
      <div className="flex flex-col lg:flex-row min-h-screen pt-16 sm:pt-20">
        {/* Left Side - Hero Image (Fixed on desktop, relative on mobile) */}
        <div className="group relative h-[40vh] sm:h-[50vh] lg:h-auto lg:w-1/2 lg:fixed lg:top-16 lg:bottom-0 lg:left-0 overflow-hidden cursor-pointer">
          {/* Neon glow overlay - always visible */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-tr from-[#dc2626]/20 via-transparent to-[#00ffff]/20" />
          <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-bl from-[#39ff14]/15 via-transparent to-[#dc2626]/15" />
          
          {/* Scanline effect - always visible */}
          <div className="absolute inset-0 z-20 opacity-30 pointer-events-none" 
            style={{ 
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
              backgroundSize: '100% 4px'
            }} 
          />
          
          <Image
            src="https://ampd-asset.s3.us-east-2.amazonaws.com/vanitachristmas.png"
            alt="Vanita Leo Christmas - San Antonio Tejano Artist"
            fill
            className="object-cover object-top lg:object-contain saturate-[1.2] contrast-[1.1] transition-transform duration-500 group-hover:scale-105"
            priority
          />
          
          {/* Neon border glow - always visible */}
          <div className="absolute inset-0 z-10 pointer-events-none border-4 border-[#dc2626]/50" style={{ boxShadow: 'inset 0 0 30px rgba(220,38,38,0.3), inset 0 0 60px rgba(0,255,255,0.2)' }} />
        </div>

        {/* Right Side - Scrollable Content - 80s Synth-Pop "Take On Me" Style */}
        <div className="w-full lg:w-1/2 lg:ml-[50%] relative bg-white">
          {/* Decorative sketch lines background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
            <svg className="absolute w-full h-full" preserveAspectRatio="none">
              <pattern id="sketch-lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20 L40 20" stroke="#000" strokeWidth="0.5" strokeDasharray="2,4" />
                <path d="M20 0 L20 40" stroke="#000" strokeWidth="0.5" strokeDasharray="2,4" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#sketch-lines)" />
            </svg>
          </div>

          {/* Title Header - Neon styled */}
          <div className="sticky top-16 sm:top-18 z-20 bg-white/95 backdrop-blur-sm px-6 sm:px-8 lg:px-12 py-4 md:py-0">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Neon glow effect behind text */}
              <div className="absolute -inset-2 blur-xl bg-linear-to-r from-[#dc2626]/20 via-[#00ffff]/20 to-[#39ff14]/20 rounded-lg" />
              <h1 className="relative font-dancing-script text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight" style={{ textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0 0 20px #dc2626, 0 0 40px #dc2626' }}>
                <span className="text-[#dc2626]">Vanita Leo</span>
              </h1>
              <p className="relative text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-widest mt-2" style={{ textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0 0 15px #00ffff' }}>
                <span className="text-[#00ffff]">Christmas</span>
              </p>
            </motion.div>
          </div>

          {/* Scrollable Content */}
          <div className="relative px-6 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-10">
            <div className="w-full max-w-lg">
              {/* Event Details - Sketch card style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8"
              >
                <div className="flex items-center gap-1.5 sm:gap-2 text-black bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-black text-xs sm:text-sm shadow-[3px_3px_0_#dc2626]">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#dc2626]" />
                  <span className="font-black uppercase">Dec 19th</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-black bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-black text-xs sm:text-sm shadow-[3px_3px_0_#00ffff]">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00ffff]" />
                  <span className="font-black uppercase">9AM - 12PM</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-black bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-black text-xs sm:text-sm shadow-[3px_3px_0_#39ff14]">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#39ff14]" />
                  <span className="font-black uppercase">Velocity TX</span>
                </div>
              </motion.div>

              {/* Mission Statement - Neon border card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-6 sm:mb-8 p-3 sm:p-4 bg-white border-2 border-black relative"
                style={{ boxShadow: '4px 4px 0 #000, 0 0 20px rgba(220,38,38,0.3)' }}
              >
                {/* Decorative corner accents */}
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-[#dc2626]" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00ffff]" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#00ffff]" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#39ff14]" />
                
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#dc2626] shrink-0 mt-0.5" style={{ filter: 'drop-shadow(0 0 4px #dc2626)' }} />
                  <div>
                    <h2 className="font-black text-black text-sm sm:text-base mb-1 uppercase tracking-wide">Fueling Innovation in Our Community</h2>
                    <p className="text-xs sm:text-sm text-black leading-relaxed">
                      Equipping aspiring women in technology from historically under-resourced San Antonio neighborhoods with critical tools for success.
                    </p>
                  </div>
                </div>
              </motion.div>

              {isSoldOut ? (
                /* Sold Out State - 80s Style */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-6 sm:p-8 bg-white border-4 border-black relative"
                  style={{ boxShadow: '6px 6px 0 #000' }}
                >
                  <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-[#dc2626]" style={{ filter: 'drop-shadow(0 0 8px #dc2626)' }} />
                  <h3 className="text-xl sm:text-2xl font-black text-black mb-2 uppercase tracking-wide">All Chromebooks Reserved</h3>
                  <p className="text-sm sm:text-base text-black">
                    All {TOTAL_CHROMEBOOKS} Chromebooks have been claimed. Thank you for your interest!
                  </p>
                </motion.div>
              ) : !isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {/* Signup Form - 80s Synth-Pop Style */}
                  <div className="bg-white border-4 border-black p-4 sm:p-6 relative" style={{ boxShadow: '6px 6px 0 #000' }}>
                    {/* Neon corner decorations */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#dc2626]" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#00ffff]" />
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#39ff14]" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#dc2626]" />
                    
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h3 className="font-black text-black text-base sm:text-lg uppercase tracking-wider" style={{ textShadow: '2px 2px 0 #00ffff' }}>Register Now</h3>
                      <Laptop className="w-4 h-4 sm:w-5 sm:h-5 text-[#39ff14]" style={{ filter: 'drop-shadow(0 0 4px #39ff14)' }} />
                    </div>

                    {error && (
                      <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-white border-2 border-[#dc2626] flex items-start gap-2">
                        <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#dc2626] shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-black font-bold">{error}</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
                      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                        <div>
                          <label htmlFor="firstName" className="block text-xs font-black text-black mb-1 uppercase tracking-wide">
                            First Name *
                          </label>
                          <input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#00ffff] bg-white placeholder:text-gray-400"
                            style={{ boxShadow: '2px 2px 0 #000' }}
                            placeholder="Maria"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-xs font-black text-black mb-1 uppercase tracking-wide">
                            Last Name *
                          </label>
                          <input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#00ffff] bg-white placeholder:text-gray-400"
                            style={{ boxShadow: '2px 2px 0 #000' }}
                            placeholder="Garcia"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-black text-black mb-1 uppercase tracking-wide">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#ff00ff] bg-white placeholder:text-gray-400"
                          style={{ boxShadow: '2px 2px 0 #000' }}
                          placeholder="maria@email.com"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                        <div>
                          <label htmlFor="phone" className="block text-xs font-black text-black mb-1 uppercase tracking-wide">
                            Phone Number *
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white placeholder:text-gray-400"
                            style={{ boxShadow: '2px 2px 0 #000' }}
                            placeholder="(210) 555-0123"
                          />
                        </div>
                        <div>
                          <label htmlFor="zipCode" className="block text-xs font-black text-black mb-1 uppercase tracking-wide">
                            ZIP Code *
                          </label>
                          <input
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{5}"
                            className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white placeholder:text-gray-400"
                            style={{ boxShadow: '2px 2px 0 #000' }}
                            placeholder="78201"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="reason" className="block text-xs font-black text-black mb-1 uppercase tracking-wide">
                          How will a laptop help you? *
                        </label>
                        <textarea
                          id="reason"
                          name="reason"
                          value={formData.reason}
                          onChange={handleChange}
                          required
                          rows={2}
                          className="w-full px-2.5 sm:px-3 py-2 border-2 border-black text-sm resize-none focus:outline-none focus:ring-0 focus:border-[#00ffff] bg-white placeholder:text-gray-400"
                          style={{ boxShadow: '2px 2px 0 #000' }}
                          placeholder="Tell us your story..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || isSoldOut}
                        className="w-full h-10 sm:h-11 bg-black hover:bg-[#dc2626] text-[#39ff14] hover:text-white font-black text-sm sm:text-base uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border-2 border-black"
                        style={{ boxShadow: '4px 4px 0 #39ff14' }}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="inline-block"
                            >
                              <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.span>
                            Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
                            Register Now
                          </span>
                        )}
                      </button>
                    </form>
                  </div>
                </motion.div>
              ) : (
                /* Success State - 80s Neon Style */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center p-6 sm:p-8 bg-white border-4 border-black relative"
                  style={{ boxShadow: '6px 6px 0 #000' }}
                >
                  {/* Neon corners */}
                  <div className="absolute -top-2 -left-2 w-5 h-5 bg-[#dc2626]" />
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#00ffff]" />
                  <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-[#39ff14]" />
                  <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-[#dc2626]" />
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-black border-4 border-[#39ff14] flex items-center justify-center"
                    style={{ boxShadow: '0 0 20px #39ff14' }}
                  >
                    <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#39ff14]" />
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-black text-black mb-2 uppercase tracking-wide" style={{ textShadow: '3px 3px 0 #dc2626' }}>
                    You're Registered!
                  </h3>
                  <p className="text-sm sm:text-base text-black mb-4 leading-relaxed">
                    Thank you, <span className="font-black text-[#dc2626]">{formData.firstName}</span>! We'll email you with details about picking up your Chromebook on December 19th.
                  </p>
                  <div className="p-3 sm:p-4 bg-black border-2 border-[#00ffff]" style={{ boxShadow: '0 0 15px rgba(0,255,255,0.3)' }}>
                    <p className="text-xs sm:text-sm text-[#00ffff] font-bold uppercase tracking-wide">
                      📅 Dec 19th, 9AM-12PM<br/>
                      📍 Velocity TX CRC
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
