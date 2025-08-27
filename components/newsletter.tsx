"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

// Extend the Window interface to include the turnstile property
declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void }) => string
      getResponse: (widgetId: string) => string | null
      reset: (widgetId: string) => void
    }
  }
}

const isDevelopment = process.env.NODE_ENV === "development"

export function Newsletter() {
  // Newsletter static strings
  const EMAIL_PLACEHOLDER = "Enter your email"
  const SUBSCRIBING = "Subscribing..."
  const SUBSCRIBE = "Subscribe"
  const SUCCESS_MESSAGE = "Thanks for subscribing! Check your email for confirmation."
  const ERROR_PREFIX = "Error:"

  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const [turnstileWidget, setTurnstileWidget] = useState<string | null>(null)

  useEffect(() => {
    if (!isDevelopment && !window.turnstile) {
      const script = document.createElement("script")
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"
      script.async = true
      script.defer = true
      document.body.appendChild(script)

      script.onload = () => {
        if (window.turnstile && turnstileRef.current && !turnstileWidget) {
          const widgetId = window.turnstile.render(turnstileRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
            callback: (token: string) => {
              console.log("Turnstile token:", token)
            },
          })
          setTurnstileWidget(widgetId)
        }
      }

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [turnstileWidget])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      let turnstileResponse = undefined

      if (!isDevelopment) {
        if (!window.turnstile || !turnstileWidget) {
          throw new Error("Turnstile is not initialized")
        }

        turnstileResponse = window.turnstile.getResponse(turnstileWidget)
        if (!turnstileResponse) {
          throw new Error("Failed to get Turnstile response")
        }
      }

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(turnstileResponse && { "cf-turnstile-response": turnstileResponse }),
        },
        body: JSON.stringify({ email }),
      })

      const responseData = await response.json()

      if (response.ok) {
        setEmail("")
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 5000)
        if (!isDevelopment && turnstileWidget) {
          if (window.turnstile) {
            window.turnstile.reset(turnstileWidget)
          }
        }
      } else {
        throw new Error(responseData.error || "Newsletter subscription failed")
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error)
      setError(
        `${ERROR_PREFIX} ${error instanceof Error ? error.message : String(error)}. Please try again.`,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="subscribe-form"
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
          >
            <motion.input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={EMAIL_PLACEHOLDER}
              className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder-black/50 focus:outline-none focus:ring-0 transition-all duration-300"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-black text-white font-bold uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-black border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ fontFamily: "Arial Black, sans-serif" }}
            >
              {isSubmitting ? SUBSCRIBING : SUBSCRIBE}
            </motion.button>
            {!isDevelopment && <div ref={turnstileRef} data-size="normal" className="w-full mt-2" />}
            {error && <p className="text-black/80 text-sm">{error}</p>}
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <div className="text-black text-3xl mb-2">✓</div>
            <p className="text-black font-bold">Thanks for subscribing!</p>
            <p className="text-black/70 text-sm">Check your email for confirmation.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
