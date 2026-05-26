"use client"

import { useState, type FormEvent } from "react"
import { motion, AnimatePresence } from "motion/react"

/* ─── Stats Data ─── */
const stats = [
  {
    value: "100%",
    label: "Human in the Loop",
    description:
      "Every decision point reviewed by a real person. Agents defer to human judgment — they don't guess and hope for the best.",
  },
  {
    value: "AI SDK",
    label: "Provider Agnostic",
    description:
      "Standardized on the AI SDK so you're never locked into a single model provider. One interface, any model — the flexibility to evolve as the landscape shifts.",
  },
  {
    value: "RAG",
    label: "Structured Retrieval",
    description:
      "Grounded answers from your actual data — not hallucinated ones. Structured retrieval pipelines that cite sources instead of inventing them.",
  },
  {
    value: "30D",
    label: "Time to First Loop",
    description:
      "From kickoff to your first working autonomous loop in production. Two-week scoping, two-week build, observable from day one.",
  },
]

/* ─── What we ship ─── */
const solutions = [
  {
    title: "Autonomous Loops",
    description:
      "Wrap a repeatable workflow in an agent. Built with Claude, MCP, and small composable tools — the kind that compress weeks of execution into hours.",
    color: "#a855f7",
  },
  {
    title: "Integrated Stacks",
    description:
      "Websites, CMS, auth, payments, and email shipped as one cohesive build. No bolted-on integrations — every layer designed to talk to the next.",
    color: "#00f2ff",
  },
  {
    title: "Retrieval & Memory",
    description:
      "RAG pipelines over your data. Structured, searchable, citeable — so agents reason from facts your team already trusts.",
    color: "#fbbf24",
  },
  {
    title: "Observability",
    description:
      "See what the agent did, when, and why. Logs, traces, and human-review checkpoints — no black boxes shipped to production.",
    color: "#ff9900",
  },
]

/* ─── Engagement model ─── */
const phases = [
  {
    step: "01",
    title: "Discovery",
    body: "One call. You describe the workflow, we listen. We come back with a written scope and a fixed-fee proposal — no slide decks.",
  },
  {
    step: "02",
    title: "Prototype",
    body: "Two-week build. A working loop in your stack with the human checkpoints in place. You run it side-by-side with the manual workflow.",
  },
  {
    step: "03",
    title: "Ship",
    body: "Production deployment, observability wired up, handoff documentation. Your team owns the loop — we leave the lights on.",
  },
  {
    step: "04",
    title: "Maintain",
    body: "Optional ongoing engagement. Model upgrades, expansion to adjacent workflows, monthly review of what the loop is doing in the wild.",
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
      <div
        className={`absolute left-0 top-0 bottom-0 w-px transition-colors duration-300 ${
          isActive ? "bg-[#a855f7]" : "bg-[#222] group-hover:bg-white/20"
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
              ? "text-[#a855f7]"
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
      source: "agents-consultancy",
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
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#a855f7]/5 blur-[200px]" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#00f2ff]/3 blur-[200px]" />
        </div>

        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#a855f7]/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-32 md:py-40">
          <motion.div
            className="mb-16 md:mb-24"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#a855f7] font-bold">
                03
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
              <span className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/60">
                Agents
              </span>
            </div>
            <h1 className="font-(family-name:--font-geist-pixel-square) text-3xl md:text-5xl lg:text-6xl text-white font-black leading-[1.2] tracking-wide max-w-4xl">
              <span className="font-(family-name:--font-geist-pixel-square)">
                Autonomous loops
              </span>{" "}
              <span className="text-white/30 font-medium">
                that compress weeks of execution into hours.
              </span>
            </h1>
            <p className="text-white/50 text-sm md:text-base leading-[1.85] font-medium max-w-2xl mt-8">
              We design, ship, and operate autonomous workflows for teams that need the work done — not another platform to evaluate. Built with Claude, MCP, and small composable tools that do real work.
            </p>
          </motion.div>

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

          <div className="mt-8 md:mt-12 max-w-2xl min-h-20">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeStatIndex}
                className="text-white/50 text-sm md:text-base leading-[1.85] font-medium"
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

        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#222]" />
      </section>

      {/* ── What we ship ── */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#a855f7] mb-3 font-bold">
              What we ship
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Four primitives.{" "}
              <span className="text-white/30 font-medium">Composed for your stack.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222] border border-[#222]">
            {solutions.map((solution, i) => (
              <motion.div
                key={solution.title}
                className="bg-[#0a0a0a] p-8 md:p-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className="w-2 h-2 rounded-full mb-5"
                  style={{ backgroundColor: solution.color }}
                />
                <h3 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.2em] text-white font-bold mb-4">
                  {solution.title}
                </h3>
                <p className="text-white/50 text-sm leading-[1.85]">
                  {solution.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How we work ── */}
      <section className="relative py-24 md:py-32 px-6 border-t border-[#222]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#00f2ff] mb-3 font-bold">
              How we work
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Discovery to ship in{" "}
              <span className="text-white/30 font-medium">about a month.</span>
            </h2>
          </motion.div>

          <div className="space-y-px bg-[#222] border border-[#222]">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.step}
                className="bg-[#0a0a0a] p-6 md:p-8 grid grid-cols-[auto_1fr] md:grid-cols-[auto_200px_1fr] gap-6 md:gap-10 items-start"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#a855f7] font-bold pt-1">
                  {phase.step}
                </span>
                <h3 className="font-(family-name:--font-geist-pixel-square) text-base md:text-lg text-white uppercase tracking-wide font-semibold pt-0.5 md:pt-1 col-span-1 md:col-span-1">
                  {phase.title}
                </h3>
                <p className="text-white/50 text-sm md:text-base leading-[1.85] col-span-2 md:col-span-1">
                  {phase.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Start the conversation ── */}
      <section className="relative py-24 md:py-32 px-6 border-t border-[#222]" id="contact">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#a855f7] mb-3 font-bold">
              Start the conversation
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white font-black leading-[1.2] tracking-wide mb-6">
              Tell us what loop{" "}
              <span className="text-white/30 font-medium">you&apos;d hand off first.</span>
            </h2>
            <p className="tracking-tight text-white/40 text-sm md:text-base leading-[1.85] font-medium max-w-xl mx-auto">
              Rough is fine. The workflow, the stack you&apos;re on, the deadline. We&apos;ll come back within two business days with questions and a written scope.
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
                We&apos;ll be in touch within two business days.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="border border-[#333] bg-[#111] p-8 md:p-12 space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 block mb-2">
                    First Name *
                  </label>
                  <input
                    name="firstName"
                    required
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:border-[#a855f7] focus:outline-none transition-colors placeholder:text-white/20"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 block mb-2">
                    Last Name *
                  </label>
                  <input
                    name="lastName"
                    required
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:border-[#a855f7] focus:outline-none transition-colors placeholder:text-white/20"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 block mb-2">
                  Company *
                </label>
                <input
                  name="company"
                  required
                  className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:border-[#a855f7] focus:outline-none transition-colors placeholder:text-white/20"
                  placeholder="Acme Corp"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 block mb-2">
                    Work Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:border-[#a855f7] focus:outline-none transition-colors placeholder:text-white/20"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 block mb-2">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:border-[#a855f7] focus:outline-none transition-colors placeholder:text-white/20"
                    placeholder="(optional)"
                  />
                </div>
              </div>

              <div>
                <label className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 block mb-2">
                  What loop are you trying to ship? *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:border-[#a855f7] focus:outline-none transition-colors resize-none placeholder:text-white/20"
                  placeholder="The workflow, the stack, the deadline. Rough is fine."
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
