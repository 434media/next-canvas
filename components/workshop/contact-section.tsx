"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "motion/react"
import { Send, Mail, Phone, MapPin, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContactSectionProps {
  theme: "good" | "hood"
}

export function ContactSection({ theme }: ContactSectionProps) {
  const isDark = theme === "hood"
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      title: formData.get("title"),
      organization: formData.get("organization"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      engagementType: formData.get("engagementType"),
      challenge: formData.get("challenge"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitMessage(
          isDark
            ? "BET! We'll hit you back in 24hrs. Let's work."
            : "Thank you! We'll be in touch within 24 hours to discuss your custom proposal.",
        )
        ;(e.target as HTMLFormElement).reset()
      } else {
        setSubmitMessage(isDark ? "Something broke. Try again." : "Something went wrong. Please try again.")
      }
    } catch (error) {
      setSubmitMessage(isDark ? "Something broke. Try again." : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className={`relative overflow-hidden px-6 py-24 ${isDark ? "bg-[#121212]" : "bg-white"}`}>
      {/* Background elements */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-[#ff6b35]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -right-20 bottom-20 h-48 w-48 bg-[#00ff88]"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left column - Header and info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {isDark ? (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <div
                    className="mb-4 inline-block border-8 border-[#ff6b35] bg-black px-6 py-3"
                    style={{ transform: "rotate(-2deg)" }}
                  >
                    <Zap className="inline-block text-[#ffd23f]" size={32} />
                  </div>
                  <h2
                    className="distressed-text mb-2 font-[var(--font-menda-black)] text-6xl tracking-tighter text-[#ff6b35] md:text-7xl"
                    data-text="LET'S"
                  >
                    LET'S
                  </h2>
                  <h3 className="font-[var(--font-menda-black)] text-5xl text-[#ffd23f] md:text-6xl">WORK</h3>
                  <div className="mt-4 h-2 w-48 bg-[#00ff88]" style={{ transform: "rotate(-1deg)" }} />
                </motion.div>

                <p className="mb-8 text-lg leading-relaxed text-[#a3a3a3]">
                  Ready to bring <span className="font-bold text-[#ff6b35]">real talk</span> to your team? Fill out the
                  form and let's build something <span className="font-bold text-[#ffd23f]">that scales</span>.
                </p>

                {/* Contact info boxes */}
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: "Email", value: "info@434media.com", color: "#ff6b35" },
                    { icon: Phone, label: "Phone", value: "(210) 555-0199", color: "#ffd23f" },
                    { icon: MapPin, label: "Location", value: "San Antonio, TX", color: "#00ff88" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-4 border-l-4 bg-[#1a1a1a] p-4"
                      style={{ borderColor: item.color }}
                    >
                      <item.icon style={{ color: item.color }} size={24} />
                      <div>
                        <div className="text-xs text-[#666]">{item.label}</div>
                        <div className="font-bold text-[#f5f5f5]">{item.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="mb-4 font-bold text-5xl text-[#1a1a1a] md:text-6xl">Let's Connect</h2>
                <p className="mb-8 text-lg text-gray-700">
                  Ready to transform your team's approach to leadership? Book your Lighthouse Workshop and start the
                  journey today.
                </p>

                <div className="space-y-4 rounded-xl bg-gray-50 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563eb]/10">
                      <Mail className="text-[#2563eb]" size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Email</div>
                      <div className="font-semibold text-[#1a1a1a]">info@434media.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563eb]/10">
                      <Phone className="text-[#2563eb]" size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Phone</div>
                      <div className="font-semibold text-[#1a1a1a]">(210) 555-0199</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* Right column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-xl p-8 ${
              isDark
                ? "border-4 border-[#ff6b35] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]"
                : "bg-gray-50 shadow-xl"
            }`}
            style={isDark ? { transform: "rotate(1deg)" } : {}}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className={`mb-2 block font-bold text-sm ${isDark ? "text-[#ffd23f]" : "text-[#1a1a1a]"}`}
                  >
                    NAME *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder={isDark ? "Your name" : "Full name"}
                    className={
                      isDark
                        ? "border-2 border-[#333] bg-[#0a0a0a] text-[#f5f5f5] placeholder:text-[#666] focus:border-[#ff6b35]"
                        : "border-gray-300"
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="title"
                    className={`mb-2 block font-bold text-sm ${isDark ? "text-[#ffd23f]" : "text-[#1a1a1a]"}`}
                  >
                    TITLE *
                  </label>
                  <Input
                    id="title"
                    name="title"
                    required
                    placeholder={isDark ? "Your role" : "Job title"}
                    className={
                      isDark
                        ? "border-2 border-[#333] bg-[#0a0a0a] text-[#f5f5f5] placeholder:text-[#666] focus:border-[#ff6b35]"
                        : "border-gray-300"
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="organization"
                  className={`mb-2 block font-bold text-sm ${isDark ? "text-[#ffd23f]" : "text-[#1a1a1a]"}`}
                >
                  ORGANIZATION *
                </label>
                <Input
                  id="organization"
                  name="organization"
                  required
                  placeholder={isDark ? "Company name" : "Organization name"}
                  className={
                    isDark
                      ? "border-2 border-[#333] bg-[#0a0a0a] text-[#f5f5f5] placeholder:text-[#666] focus:border-[#ff6b35]"
                      : "border-gray-300"
                  }
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className={`mb-2 block font-bold text-sm ${isDark ? "text-[#ffd23f]" : "text-[#1a1a1a]"}`}
                  >
                    EMAIL *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={isDark ? "your@email.com" : "Email address"}
                    className={
                      isDark
                        ? "border-2 border-[#333] bg-[#0a0a0a] text-[#f5f5f5] placeholder:text-[#666] focus:border-[#ff6b35]"
                        : "border-gray-300"
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className={`mb-2 block font-bold text-sm ${isDark ? "text-[#ffd23f]" : "text-[#1a1a1a]"}`}
                  >
                    PHONE
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={isDark ? "(210) 555-0100" : "Phone number"}
                    className={
                      isDark
                        ? "border-2 border-[#333] bg-[#0a0a0a] text-[#f5f5f5] placeholder:text-[#666] focus:border-[#ff6b35]"
                        : "border-gray-300"
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="engagementType"
                  className={`mb-2 block font-bold text-sm ${isDark ? "text-[#ffd23f]" : "text-[#1a1a1a]"}`}
                >
                  ENGAGEMENT TYPE *
                </label>
                <Select name="engagementType" required>
                  <SelectTrigger
                    className={
                      isDark
                        ? "border-2 border-[#333] bg-[#0a0a0a] text-[#f5f5f5] focus:border-[#ff6b35]"
                        : "border-gray-300"
                    }
                  >
                    <SelectValue placeholder={isDark ? "Pick one" : "Select engagement type"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="keynote">Keynote Speech</SelectItem>
                    <SelectItem value="workshop">Full Workshop</SelectItem>
                    <SelectItem value="series">Workshop Series</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="challenge"
                  className={`mb-2 block font-bold text-sm ${isDark ? "text-[#ffd23f]" : "text-[#1a1a1a]"}`}
                >
                  {isDark ? "WHAT'S THE CHALLENGE? *" : "BUSINESS CHALLENGE *"}
                </label>
                <Textarea
                  id="challenge"
                  name="challenge"
                  required
                  rows={4}
                  placeholder={
                    isDark
                      ? "Tell us what you're trying to solve..."
                      : "Describe the challenge you're looking to address"
                  }
                  className={
                    isDark
                      ? "border-2 border-[#333] bg-[#0a0a0a] text-[#f5f5f5] placeholder:text-[#666] focus:border-[#ff6b35]"
                      : "border-gray-300"
                  }
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full gap-2 py-6 font-bold text-lg ${
                  isDark
                    ? "layered-shadow bg-[#ff6b35] text-black hover:bg-[#ffd23f]"
                    : "bg-[#2563eb] text-white hover:bg-[#1e40af]"
                }`}
              >
                {isSubmitting ? (isDark ? "SENDING..." : "Submitting...") : isDark ? "SEND IT" : "Submit Inquiry"}
                <Send size={20} />
              </Button>

              {submitMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center font-bold text-sm ${
                    submitMessage.includes(isDark ? "BET" : "Thank you")
                      ? isDark
                        ? "text-[#00ff88]"
                        : "text-green-600"
                      : isDark
                        ? "text-[#ff0055]"
                        : "text-red-600"
                  }`}
                >
                  {submitMessage}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
