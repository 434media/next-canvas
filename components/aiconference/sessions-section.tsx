"use client"

import { motion } from "motion/react"

interface Session {
  id: string
  title: string
  speaker: string
  description: string
  type: "keynote" | "talk" | "lightning"
}

const sessions: Session[] = [
  {
    id: "key-ai-skills",
    title: "Key AI skills for leaders",
    speaker: "Wes Etheredge",
    description: "This session introduces a framework for different levels of AI interaction, exploring how to leverage AI as a \"Thought Partner\" and diving into three essential methods leaders must master to align their organizational goals with agentic tools.",
    type: "talk",
  },
  {
    id: "proving-humanity",
    title: "Proving Humanity in an Agentic Internet",
    speaker: "Jacqueline Suttin",
    description: "As AI agents become capable of writing code, filing forms, scraping systems, and acting autonomously across the web, the internet is quietly losing a foundational assumption: that most traffic is human. We'll explore how MAGEN Trust approaches the problem differently: treating human verification as a dynamic, behavioral, upstream security layer rather than a challenge-response gate.",
    type: "talk",
  },
  {
    id: "godot-audio",
    title: "Godot Audio Stack: Synthesis + Plugin Hosting + DAW-to-Game Instruments",
    speaker: "Werner Mendizabal",
    description: "Building a unified audio ecosystem for Godot: godot-csound for real-time synthesis, godot-lv2-host and godot-vst3-host for loading real audio plugins, and godot-distrho to explore plugin-style workflows. This talk focuses on real-time procedural music, interactive sound design, and using the same instruments in a DAW and in-game.",
    type: "talk",
  },
  {
    id: "copilot-sdk",
    title: "Put An Agent Inside Your App with the GitHub Copilot SDK",
    speaker: "Daniel Ward",
    description: "What if adding a custom AI agent to your app took less time than your next standup? This session shows you how to go from zero to a working AI agent embedded in your application in 10 minutes or less, live on stage. You'll leave with working knowledge of how to use the GitHub Copilot SDK.",
    type: "talk",
  },
  {
    id: "build-agents",
    title: "How Do Agents Actually Work?",
    speaker: "Samad Ahmed",
    description: "Let's build an agent from scratch! We'll implement perception (what can I see?), planning (what should I do?), action (execute safely), memory (what happened before?), and reflection (did it work?), the core loop that makes agents autonomous. Live code showing how these components wire together, when they fail, and how to make them production-ready.",
    type: "talk",
  },
  {
    id: "without-you",
    title: "We Can’t Do This Without YOU: There is no “I” in AI",
    speaker: "Dirce E. Hernandez",
    description: "A deep dive into the importance of the unsung heroes of tech—the Security and GRC professionals who were once pushed aside but are now central to the AI revolution. We’ll explore why the relationship between developers and security teams has never been more critical, using Cyber Threat Intelligence as a prime example of why AI development must be a team sport.",
    type: "talk",
  },
  {
    id: "code-writes-itself",
    title: "What's Left When the Code Writes Itself?",
    speaker: "Angel Escobedo",
    description: "AI can scaffold a project, write boilerplate, and debug faster than most of us. So what's left? Everything that actually matters. The real shift isn't fewer engineers, it's fewer coding tasks. What remains is architecture, trade-off analysis, system design, and the judgment to know what to build and why.",
    type: "lightning",
  },
  {
    id: "gtm-research",
    title: "Build for the Right Market: GTM Research in the Age of AI",
    speaker: "Serena Hernandez",
    description: "Every winning go-to-market (GTM) strategy starts with research—but not the slow, outdated kind. In this lightning session, Serena Hernandez shares how she uses software and AI tools like Claude, Gong, Crayon CI, and n8n workflows to transform how product marketing validates markets, understands customer pain points, monitors competitors, and defines ideal customer profiles (ICPs).",
    type: "lightning",
  },
  {
    id: "dream-ship-v0",
    title: "Dream It, Ship It",
    speaker: "Jesse Hernandez",
    description: "Moving from a product idea to a live production environment used to require hours of scaffolding, database configuration, and UI tinkering. Today, that workflow is being compressed into minutes. In this live workshop, we'll explore importing existing GitHub repos, provisioning AWS databases on the fly, and shipping a full-stack React application without ever leaving the v0 interface.",
    type: "lightning",
  },
]

const typeColors = {
  keynote: { bg: "bg-[#fbbf24]/10", border: "border-[#fbbf24]/30", text: "text-[#fbbf24]" },
  talk: { bg: "bg-[#00f2ff]/10", border: "border-[#00f2ff]/30", text: "text-[#00f2ff]" },
  lightning: { bg: "bg-[#ff9900]/10", border: "border-[#ff9900]/30", text: "text-[#ff9900]" },
}

const typeLabels = {
  keynote: "Keynote",
  talk: "Session",
  lightning: "Lightning Talk",
}

export function SessionsSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#0c0c0c]" data-bg-type="dark">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(#00f2ff 1px, transparent 1px),
              linear-gradient(90deg, #00f2ff 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
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
            Sessions
          </h2>
          <p className="text-[#a3a3a3] text-lg max-w-2xl mx-auto leading-relaxed">
            From AI-assisted debugging pipelines to proving humanity in an agentic internet — we aren&apos;t just talking about the future, we&apos;re demonstrating it live
          </p>
        </motion.div>

        {/* Sessions List */}
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative border border-[#333] bg-[#111] transition-all duration-300 group-hover:border-[#00f2ff]/50 group-hover:bg-[#141414]">
                {/* Accent line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${typeColors[session.type].bg.replace('/10', '')}`} />
                
                <div className="p-6 pl-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      {/* Session type badge */}
                      <span className={`inline-block font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 mb-3 ${typeColors[session.type].bg} ${typeColors[session.type].border} border ${typeColors[session.type].text}`}>
                        {typeLabels[session.type]}
                      </span>
                      
                      <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide mb-2 group-hover:text-[#00f2ff] transition-colors">
                        {session.title}
                      </h3>
                      
                      <p className="text-[#ff9900] font-mono text-sm uppercase tracking-wider">
                        {session.speaker}
                      </p>
                    </div>
                    
                    {/* Decorative element */}
                    <div className="hidden sm:flex items-center justify-center w-12 h-12 border border-[#333] bg-[#0a0a0a] group-hover:border-[#00f2ff]/50 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#525252] group-hover:text-[#00f2ff] transition-colors">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                  </div>
                  
                  <p className="text-[#737373] text-sm sm:text-base leading-relaxed">
                    {session.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Schedule note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-[#525252] font-mono text-xs uppercase tracking-[0.15em]">
            Full schedule coming soon • February 28, 2026
          </p>
        </motion.div>
      </div>
    </section>
  )
}
