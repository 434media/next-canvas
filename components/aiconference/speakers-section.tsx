"use client"

import { motion } from "motion/react"

interface Speaker {
  id: string
  name: string
  title: string
  company: string
  image: string
  linkedin: string
  sessionTitle: string
}

const speakers: Speaker[] = [
  {
    id: "wes-etheredge",
    name: "Wes Etheredge",
    title: "AI, Analytics, and Cloud Leader",
    company: "",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/Wes.jpg",
    linkedin: "https://www.linkedin.com/in/wesetheredge/",
    sessionTitle: "Key AI skills for leaders",
  },
  {
    id: "jacqueline-suttin",
    name: "Jacqueline Suttin",
    title: "Founder",
    company: "MAGEN Trust",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/jacqueline.jpeg",
    linkedin: "https://linkedin.com/in/jacqueline-suttin",
    sessionTitle: "Humanity in an Agentic World",
  },
  {
    id: "jesse-hernandez",
    name: "Jesse Hernandez",
    title: "Web Developer",
    company: "434 MEDIA",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/hat-jesse-headshot.jpg",
    linkedin: "https://www.linkedin.com/in/jessebubble/",
    sessionTitle: "Dream It, Ship It",
  },
  {
    id: "werner-mendizabal",
    name: "Werner Mendizabal",
    title: "Senior Software Engineer",
    company: "Walt Disney Company",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/werner.jpeg",
    linkedin: "https://www.linkedin.com/in/werner-mendizabal/",
    sessionTitle: "Godot Audio Stack",
  },
  {
    id: "daniel-ward",
    name: "Daniel Ward",
    title: "Software Consultant",
    company: "Lean TECHniques",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/ward.jpeg",
    linkedin: "https://www.linkedin.com/in/daniel-ward-dev/",
    sessionTitle: "GitHub Copilot SDK",
  },
  {
    id: "zac-brown",
    name: "Zac Brown",
    title: "Founder & CEO",
    company: "NonprofitsHQ",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/zac.jpeg",
    linkedin: "https://www.linkedin.com/in/zacjordanbrown/",
    sessionTitle: "Debugging Pipeline",
  },
  {
    id: "angel-escobedo",
    name: "Angel Escobedo",
    title: "Lead Software Developer",
    company: "Webhead",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/angel.jpeg",
    linkedin: "https://www.linkedin.com/in/angel-escobedo-771a671a2/",
    sessionTitle: "What's Left When the Code Writes Itself?",
  },
]

// Aztec-inspired geometric pattern for background
function AztecBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#ff9900 1px, transparent 1px),
            linear-gradient(90deg, #ff9900 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#ff9900]/5 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#00f2ff]/5 blur-[150px]" />
    </div>
  )
}

// Corner decoration component - larger version for section
function AztecCornerLarge({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const rotations = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }
  
  return (
    <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 ${rotations[position]}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M0 0h8v64H0z" fill="#333" />
        <path d="M0 0h64v8H0z" fill="#333" />
        <path d="M16 16h4v24h-4z" fill="#ff9900" opacity="0.6" />
        <path d="M16 16h24v4H16z" fill="#ff9900" opacity="0.6" />
        <path d="M28 28h2v12h-2z" fill="#00f2ff" opacity="0.4" />
        <path d="M28 28h12v2H28z" fill="#00f2ff" opacity="0.4" />
      </svg>
    </div>
  )
}

// Aztec-inspired corner decoration - small version for cards
function AztecCorner({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const rotations = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }
  
  return (
    <div className={`w-8 h-8 ${rotations[position]}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M0 0h4v32H0z" fill="#333" />
        <path d="M0 0h32v4H0z" fill="#333" />
        <path d="M8 8h2v16h-2z" fill="#ff9900" opacity="0.6" />
        <path d="M8 8h16v2H8z" fill="#ff9900" opacity="0.6" />
      </svg>
    </div>
  )
}

// Border decoration
function AztecBorder() {
  return (
    <div className="h-1 w-full bg-linear-to-r from-[#ff9900] via-[#00f2ff] to-[#ff9900] opacity-60" />
  )
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

export function SpeakersSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#0a0a0a] overflow-hidden" data-bg-type="dark">
      {/* Aztec Background */}
      <AztecBackground />
      
      {/* Large corner decorations for the section */}
      <div className="absolute top-0 left-0 z-10"><AztecCornerLarge position="top-left" /></div>
      <div className="absolute top-0 right-0 z-10"><AztecCornerLarge position="top-right" /></div>
      <div className="absolute bottom-0 left-0 z-10"><AztecCornerLarge position="bottom-left" /></div>
      <div className="absolute bottom-0 right-0 z-10"><AztecCornerLarge position="bottom-right" /></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="max-w-md mx-auto mb-8">
            <AztecBorder />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight mb-4">
            Speakers
          </h2>
          <p className="text-[#a3a3a3] text-lg max-w-2xl mx-auto leading-relaxed">
            Builders, security engineers, and technical leaders demonstrating the tools that are defining how we write code, secure the internet, and lead organizations
          </p>
        </motion.div>

        {/* Speaker Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-full"
            >
              <div className="relative border border-[#333] bg-[#111] transition-all duration-300 group-hover:border-[#ff9900]/50 overflow-hidden h-full flex flex-col">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 z-10"><AztecCorner position="top-left" /></div>
                <div className="absolute top-0 right-0 z-10"><AztecCorner position="top-right" /></div>
                
                {/* Image container */}
                <div className="relative aspect-3/4 overflow-hidden bg-[#1a1a1a]">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&size=400&background=1a1a1a&color=ff9900&font-size=0.33`
                    }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* LinkedIn overlay - bottom left, only visible on hover */}
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 left-4 z-20 flex items-center justify-center w-10 h-10 text-[#a3a3a3] transition-all duration-300 hover:text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                    aria-label={`${speaker.name} on LinkedIn`}
                  >
                    <LinkedInIcon />
                  </a>
                </div>
                
                {/* Speaker info - fixed height with consistent spacing */}
                <div className="p-4 border-t border-[#222] flex-1 flex flex-col justify-center">
                  <h3 className="text-base font-bold text-white uppercase tracking-wide leading-tight mb-1.5">
                    {speaker.name}
                  </h3>
                  <p className="text-[#737373] text-sm font-normal leading-relaxed">
                    {speaker.title}
                    {speaker.company && (
                      <span className="text-[#ff9900] font-medium"> @ {speaker.company}</span>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom border */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-md mx-auto mt-16"
        >
          <AztecBorder />
        </motion.div>
      </div>
    </section>
  )
}
