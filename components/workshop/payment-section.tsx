"use client"

import { motion } from "motion/react"
import { CreditCard, Shield, CheckCircle, Lock, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface PaymentSectionProps {
  theme: "good" | "hood"
}

export function PaymentSection({ theme }: PaymentSectionProps) {
  const isDark = theme === "hood"

  const handlePayment = async () => {
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Payment error:", error)
    }
  }

  const benefits = isDark
    ? [
        "Stripe secure processing — Your money's safe",
        "Proposal + signed agreement locked in first",
        "Payment plans? We got you",
        "30+ days out? Full refund, no questions",
      ]
    : [
        "Secure payment processing via Stripe",
        "Confirmed proposal and signed agreement required",
        "Flexible payment plans available",
        "Full refund policy for cancellations 30+ days out",
      ]

  return (
    <section className={`relative overflow-hidden px-6 py-24 ${isDark ? "bg-[#0a0a0a]" : "bg-gray-50"}`}>
      {/* Background elements for Hood Kid */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {/* Bold rectangular blocks */}
          <div className="absolute top-32 left-20 w-36 h-3 bg-[#dc143c] rotate-[-15deg]" />
          <div className="absolute bottom-40 right-10 w-40 h-2 bg-white rotate-12" />
          
          {/* Vinyl records */}
          <div className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full border-4 border-white">
            <div className="absolute inset-4 rounded-full bg-[#dc143c]" />
            <div className="absolute inset-8 rounded-full bg-black" />
          </div>
          
          {/* Bold X marks */}
          <div className="absolute bottom-20 left-1/4 text-8xl font-black text-white rotate-12">X</div>
          <div className="absolute top-1/3 right-20 text-6xl font-black text-[#dc143c] rotate-[-18deg]">X</div>
          
          {/* Stars */}
          <div className="absolute top-20 left-1/3 text-5xl text-[#dc143c]">★</div>
          <div className="absolute bottom-1/4 right-40 text-4xl text-white">★</div>
          
          {/* Adidas stripes */}
          <div className="absolute bottom-40 left-10 space-y-2 rotate-[-20deg]">
            <div className="w-24 h-1 bg-white" />
            <div className="w-24 h-1 bg-white" />
            <div className="w-24 h-1 bg-white" />
          </div>
          
          {/* Dollar sign */}
          <div className="absolute bottom-0 left-0 font-(--font-menda-black) text-[200px] text-[#dc143c]">$</div>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`overflow-hidden rounded-2xl p-8 md:p-12 ${
            isDark
              ? "border-4 border-white bg-linear-to-br from-[#1a1a1a] via-[#121212] to-[#0a0a0a]"
              : "bg-white shadow-2xl"
          }`}
          style={isDark ? { transform: "rotate(-0.5deg)" } : {}}
        >
          {/* Header */}
          <div className="mb-8">
            {isDark ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#dc143c] bg-[#0a0a0a]">
                    <CreditCard className="text-[#dc143c]" size={32} />
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center bg-white">
                    <Zap className="text-black" size={32} />
                  </div>
                </div>
                <h2 className="mb-2 font-(--font-menda-black) text-5xl tracking-tighter text-white md:text-6xl">
                  LOCK IT IN
                </h2>
                <div className="inline-block border-b-8 border-[#dc143c] pb-2">
                  <p className="font-(--font-menda-black) text-2xl text-[#f5f5f5]">Secure Your Workshop Date</p>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2563eb]/10">
                  <CreditCard className="text-[#2563eb]" size={32} />
                </div>
                <div>
                  <h2 className="font-bold text-3xl text-[#1a1a1a] md:text-4xl">Secure Your Date</h2>
                  <p className="text-[#2563eb]">Finalize your workshop booking</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <p className={`mb-8 text-lg leading-relaxed ${isDark ? "text-[#a3a3a3]" : "text-gray-700"}`}>
            {isDark ? (
              <>
                Ready to roll? <span className="font-bold text-[#dc143c]">Lock in your date</span> with a secure
                retainer payment. We handle the rest —{" "}
                <span className="font-bold text-white">proposal, agreement, the whole nine</span>.
              </>
            ) : (
              <>
                Ready to move forward? Finalize your retainer payment to lock in your workshop date and begin the
                transformation process.
              </>
            )}
          </p>

          {/* Benefits list */}
          <div className="mb-8 space-y-4">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex items-start gap-3 rounded-lg p-4 ${isDark ? "bg-[#1a1a1a]/50" : "bg-gray-50"}`}
              >
                <CheckCircle
                  className={`mt-1 shrink-0 ${isDark ? "text-white" : "text-green-600"}`}
                  size={24}
                />
                <span className={`font-medium ${isDark ? "text-[#f5f5f5]" : "text-[#1a1a1a]"}`}>{item}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div
            className={`rounded-xl p-6 ${
              isDark ? "border-2 border-[#dc143c] bg-[#0a0a0a]" : "bg-linear-to-r from-[#2563eb]/5 to-[#1e40af]/5"
            }`}
          >
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
              <div className="text-center sm:text-left">
                <p className={`mb-1 font-bold text-sm ${isDark ? "text-white" : "text-gray-600"}`}>
                  {isDark ? "SECURE PAYMENT VIA" : "Powered by"}
                </p>
                <div className="flex items-center gap-2">
                  <Shield className={isDark ? "text-white" : "text-[#2563eb]"} size={24} />
                  <span className={`font-bold text-xl ${isDark ? "text-[#f5f5f5]" : "text-[#1a1a1a]"}`}>Stripe</span>
                  <Lock className={isDark ? "text-[#666]" : "text-gray-400"} size={16} />
                </div>
                <p className={`mt-1 text-xs ${isDark ? "text-[#666]" : "text-gray-500"}`}>256-bit SSL encryption</p>
              </div>

              <Button
                onClick={handlePayment}
                className={`gap-3 px-8 py-6 font-bold text-lg ${
                  isDark
                    ? "layered-shadow bg-[#dc143c] text-white hover:bg-white hover:text-black"
                    : "bg-[#2563eb] text-white hover:bg-[#1e40af]"
                }`}
              >
                <Shield size={20} />
                {isDark ? "Proceed to Payment" : "Proceed to Secure Payment"}
              </Button>
            </div>
          </div>

          {/* Fine print */}
          <p className={`mt-6 text-center text-xs ${isDark ? "text-[#666]" : "text-gray-500"}`}>
            {isDark
              ? "All engagements need a confirmed proposal + signed agreement before payment. Standard business."
              : "All engagements require a confirmed proposal and signed agreement prior to payment processing."}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
