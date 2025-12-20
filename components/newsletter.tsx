"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

export function Newsletter() {
  // Newsletter static strings
  const EMAIL_PLACEHOLDER = "Enter your email"
  const SUBSCRIBING = "Subscribing..."
  const SUBSCRIBE = "Subscribe"
  const ERROR_PREFIX = "Error:"

  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const responseData = await response.json()

      if (response.ok) {
        setEmail("")
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 5000)
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
