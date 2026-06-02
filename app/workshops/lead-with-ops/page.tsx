"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react"

const ACCENT = "#88FF00"
const ACCENT_ALT = "#FF006E"

const FLYER_URL =
  "https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/digitalcanvas%2FInvitation%20only%20Limited%20Executive%20Seating.PNG?alt=media"

const QUESTIONS = [
  "How does AI support business strategy?",
  "Where can AI create measurable ROI?",
  "How do you implement AI across the enterprise?",
]

const AI_ADOPTION_SCALE = [
  { value: 1, label: "Just exploring" },
  { value: 2, label: "Experimenting" },
  { value: 3, label: "In pilots" },
  { value: 4, label: "Scaling" },
  { value: 5, label: "AI-led" },
]

type FormStatus = "idle" | "submitting" | "success" | "error"

export default function LeadWithOpsPage() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [aiAdoptionLevel, setAiAdoptionLevel] = useState<number | null>(null)
  const [confirmation, setConfirmation] = useState<{ firstName: string } | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    setErrorMsg("")

    const form = e.currentTarget
    const formData = new FormData(form)
    const firstName = String(formData.get("firstName") || "").trim()
    const lastName = String(formData.get("lastName") || "").trim()
    const email = String(formData.get("email") || "").trim()
    const optInForUpdates = formData.get("optInForUpdates") === "on"

    if (aiAdoptionLevel === null) {
      setStatus("error")
      setErrorMsg("Please rate your current level of organizational AI adoption.")
      return
    }

    try {
      const res = await fetch("/api/lead-with-ops/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          aiAdoptionLevel,
          optInForUpdates,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || "Registration failed. Please try again.")
      }

      const body = await res.json()
      setConfirmation({ firstName: body?.data?.firstName || firstName })
      setStatus("success")
      form.reset()
      setAiAdoptionLevel(null)
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.")
    }
  }

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      {/* Hero — split layout. Left = event narrative, right = registration form. */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ backgroundImage: `linear-gradient(to right, transparent, ${ACCENT}66, transparent)` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* LEFT — event narrative */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 flex-wrap mb-7"
              >
                <span
                  className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold"
                  style={{ color: ACCENT }}
                >
                  Executive Working Lunch
                </span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                <span className="hidden sm:inline-block h-px w-6 bg-white/15" />
                <span className="inline-flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: ACCENT_ALT }}
                  />
                  <span
                    className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold"
                    style={{ color: ACCENT_ALT }}
                  >
                    Limited Executive Seating
                  </span>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-(family-name:--font-geist-pixel-square) text-3xl md:text-5xl lg:text-6xl text-white uppercase tracking-wide leading-[1.1] font-black mb-6"
              >
                Lead with Ops.{" "}
                <span className="text-white/35 font-medium">Layer in AI.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
              >
                A practical executive working lunch with{" "}
                <span className="text-white font-medium">Adam Carroll, Founder of Carroll Strategy &amp; Operations</span>{" "}
                — clarity on aligning AI initiatives with business strategy, operational priorities, and measurable outcomes.
              </motion.p>

              {/* Event details strip */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#222] border border-[#222] mb-8"
              >
                <div className="bg-[#0a0a0a] p-5 flex items-center gap-3">
                  <Calendar className="w-4 h-4 shrink-0" style={{ color: ACCENT }} />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 mb-1">Date</p>
                    <p className="text-white text-sm font-semibold">June 18, 2026</p>
                  </div>
                </div>
                <div className="bg-[#0a0a0a] p-5 flex items-center gap-3">
                  <Clock className="w-4 h-4 shrink-0" style={{ color: ACCENT }} />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 mb-1">Time</p>
                    <p className="text-white text-sm font-semibold">11:30 AM &ndash; 1:00 PM</p>
                  </div>
                </div>
                <div className="bg-[#0a0a0a] p-5 flex items-center gap-3">
                  <MapPin className="w-4 h-4 shrink-0" style={{ color: ACCENT }} />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 mb-1">Location</p>
                    <p className="text-white text-sm font-semibold">VelocityTX</p>
                  </div>
                </div>
              </motion.div>

              {/* Mobile-only jump-to-form CTA — keeps the form one tap away on small screens */}
              <motion.a
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.36 }}
                href="#register"
                className="lg:hidden group inline-flex items-center justify-between gap-3 text-black px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors duration-200 mb-10"
                style={{ backgroundColor: ACCENT }}
              >
                Reserve your seat
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </motion.a>

              {/* The three questions — context for why you'd come */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.44 }}
                className="mb-8"
              >
                <p
                  className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] mb-5 font-bold"
                  style={{ color: ACCENT }}
                >
                  What we&apos;ll explore
                </p>
                <ul className="space-y-3">
                  {QUESTIONS.map((q, i) => (
                    <li
                      key={q}
                      className="flex gap-4 pl-4 border-l-2"
                      style={{ borderLeftColor: i % 2 === 0 ? ACCENT : ACCENT_ALT }}
                    >
                      <p className="text-white text-base md:text-lg font-medium leading-snug">
                        {q}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Format note — protects against "is this a pitch?" hesitation */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-2xl"
              >
                Not a product demo or software pitch. An executive-level conversation for CEOs, Presidents, Operators, and business leaders looking for clarity before making AI investments.
              </motion.p>

              {/* Presented by — trust signal for first-time visitors */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="flex items-center gap-3 pt-6 border-t border-[#222]"
              >
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/30">
                  Presented by
                </span>
                <span className="font-(family-name:--font-geist-pixel-square) text-xs md:text-sm uppercase tracking-wide text-white/70">
                  Digital Canvas · 434 Media
                </span>
              </motion.div>
            </div>

            {/* RIGHT — registration form (sticky on desktop) */}
            <div className="lg:col-span-5" id="register">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:sticky lg:top-24"
              >
                {status === "success" && confirmation ? (
                  <div className="border border-[#88FF00]/40 bg-[#0a0a0a] p-7 md:p-9">
                    <p
                      className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.3em] font-bold mb-3"
                      style={{ color: ACCENT }}
                    >
                      Registered
                    </p>
                    <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-3xl text-white uppercase tracking-wide leading-tight mb-4">
                      You&apos;re in,{" "}
                      <span className="text-white/40 font-medium">{confirmation.firstName}.</span>
                    </h2>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
                      A confirmation email is on its way. We&apos;ll send a know-before-you-go the day before the event.
                    </p>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Plans change? Write to{" "}
                      <a href="mailto:VIP@434MEDIA.COM" className="text-[#88FF00] hover:underline">
                        VIP@434MEDIA.COM
                      </a>{" "}
                      so we can offer the seat to another participant.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="border border-[#333] bg-[#0a0a0a] p-6 md:p-8 space-y-5"
                  >
                    <div>
                      <p
                        className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
                        style={{ color: ACCENT_ALT }}
                      >
                        Reserve your seat
                      </p>
                      <h2 className="font-(family-name:--font-geist-pixel-square) text-xl md:text-2xl text-white uppercase tracking-wide leading-tight">
                        Lunch provided.{" "}
                        <span className="text-white/40 font-medium">Seating limited.</span>
                      </h2>
                    </div>

                    <div className="h-px bg-[#222]" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold mb-2 block"
                        >
                          First name
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          autoComplete="given-name"
                          className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-3.5 py-3 focus:outline-none focus:border-[#88FF00] transition-colors placeholder:text-white/20"
                          placeholder="Jane"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold mb-2 block"
                        >
                          Last name
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          autoComplete="family-name"
                          className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-3.5 py-3 focus:outline-none focus:border-[#88FF00] transition-colors placeholder:text-white/20"
                          placeholder="Operator"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold mb-2 block"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-3.5 py-3 focus:outline-none focus:border-[#88FF00] transition-colors placeholder:text-white/20"
                        placeholder="you@company.com"
                      />
                    </div>

                    <div>
                      <fieldset>
                        <legend className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold mb-2 block">
                          Your current AI adoption
                        </legend>
                        <p className="text-white/40 text-xs leading-relaxed mb-3">
                          Used to shape the conversation. Not shared publicly.
                        </p>
                        <div className="grid grid-cols-5 gap-1.5">
                          {AI_ADOPTION_SCALE.map((opt) => {
                            const isSelected = aiAdoptionLevel === opt.value
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => setAiAdoptionLevel(opt.value)}
                                className={`relative border p-3 transition-all duration-200 ${
                                  isSelected
                                    ? "border-[#88FF00] bg-[#88FF00]/8"
                                    : "border-[#333] bg-[#0a0a0a] hover:border-white/40"
                                }`}
                                aria-pressed={isSelected}
                                aria-label={`${opt.value} — ${opt.label}`}
                              >
                                <span
                                  className={`block font-(family-name:--font-geist-pixel-square) text-lg md:text-xl font-bold ${
                                    isSelected ? "text-[#88FF00]" : "text-white/80"
                                  }`}
                                >
                                  {opt.value}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                            {AI_ADOPTION_SCALE[0].label}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                            {AI_ADOPTION_SCALE[AI_ADOPTION_SCALE.length - 1].label}
                          </span>
                        </div>
                      </fieldset>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="optInForUpdates"
                        className="mt-1 accent-[#88FF00]"
                      />
                      <span className="text-white/65 text-xs leading-relaxed">
                        Opt in for Digital Canvas updates — future events and the occasional ops + AI dispatch.
                      </span>
                    </label>

                    {status === "error" && errorMsg && (
                      <p className="text-[#FF006E] text-xs font-(family-name:--font-geist-pixel-square)">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full bg-[#88FF00] text-[#0a0a0a] font-(family-name:--font-geist-pixel-square) font-bold text-xs uppercase tracking-widest py-4 px-6 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? "Reserving..." : "Reserve my seat"}
                    </button>

                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25 leading-relaxed">
                      You&apos;ll receive a confirmation and event-specific updates only. No newsletter spam.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Below hero — flyer + speaker bio for those wanting more context */}
      <section className="relative py-16 md:py-20 px-6 border-t border-[#222]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <div className="relative border border-[#333] bg-[#0a0a0a] overflow-hidden">
              <div className="relative aspect-[8.5/11] w-full">
                <Image
                  src={FLYER_URL}
                  alt="Lead with Ops. Layer in AI. — Executive Working Lunch, June 18, 2026, VelocityTX"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 500px"
                  unoptimized
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-7"
          >
            <p
              className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 font-bold"
              style={{ color: ACCENT }}
            >
              Featured speaker
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight mb-6">
              Adam Carroll.{" "}
              <span className="text-white/35 font-medium">
                Founder, Carroll Strategy &amp; Operations.
              </span>
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
              Adam works with operators to align technology decisions with business outcomes. The session focuses on practical frameworks — how to lead with operations, layer in AI where it creates measurable ROI, and avoid investing in tools without strategic anchor.
            </p>
            <p className="text-white/45 text-sm md:text-base leading-relaxed">
              Designed for CEOs, Presidents, Operators, Founders, and business leaders. Off-the-record, peer-level conversation. Lunch provided.
            </p>

            <div className="mt-8 pt-6 border-t border-[#222] flex items-center gap-4 flex-wrap">
              <a
                href="#register"
                className="group inline-flex items-center gap-3 text-black px-5 py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors duration-200"
                style={{ backgroundColor: ACCENT }}
              >
                Back to register
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
                Or email <a href="mailto:VIP@434MEDIA.COM" className="text-[#88FF00] hover:underline">VIP@434MEDIA.COM</a>
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
