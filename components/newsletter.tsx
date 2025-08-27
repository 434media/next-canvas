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
  const EMAIL_PLACEHOLDER = "Stay Connected"
  const SUBSCRIBING = "Subscribing..."
  const SUBSCRIBE = "Subscribe"
  const SUCCESS_MESSAGE = "Thanks for subscribing!"
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
            className="flex items-center space-x-3"
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
              className="bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 w-64"
              whileFocus={{ scale: 1.02 }}
            />
            {!isDevelopment && <div ref={turnstileRef} data-size="normal" className="w-full" />}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? SUBSCRIBING : SUBSCRIBE}
            </motion.button>
            {error && <p className="text-white/80 text-sm">{error}</p>}
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
          >
            {SUCCESS_MESSAGE}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
