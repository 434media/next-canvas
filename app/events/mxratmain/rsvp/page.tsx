"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Check, Loader2 } from "lucide-react"
import YouTubeModal from "@/components/youtube-modal"

const isDevelopment = process.env.NODE_ENV === "development"

export default function MxrAtMainRsvpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    joinFeed: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const [turnstileWidget, setTurnstileWidget] = useState<string | null>(null)

  // Load Turnstile script
  useEffect(() => {
    if (isDevelopment || turnstileWidget) return

    const loadTurnstile = () => {
      if (document.getElementById("turnstile-script")) return

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
            callback: () => {
              // Token received, no action needed here
            },
          })
          setTurnstileWidget(widgetId)
        }
      }
    }

    loadTurnstile()

    return () => {
      // Clean up widget when component unmounts
      if (turnstileWidget && typeof window !== "undefined" && (window as any).turnstile) {
        try {
          ;(window as any).turnstile.reset(turnstileWidget)
        } catch (error) {
          console.error("Error resetting Turnstile widget:", error)
        }
      }
    }
  }, [turnstileWidget])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      let turnstileResponse = undefined

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

      if (!response.ok) {
        throw new Error("Failed to submit RSVP")
      }

      setIsSuccess(true)

      // Reset Turnstile if needed
      if (!isDevelopment && turnstileWidget && typeof window !== "undefined" && (window as any).turnstile) {
        ;(window as any).turnstile.reset(turnstileWidget)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="w-full bg-white text-black">
      <section className="relative min-h-screen w-full pt-20 md:pt-24 md:pb-12 overflow-hidden">
        {/* Building as decorative background element - positioned right */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%] md:w-[40%] pointer-events-none hidden md:block">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative w-full h-full"
          >
            <Image
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/mxratmain-tower.png"
              alt="MXR@MAIN - 434 MEDIA Building"
              fill
              className="object-contain object-bottom-right opacity-40 md:opacity-60"
              priority
              sizes="45vw"
            />
          </motion.div>
        </div>

        {/* Centered Form Content */}
        <div className="relative z-10 max-w-lg mx-auto px-6 h-full flex flex-col justify-center py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full text-center"
          >
            <h1 className="flex flex-col items-center w-fit mx-auto mb-4 md:mb-6 font-black">
              <span className="block text-[#c41e3a] text-[5.8rem] md:text-[9.3rem] leading-[0.9] tracking-tighter">
                MXR
              </span>
              <span className="block text-[#c41e3a] text-6xl md:text-8xl leading-[0.9] tracking-tighter -mt-2 md:-mt-4">
                @MAIN
              </span>
            </h1>

            <div className="flex flex-col items-center gap-2 md:gap-3 mb-6 md:mb-8 max-w-md mx-auto">
              <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-base md:text-lg font-bold text-black uppercase tracking-tighter leading-tight">
                <span className="whitespace-nowrap">Dec 12, 2025</span>
                <span className="text-[#c41e3a]">•</span>
                <span className="whitespace-nowrap">6-10 PM</span>
                <span className="hidden md:inline text-[#c41e3a]">•</span>
                <span className="whitespace-nowrap w-full md:w-auto">300 Main</span>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-black/80 font-medium leading-snug max-w-md">
                Bring an unwrapped children's toy (ages 2+)
                <span className="block text-[#c41e3a] font-bold tracking-tighter">
                  Donations benefit the Good Hood Affordable Christmas
                </span>
              </p>
            </div>

            {/* RSVP Form */}
            <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#228b22] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#228b22] mb-2">You're on the list!</h3>
                  <p className="text-black/70 text-sm md:text-base">
                    Thanks for RSVPing. We can't wait to see you there.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="block text-xs font-bold uppercase tracking-wider text-black/60 text-left"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c41e3a] focus:border-transparent transition-all text-base"
                      placeholder="Santa Claus"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-wider text-black/60 text-left"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c41e3a] focus:border-transparent transition-all text-base"
                      placeholder="santa@northpole.com"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <div className="flex items-center h-5">
                      <input
                        id="joinFeed"
                        type="checkbox"
                        checked={formData.joinFeed}
                        onChange={(e) => setFormData({ ...formData, joinFeed: e.target.checked })}
                        className="w-5 h-5 text-[#c41e3a] border-gray-300 rounded focus:ring-[#c41e3a] accent-[#c41e3a]"
                      />
                    </div>
                    <label
                      htmlFor="joinFeed"
                      className="text-xs sm:text-sm text-black/70 leading-tight cursor-pointer select-none text-left"
                    >
                      Connect to THE FEED and experience why <strong>Digital Canvas</strong> is the{" "}
                      <strong>Creative Bridge to Everything!</strong>
                    </label>
                  </div>

                  {error && <div className="text-[#c41e3a] text-sm font-medium text-center">{error}</div>}

                  {!isDevelopment && (
                    <div
                      ref={turnstileRef}
                      data-theme="light"
                      data-size="flexible"
                      className="w-full flex justify-center"
                      aria-label="Security verification"
                    />
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 md:py-4 bg-[#c41e3a] text-white font-bold text-base md:text-lg uppercase tracking-widest hover:bg-[#a31a2f] transition-colors duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Confirm RSVP"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative w-full -mt-24 md:mt-0 py-2 md:py-0">
        {/* Mobile Footer Image */}
        <div className="md:hidden relative w-full bg-white overflow-hidden">
          <div className="relative w-full h-[75vh] flex items-center justify-center">
            <Image
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/mxr-rsvp-mobile.jpg"
              alt="MXR@MAIN RSVP"
              fill
              className="object-contain object-center"
            />

            {/* Easter Egg Trigger */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-20 cursor-pointer flex items-center justify-center"
              onClick={() => setIsEasterEggOpen(true)}
            >
              <div className="w-6 h-6 rounded-full bg-[#c41e3a]/90 shadow-[0_0_50px_25px_rgba(255,255,255,0.4)] animate-pulse blur-xl" />
            </div>
          </div>
        </div>

        {/* Desktop Footer Image - fills more space */}
        <div className="hidden md:block relative w-full py-12 lg:py-16 bg-white">
          <div className="relative w-full h-[70vh] lg:h-[85vh] flex items-center justify-center">
            <Image
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/mxr-rsvp-desktop.jpg"
              alt="MXR@MAIN RSVP"
              fill
              className="object-contain object-center drop-shadow-2xl"
            />

            {/* Easter Egg Trigger */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 z-20 cursor-pointer group flex items-center justify-center"
              onClick={() => setIsEasterEggOpen(true)}
            >
              <div className="w-24 h-24 rounded-full bg-white/0 group-hover:bg-white/20 group-hover:shadow-[0_0_80px_40px_rgba(255,255,255,0.5)] transition-all duration-700 ease-in-out blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      <YouTubeModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
        videoId="ey0PZpeAIqU"
        title="Caballito (visualizer)"
        artist="Vanita Leo"
      />
    </main>
  )
}
