"use client"
import { useState, type FormEvent } from "react"
import { motion } from "motion/react"
import { BackgroundRippleEffect } from "@/components/background-ripple"

export default function WorkshopsPage() {
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
      source: "workshops",
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
      {/* Hero — Two Tracks with Ripple Grid */}
      <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] py-24 px-6">
        <BackgroundRippleEffect rows={12} cols={30} cellSize={56} />

        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#ff9900]/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#00f2ff]/5 blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl w-full mx-auto">
          {/* Hero heading */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/40 block mb-5 font-normal leading-loose">
              Workshops &amp; Outreach
            </span>
            <h1 className="font-(family-name:--font-geist-pixel-square) text-3xl md:text-5xl text-white uppercase tracking-wide leading-[1.15] font-bold mb-6">
              Two Ways to Build
            </h1>
            <div className="h-px w-48 mx-auto bg-linear-to-r from-[#ff9900] to-[#00f2ff] opacity-60 mb-7" />
            <p className="text-white/50 text-sm md:text-base leading-[1.8] font-light max-w-2xl mx-auto">
              Digital Canvas runs hands-on workshops and we partner with companies who want to do the same. Whether you&apos;re here to learn or here to lead, there&apos;s a seat at the table.
            </p>
          </motion.div>

          {/* Track cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Track 1 — Digital Canvas Workshops */}
            <motion.div
              className="border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm p-8 md:p-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <span className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.3em] text-[#ff9900] mb-5 block font-normal leading-relaxed">
                Track 01
              </span>
              <h2 className="font-(family-name:--font-geist-pixel-square) text-lg md:text-xl text-white uppercase tracking-wide leading-[1.3] font-semibold mb-4">
                Digital Canvas Workshops
              </h2>
              <div className="h-px w-full bg-[#ff9900]/25 mb-5" />
              <p className="text-white/50 text-sm leading-[1.85] font-light mb-6">
                Community-driven sessions where we explore emerging tools, ship real projects, and learn in public. From prompt-to-product pipelines to full-stack deployments — we build together.
              </p>
              <div className="flex items-center gap-2.5 text-[#ff9900] font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] font-normal">
                <span className="inline-block w-1.5 h-1.5 bg-[#ff9900] animate-pulse" />
                Community Powered
              </div>
            </motion.div>

            {/* Track 2 — Sponsored Outreach */}
            <motion.div
              className="border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm p-8 md:p-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <span className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.3em] text-[#00f2ff] mb-5 block font-normal leading-relaxed">
                Track 02
              </span>
              <h2 className="font-(family-name:--font-geist-pixel-square) text-lg md:text-xl text-white uppercase tracking-wide leading-[1.3] font-semibold mb-4">
                Sponsored Workshops
              </h2>
              <div className="h-px w-full bg-[#00f2ff]/25 mb-5" />
              <p className="text-white/50 text-sm leading-[1.85] font-light mb-6">
                Tech companies and local organizations sponsor workshops, choose topics, and get face time with San Antonio&apos;s developer community. You bring the vision — we bring the people.
              </p>
              <div className="flex items-center gap-2.5 text-[#00f2ff] font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] font-normal">
                <span className="inline-block w-1.5 h-1.5 bg-[#00f2ff] animate-pulse" />
                Powered by DevSA
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workshop Spotlight — Dream It, Build It, Ship It */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative border border-[#333] bg-[#0a0a0a] p-8 md:p-12 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="absolute top-4 right-4 font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest bg-[#ff9900] text-[#0a0a0a] px-3 py-1"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Coming Soon
            </motion.span>

            <motion.h2
              className="font-(family-name:--font-geist-pixel-square) text-xl md:text-3xl text-white uppercase tracking-wide leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Dream It, Build It, Ship It
            </motion.h2>

            <div className="h-px w-full bg-linear-to-r from-[#ff9900] via-[#00f2ff] to-[#ff9900] opacity-60 mb-6" />

            <motion.p
              className="text-white/70 text-sm md:text-base leading-relaxed mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Moving from a product idea to a live production environment used to require hours of scaffolding, database configuration, and UI tinkering. Today, that workflow is being compressed into minutes. In this live workshop, we&apos;ll explore importing existing GitHub repos, provisioning databases on the fly, and shipping full-stack applications without ever leaving the v0 interface.
            </motion.p>

            <motion.div
              className="flex items-center gap-3 text-[#ff9900] font-(family-name:--font-geist-pixel-square) text-xs uppercase tracking-widest"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="inline-block w-2 h-2 bg-[#ff9900] animate-pulse" />
              Details Announced Soon
            </motion.div>
          </motion.div>

          {/* Hood Kid | Good Kid */}
          <motion.div
            className="relative border border-[#333] bg-[#0a0a0a] p-8 md:p-12 overflow-hidden mt-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Coming Soon badge */}
            <motion.span
              className="absolute top-4 right-4 font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest bg-[#dc143c] text-white px-3 py-1"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Coming Soon
            </motion.span>

            <motion.h2
              className="font-(family-name:--font-geist-pixel-square) text-xl md:text-3xl text-white uppercase tracking-wide leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hood Kid | Good Kid
            </motion.h2>

            <div className="h-px w-full bg-linear-to-r from-[#dc143c] via-white/30 to-[#dc143c] opacity-60 mb-6" />

            <motion.p
              className="text-white/70 text-sm md:text-base leading-relaxed mb-6 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Street smarts meet boardroom wins. This leadership workshop translates real-world resilience into professional strategy — from mixtape mentality and financial fluency to reinvention and building systems that scale. Earned, not given.
            </motion.p>

            {/* Pillar tags */}
            <motion.div
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {["Mixtape Mentality", "Common Cents", "Reinvention", "API to the Streets"].map((pillar) => (
                <span
                  key={pillar}
                  className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest border border-[#dc143c]/40 text-[#dc143c] px-3 py-1"
                >
                  {pillar}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="flex items-center gap-3 text-[#dc143c] font-(family-name:--font-geist-pixel-square) text-xs uppercase tracking-widest"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="inline-block w-2 h-2 bg-[#dc143c] animate-pulse" />
              Details Announced Soon
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Outreach Program — Who We Want to Work With */}
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
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight mb-6">
              The Outreach Program
            </h2>
            <div className="h-px w-48 mx-auto bg-linear-to-r from-[#00f2ff] to-[#fbbf24] opacity-60 mb-8" />
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              We&apos;re building a bridge between the companies shaping the future of tech and the developers building it every day in San Antonio. Whether you&apos;re a global AI company or a hometown institution — your workshop belongs here.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {[
              { name: "Anthropic", tag: "AI / LLMs" },
              { name: "OpenAI", tag: "AI / Agents" },
              { name: "Cursor", tag: "Dev Tools" },
              { name: "HEB Digital", tag: "Local / Tech" },
              { name: "Frost Bank", tag: "Fintech" },
              { name: "BEXAR County", tag: "Community Development" },
            ].map((company, i) => (
              <motion.div
                key={company.name}
                className="border border-[#333] bg-[#0a0a0a]/80 p-5 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <p className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base text-white uppercase tracking-wide">
                  {company.name}
                </p>
                <span className="text-white/40 text-[10px] font-(family-name:--font-geist-pixel-square) uppercase tracking-widest">
                  {company.tag}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-white/50 text-xs font-(family-name:--font-geist-pixel-square) uppercase tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            And many more — your company could be next
          </motion.p>
        </div>
      </section>

      {/* Contact Form — Sponsor a Workshop */}
      <section className="relative py-20 px-6" id="contact">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight mb-6">
              Let&apos;s Build Together
            </h2>
            <div className="h-px w-48 mx-auto bg-linear-to-r from-[#ff9900] to-[#00f2ff] opacity-60 mb-8" />
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
              Tell us about your goals and we&apos;ll talk about how Digital Canvas can help you meet them in a fun and effective environment. 
            </p>
          </motion.div>

          {formState === "success" ? (
            <motion.div
              className="border border-[#ff9900]/40 bg-[#ff9900]/5 p-8 md:p-12 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex w-12 h-12 border-2 border-[#ff9900] mb-6 items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-(family-name:--font-geist-pixel-square) text-lg text-white uppercase tracking-wide mb-3">
                Message Sent
              </h3>
              <p className="text-white/60 text-sm">
                Thank you for your interest! We&apos;ll be in touch soon.
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
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#ff9900] transition-colors placeholder:text-white/20"
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
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#ff9900] transition-colors placeholder:text-white/20"
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
                  className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#ff9900] transition-colors placeholder:text-white/20"
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
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#ff9900] transition-colors placeholder:text-white/20"
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
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#ff9900] transition-colors placeholder:text-white/20"
                    placeholder="(210) 555-0100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#ff9900] transition-colors resize-none placeholder:text-white/20"
                  placeholder="Tell us about your workshop idea, target audience, or sponsorship goals..."
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
                className="w-full bg-linear-to-r from-[#ff9900] to-[#fbbf24] text-[#0a0a0a] font-(family-name:--font-geist-pixel-square) font-bold text-xs uppercase tracking-widest py-4 px-8 transition-all hover:opacity-90 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === "submitting" ? "Sending..." : "Send Message"}
              </button>

              <p className="text-white/30 text-[10px] text-center font-(family-name:--font-geist-pixel-square) uppercase tracking-widest">
                Powered by DEVSA x 434 MEDIA
              </p>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  )
}
