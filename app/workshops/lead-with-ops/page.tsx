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
    <main className="bg-white min-h-screen text-[#0a0a0a]">
      {/* Full-page split layout — content scrolls on the left, form is pinned on the right (desktop). */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-28 px-6">
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ backgroundImage: `linear-gradient(to right, transparent, ${ACCENT_ALT}55, transparent)` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* No items-start — the right column must stretch to match the left's
              height so the sticky form has room to slide for the full page scroll. */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* LEFT — full scrollable narrative (hero text → flyer → speaker bio) */}
            <div className="lg:col-span-7 space-y-12 md:space-y-14">

              {/* Eyebrow row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 flex-wrap"
              >
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                  <span className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#0a0a0a] font-bold">
                    Executive Working Lunch
                  </span>
                </span>
                <span className="hidden sm:inline-block h-px w-6 bg-[#e5e5e5]" />
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

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-(family-name:--font-geist-pixel-square) text-3xl md:text-5xl lg:text-6xl text-[#0a0a0a] uppercase tracking-wide leading-[1.1] font-black"
              >
                Lead with Ops.{" "}
                <span className="text-black/35 font-medium block">Layer in AI.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="text-[#525252] text-base md:text-lg leading-relaxed max-w-2xl"
              >
                A practical executive working lunch with{" "}
                <span className="text-[#0a0a0a] font-medium">Adam Carroll, Founder of Carroll Strategy &amp; Operations</span>{" "}
                — clarity on aligning AI initiatives with business strategy, operational priorities, and measurable outcomes.
              </motion.p>

              {/* Event details strip */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#e5e5e5] border border-[#e5e5e5]"
              >
                <div className="bg-white p-5 flex items-center gap-3">
                  <Calendar className="w-4 h-4 shrink-0 text-[#0a0a0a]" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#737373] mb-1">Date</p>
                    <p className="text-[#0a0a0a] text-sm font-semibold">June 18, 2026</p>
                  </div>
                </div>
                <div className="bg-white p-5 flex items-center gap-3">
                  <Clock className="w-4 h-4 shrink-0 text-[#0a0a0a]" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#737373] mb-1">Time</p>
                    <p className="text-[#0a0a0a] text-sm font-semibold">11:30 AM &ndash; 1:00 PM</p>
                  </div>
                </div>
                <div className="bg-white p-5 flex items-center gap-3">
                  <MapPin className="w-4 h-4 shrink-0 text-[#0a0a0a]" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#737373] mb-1">Location</p>
                    <p className="text-[#0a0a0a] text-sm font-semibold">VelocityTX</p>
                  </div>
                </div>
              </motion.div>

              {/* Mobile-only jump-to-form CTA */}
              <motion.a
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.36 }}
                href="#register"
                className="lg:hidden group inline-flex items-center justify-between gap-3 text-[#0a0a0a] px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#0a0a0a] hover:text-white transition-colors duration-200"
                style={{ backgroundColor: ACCENT }}
              >
                Reserve your seat
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </motion.a>

              {/* Three questions — the WHY */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
              >
                <p
                  className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] mb-5 text-[#0a0a0a] font-bold"
                >
                  What we&apos;ll explore
                </p>
                <ul className="space-y-3">
                  {QUESTIONS.map((q) => (
                    <li
                      key={q}
                      className="flex gap-4 pl-4 border-l-2"
                      style={{ borderLeftColor: ACCENT_ALT }}
                    >
                      <p className="text-[#0a0a0a] text-base md:text-lg font-medium leading-snug">
                        {q}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Format note */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="border-l-2 border-[#0a0a0a] pl-5 max-w-2xl"
              >
                <p className="text-[#0a0a0a] text-base md:text-lg leading-relaxed font-medium">
                  Not a product demo or software pitch.
                </p>
                <p className="text-[#525252] text-sm md:text-base leading-relaxed mt-2">
                  An executive-level conversation for CEOs, Presidents, Operators, and business leaders looking for clarity before making AI investments.
                </p>
              </motion.div>

              {/* Flyer — proof visual within the scroll narrative */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="relative border border-[#e5e5e5] overflow-hidden"
              >
                <div className="relative aspect-[8.5/11] w-full max-w-md">
                  <Image
                    src={FLYER_URL}
                    alt="Lead with Ops. Layer in AI. — Executive Working Lunch, June 18, 2026, VelocityTX"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 500px"
                    unoptimized
                  />
                </div>
              </motion.div>

              {/* Featured speaker expanded */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
              >
                <p
                  className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 text-[#0a0a0a] font-bold"
                >
                  Featured speaker
                </p>
                <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-[#0a0a0a] uppercase tracking-wide leading-tight mb-5">
                  Adam Carroll.{" "}
                  <span className="text-black/45 font-medium">
                    Founder, Carroll Strategy &amp; Operations.
                  </span>
                </h2>
                <p className="text-[#525252] text-sm md:text-base leading-relaxed mb-5 max-w-2xl">
                  Adam works with operators to align technology decisions with business outcomes. The session focuses on practical frameworks — how to lead with operations, layer in AI where it creates measurable ROI, and avoid investing in tools without strategic anchor.
                </p>
                <p className="text-[#737373] text-sm md:text-base leading-relaxed max-w-2xl">
                  Designed for CEOs, Presidents, Operators, Founders, and business leaders. Off-the-record, peer-level conversation. Lunch provided.
                </p>
              </motion.div>

              {/* Trust signal — Presented by */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 pt-6 border-t border-[#e5e5e5]"
              >
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#a3a3a3]">
                  Presented by
                </span>
                <span className="font-(family-name:--font-geist-pixel-square) text-xs md:text-sm uppercase tracking-wide text-[#0a0a0a]">
                  Digital Canvas · 434 Media
                </span>
              </motion.div>

              {/* Contact fallback */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#737373]"
              >
                Questions? <a href="mailto:VIP@434MEDIA.COM" className="text-[#0a0a0a] hover:underline font-semibold">VIP@434MEDIA.COM</a>
              </motion.p>
            </div>

            {/* RIGHT — registration form, sticky for the full page scroll on desktop */}
            <div className="lg:col-span-5" id="register">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:sticky lg:top-24"
              >
                {status === "success" && confirmation ? (
                  <div className="border border-[#e5e5e5] bg-white p-7 md:p-9 relative">
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: ACCENT }}
                      aria-hidden="true"
                    />
                    <span
                      className="inline-block font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.3em] font-bold mb-4 px-2.5 py-1 text-[#0a0a0a]"
                      style={{ backgroundColor: ACCENT }}
                    >
                      Registered
                    </span>
                    <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-3xl text-[#0a0a0a] uppercase tracking-wide leading-tight mb-4">
                      You&apos;re in,{" "}
                      <span className="text-black/45 font-medium">{confirmation.firstName}.</span>
                    </h2>
                    <p className="text-[#525252] text-sm md:text-base leading-relaxed mb-4">
                      A confirmation email is on its way. We&apos;ll send a know-before-you-go the day before the event.
                    </p>
                    <p className="text-[#737373] text-sm leading-relaxed">
                      Plans change? Write to{" "}
                      <a href="mailto:VIP@434MEDIA.COM" className="text-[#0a0a0a] hover:underline font-semibold">
                        VIP@434MEDIA.COM
                      </a>{" "}
                      so we can offer the seat to another participant.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="border border-[#e5e5e5] bg-white p-6 md:p-8 space-y-5"
                  >
                    <div>
                      <p
                        className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
                        style={{ color: ACCENT_ALT }}
                      >
                        Reserve your seat
                      </p>
                      <h2 className="font-(family-name:--font-geist-pixel-square) text-xl md:text-2xl text-[#0a0a0a] uppercase tracking-wide leading-tight">
                        Lunch provided.{" "}
                        <span className="text-black/45 font-medium">Seating limited.</span>
                      </h2>
                    </div>

                    <div className="h-px bg-[#e5e5e5]" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-[#525252] font-bold mb-2 block"
                        >
                          First name
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          autoComplete="given-name"
                          className="w-full bg-white border border-[#e5e5e5] text-[#0a0a0a] text-sm px-3.5 py-3 focus:outline-none focus:border-[#0a0a0a] transition-colors placeholder:text-[#a3a3a3]"
                          placeholder="Jane"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-[#525252] font-bold mb-2 block"
                        >
                          Last name
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          autoComplete="family-name"
                          className="w-full bg-white border border-[#e5e5e5] text-[#0a0a0a] text-sm px-3.5 py-3 focus:outline-none focus:border-[#0a0a0a] transition-colors placeholder:text-[#a3a3a3]"
                          placeholder="Operator"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-[#525252] font-bold mb-2 block"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="w-full bg-white border border-[#e5e5e5] text-[#0a0a0a] text-sm px-3.5 py-3 focus:outline-none focus:border-[#0a0a0a] transition-colors placeholder:text-[#a3a3a3]"
                        placeholder="you@company.com"
                      />
                    </div>

                    <div>
                      <fieldset>
                        <legend className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-[#525252] font-bold mb-2 block">
                          Your current AI adoption
                        </legend>
                        <p className="text-[#737373] text-xs leading-relaxed mb-3">
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
                                    ? "border-transparent"
                                    : "border-[#e5e5e5] bg-white hover:border-[#0a0a0a]/40"
                                }`}
                                style={isSelected ? { backgroundColor: ACCENT } : undefined}
                                aria-pressed={isSelected}
                                aria-label={`${opt.value} — ${opt.label}`}
                              >
                                <span
                                  className={`block font-(family-name:--font-geist-pixel-square) text-lg md:text-xl font-bold ${
                                    isSelected ? "text-[#0a0a0a]" : "text-[#0a0a0a]/70"
                                  }`}
                                >
                                  {opt.value}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3]">
                            {AI_ADOPTION_SCALE[0].label}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3]">
                            {AI_ADOPTION_SCALE[AI_ADOPTION_SCALE.length - 1].label}
                          </span>
                        </div>
                      </fieldset>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="optInForUpdates"
                        className="mt-1 accent-[#0a0a0a]"
                      />
                      <span className="text-[#525252] text-xs leading-relaxed">
                        Opt in for Digital Canvas updates — future events and the occasional ops + AI dispatch.
                      </span>
                    </label>

                    {status === "error" && errorMsg && (
                      <p
                        className="text-xs font-(family-name:--font-geist-pixel-square)"
                        style={{ color: ACCENT_ALT }}
                      >
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full text-[#0a0a0a] font-(family-name:--font-geist-pixel-square) font-bold text-xs uppercase tracking-widest py-4 px-6 transition-all hover:bg-[#0a0a0a] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {status === "submitting" ? "Reserving..." : "Reserve my seat"}
                    </button>

                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3] leading-relaxed">
                      You&apos;ll receive a confirmation and event-specific updates only. No newsletter spam.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
