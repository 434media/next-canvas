"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { Laptop, Gift, Heart, CheckCircle2, Calendar, MapPin, Clock, AlertCircle } from "lucide-react"

const isDevelopment = process.env.NODE_ENV === "development"
const TOTAL_CHROMEBOOKS = 50

export default function VanitaLeoClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
    reason: "",
    // New fields
    levantaTechNewsletter: false,
    affordableInternetInterest: false,
    primaryLanguage: "",
    ethnicity: "",
    race: "",
    gender: "",
    streetAddress: "",
    city: "",
    state: "TX",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [availableCount, setAvailableCount] = useState<number | null>(null)
  const [isSoldOut, setIsSoldOut] = useState(false)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const [turnstileWidget, setTurnstileWidget] = useState<string | null>(null)
  
  // Waitlist state
  const [waitlistData, setWaitlistData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [isWaitlistSubmitting, setIsWaitlistSubmitting] = useState(false)
  const [isWaitlistSubmitted, setIsWaitlistSubmitted] = useState(false)
  const [waitlistError, setWaitlistError] = useState("")
  const waitlistTurnstileRef = useRef<HTMLDivElement>(null)
  const [waitlistTurnstileWidget, setWaitlistTurnstileWidget] = useState<string | null>(null)

  // Check inventory on mount
  useEffect(() => {
    checkInventory()
  }, [])

  // Load Turnstile script
  useEffect(() => {
    if (isDevelopment || turnstileWidget || isSoldOut || isSubmitted) return

    const loadTurnstile = () => {
      if (document.getElementById("turnstile-script")) {
        // Script already loaded, just render widget
        if (typeof window !== "undefined" && (window as any).turnstile && turnstileRef.current) {
          const widgetId = (window as any).turnstile.render(turnstileRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
            callback: () => {},
          })
          setTurnstileWidget(widgetId)
        }
        return
      }

      const script = document.createElement("script")
      script.id = "turnstile-script"
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"
      script.async = true
      script.defer = true
      document.body.appendChild(script)

      script.onload = () => {
        if (typeof window !== "undefined" && (window as any).turnstile && turnstileRef.current) {
          const widgetId = (window as any).turnstile.render(turnstileRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
            callback: () => {},
          })
          setTurnstileWidget(widgetId)
        }
      }
    }

    loadTurnstile()

    return () => {
      if (turnstileWidget && typeof window !== "undefined" && (window as any).turnstile) {
        try {
          ;(window as any).turnstile.reset(turnstileWidget)
        } catch (error) {
          console.error("Error resetting Turnstile widget:", error)
        }
      }
    }
  }, [turnstileWidget, isSoldOut, isSubmitted])

  // Load Turnstile for waitlist when sold out
  useEffect(() => {
    if (isDevelopment || waitlistTurnstileWidget || !isSoldOut || isWaitlistSubmitted) return

    const renderWidget = () => {
      if (typeof window !== "undefined" && (window as any).turnstile && waitlistTurnstileRef.current) {
        const widgetId = (window as any).turnstile.render(waitlistTurnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
          callback: () => {},
        })
        setWaitlistTurnstileWidget(widgetId)
        return true
      }
      return false
    }

    const loadWaitlistTurnstile = () => {
      const existingScript = document.getElementById("turnstile-script")
      
      if (existingScript) {
        // Script exists - check if turnstile is ready
        if ((window as any).turnstile) {
          renderWidget()
        } else {
          // Script exists but not loaded yet - wait for it
          existingScript.addEventListener("load", () => {
            renderWidget()
          })
          // Also poll in case the event already fired
          const checkInterval = setInterval(() => {
            if ((window as any).turnstile) {
              clearInterval(checkInterval)
              renderWidget()
            }
          }, 100)
          // Clean up after 10 seconds
          setTimeout(() => clearInterval(checkInterval), 10000)
        }
        return
      }

      const script = document.createElement("script")
      script.id = "turnstile-script"
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"
      script.async = true
      script.defer = true
      document.body.appendChild(script)

      script.onload = () => {
        renderWidget()
      }
    }

    loadWaitlistTurnstile()

    return () => {
      if (waitlistTurnstileWidget && typeof window !== "undefined" && (window as any).turnstile) {
        try {
          ;(window as any).turnstile.reset(waitlistTurnstileWidget)
        } catch (error) {
          console.error("Error resetting waitlist Turnstile widget:", error)
        }
      }
    }
  }, [waitlistTurnstileWidget, isSoldOut, isWaitlistSubmitted])

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
      // Get Turnstile token (skip in development)
      let turnstileResponse: string | undefined = undefined
      if (!isDevelopment) {
        if (typeof window === "undefined" || !(window as any).turnstile || !turnstileWidget) {
          throw new Error("Security verification not loaded. Please refresh and try again.")
        }

        turnstileResponse = (window as any).turnstile.getResponse(turnstileWidget)
        if (!turnstileResponse) {
          throw new Error("Please complete the security verification")
        }
      }

      const response = await fetch("/api/christmas-rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(turnstileResponse && { "cf-turnstile-response": turnstileResponse }),
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value
    setFormData((prev) => ({
      ...prev,
      [target.name]: value,
    }))
  }

  const handleWaitlistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setWaitlistData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsWaitlistSubmitting(true)
    setWaitlistError("")

    try {
      // Get Turnstile token (skip in development)
      let turnstileResponse: string | undefined = undefined
      if (!isDevelopment) {
        if (typeof window === "undefined" || !(window as any).turnstile || !waitlistTurnstileWidget) {
          throw new Error("Security verification not loaded. Please refresh and try again.")
        }

        turnstileResponse = (window as any).turnstile.getResponse(waitlistTurnstileWidget)
        if (!turnstileResponse) {
          throw new Error("Please complete the security verification")
        }
      }

      const response = await fetch("/api/christmas-rsvp?action=waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(turnstileResponse && { "cf-turnstile-response": turnstileResponse }),
        },
        body: JSON.stringify(waitlistData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to join waitlist")
      }

      setIsWaitlistSubmitted(true)
    } catch (err: any) {
      setWaitlistError(err.message || "An error occurred. Please try again.")
    } finally {
      setIsWaitlistSubmitting(false)
    }
  }

  return (
    <main className="bg-white">
      <div className="flex flex-col lg:flex-row min-h-screen pt-16 sm:pt-20">
        {/* Left Side - Hero Image (Fixed on desktop, relative on mobile) */}
        <div className="group relative h-[40vh] sm:h-[50vh] lg:h-auto lg:w-1/2 lg:fixed lg:top-16 lg:bottom-0 lg:left-0 overflow-hidden">
          {/* Neon glow overlay - always visible */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-tr from-[#dc2626]/20 via-transparent to-[#00ffff]/20" />
          <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-bl from-[#39ff14]/15 via-transparent to-[#dc2626]/15" />
          
          {/* Scanline effect - always visible */}
          <div className="absolute inset-0 z-20 opacity-30 pointer-events-none" 
            style={{ 
              backgroundImage: 'repeating-linear-linear(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
              backgroundSize: '100% 4px'
            }} 
          />
          
          <video
            src="https://ampd-asset.s3.us-east-2.amazonaws.com/VanitaLeo-loop.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover saturate-[1.2] contrast-[1.1] transition-transform duration-500"
          />
          
          {/* Neon border glow - always visible */}
          <div className="absolute inset-0 z-10 pointer-events-none border-4 border-black" style={{ boxShadow: 'inset 0 0 30px rgba(220,38,38,0.3), inset 0 0 60px rgba(0,255,255,0.2)' }} />
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

          {/* Title Header */}
          <div className="sticky top-16 sm:top-18 z-20 bg-white/95 backdrop-blur-sm px-6 sm:px-8 lg:px-8 pt-6 sm:pt-8 lg:pt-4 pb-6 sm:pb-8 lg:pb-4 border-b-4 border-black">
            <div className="w-full max-w-lg lg:max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Decorative snowflakes */}
                <div className="absolute top-20 left-4 text-[#dc2626] text-2xl lg:text-3xl animate-pulse">❄</div>
                <div className="absolute top-20 right-6 text-[#39ff14] text-xl lg:text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>✦</div>
                
                <h1 className="relative font-dancing-script text-6xl sm:text-7xl lg:text-7xl leading-none tracking-tight bg-linear-to-r from-[#dc2626] via-[#b91c1c] to-[#dc2626] bg-clip-text text-transparent drop-shadow-lg" 
                  style={{ 
                    textShadow: '3px 3px 0 rgba(0,0,0,0.1)',
                    WebkitTextStroke: '1px rgba(0,0,0,0.1)'
                  }}>
                  Vanita Leo
                </h1>
                <div className="flex items-center gap-3 lg:gap-3 mt-3 lg:mt-2">
                  <div className="h-1 lg:h-1 flex-1 bg-linear-to-r from-[#dc2626] via-[#39ff14] to-[#dc2626] rounded-full" />
                  <p className="relative text-3xl sm:text-4xl lg:text-4xl font-black uppercase tracking-[0.2em] lg:tracking-[0.2em] text-[#dc2626] flex items-center gap-2 lg:gap-2" 
                    style={{ textShadow: '2px 2px 0 #000, -1px -1px 0 #39ff14' }}>
                    <span className="text-[#39ff14]">🎄</span>
                    Christmas
                    <span className="text-[#39ff14]">🎄</span>
                  </p>
                  <div className="h-1 lg:h-1 flex-1 bg-linear-to-r from-[#dc2626] via-[#39ff14] to-[#dc2626] rounded-full" />
                </div>
                <p className="text-xs sm:text-sm lg:text-sm font-black uppercase tracking-[0.4em] lg:tracking-[0.4em] text-black/70 mt-2 lg:mt-1 text-center">
                  Laptop Giveaway Event
                </p>
                
                {/* Partner Ornaments - below laptop giveaway text, same width as Christmas */}
                <div className="mt-3 lg:mt-2 md:-mb-2 lg:-mb-1">
                  <p className="text-[10px] sm:text-xs lg:text-xs font-bold uppercase tracking-[0.3em] text-black/40 text-center mb-1.5 lg:mb-1">
                    Partners & Sponsors
                  </p>
                  <div className="flex items-center justify-center gap-0 lg:gap-3 mx-auto" style={{ maxWidth: 'fit-content' }}>
                    {[
                      { src: "https://ampd-asset.s3.us-east-2.amazonaws.com/christmas/flyers-46-434.png", alt: "434 MEDIA", url: "https://www.434media.com/", large: true },
                      { src: "https://ampd-asset.s3.us-east-2.amazonaws.com/christmas/flyers-46-vv.png", alt: "Vemos Vamos", url: "https://vemosvamos.com/", large: true },
                      { src: "https://ampd-asset.s3.us-east-2.amazonaws.com/christmas/flyers-46-levantatech.png", alt: "Levántatech", url: "https://levantatech.org/", large: true },
                      { src: "https://ampd-asset.s3.us-east-2.amazonaws.com/christmas/flyers-46-devsa.png", alt: "DEVSA", url: "https://devsa.community/", large: true },
                      { src: "https://ampd-asset.s3.us-east-2.amazonaws.com/christmas/flyers-46-human.png", alt: "Human I-T", url: "https://www.humanit.org/", large: true },
                      { src: "https://ampd-asset.s3.us-east-2.amazonaws.com/christmas/flyers-46-sdoh.png", alt: "SDOH", url: "https://www.434media.com/en/sdoh", large: true },
                      { src: "https://ampd-asset.s3.us-east-2.amazonaws.com/christmas/flyers-46-velocity.png", alt: "Velocity TX", url: "https://velocitytx.org/", large: true },
                    ].map((ornament, index) => (
                      <motion.a
                        key={ornament.alt}
                        href={ornament.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Visit ${ornament.alt}`}
                        className="block"
                        initial={{ opacity: 0, y: -10, rotate: -5 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          rotate: index % 2 === 0 ? 3 : -3 
                        }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.1 * index,
                          ease: "easeOut"
                        }}
                        whileHover={{ scale: 1.15 }}
                      >
                        <img
                          src={ornament.src}
                          alt={ornament.alt}
                          className={`${ornament.large ? 'w-14 h-14 md:w-20 md:h-20' : 'w-10 h-10 lg:w-10 lg:h-10'} object-cover md:object-contain`}
                          style={{
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                          }}
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="relative px-6 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-8">
            <div className="w-full max-w-lg lg:max-w-xl">
              {/* Event Details */}
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
                <div className="flex items-center gap-1.5 sm:gap-2 text-black bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-black text-xs sm:text-sm shadow-[3px_3px_0_#39ff14]">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#39ff14]" />
                  <span className="font-black uppercase">10AM - 12PM</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-black bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-black text-xs sm:text-sm shadow-[3px_3px_0_#dc2626]">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#dc2626]" />
                  <span className="font-black uppercase">Velocity TX</span>
                </div>
              </motion.div>

              {/* Mission Statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-6 sm:mb-8 p-3 sm:p-4 bg-white border-2 border-black relative"
                style={{ boxShadow: '4px 4px 0 #000' }}
              >
                {/* Decorative corner accents */}
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-[#dc2626]" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#39ff14]" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#39ff14]" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#dc2626]" />
                
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#dc2626] shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-black text-black text-sm sm:text-base mb-1 uppercase tracking-wide">A Critical Step in Closing the Digital Divide</h2>
                    <p className="text-xs sm:text-sm text-black leading-relaxed">
                      Aligned with our work on the Social Determinants of Health (SDOH), this giveaway's goal is to provide essential technology to aspiring women in technology from historically under-resourced San Antonio neighborhoods. Join us in making a meaningful impact on opportunity and access this holiday season.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Inventory Counter */}
              {availableCount !== null && !isSoldOut && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="mb-6 sm:mb-8 p-3 sm:p-4 bg-[#dc2626] border-2 border-black text-center"
                  style={{ boxShadow: '4px 4px 0 #000' }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Laptop className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    <span className="text-white font-black text-lg sm:text-xl uppercase tracking-wide">
                      {availableCount} of {TOTAL_CHROMEBOOKS} Laptops Remaining
                    </span>
                  </div>
                </motion.div>
              )}

              {isSoldOut ? (
                /* Sold Out State with Waitlist */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border-4 border-black relative p-4 sm:p-6"
                  style={{ boxShadow: '6px 6px 0 #000' }}
                >
                  {/* Corner decorations */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#dc2626]" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#39ff14]" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#39ff14]" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#dc2626]" />
                  
                  <div className="text-center mb-4 sm:mb-6">
                    <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-[#dc2626]" />
                    <h3 className="text-lg sm:text-xl font-black text-black mb-1 uppercase tracking-wide">All Laptops Reserved</h3>
                    <p className="text-xs sm:text-sm text-black/70">
                      All {TOTAL_CHROMEBOOKS} laptops have been claimed.
                    </p>
                  </div>

                  {isWaitlistSubmitted ? (
                    /* Waitlist Success State */
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center p-4 sm:p-6 bg-[#39ff14]/10 border-2 border-[#39ff14]"
                    >
                      <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-[#39ff14]" />
                      <h4 className="text-base sm:text-lg font-black text-black mb-1 uppercase">You're on the Waitlist!</h4>
                      <p className="text-xs sm:text-sm text-black">
                        Thanks, <span className="font-black text-[#dc2626]">{waitlistData.firstName}</span>! We'll contact you if a laptop becomes available.
                      </p>
                    </motion.div>
                  ) : (
                    /* Waitlist Form */
                    <div className="border-t-2 border-dashed border-black/30 pt-4 sm:pt-6">
                      <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                        <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-[#39ff14]" />
                        <h4 className="font-black text-black text-sm sm:text-base uppercase tracking-wide">Join the Waitlist</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-black/70 text-center mb-4">
                        Sign up to be notified if a laptop becomes available.
                      </p>

                      {waitlistError && (
                        <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-white border-2 border-[#dc2626] flex items-start gap-2">
                          <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#dc2626] shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-black font-bold">{waitlistError}</p>
                        </div>
                      )}

                      <form onSubmit={handleWaitlistSubmit} className="space-y-2.5 sm:space-y-3">
                        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                          <div>
                            <label htmlFor="waitlistFirstName" className="block text-xs font-black text-black mb-1 uppercase tracking-wide">
                              First Name *
                            </label>
                            <input
                              id="waitlistFirstName"
                              name="firstName"
                              value={waitlistData.firstName}
                              onChange={handleWaitlistChange}
                              required
                              className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white placeholder:text-gray-400"
                              style={{ boxShadow: '2px 2px 0 #000' }}
                              placeholder="Maria"
                            />
                          </div>
                          <div>
                            <label htmlFor="waitlistLastName" className="block text-xs font-black text-black mb-1 uppercase tracking-wide">
                              Last Name *
                            </label>
                            <input
                              id="waitlistLastName"
                              name="lastName"
                              value={waitlistData.lastName}
                              onChange={handleWaitlistChange}
                              required
                              className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white placeholder:text-gray-400"
                              style={{ boxShadow: '2px 2px 0 #000' }}
                              placeholder="Garcia"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="waitlistEmail" className="block text-xs font-black text-black mb-1 uppercase tracking-wide">
                            Email Address *
                          </label>
                          <input
                            id="waitlistEmail"
                            name="email"
                            type="email"
                            value={waitlistData.email}
                            onChange={handleWaitlistChange}
                            required
                            className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white placeholder:text-gray-400"
                            style={{ boxShadow: '2px 2px 0 #000' }}
                            placeholder="maria@email.com"
                          />
                        </div>

                        <div>
                          <label htmlFor="waitlistPhone" className="block text-xs font-black text-black mb-1 uppercase tracking-wide">
                            Phone Number *
                          </label>
                          <input
                            id="waitlistPhone"
                            name="phone"
                            type="tel"
                            value={waitlistData.phone}
                            onChange={handleWaitlistChange}
                            required
                            className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white placeholder:text-gray-400"
                            style={{ boxShadow: '2px 2px 0 #000' }}
                            placeholder="(210) 555-0123"
                          />
                        </div>

                        {/* Turnstile Bot Protection */}
                        {!isDevelopment && (
                          <div className="flex justify-center">
                            <div ref={waitlistTurnstileRef} />
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isWaitlistSubmitting}
                          className="w-full h-10 sm:h-11 bg-[#39ff14] hover:bg-[#32e012] text-black font-black text-sm sm:text-base uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border-2 border-black"
                          style={{ boxShadow: '4px 4px 0 #000' }}
                        >
                          {isWaitlistSubmitting ? (
                            <span className="flex items-center gap-2">
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="inline-block"
                              >
                                <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
                              </motion.span>
                              Joining...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
                              Join Waitlist
                            </span>
                          )}
                        </button>
                      </form>
                    </div>
                  )}
                </motion.div>
              ) : !isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {/* Signup Form */}
                  <div className="bg-white border-4 border-black p-4 sm:p-6 relative" style={{ boxShadow: '6px 6px 0 #000' }}>
                    {/* Corner decorations */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#dc2626]" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#39ff14]" />
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#39ff14]" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#dc2626]" />
                    
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h3 className="font-black text-black text-base sm:text-lg uppercase tracking-wider">Register Now</h3>
                      <Laptop className="w-4 h-4 sm:w-5 sm:h-5 text-[#39ff14]" />
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
                            className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white placeholder:text-gray-400"
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
                            className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white placeholder:text-gray-400"
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
                          className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white placeholder:text-gray-400"
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
                          className="w-full px-2.5 sm:px-3 py-2 border-2 border-black text-sm resize-none focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white placeholder:text-gray-400"
                          style={{ boxShadow: '2px 2px 0 #000' }}
                          placeholder="Tell us your story..."
                        />
                      </div>

                      {/* Physical Address Section */}
                      <div className="pt-3 border-t-2 border-dashed border-black/30">
                        <p className="text-xs font-black text-black mb-2 uppercase tracking-wide">Physical Address *</p>
                        <div className="space-y-2.5">
                          <div>
                            <label htmlFor="streetAddress" className="block text-xs font-bold text-black/70 mb-1">
                              Street Address
                            </label>
                            <input
                              id="streetAddress"
                              name="streetAddress"
                              value={formData.streetAddress}
                              onChange={handleChange}
                              required
                              className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white placeholder:text-gray-400"
                              style={{ boxShadow: '2px 2px 0 #000' }}
                              placeholder="123 Main Street"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-2.5">
                            <div className="col-span-1">
                              <label htmlFor="city" className="block text-xs font-bold text-black/70 mb-1">
                                City
                              </label>
                              <input
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white placeholder:text-gray-400"
                                style={{ boxShadow: '2px 2px 0 #000' }}
                                placeholder="San Antonio"
                              />
                            </div>
                            <div>
                              <label htmlFor="state" className="block text-xs font-bold text-black/70 mb-1">
                                State
                              </label>
                              <input
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white placeholder:text-gray-400"
                                style={{ boxShadow: '2px 2px 0 #000' }}
                                placeholder="TX"
                              />
                            </div>
                            <div>
                              <label htmlFor="zipCode2" className="block text-xs font-bold text-black/70 mb-1">
                                ZIP
                              </label>
                              <input
                                id="zipCode2"
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
                        </div>
                      </div>

                      {/* Primary Language */}
                      <div>
                        <label htmlFor="primaryLanguage" className="block text-xs font-black text-black mb-1 uppercase tracking-wide">
                          Primary Language Spoken at Home *
                        </label>
                        <select
                          id="primaryLanguage"
                          name="primaryLanguage"
                          value={formData.primaryLanguage}
                          onChange={handleChange}
                          required
                          className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white"
                          style={{ boxShadow: '2px 2px 0 #000' }}
                        >
                          <option value="">Select language...</option>
                          <option value="Spanish">Spanish</option>
                          <option value="English">English</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* Demographic Information */}
                      <div className="pt-3 border-t-2 border-dashed border-black/30">
                        <p className="text-xs font-black text-black mb-2 uppercase tracking-wide">Demographic Information *</p>
                        <div className="space-y-2.5">
                          <div>
                            <label htmlFor="ethnicity" className="block text-xs font-bold text-black/70 mb-1">
                              Ethnicity
                            </label>
                            <select
                              id="ethnicity"
                              name="ethnicity"
                              value={formData.ethnicity}
                              onChange={handleChange}
                              required
                              className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white"
                              style={{ boxShadow: '2px 2px 0 #000' }}
                            >
                              <option value="">Select ethnicity...</option>
                              <option value="Hispanic or Latino">Hispanic or Latino</option>
                              <option value="Not Hispanic or Latino">Not Hispanic or Latino</option>
                              <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="race" className="block text-xs font-bold text-black/70 mb-1">
                              Race
                            </label>
                            <select
                              id="race"
                              name="race"
                              value={formData.race}
                              onChange={handleChange}
                              required
                              className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white"
                              style={{ boxShadow: '2px 2px 0 #000' }}
                            >
                              <option value="">Select race...</option>
                              <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                              <option value="Asian">Asian</option>
                              <option value="Black or African American">Black or African American</option>
                              <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                              <option value="White">White</option>
                              <option value="Two or More Races">Two or More Races</option>
                              <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="gender" className="block text-xs font-bold text-black/70 mb-1">
                              Gender
                            </label>
                            <select
                              id="gender"
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              required
                              className="h-9 sm:h-10 w-full px-2.5 sm:px-3 border-2 border-black text-sm focus:outline-none focus:ring-0 focus:border-[#39ff14] bg-white"
                              style={{ boxShadow: '2px 2px 0 #000' }}
                            >
                              <option value="">Select gender...</option>
                              <option value="Female">Female</option>
                              <option value="Male">Male</option>
                              <option value="Non-binary">Non-binary</option>
                              <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Optional Consents */}
                      <div className="pt-3 border-t-2 border-dashed border-black/30 space-y-3">
                        <p className="text-xs font-black text-black uppercase tracking-wide">Optional Preferences</p>
                        
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="levantaTechNewsletter"
                            checked={formData.levantaTechNewsletter}
                            onChange={handleChange}
                            className="mt-0.5 w-4 h-4 border-2 border-black accent-[#39ff14] cursor-pointer"
                          />
                          <span className="text-xs sm:text-sm text-black group-hover:text-[#dc2626] transition-colors">
                            I would like to receive the <strong>Levántatech newsletter</strong> with tech resources and opportunities.
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="affordableInternetInterest"
                            checked={formData.affordableInternetInterest}
                            onChange={handleChange}
                            className="mt-0.5 w-4 h-4 border-2 border-black accent-[#39ff14] cursor-pointer"
                          />
                          <span className="text-xs sm:text-sm text-black group-hover:text-[#dc2626] transition-colors">
                            I would like to hear about <strong>affordable internet options</strong> in my area.
                          </span>
                        </label>
                      </div>

                      {/* Turnstile Bot Protection */}
                      {!isDevelopment && (
                        <div className="flex justify-center">
                          <div ref={turnstileRef} />
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting || isSoldOut}
                        className="w-full h-10 sm:h-11 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-black text-sm sm:text-base uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border-2 border-black"
                        style={{ boxShadow: '4px 4px 0 #000' }}
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
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center p-6 sm:p-8 bg-white border-4 border-black relative"
                  style={{ boxShadow: '6px 6px 0 #000' }}
                >
                  {/* Corner decorations */}
                  <div className="absolute -top-2 -left-2 w-5 h-5 bg-[#dc2626]" />
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#39ff14]" />
                  <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-[#39ff14]" />
                  <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-[#dc2626]" />
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-[#39ff14] border-4 border-black flex items-center justify-center"
                    style={{ boxShadow: '4px 4px 0 #000' }}
                  >
                    <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-black text-black mb-2 uppercase tracking-wide">
                    You're Registered!
                  </h3>
                  <p className="text-sm sm:text-base text-black mb-4 leading-relaxed">
                    Thank you, <span className="font-black text-[#dc2626]">{formData.firstName}</span>! We'll email you with details about picking up your Laptop on December 19th.
                  </p>
                  <div className="p-3 sm:p-4 bg-[#39ff14] border-2 border-black" style={{ boxShadow: '3px 3px 0 #000' }}>
                    <p className="text-xs sm:text-sm text-black font-bold uppercase tracking-wide">
                      📅 Dec 19th, 10AM-12PM<br/>
                      📍 Velocity TX
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
