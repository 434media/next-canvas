"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { ScheduleDownloadButton } from "./schedule-download"

interface Session {
  id: string
  time: string
  title: string
  speaker: string
  image?: string
  linkedin?: string
  description: string
  type: "keynote" | "talk" | "lightning" | "community" | "break" | "intro"
}

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const sessions: Session[] = [
  {
    id: "welcome",
    time: "1:00 \u2013 1:10 PM",
    title: "Welcome to More Human Than Human",
    speaker: "",
    description: "AI conference powered by DEVSA",
    type: "intro",
  },
  {
    id: "wes-keynote",
    time: "1:10 \u2013 1:50 PM",
    title: "Key AI Skills for Leaders",
    speaker: "Wes Etheredge",
    image:
      "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/Wes.jpg",
    linkedin: "https://www.linkedin.com/in/wesetheredge/",
    description:
      "This session introduces a framework for different levels of AI interaction, exploring how to leverage AI as a \"Thought Partner\" and diving into three essential methods leaders must master to align their organizational goals with agentic tools.",
    type: "talk",
  },
  {
    id: "acm-utsa",
    time: "1:50 \u2013 1:55 PM",
    title: "ACM UTSA",
    speaker: "Alekzander Brysch",
    linkedin: "https://www.linkedin.com/in/zander-brysch/",
    description:
      "Connecting the next generation of talent, from RowdyHacks and Code in Color to ACM-W and Rowdy Cybercon.",
    type: "community",
  },
  {
    id: "samad-agents",
    time: "1:55 \u2013 2:15 PM",
    title: "How Do Agents Actually Work?",
    speaker: "Samad Ahmed",
    image:
      "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/samad.jpeg",
    linkedin: "https://www.linkedin.com/in/samadahmed/",
    description:
      "Let's build an agent from scratch! We'll implement perception (what can I see?), planning (what should I do?), action (execute safely), memory (what happened before?), and reflection (did it work?), the core loop that makes agents autonomous. Live code showing how these components wire together, when they fail, and how to make them production-ready.",
    type: "talk",
  },
  {
    id: "daniel-copilot",
    time: "2:15 \u2013 2:35 PM",
    title: "Put An Agent Inside Your App with the GitHub Copilot SDK",
    speaker: "Daniel Ward",
    image:
      "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/ward.jpeg",
    linkedin: "https://www.linkedin.com/in/daniel-ward-dev/",
    description:
      "What if adding a custom AI agent to your app took less time than your next standup? This live build shows you how to go from zero to a working AI agent embedded in your application, on stage. You'll leave with working knowledge of the GitHub Copilot SDK.",
    type: "talk",
  },
  {
    id: "ai-april",
    time: "2:35 \u2013 2:40 PM",
    title: "AI-April",
    speaker: "Geeks &&",
    linkedin: "https://www.linkedin.com/company/geeksanddrinks/",
    description:
      "A month of exploring innovation, ethics, and impact of AI. Featuring: a showcase, workshops, build nights, and conversations shaping responsible AI in Texas.",
    type: "community",
  },
  {
    id: "serena-gtm",
    time: "2:40 \u2013 2:55 PM",
    title: "Build for the Right Market: GTM Research in the Age of AI",
    speaker: "Serena Hernandez",
    image:
      "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/sayp.jpeg",
    linkedin: "https://www.linkedin.com/in/serena-hernandez-81b515167/",
    description:
      "Every winning go-to-market (GTM) strategy starts with research\u2014but not the slow, outdated kind. In this lightning session, Serena Hernandez shares how she uses software and AI tools like Claude, Gong, Crayon CI, and n8n workflows to transform how product marketing validates markets, understands customer pain points, monitors competitors, and defines ideal customer profiles (ICPs).",
    type: "lightning",
  },
  {
    id: "werner-godot",
    time: "2:55 \u2013 3:15 PM",
    title: "Godot Audio Stack: Synthesis + Plugin Hosting + DAW-to-Game Instruments",
    speaker: "Werner Mendizabal",
    image:
      "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/werner.jpeg",
    linkedin: "https://www.linkedin.com/in/werner-mendizabal/",
    description:
      "Building a unified audio ecosystem for Godot: godot-csound for real-time synthesis, godot-lv2-host and godot-vst3-host for loading real audio plugins, and godot-distrho to explore plugin-style workflows. This talk focuses on real-time procedural music, interactive sound design, and using the same instruments in a DAW and in-game.",
    type: "talk",
  },
  {
    id: "velocicode",
    time: "3:15 \u2013 3:20 PM",
    title: "VelociCode II",
    speaker: "ACM-SA",
    linkedin: "https://www.linkedin.com/company/acm-san-antonio/",
    description:
      "The month-long, learning-first game jam hosted by ACM San Antonio in partnership with the Greater Gaming Society, built for folks who want a fun reason to ship a game and meet other builders in the SA tech and game dev scene.",
    type: "community",
  },
  {
    id: "angel-strategy",
    time: "3:20 \u2013 3:35 PM",
    title: "What\u2019s Left When the Code Writes Itself?",
    speaker: "Angel Escobedo",
    image:
      "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/angel.jpeg",
    linkedin: "https://www.linkedin.com/in/angel-escobedo-771a671a2/",
    description:
      "AI can scaffold a project, write boilerplate, and debug faster than most of us. So what\u2019s left? Everything that actually matters. The real shift isn\u2019t fewer engineers, it\u2019s fewer coding tasks. What remains is architecture, trade-off analysis, system design, and the judgment to know what to build and why.",
    type: "talk",
  },
  {
    id: "chaincraft",
    time: "3:35 \u2013 3:40 PM",
    title: "Chaincraft",
    speaker: "Ryan Beltrán",
    linkedin: "https://www.linkedin.com/in/ryanbeltran/",
    description:
      "Revolutionizing how we build, own, and monetize gaming.",
    type: "community",
  },
  {
    id: "pytexas",
    time: "3:40 \u2013 3:45 PM",
    title: "PyTexas Conference",
    speaker: "Alamo Python",
    linkedin: "https://www.linkedin.com/in/dochoa3/",
    description:
      "Celebrating its 20th year! We’re proud to highlight the largest gathering of Python developers in the state before they head to Austin this April.",
    type: "community",
  },
  {
    id: "break",
    time: "3:45 \u2013 3:50 PM",
    title: "",
    speaker: "",
    description:
      "",
    type: "break",
  },
  {
    id: "dirce-grc",
    time: "3:50 \u2013 4:20 PM",
    title: "We Can\u2019t Do This Without YOU: There is no \u201CI\u201D in AI",
    speaker: "Dirce E. Hernandez",
    image:
      "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/dirce.jpg",
    linkedin: "https://www.linkedin.com/in/eduardohernandez79/",
    description:
      "A deep dive into the importance of the unsung heroes of tech\u2014the Security and GRC professionals who were once pushed aside but are now central to the AI revolution. We\u2019ll explore why the relationship between developers and security teams has never been more critical, using Cyber Threat Intelligence as a prime example of why AI development must be a team sport.",
    type: "talk",
  },
  {
    id: "jacqueline-humanity",
    time: "4:20 \u2013 4:40 PM",
    title: "Proving Humanity in an Agentic Internet",
    speaker: "Jacqueline Suttin",
    image:
      "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/jacqueline.jpeg",
    linkedin: "https://linkedin.com/in/jacqueline-suttin",
    description:
      "As AI agents become capable of writing code, filing forms, scraping systems, and acting autonomously across the web, the internet is quietly losing a foundational assumption: that most traffic is human. We\u2019ll explore how MAGEN Trust approaches the problem differently: treating human verification as a dynamic, behavioral, upstream security layer rather than a challenge-response gate.",
    type: "talk",
  },
  {
    id: "jesse-ship",
    time: "4:40 \u2013 4:55 PM",
    title: "Dream It, Ship It",
    speaker: "Jesse Hernandez",
    image:
      "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/hat-jesse-headshot.jpg",
    linkedin: "https://www.linkedin.com/in/jessebubble/",
    description:
      "Moving from a product idea to a live production environment used to require hours of scaffolding, database configuration, and UI tinkering. Today, that workflow is being compressed into minutes. In this live workshop, we\u2019ll explore importing existing GitHub repos, provisioning AWS databases on the fly, and shipping a full-stack React application without ever leaving the v0 interface.",
    type: "lightning",
  },
  {
    id: "closing",
    time: "4:55 \u2013 5:00 PM",
    title: "Thanks for Joining Us!",
    speaker: "",
    description: "Stick around after the closing remarks—we’re heading to the Double Standard patio for an afterparty hosted by our friends at the .NET User Group.",
    type: "intro",
  },
]

const typeColors: Record<
  Session["type"],
  { bg: string; border: string; text: string; accent: string }
> = {
  keynote: {
    bg: "bg-[#fbbf24]/10",
    border: "border-[#fbbf24]/30",
    text: "text-[#fbbf24]",
    accent: "bg-[#fbbf24]",
  },
  talk: {
    bg: "bg-[#00f2ff]/10",
    border: "border-[#00f2ff]/30",
    text: "text-[#00f2ff]",
    accent: "bg-[#00f2ff]",
  },
  lightning: {
    bg: "bg-[#ff9900]/10",
    border: "border-[#ff9900]/30",
    text: "text-[#ff9900]",
    accent: "bg-[#ff9900]",
  },
  community: {
    bg: "bg-[#a78bfa]/10",
    border: "border-[#a78bfa]/30",
    text: "text-[#a78bfa]",
    accent: "bg-[#a78bfa]",
  },
  break: {
    bg: "bg-[#525252]/10",
    border: "border-[#525252]/30",
    text: "text-[#737373]",
    accent: "bg-[#525252]",
  },
  intro: {
    bg: "bg-[#34d399]/10",
    border: "border-[#34d399]/30",
    text: "text-[#34d399]",
    accent: "bg-[#34d399]",
  },
}

const typeLabels: Record<Session["type"], string> = {
  keynote: "Keynote",
  talk: "Session",
  lightning: "Lightning Talk",
  community: "Community Spotlight",
  break: "Break",
  intro: "Intro / Outro",
}

export function SessionsSection() {
  return (
    <section
      id="sessions"
      className="relative py-20 sm:py-28 bg-[#0c0c0c]"
      data-bg-type="dark"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(#00f2ff 1px, transparent 1px),
              linear-gradient(90deg, #00f2ff 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#00f2ff]/5 blur-[200px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="h-1 w-full max-w-md mx-auto bg-linear-to-r from-[#00f2ff] via-[#ff9900] to-[#00f2ff] opacity-60 mb-8" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight mb-4">
            Schedule
          </h2>
          <p className="text-[#a3a3a3] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            From leadership skills to game design, marketing, security, and agents—we&apos;ve curated a lineup that celebrates the full spectrum of AI innovation happening across San Antonio and beyond.
          </p>
        </motion.div>

        {/* Sessions List */}
        <div className="space-y-3">
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="group"
            >
              <div className="relative border border-[#222] bg-[#111] transition-all duration-300 group-hover:border-[#00f2ff]/40 group-hover:bg-[#131313]">
                {/* Accent line */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[3px] ${typeColors[session.type].accent}`}
                />

                <div className="p-5 sm:p-6 pl-6 sm:pl-8">
                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Speaker image — square */}
                    {session.image && (
                      <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 overflow-hidden border border-[#333] bg-[#1a1a1a] group-hover:border-[#00f2ff]/50 transition-colors">
                        <Image
                          src={session.image}
                          alt={session.speaker}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100 transition-all duration-500"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      {/* Time + Type row */}
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="font-mono text-xs sm:text-sm font-semibold text-white/90 tracking-wide">
                          {session.time}
                        </span>
                        <span
                          className={`inline-block font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 ${typeColors[session.type].bg} ${typeColors[session.type].border} border ${typeColors[session.type].text}`}
                        >
                          {typeLabels[session.type]}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide leading-snug mb-1 group-hover:text-[#00f2ff] transition-colors">
                        {session.title}
                      </h3>

                      {session.speaker && (
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-[#ff9900] font-mono text-xs sm:text-sm font-medium uppercase tracking-wider">
                            {session.speaker}
                          </p>
                          {session.linkedin && (
                            <a
                              href={session.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#525252] hover:text-white transition-colors"
                              aria-label={`${session.speaker} on LinkedIn`}
                            >
                              <LinkedInIcon />
                            </a>
                          )}
                        </div>
                      )}

                      <p className="text-[#737373] text-sm leading-relaxed font-light">
                        {session.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Schedule note + download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-6 mt-12"
        >
          <ScheduleDownloadButton />
          <p className="text-[#525252] font-mono text-xs uppercase tracking-[0.15em]">
            February 28, 2026 &bull; Geekdom, San Antonio TX
          </p>
        </motion.div>
      </div>
    </section>
  )
}
