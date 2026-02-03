"use client"

import { useRef } from "react"
import { motion } from "motion/react"

interface Spotlight {
  id: string
  title: string
  description: string
  image: string
  link: string
  accentColor: string
}

const spotlights: Spotlight[] = [
  {
    id: "acm-utsa",
    title: "ACM UTSA",
    description: "Connecting the next generation of talent, from RowdyHacks and Code in Color to ACM-W and Rowdy Cybercon.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/utsa.png",
    link: "https://acmutsa.org",
    accentColor: "#00f2ff",
  },
  {
    id: "ai-april-2",
    title: "AI-April 2",
    description: "The 2nd Annual AI Agent Showcase—a science fair-style event where builders of all skill levels, from beginners to experts to startup founders, can present their AI-powered projects.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/aiapril.avif",
    link: "https://www.meetup.com/meetup-group-umecjcqo/events/312775121/",
    accentColor: "#ff9900",
  },
  {
    id: "pytexas",
    title: "PyTexas Conference",
    description: "20th year of the largest gathering of Python developers within the great state of Texas. Software development, data science, community, and Python. April 17-19 in Austin TX.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/pytexas.svg",
    link: "https://www.pytexas.org/2026/",
    accentColor: "#00f2ff",
  },
  {
    id: "velocicode-2",
    title: "VelociCode 2",
    description: "The month-long, learning-first game jam hosted by ACM San Antonio in partnership with the Greater Gaming Society, built for folks who want a fun reason to ship a game and meet other builders in the SA tech + game dev scene.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/velocicode.avif",
    link: "https://acmsa.org/",
    accentColor: "#fbbf24",
  },
  {
    id: "chaincraft",
    title: "Chaincraft",
    description: "Revolutionizing how we build, own, and monetize gaming.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/chain.jpg",
    link: "https://play.chaincraft.games/",
    accentColor: "#ff9900",
  },
]

export function CommunitySpotlight() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="relative py-20 sm:py-28 bg-[#0a0a0a] overflow-hidden" data-bg-type="dark">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #ff9900 1px, transparent 1px),
              linear-gradient(-45deg, #00f2ff 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>
      
      <div className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 px-4 sm:px-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px flex-1 max-w-20 bg-linear-to-r from-transparent to-[#ff9900]/60" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#737373]">
                Building Together
              </span>
              <div className="h-px flex-1 max-w-20 bg-linear-to-l from-transparent to-[#00f2ff]/60" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight mb-4">
              Community Spotlight
            </h2>
            <p className="text-[#a3a3a3] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Celebrating the communities, events, and organizations shaping the future of tech in Texas
            </p>
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <div className="hidden md:flex absolute top-1/2 left-4 right-4 z-20 justify-between pointer-events-none" style={{ marginTop: '60px' }}>
          <button
            onClick={() => scroll("left")}
            className="pointer-events-auto flex items-center justify-center w-12 h-12 border border-[#333] bg-[#0a0a0a]/90 backdrop-blur-sm text-[#737373] transition-all hover:border-[#ff9900] hover:text-[#ff9900] hover:bg-[#0a0a0a]"
            aria-label="Scroll left"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="pointer-events-auto flex items-center justify-center w-12 h-12 border border-[#333] bg-[#0a0a0a]/90 backdrop-blur-sm text-[#737373] transition-all hover:border-[#ff9900] hover:text-[#ff9900] hover:bg-[#0a0a0a]"
            aria-label="Scroll right"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-12 pb-4 snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Left spacer for centering on large screens */}
          <div className="hidden lg:block shrink-0 w-[calc((100vw-1200px)/2)]" />
          
          {spotlights.map((spotlight, index) => (
            <motion.a
              key={spotlight.id}
              href={spotlight.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group shrink-0 w-[320px] sm:w-[380px] snap-start"
            >
              <div className="relative h-full border border-[#333] bg-[#111] transition-all duration-500 group-hover:border-opacity-50 overflow-hidden"
                style={{ borderColor: `${spotlight.accentColor}20` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${spotlight.accentColor}80`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${spotlight.accentColor}20`
                }}
              >
                {/* Image container */}
                <div className={`relative aspect-16/10 overflow-hidden ${
                  spotlight.id === "acm-utsa" || spotlight.id === "pytexas" 
                    ? "bg-white" 
                    : "bg-[#1a1a1a]"
                }`}>
                  <img
                    src={spotlight.image}
                    alt={spotlight.title}
                    className={`w-full h-full transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 ${
                      spotlight.id === "acm-utsa" || spotlight.id === "pytexas"
                        ? "object-contain p-4"
                        : "object-cover"
                    }`}
                    onError={(e) => {
                      // Fallback gradient background
                      e.currentTarget.style.display = 'none'
                      const parent = e.currentTarget.parentElement
                      if (parent) {
                        parent.style.background = `linear-gradient(135deg, ${spotlight.accentColor}20, #1a1a1a)`
                      }
                    }}
                  />
                  
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${spotlight.accentColor}, transparent)` }}
                  />
                  
                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 
                      className="text-xl sm:text-2xl font-bold uppercase tracking-wide leading-tight mb-1 transition-colors duration-300"
                      style={{ color: spotlight.accentColor }}
                    >
                      {spotlight.title}
                    </h3>
                  </div>

                  {/* Corner accent */}
                  <div 
                    className="absolute top-0 right-0 w-16 h-16 opacity-60"
                    style={{
                      background: `linear-gradient(135deg, transparent 50%, ${spotlight.accentColor}20 50%)`,
                    }}
                  />
                </div>
                
                {/* Content */}
                <div className="p-5 border-t border-[#222]">
                  <p className="text-[#a3a3a3] text-sm leading-relaxed font-normal line-clamp-3 group-hover:text-[#d4d4d4] transition-colors duration-300">
                    {spotlight.description}
                  </p>
                  
                  {/* Link indicator */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#222]/50">
                    <span 
                      className="font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-300"
                      style={{ color: spotlight.accentColor }}
                    >
                      Learn More
                    </span>
                    <svg 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      className="transition-all duration-300 group-hover:translate-x-1"
                      style={{ color: spotlight.accentColor }}
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12,5 19,12 12,19" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
          
          {/* Right spacer for centering on large screens */}
          <div className="hidden lg:block shrink-0 w-[calc((100vw-1200px)/2)]" />
        </div>

        {/* Scroll indicator for mobile */}
        <div className="flex md:hidden justify-center mt-6 gap-1.5">
          {spotlights.map((spotlight, index) => (
            <div 
              key={spotlight.id}
              className="w-1.5 h-1.5 rounded-full bg-[#333]"
              style={{ backgroundColor: index === 0 ? spotlight.accentColor : '#333' }}
            />
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center mt-12 px-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-[#333]" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#525252]">
              Swipe to explore
            </span>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-[#333]" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
