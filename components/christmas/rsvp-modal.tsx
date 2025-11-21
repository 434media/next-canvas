"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface RsvpModalProps {
  isOpen: boolean
  onClose: () => void
}

const isDevelopment = process.env.NODE_ENV === "development"

export function RsvpModal({ isOpen, onClose }: RsvpModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [joinFeed, setJoinFeed] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const [turnstileWidget, setTurnstileWidget] = useState<string | null>(null)

  // Load Turnstile script
  useEffect(() => {
    if (isDevelopment || turnstileWidget || !isOpen) return

    const loadTurnstile = () => {
      if (document.getElementById("turnstile-script")) {
        renderWidget()
        return
      }

      const script = document.createElement("script")
      script.id = "turnstile-script"
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"
      script.async = true
      script.onload = () => renderWidget()
      document.body.appendChild(script)
    }

    const renderWidget = () => {
      setTimeout(() => {
        if (typeof window !== "undefined" && (window as any).turnstile && turnstileRef.current) {
          try {
            const widgetId = (window as any).turnstile.render(turnstileRef.current, {
              sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
              callback: (token: string) => setTurnstileToken(token),
              "expired-callback": () => setTurnstileToken(null),
              theme: "dark",
            })
            setTurnstileWidget(widgetId)
          } catch (e) {
            console.error("Turnstile render error:", e)
          }
        }
      }, 100)
    }

    loadTurnstile()

    return () => {
      // Cleanup if needed
    }
  }, [isOpen, turnstileWidget])

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setName("")
        setEmail("")
        setJoinFeed(true)
        setIsSuccess(false)
        setError(null)
        if (turnstileWidget && typeof window !== "undefined" && (window as any).turnstile) {
          try {
            ;(window as any).turnstile.reset(turnstileWidget)
          } catch (e) {
            console.error("Turnstile reset error:", e)
          }
        }
        setTurnstileToken(null)
      }, 300)
    }
  }, [isOpen, turnstileWidget])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!isDevelopment && !turnstileToken) {
      setError("Please complete the security check")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/christmas-rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cf-turnstile-response": turnstileToken || "",
        },
        body: JSON.stringify({ name, email, joinFeed }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to RSVP")
      }

      setIsSuccess(true)
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900/95 border border-red-500/30 rounded-2xl w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.15)] relative"
            >
              {/* Christmas Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-b from-red-500/5 via-transparent to-green-500/5 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-50"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-6 md:p-8">
                {isSuccess ? (
                  <div className="flex flex-col items-center text-center py-8">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
                    <p className="text-white/60 mb-6">
                      Thanks for RSVPing. We can't wait to celebrate with you!
                    </p>
                    <Button onClick={onClose} className="w-full bg-white text-black hover:bg-white/90">
                      Close
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-6 flex flex-col items-center relative z-10">
                      <div className="relative w-64 h-24 scale-160 md:scale-180 md:hover:scale-185 mb-2 hover:scale-165 transition-transform duration-500">
                        <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full opacity-20" />
                        <Image 
                          src="https://ampd-asset.s3.us-east-2.amazonaws.com/flyers-63-xmas.png" 
                          alt="Digital Canvas Christmas" 
                          fill 
                          className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                        />
                      </div>
                      <p className="text-white/60 text-sm text-balance md:text-base">
                        <strong>RSVP</strong> to secure your spot for the holiday celebration.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-white/80">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Santa Claus"
                          required
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-white/80">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="santa@northpole.com"
                          required
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30"
                        />
                      </div>

                      <div className="flex items-start space-x-3 pt-2">
                        <div className="flex items-center h-5">
                          <input
                            id="joinFeed"
                            type="checkbox"
                            checked={joinFeed}
                            onChange={(e) => setJoinFeed(e.target.checked)}
                            className="w-4 h-4 rounded border-white/30 bg-white/5 text-red-500 focus:ring-red-500 focus:ring-offset-neutral-900 accent-red-500"
                          />
                        </div>
                        <div className="text-sm">
                          <label htmlFor="joinFeed" className="font-medium text-white/90">
                            Join <strong>THE FEED</strong>
                          </label>
                          <p className="text-white/50 text-xs mt-0.5">
                            Connect to THE FEED and discover why <strong>Digital Canvas</strong> is the <strong>Creative Bridge to Everything!</strong>
                          </p>
                        </div>
                      </div>

                      {!isDevelopment && (
                        <div className="flex justify-center py-2">
                          <div ref={turnstileRef} className="min-h-[65px]" />
                        </div>
                      )}

                      {error && (
                        <div className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded border border-red-500/20">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white text-black hover:bg-white/90 h-11 font-medium"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Confirm RSVP"
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
