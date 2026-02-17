"use client"

import { useState, type FormEvent } from "react"
import { motion, AnimatePresence } from "motion/react"

/* ─── Stats Data ─── */
const stats = [
  {
    value: "100%",
    label: "Human in the Loop",
    description:
      "Every decision point reviewed by a human operator. No hallucinated outputs. No improvised answers. No creative interpretation of your data.",
  },
  {
    value: "AI SDK",
    label: "Provider Agnostic",
    description:
      "The AI SDK standardizes integrating artificial intelligence models across supported providers. One interface, any model — swap providers without rewriting your agent logic.",
  },
  {
    value: "RAG",
    label: "Structured Retrieval",
    description:
      "Ask complex questions, get highly accurate answers from your data. Structured RAG pipelines that never imagine facts or improvise on the plan.",
  },
  {
    value: "24/7",
    label: "Always-On Agents",
    description:
      "Consistent, accurate AI agents that do serious work.",
  },
]

/* ─── Solutions Data ─── */
const solutions = [
  {
    title: "Custom Integrated Websites",
    description:
      "White-label web solutions with built-in databases, Stripe payments, Resend email, and admin CRM — onboarded and ready to launch under your brand.",
    color: "#ff9900",
  },
  {
    title: "CMS & Admin Dashboard",
    description:
      "Content management and customer relationship tools baked into every build. Manage content, track leads, and run operations from a single admin panel.",
    color: "#00f2ff",
  },
  {
    title: "Payments & Billing",
    description:
      "Stripe-powered checkout, subscriptions, and invoicing integrated from day one. Accept payments, manage plans, and automate billing workflows out of the box.",
    color: "#fbbf24",
  },
  {
    title: "Email & Notifications",
    description:
      "Transactional email via Resend, newsletter campaigns, and automated notifications — all wired into your CMS and CRM for seamless communication.",
    color: "#a855f7",
  },
]

/* ─── Stat Item Component ─── */
function StatItem({
  stat,
  index,
  isActive,
  onActivate,
}: {
  stat: (typeof stats)[0]
  index: number
  isActive: boolean
  onActivate: () => void
}) {
  return (
    <motion.button
      onClick={onActivate}
      className="relative text-left w-full group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
    >
      {/* Active indicator */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-px transition-colors duration-300 ${
          isActive ? "bg-[#ff9900]" : "bg-[#222] group-hover:bg-white/20"
        }`}
      />

      <div className="pl-6 py-4">
        <p
          className={`font-(family-name:--font-geist-pixel-square) text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight transition-colors duration-300 ${
            isActive ? "text-white" : "text-white/20 group-hover:text-white/40"
          }`}
        >
          {stat.value}
        </p>
        <p
          className={`font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.3em] mt-3 transition-colors duration-300 font-normal leading-loose ${
            isActive
              ? "text-[#ff9900]"
              : "text-white/20 group-hover:text-white/30"
          }`}
        >
          {stat.label}
        </p>
      </div>
    </motion.button>
  )
}

/* ─── Page ─── */
export default function AgentsPage() {
  const [activeStatIndex, setActiveStatIndex] = useState(0)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState("submitting")
    setErrorMessage("")

    const form = e.currentTarget
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      source: "agents-notify",
    }

    try {
      const res = await fetch("/api/sponsor-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || "Something went wrong")
      }

      setFormState("success")
      form.reset()
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong")
      setFormState("error")
    }
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* ── Hero: Stats Section ── */}
      <section className="relative min-h-dvh flex flex-col justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#ff9900]/3 blur-[200px]" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#00f2ff]/3 blur-[200px]" />
        </div>

        {/* Top border accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#ff9900]/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-32 md:py-40">
          {/* Heading */}
          <motion.div
            className="mb-16 md:mb-24"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/30 block mb-5 font-normal leading-loose">
              Digital Canvas Agents
            </span>
            <h1 className="font-(family-name:--font-geist-pixel-square) text-3xl md:text-5xl lg:text-6xl text-white font-bold leading-[1.1] tracking-wide max-w-4xl">
              Human in the Loop.{" "}
              <span className="text-white/30">Every&nbsp;time.</span>
            </h1>
          </motion.div>

          {/* Stats grid — desktop: horizontal row, mobile: vertical stack */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-0 border-l border-[#222]">
            {stats.map((stat, index) => (
              <StatItem
                key={stat.label}
                stat={stat}
                index={index}
                isActive={activeStatIndex === index}
                onActivate={() => setActiveStatIndex(index)}
              />
            ))}
          </div>

          {/* Active stat description */}
          <div className="mt-8 md:mt-12 max-w-2xl min-h-20">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeStatIndex}
                className="text-white/50 text-sm md:text-base leading-[1.85] font-light"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {stats[activeStatIndex].description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#222]" />
      </section>

      {/* ── Get Notified CTA ── */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="absolute top-0 left-0 right-0 h-px bg-[#222]" />

        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white font-bold leading-[1.15] tracking-wide mb-6">
              Interested in learning more?
            </h2>
            <p className="text-white/40 text-sm md:text-base leading-[1.85] font-light max-w-xl mx-auto mb-10">
              We'll reach out when agents and solutions go live. No spam, just updates on our launch and early access opportunities.
            </p>

            {/* Arrow toggle */}
            <motion.button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="group mx-auto flex items-center justify-center w-14 h-14 border border-[#333] hover:border-[#ff9900] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle notification form"
            >
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-white/40 group-hover:text-[#ff9900] transition-colors duration-300"
                animate={{ rotate: isFormOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </motion.svg>
            </motion.button>

            {/* Form */}
            <AnimatePresence>
              {isFormOpen && (
                <motion.div
                  className="mt-10 max-w-lg mx-auto text-left"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {formState === "success" ? (
                    <motion.div
                      className="border border-[#ff9900]/30 bg-[#ff9900]/5 p-8 text-center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="w-3 h-3 bg-[#ff9900] mx-auto mb-4 animate-pulse" />
                      <p className="font-(family-name:--font-geist-pixel-square) text-sm uppercase tracking-[0.2em] text-[#ff9900] font-semibold mb-2">
                        You&apos;re on the list
                      </p>
                      <p className="text-white/40 text-sm leading-relaxed font-light">
                        We&apos;ll reach out when agents and solutions go live.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-white/30 font-normal block mb-2">
                            First Name
                          </label>
                          <input
                            name="firstName"
                            required
                            className="w-full bg-transparent border border-[#333] text-white text-sm px-4 py-3 focus:border-[#ff9900] focus:outline-none transition-colors placeholder:text-white/20"
                            placeholder="First"
                          />
                        </div>
                        <div>
                          <label className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-white/30 font-normal block mb-2">
                            Last Name
                          </label>
                          <input
                            name="lastName"
                            required
                            className="w-full bg-transparent border border-[#333] text-white text-sm px-4 py-3 focus:border-[#ff9900] focus:outline-none transition-colors placeholder:text-white/20"
                            placeholder="Last"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-white/30 font-normal block mb-2">
                          Company
                        </label>
                        <input
                          name="company"
                          required
                          className="w-full bg-transparent border border-[#333] text-white text-sm px-4 py-3 focus:border-[#ff9900] focus:outline-none transition-colors placeholder:text-white/20"
                          placeholder="Company name"
                        />
                      </div>

                      <div>
                        <label className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-white/30 font-normal block mb-2">
                          Work Email
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          className="w-full bg-transparent border border-[#333] text-white text-sm px-4 py-3 focus:border-[#ff9900] focus:outline-none transition-colors placeholder:text-white/20"
                          placeholder="you@company.com"
                        />
                      </div>

                      <div>
                        <label className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-white/30 font-normal block mb-2">
                          Phone
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          className="w-full bg-transparent border border-[#333] text-white text-sm px-4 py-3 focus:border-[#ff9900] focus:outline-none transition-colors placeholder:text-white/20"
                          placeholder="(optional)"
                        />
                      </div>

                      <div>
                        <label className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-white/30 font-normal block mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          rows={3}
                          className="w-full bg-transparent border border-[#333] text-white text-sm px-4 py-3 focus:border-[#ff9900] focus:outline-none transition-colors resize-none placeholder:text-white/20"
                          placeholder="Tell us what you're looking for (optional)"
                        />
                      </div>

                      {formState === "error" && (
                        <p className="text-red-400 text-sm font-light">{errorMessage}</p>
                      )}

                      <button
                        type="submit"
                        disabled={formState === "submitting"}
                        className="w-full py-3 bg-[#ff9900] text-[#0a0a0a] font-(family-name:--font-geist-pixel-square) text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#ffaa22] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {formState === "submitting" ? "Submitting..." : "Notify Me"}
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
