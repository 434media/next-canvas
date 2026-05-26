"use client"
import { useState, type FormEvent } from "react"
import { motion } from "motion/react"
import { BackgroundRippleEffect } from "@/components/background-ripple"

const upcomingSessions = [
  {
    title: "Prompt to Production",
    industry: "SaaS · Founders",
    model: "v0 + Vercel",
    description:
      "From a prompt to a live full-stack app — database, auth, public URL — in a single session. Ship one app in an hour, take the pattern home.",
    accent: "#ff9900",
    status: "Coming Soon",
  },
  {
    title: "Hood Kid | Good Kid",
    industry: "Leadership · Reinvention",
    model: "Claude + agents",
    description:
      "Street smarts to boardroom wins. Translating real-world resilience into systems that scale — mixtape mentality, common cents, reinvention, API to the streets.",
    accent: "#dc143c",
    status: "Coming Soon",
    pillars: ["Mixtape Mentality", "Common Cents", "Reinvention", "API to the Streets"],
  },
]

const sectors = [
  { name: "SaaS & Founders", tag: "Workflow Pipelines" },
  { name: "Fintech", tag: "Compliance + AI" },
  { name: "Retail / CPG", tag: "Content Ops" },
  { name: "Civic & Public", tag: "Community Tools" },
  { name: "Healthcare", tag: "RAG + Records" },
  { name: "Media & Creative", tag: "Editorial Loops" },
]

export default function WorkshopsPage() {
  const [waitlistState, setWaitlistState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [waitlistError, setWaitlistError] = useState("")

  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleWaitlist(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setWaitlistState("submitting")
    setWaitlistError("")

    const form = e.currentTarget
    const email = (form.elements.namedItem("waitlistEmail") as HTMLInputElement).value

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tags: ["skills-waitlist", "workflows-by-digital-canvas"] }),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || "Something went wrong")
      }

      setWaitlistState("success")
      form.reset()
    } catch (err) {
      setWaitlistError(err instanceof Error ? err.message : "Something went wrong")
      setWaitlistState("error")
    }
  }

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
      source: "skills-inquiry",
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
      {/* Hero — Workflows by Digital Canvas */}
      <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] py-24 px-6">
        <BackgroundRippleEffect rows={12} cols={30} cellSize={56} />

        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#00f2ff]/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#ff9900]/5 blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl w-full mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#00f2ff] font-bold">
                02
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f2ff]" />
              <span className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/60">
                Workflows
              </span>
            </div>
            <h1 className="font-(family-name:--font-geist-pixel-square) text-3xl md:text-5xl text-white uppercase tracking-wide leading-[1.2] font-black mb-6">
              Workflows{" "}
              <span className="text-white/40 font-medium">by Digital Canvas</span>
            </h1>
            <div className="h-px w-48 mx-auto bg-linear-to-r from-[#00f2ff] to-[#ff9900] opacity-60 mb-7" />
            <p className="text-white/50 text-sm md:text-base leading-[1.8] font-medium max-w-2xl mx-auto">
              Free monthly workshops. Bite-size workflow examples by industry and AI model — ship one in an hour, take the pattern home.
            </p>
          </motion.div>

          {/* Format strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              className="border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.3em] text-[#00f2ff] mb-3 block font-bold">
                Monthly
              </span>
              <p className="text-white/60 text-sm leading-[1.7]">
                A new workflow shipped live, every month. Different industry, different model, same one-hour format.
              </p>
            </motion.div>
            <motion.div
              className="border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.3em] text-[#fbbf24] mb-3 block font-bold">
                Free
              </span>
              <p className="text-white/60 text-sm leading-[1.7]">
                No ticket, no pitch deck, no upsell mid-session. Bring a laptop and leave with a working pattern.
              </p>
            </motion.div>
            <motion.div
              className="border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.3em] text-[#ff9900] mb-3 block font-bold">
                Real Work
              </span>
              <p className="text-white/60 text-sm leading-[1.7]">
                Built with Claude, MCP, v0, and small composable tools. Workflows you can take into Monday morning.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#00f2ff] mb-3 font-bold">
              Upcoming Sessions
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight">
              What we&apos;re shipping next
            </h2>
          </motion.div>

          {upcomingSessions.map((session, idx) => (
            <motion.div
              key={session.title}
              className="relative border border-[#333] bg-[#0a0a0a] p-8 md:p-12 overflow-hidden mb-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
            >
              <motion.span
                className="absolute top-4 right-4 font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest px-3 py-1"
                style={{ backgroundColor: session.accent, color: session.accent === "#dc143c" ? "#fff" : "#0a0a0a" }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {session.status}
              </motion.span>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span
                  className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] font-bold"
                  style={{ color: session.accent }}
                >
                  {session.industry}
                </span>
                <span className="text-white/30 text-[10px]">·</span>
                <span className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-white/50">
                  {session.model}
                </span>
              </div>

              <h3 className="font-(family-name:--font-geist-pixel-square) text-xl md:text-3xl text-white uppercase tracking-wide leading-tight mb-6">
                {session.title}
              </h3>

              <div
                className="h-px w-full mb-6 opacity-60"
                style={{ background: `linear-gradient(to right, ${session.accent}, transparent)` }}
              />

              <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
                {session.description}
              </p>

              {session.pillars && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {session.pillars.map((pillar) => (
                    <span
                      key={pillar}
                      className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest border px-3 py-1"
                      style={{ borderColor: `${session.accent}66`, color: session.accent }}
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Waitlist — primary CTA */}
      <section className="relative py-20 px-6 overflow-hidden" id="waitlist">
        <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />

        <div className="relative max-w-3xl mx-auto">
          <motion.div
            className="border border-[#00f2ff]/30 bg-[#0a0a0a] p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#00f2ff] mb-4 font-bold">
              Get the next session
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight mb-6">
              One email when{" "}
              <span className="text-white/40 font-medium">we ship the next workflow</span>
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-[1.8] mb-8 max-w-xl">
              No newsletter spam. One email per month with the session details and the working pattern from the last one.
            </p>

            {waitlistState === "success" ? (
              <div className="flex items-center gap-3 text-[#00f2ff] font-(family-name:--font-geist-pixel-square) text-xs uppercase tracking-widest">
                <span className="inline-block w-2 h-2 bg-[#00f2ff]" />
                You&apos;re on the list. See you at the next session.
              </div>
            ) : (
              <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  name="waitlistEmail"
                  required
                  placeholder="you@company.com"
                  className="flex-1 bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-4 focus:outline-none focus:border-[#00f2ff] transition-colors placeholder:text-white/20"
                />
                <button
                  type="submit"
                  disabled={waitlistState === "submitting"}
                  className="bg-[#00f2ff] text-[#0a0a0a] font-(family-name:--font-geist-pixel-square) font-bold text-xs uppercase tracking-widest py-4 px-8 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {waitlistState === "submitting" ? "Adding..." : "Join Waitlist"}
                </button>
              </form>
            )}
            {waitlistState === "error" && (
              <p className="text-red-400 text-sm font-(family-name:--font-geist-pixel-square) mt-4">
                {waitlistError}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Sectors we ship for */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#fbbf24] mb-3 font-bold">
              Sectors we ship for
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight mb-6">
              Different industry. Different model.{" "}
              <span className="text-white/40 font-medium">Same one-hour format.</span>
            </h2>
            <div className="h-px w-48 mx-auto bg-linear-to-r from-[#00f2ff] to-[#fbbf24] opacity-60 mb-8" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sectors.map((sector, i) => (
              <motion.div
                key={sector.name}
                className="border border-[#333] bg-[#0a0a0a]/80 p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <p className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base text-white uppercase tracking-wide mb-1">
                  {sector.name}
                </p>
                <span className="text-white/40 text-[10px] font-(family-name:--font-geist-pixel-square) uppercase tracking-widest">
                  {sector.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond the workshop — consultancy upsell */}
      <section className="relative py-20 px-6" id="contact">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#a855f7] mb-3 font-bold">
              Beyond the workshop
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight mb-6">
              Want the workflow built{" "}
              <span className="text-white/40 font-medium">into your stack?</span>
            </h2>
            <div className="h-px w-48 mx-auto bg-linear-to-r from-[#a855f7] to-[#00f2ff] opacity-60 mb-8" />
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
              Workshops show the pattern. We also build them into production for teams who need it live next quarter. Tell us what you&apos;re working on.
            </p>
          </motion.div>

          {formState === "success" ? (
            <motion.div
              className="border border-[#a855f7]/40 bg-[#a855f7]/5 p-8 md:p-12 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex w-12 h-12 border-2 border-[#a855f7] mb-6 items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-(family-name:--font-geist-pixel-square) text-lg text-white uppercase tracking-wide mb-3">
                Message Sent
              </h3>
              <p className="text-white/60 text-sm">
                Thanks — we&apos;ll be in touch within two business days.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="border border-[#333] bg-[#111] p-8 md:p-12 space-y-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#a855f7] transition-colors placeholder:text-white/20"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#a855f7] transition-colors placeholder:text-white/20"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#a855f7] transition-colors placeholder:text-white/20"
                  placeholder="Acme Corp"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#a855f7] transition-colors placeholder:text-white/20"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#a855f7] transition-colors placeholder:text-white/20"
                    placeholder="(210) 555-0100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 mb-2">
                  What workflow are you trying to ship? *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#a855f7] transition-colors resize-none placeholder:text-white/20"
                  placeholder="The problem, the stack, the deadline. Rough is fine — we&apos;ll come back with questions."
                />
              </div>

              {formState === "error" && (
                <p className="text-red-400 text-sm font-(family-name:--font-geist-pixel-square)">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full bg-linear-to-r from-[#a855f7] to-[#00f2ff] text-[#0a0a0a] font-(family-name:--font-geist-pixel-square) font-bold text-xs uppercase tracking-widest py-4 px-8 transition-all hover:opacity-90 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === "submitting" ? "Sending..." : "Start the Conversation"}
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  )
}
