"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { 
  Tv, 
  Calendar, 
  Film, 
  ArrowRight, 
  Mic2,
  Video,
  Clapperboard,
  Users,
  Crown,
  Zap,
  Sparkles,
  Coffee,
  Target,
  CheckCircle2,
  Play,
  BookOpen,
  Camera,
  ArrowLeft
} from "lucide-react"

// Media items for horizontal scroller - arranged with videos spread out and varied sizes
// Mix of: Coworking space, PySanAntonio, GDG, TechDay, Replay events across DevSA history
const mediaItems = [
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/coworking-space/IMG_6350.jpg",
    alt: "DevSA Community Space",
    poster: undefined,
    size: "large" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/gdg.jpg",
    alt: "GDG San Antonio Event",
    poster: undefined,
    size: "medium" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa7.jpg",
    alt: "PySanAntonio Conference Audience",
    poster: undefined,
    size: "small" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/techday.jpg",
    alt: "DevSA Tech Day",
    poster: undefined,
    size: "tall" as const,
  },
  {
    type: "video" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/coworking-space/IMG_6956.MOV",
    poster: undefined,
    alt: "DevSA Community Space",
    size: "medium" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/replay1.JPG",
    alt: "DevSA Replay Event",
    poster: undefined,
    size: "large" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/coworking-space/IMG_7186.jpg",
    alt: "DevSA Community",
    poster: undefined,
    size: "tall" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_1484.jpg",
    alt: "DevSA Community Event",
    poster: undefined,
    size: "small" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa8.jpg",
    alt: "PySanAntonio Conference Audience",
    poster: undefined,
    size: "large" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/gdg4.jpg",
    alt: "GDG San Antonio",
    poster: undefined,
    size: "medium" as const,
  },
  {
    type: "video" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa3.mov",
    poster: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa.jpg",
    alt: "PySanAntonio Conference",
    size: "medium" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/techday2.jpg",
    alt: "DevSA Tech Day",
    poster: undefined,
    size: "small" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/coworking-space/IMG_5061.jpg",
    alt: "DevSA Community Space",
    poster: undefined,
    size: "small" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_2756.jpg",
    alt: "DevSA Community",
    poster: undefined,
    size: "tall" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/replay7.jpg",
    alt: "DevSA Replay Event",
    poster: undefined,
    size: "large" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa5.jpg",
    alt: "PySanAntonio Conference",
    poster: undefined,
    size: "large" as const,
  },
  {
    type: "video" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/coworking-space/IMG_6982.mov",
    poster: undefined,
    alt: "DevSA Collaboration",
    size: "medium" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_5006.jpg",
    alt: "DevSA Event",
    poster: undefined,
    size: "small" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/techday4.JPG",
    alt: "DevSA Tech Day",
    poster: undefined,
    size: "medium" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/coworking-space/IMG_6429.jpg",
    alt: "DevSA Community",
    poster: undefined,
    size: "tall" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_4427.jpg",
    alt: "DevSA Community Event",
    poster: undefined,
    size: "large" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa.jpg",
    alt: "PySanAntonio After Party",
    poster: undefined,
    size: "small" as const,
  },
  {
    type: "video" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa2.mov",
    poster: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa-mauricio.png",
    alt: "PySanAntonio Speaker",
    size: "large" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/replay9.jpg",
    alt: "DevSA Replay Event",
    poster: undefined,
    size: "medium" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_4381.jpg",
    alt: "DevSA Community",
    poster: undefined,
    size: "tall" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/techday5.jpg",
    alt: "DevSA Tech Day",
    poster: undefined,
    size: "small" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_3385.jpg",
    alt: "DevSA Event",
    poster: undefined,
    size: "large" as const,
  },
  {
    type: "video" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa6.MOV",
    poster: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa3.jpg",
    alt: "PySanAntonio Conference Audience",
    size: "medium" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/replay13.jpg",
    alt: "DevSA Replay Event",
    poster: undefined,
    size: "tall" as const,
  },
  {
    type: "image" as const,
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_4665.jpg",
    alt: "DevSA Community Event",
    poster: undefined,
    size: "small" as const,
  },
]

// Size classes for varied item dimensions
const sizeClasses = {
  small: "h-40 sm:h-48 md:h-52 w-auto",
  medium: "h-48 sm:h-56 md:h-64 w-auto",
  large: "h-56 sm:h-64 md:h-72 w-auto",
  tall: "h-64 sm:h-72 md:h-80 w-auto",
}

// Horizontal Auto-Scrolling Carousel Component
function MediaCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  // Duplicate items for seamless loop - no shuffling to avoid hydration mismatch
  const items = [...mediaItems, ...mediaItems]

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0
    const speed = 0.5 // pixels per frame

    const animate = () => {
      scrollPosition += speed
      // Reset when we've scrolled through the first set
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => { animationId = requestAnimationFrame(animate) }

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div 
      ref={scrollRef}
      className="flex items-center gap-3 sm:gap-4 overflow-x-hidden py-6"
      style={{ scrollBehavior: 'auto' }}
    >
      {items.map((item, index) => (
        <div
          key={`${item.src}-${index}`}
          className={`shrink-0 ${sizeClasses[item.size]} rounded-xl overflow-hidden bg-slate-200 shadow-lg`}
        >
          {item.type === 'video' ? (
            <video
              src={item.src}
              poster={item.poster}
              muted
              autoPlay
              loop
              playsInline
              className="h-full w-auto object-cover"
            />
          ) : (
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-auto object-cover"
              loading="lazy"
            />
          )}
        </div>
      ))}
    </div>
  )
}

// Aztec decorations only for the More Human Than Human card
function AztecCardCorner({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const rotations = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }
  
  return (
    <div className={`w-6 h-6 ${rotations[position]}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M0 0h8v64H0z" fill="#333" />
        <path d="M0 0h64v8H0z" fill="#333" />
        <path d="M16 16h4v24h-4z" fill="#ff9900" opacity="0.6" />
        <path d="M16 16h24v4H16z" fill="#ff9900" opacity="0.6" />
      </svg>
    </div>
  )
}

// Larger corner decoration for featured sections
function AztecCorner({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const rotations = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }
  
  return (
    <div className={`w-12 h-12 lg:w-16 lg:h-16 ${rotations[position]}`}>
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

// Upcoming event data for More Human Than Human
const upcomingEvent = {
  title: "More Human Than Human",
  subtitle: "Digital Canvas AI Conference • Powered by DevSA",
  date: "Feb 28, 2026",
  venue: "San Antonio, TX",
  description: "San Antonio's first AI conference exploring the intersection of artificial intelligence, creativity, and human connection. Join industry leaders, researchers, and innovators for a day of insights and collaboration.",
  tagline: "Redefining the relationship between humanity and AI through thoughtful exploration and community dialogue.",
  image: "https://devsa-assets.s3.us-east-2.amazonaws.com/HEAD_v01.mp4",
  href: "/events/morehumanthanhuman"
}

export default function DevsaTVPage() {
  const [activeTab, setActiveTab] = useState<'conferences' | 'workshops' | 'documentaries'>('conferences')

  // YouTube video IDs - extract from URL:
  const workshopVideoId = "BOCU-seUXQ8"
  const documentaryVideoId = "8pDqJVdNa44"

  const revenueOutlets = [
    { id: 'conferences' as const, label: 'Quarterly Conferences', icon: Calendar, investment: 'Powered by DevSA' },
    { id: 'workshops' as const, label: 'Sponsored Workshops', icon: Mic2, investment: 'Powered by DevSA' },
    { id: 'documentaries' as const, label: 'Storytelling', icon: Film, investment: 'Powered by DevSA' },
  ]

  const eventTiers = [
    {
      name: "Platinum",
      subtitle: "Title Sponsor",
      icon: Crown,
      investment: "$12,500",
      limit: "2 Sponsors Total",
      color: "amber" as const,
      featured: true,
      benefits: [
        "Title sponsorship shared between two Platinum partners across two conferences",
        "1 × Keynote Slot (60 min) — curated senior technical or executive thought leadership",
        "1 × Sponsor-Directed Session or Lightning Talk (demo, case study, or applied insight)",
        "2 × Panel Inclusions curated for balance, relevance, and technical depth",
        "Logo on all on-site signage (stage backdrop, registration, print)",
        "Logo + link on Digital Canvas & DevSA homepages",
        "Dedicated placement on Sponsors Page + event web app",
        "4 × Branded short-form videos (Reels / TikTok / YouTube Shorts)",
        "2 × Podcast Features (intro mention + 5–7 min sponsor insight segment)",
        "2 × Sponsored blog posts on DevSA",
        "2 × Moderated Discord sessions (700+ member community)",
        "Pre-event email spotlight to Digital Canvas + DevSA mailing lists",
        "Host designation for one quarterly networking / happy hour",
        "Opt-in attendee list access post-event",
        "8 complimentary tickets per conference",
      ],
    },
    {
      name: "Gold",
      subtitle: "Track Sponsor",
      icon: Zap,
      investment: "$7,500",
      limit: "4 Sponsors Total",
      color: "yellow" as const,
      benefits: [
        "1 × Lightning Talk or Panelist Role (one conference)",
        "1 × Panel Inclusion",
        "Logo on event signage (secondary placement)",
        "Logo on Sponsors Page + digital conference materials",
        "1 × Branded short-form video highlight",
        "Podcast mention (episode or grouped sponsor segment)",
        "2 × Moderated Discord sessions",
        "Sponsor highlight in pre-event email campaign",
        "Recognition as Networking Sponsor for one quarterly happy hour",
        "6 complimentary tickets per conference",
      ],
    },
    {
      name: "Silver",
      subtitle: "Workshop Host",
      icon: Sparkles,
      investment: "$5,000",
      limit: "8 Sponsors Total",
      color: "slate" as const,
      benefits: [
        "Facilitated roundtable, workshop, or office-hours session (off main stage)",
        "Logo on Sponsors Page + digital agenda",
        "Logo on select signage (registration, break areas)",
        "Mention in conference recap video",
        "Group podcast mention",
        "Group sponsor mention in Digital Canvas + DevSA newsletters",
        "Recognition as Refreshments / Break Sponsor",
        "4 complimentary tickets per conference",
      ],
    },
    {
      name: "Community",
      subtitle: "Community Partner",
      icon: Coffee,
      investment: "$2,500",
      limit: "10 Sponsors Total",
      color: "green" as const,
      benefits: [
        "Logo on Sponsors Page + digital agenda",
        "Shared sponsor slide in opening & closing remarks",
        "Group sponsor mention in Digital Canvas + DevSA newsletter",
        "Recognition as Community Sponsor",
        "2 complimentary tickets per conference",
      ],
    },
  ]

  const conferences = [
    { date: "Feb 28", name: "More Human Than Human: AI Conference" },
    { date: "May 30", name: "Emerging Technology Conference" },
    { date: "Aug 29", name: "React Conference" },
    { date: "Nov 7", name: "PySanAntonio 2" },
  ]

  return (
    <main className="min-h-dvh bg-white overflow-x-hidden overflow-y-auto">
      
      {/* Back Navigation */}
      <div className="fixed top-20 left-4 z-50">
        <Link
          href="/sponsors"
          className="group inline-flex items-center gap-2 px-3 py-2 bg-slate-900/90 backdrop-blur-sm text-white text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>All Sponsors</span>
        </Link>
      </div>

      {/* Hero Section - Full Viewport */}
      <section className="min-h-dvh flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-white" data-bg-type="light">
        <div className="w-full max-w-4xl mx-auto pt-24 pb-8 md:pb-0">
          
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-slate-100 border border-slate-200"
            >
              <Clapperboard className="w-4 h-4 text-[#ef426f]" />
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-600">Digital Canvas Events Powered by DevSA</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <img
                src="https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/devsatv-logo.PNG"
                alt="DevSA"
                className="w-56 sm:w-72 md:w-80 h-auto mx-auto"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              San Antonio&apos;s direct connection to the active learners and builders in the tech community.
            </motion.p>
          </div>
        </div>

        {/* Media Carousel - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full overflow-hidden"
        >
          <MediaCarousel />
        </motion.div>
      </section>

      {/* Revenue Outlets Section - Own Viewport */}
      <section className="min-h-dvh flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200" data-bg-type="light">
        <div className="w-full max-w-3xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-xs font-semibold tracking-wider uppercase text-amber-600 mb-2">
              Sponsorship Opportunities
            </p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mb-3">
              How We Partner
            </h2>
          </motion.div>

          {/* Revenue Outlets Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-6"
          >
            <div className="flex border border-slate-200 bg-white p-1">
              {revenueOutlets.map((outlet) => (
                <button
                  key={outlet.id}
                  onClick={() => setActiveTab(outlet.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-2 text-xs font-semibold uppercase tracking-wide transition-all ${
                    activeTab === outlet.id
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <outlet.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{outlet.label}</span>
                  <span className="sm:hidden">{outlet.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Event - Featured */}
          <AnimatePresence mode="wait">
            {/* Quarterly Conferences Tab */}
            {activeTab === 'conferences' && (
              <section className="relative py-8 sm:py-2">
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <Link href={upcomingEvent.href} className="group block">
                      <div className="relative border border-[#333] bg-[#111] overflow-hidden transition-all duration-500 group-hover:border-[#fbbf24]/50">
                        {/* Corner decorations */}
                        <div className="absolute top-0 left-0 z-20"><AztecCorner position="top-left" /></div>
                        <div className="absolute top-0 right-0 z-20"><AztecCorner position="top-right" /></div>
                        <div className="absolute bottom-0 left-0 z-20"><AztecCorner position="bottom-left" /></div>
                        <div className="absolute bottom-0 right-0 z-20"><AztecCorner position="bottom-right" /></div>

                        <div className="grid lg:grid-cols-2">
                          {/* Video side */}
                          <div className="relative h-56 sm:h-64 lg:h-auto lg:min-h-80 overflow-hidden">
                            <video
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            >
                              <source src={upcomingEvent.image} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#111] lg:block hidden" />
                            <div className="absolute inset-0 bg-linear-to-t from-[#111] via-transparent to-transparent lg:hidden" />
                            <div className="absolute inset-0 bg-black/30" />
                            
                            {/* Status badge */}
                            <div className="absolute top-4 left-4 z-10">
                              <span className="inline-flex items-center gap-2 bg-[#fbbf24] text-[#0a0a0a] font-semibold text-[10px] uppercase tracking-wider px-3 py-1.5">
                                <span className="w-1.5 h-1.5 bg-[#0a0a0a] rounded-full animate-pulse" />
                                Registration Open
                              </span>
                            </div>
                          </div>

                          {/* Content side */}
                          <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                            <div className="absolute inset-0 bg-linear-to-br from-[#fbbf24]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative">
                              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#666] mb-3">
                                {upcomingEvent.date} • {upcomingEvent.venue}
                              </p>
                              
                              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-none mb-1">
                                <span className="text-[#fbbf24]">{upcomingEvent.title.split(' ').slice(0, 2).join(' ')}</span>
                                <span className="block">{upcomingEvent.title.split(' ').slice(2).join(' ')}</span>
                              </h2>
                              
                              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#444] mb-4">
                                {upcomingEvent.subtitle}
                              </p>
                              
                              <p className="text-[#999] text-sm leading-relaxed mb-3">
                                {upcomingEvent.description}
                              </p>
                              
                              <p className="text-[#ff9900] text-xs font-medium italic leading-relaxed mb-6">
                                {upcomingEvent.tagline}
                              </p>

                              <div className="flex items-center">
                                <span className="inline-flex items-center gap-2 bg-[#fbbf24] text-[#0a0a0a] font-semibold text-xs uppercase tracking-wider px-5 py-2.5 transition-all group-hover:bg-[#ff9900]">
                                  View Event
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </section>
            )}

              {/* Sponsored Workshops Tab */}
              {activeTab === 'workshops' && (
                <motion.div
                  key="workshops"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-[#0a0a0a] p-5 sm:p-6 overflow-hidden max-w-4xl mx-auto"
                >
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#10b981] via-[#3b82f6] to-[#10b981] opacity-60" />
                  
                  <div className="relative z-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 border border-[#333] bg-[#111]/80">
                      <Mic2 className="w-3 h-3 text-[#10b981]" />
                      <span className="font-mono text-[9px] sm:text-[10px] text-[#a3a3a3] tracking-[0.12em] uppercase">Growth Tier</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 leading-tight">
                      <span className="text-[#e5e5e5]">Sponsored </span>
                      <span className="text-[#10b981]">Workshops</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="font-mono text-[10px] sm:text-xs text-[#3b82f6] tracking-[0.12em] uppercase mb-4">
                      Hands-On Learning • Your Tools • Our Community
                    </p>

                    {/* YouTube Video Embed or Placeholder */}
                    {workshopVideoId ? (
                      <div className="relative aspect-video bg-[#111] border border-[#333] mb-4 overflow-hidden">
                        <iframe
                          src={`https://www.youtube.com/embed/${workshopVideoId}?rel=0&modestbranding=1`}
                          title="Workshop Recap Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-video bg-[#111] border border-[#333] mb-4 flex items-center justify-center group cursor-pointer hover:border-[#10b981] transition-colors">
                        <div className="absolute inset-0 bg-linear-to-br from-[#10b981]/5 to-[#3b82f6]/5" />
                        <div className="relative flex flex-col items-center gap-3">
                          <div className="w-16 h-16 flex items-center justify-center bg-[#10b981] rounded-full group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                          <p className="font-mono text-[10px] text-[#666] uppercase tracking-wider">Workshop Recap Video Coming Soon</p>
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-sm text-[#a3a3a3] leading-relaxed mb-4">
                      Partner with Digital Canvas to host focused workshops that showcase your tools and frameworks to San Antonio&apos;s tech community. Each workshop is powered by DevSA and includes a professional &quot;Sponsor Story&quot; recap video.
                    </p>

                    {/* CTA */}
                    <Link
                      href="mailto:jesse@devsanantonio.com?subject=Sponsored%20Workshop%20Inquiry"
                      className="group inline-flex items-center gap-1.5 bg-[#10b981] px-3 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#0a0a0a] transition-all hover:bg-[#3b82f6]"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span className="font-mono">Become a Workshop Sponsor</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Documentary Stories Tab */}
              {activeTab === 'documentaries' && (
                <motion.div
                  key="documentaries"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-[#0a0a0a] p-5 sm:p-6 overflow-hidden max-w-4xl mx-auto"
                >
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#f59e0b] via-[#ef4444] to-[#f59e0b] opacity-60" />
                  
                  <div className="relative z-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 border border-[#333] bg-[#111]/80">
                      <Film className="w-3 h-3 text-[#f59e0b]" />
                      <span className="font-mono text-[9px] sm:text-[10px] text-[#a3a3a3] tracking-[0.12em] uppercase">Premier Tier</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 leading-tight">
                      <span className="text-[#e5e5e5]">Documentary </span>
                      <span className="text-[#f59e0b]">Stories</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="font-mono text-[10px] sm:text-xs text-[#ef4444] tracking-[0.12em] uppercase mb-4">
                      Cinematic Storytelling • Your Impact • Lasting Legacy
                    </p>

                    {/* YouTube Video Embed or Placeholder */}
                    {documentaryVideoId ? (
                      <div className="relative aspect-video bg-[#111] border border-[#333] mb-4 overflow-hidden">
                        <iframe
                          src={`https://www.youtube.com/embed/${documentaryVideoId}?rel=0&modestbranding=1`}
                          title="Documentary Trailer"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-video bg-[#111] border border-[#333] mb-4 flex items-center justify-center group cursor-pointer hover:border-[#f59e0b] transition-colors">
                        <div className="absolute inset-0 bg-linear-to-br from-[#f59e0b]/5 to-[#ef4444]/5" />
                        <div className="relative flex flex-col items-center gap-3">
                          <div className="w-16 h-16 flex items-center justify-center bg-[#f59e0b] rounded-full group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                          <p className="font-mono text-[10px] text-[#666] uppercase tracking-wider">Documentary Trailer Coming Soon</p>
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-sm text-[#a3a3a3] leading-relaxed mb-4">
                      Tell your organization&apos;s story through a 45-minute cinematic documentary produced by Digital Canvas. Premiere at DevSA-powered conferences with permanent placement in the 434 MEDIA Library.
                    </p>

                    {/* CTA */}
                    <Link
                      href="mailto:jesse@devsanantonio.com?subject=Documentary%20Story%20Inquiry"
                      className="group inline-flex items-center gap-1.5 bg-[#f59e0b] px-3 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#0a0a0a] transition-all hover:bg-[#ef4444]"
                    >
                      <Camera className="w-3 h-3" />
                      <span className="font-mono">Tell Your Story</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          {/* 2026 Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-8"
          >
            {conferences.map((conf, index) => (
              <div 
                key={conf.name}
                className={`p-3 border text-center transition-all ${
                  index === 0 
                    ? 'border-amber-400 bg-amber-50' 
                    : 'border-slate-200 bg-white'
                }`}
              >
                <p className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${
                  index === 0 ? 'text-amber-600' : 'text-slate-400'
                }`}>
                  {conf.date}
                </p>
                <p className={`text-xs font-semibold leading-tight ${
                  index === 0 ? 'text-amber-900' : 'text-slate-700'
                }`}>
                  {conf.name}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Event-Specific Tiers: Modern Comparison Table */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#fafafa] border-b border-slate-200" data-bg-type="light">
        <div className="w-full max-w-5xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-amber-600 mb-2">
              2026 Quarterly Conference Sponsorship
            </p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 mb-2">
              Powered by DevSA
            </h2>
            <p className="text-xs text-slate-500">
              4 Quarterly Conferences | Digital Canvas Event Series
            </p>
          </motion.div>

          {/* Tier Headers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-5 gap-px bg-slate-200 mb-px"
          >
            <div className="bg-[#fafafa] p-4" />
            {eventTiers.map((tier) => (
              <div key={tier.name} className={`p-4 text-center ${tier.color === 'amber' ? 'bg-slate-900' : 'bg-white'}`}>
                <p className={`text-lg font-black ${tier.color === 'amber' ? 'text-amber-400' : 'text-slate-900'}`}>
                  {tier.name}
                </p>
                <p className={`text-[10px] uppercase tracking-wider ${tier.color === 'amber' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {tier.subtitle}
                </p>
                <p className={`text-xl font-bold mt-2 ${tier.color === 'amber' ? 'text-white' : 'text-slate-900'}`}>
                  {tier.investment}
                </p>
                <p className={`text-[9px] uppercase tracking-wider mt-1 ${tier.color === 'amber' ? 'text-amber-500' : 'text-slate-400'}`}>
                  {tier.limit}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Comparison Rows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {/* Speaking Opportunities */}
            <div className="grid grid-cols-5 gap-px bg-slate-200">
              <div className="bg-white p-3 flex items-center">
                <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide">Speaking</span>
              </div>
              <div className="bg-slate-900 p-3 text-center">
                <span className="text-[10px] text-amber-400 font-medium">Keynote + Panel</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">Lightning Talk</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">Workshop</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-400">—</span>
              </div>
            </div>

            {/* Logo Placement */}
            <div className="grid grid-cols-5 gap-px bg-slate-200">
              <div className="bg-white p-3 flex items-center">
                <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide">Logo Placement</span>
              </div>
              <div className="bg-slate-900 p-3 text-center">
                <span className="text-[10px] text-amber-400 font-medium">All Signage</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">Secondary</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">Select Areas</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">Digital Only</span>
              </div>
            </div>

            {/* Video Content */}
            <div className="grid grid-cols-5 gap-px bg-slate-200">
              <div className="bg-white p-3 flex items-center">
                <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide">Video Content</span>
              </div>
              <div className="bg-slate-900 p-3 text-center">
                <span className="text-[10px] text-amber-400 font-medium">4 Videos</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">1 Video</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">Mention</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-400">—</span>
              </div>
            </div>

            {/* Podcast Features */}
            <div className="grid grid-cols-5 gap-px bg-slate-200">
              <div className="bg-white p-3 flex items-center">
                <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide">Podcast</span>
              </div>
              <div className="bg-slate-900 p-3 text-center">
                <span className="text-[10px] text-amber-400 font-medium">2 Features</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">1 Mention</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">Group Mention</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-400">—</span>
              </div>
            </div>

            {/* Discord Sessions */}
            <div className="grid grid-cols-5 gap-px bg-slate-200">
              <div className="bg-white p-3 flex items-center">
                <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide">Discord</span>
              </div>
              <div className="bg-slate-900 p-3 text-center">
                <span className="text-[10px] text-amber-400 font-medium">2 Sessions</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">2 Sessions</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-400">—</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-400">—</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="grid grid-cols-5 gap-px bg-slate-200">
              <div className="bg-white p-3 flex items-center">
                <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide">Newsletter</span>
              </div>
              <div className="bg-slate-900 p-3 text-center">
                <span className="text-[10px] text-amber-400 font-medium">Spotlight</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">Highlight</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">Group</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">Group</span>
              </div>
            </div>

            {/* Happy Hour */}
            <div className="grid grid-cols-5 gap-px bg-slate-200">
              <div className="bg-white p-3 flex items-center">
                <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide">Happy Hour</span>
              </div>
              <div className="bg-slate-900 p-3 text-center">
                <span className="text-[10px] text-amber-400 font-medium">Host</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">Recognition</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">Break Sponsor</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-400">—</span>
              </div>
            </div>

            {/* Tickets */}
            <div className="grid grid-cols-5 gap-px bg-slate-200">
              <div className="bg-white p-3 flex items-center">
                <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide">Tickets</span>
              </div>
              <div className="bg-slate-900 p-3 text-center">
                <span className="text-[10px] text-amber-400 font-medium">8 per event</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">6 per event</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">4 per event</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-600 font-medium">2 per event</span>
              </div>
            </div>

            {/* Attendee List */}
            <div className="grid grid-cols-5 gap-px bg-slate-200 mb-px">
              <div className="bg-white p-3 flex items-center">
                <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide">Attendee List</span>
              </div>
              <div className="bg-slate-900 p-3 text-center">
                <CheckCircle2 className="w-4 h-4 text-amber-400 mx-auto" />
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-400">—</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-400">—</span>
              </div>
              <div className="bg-white p-3 text-center">
                <span className="text-[10px] text-slate-400">—</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900" data-bg-type="dark">
        <div className="w-full max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-wider uppercase text-amber-500 mb-3">
              The Flywheel
            </p>
            <p className="text-sm sm:text-base text-slate-400 mb-6 leading-relaxed">
              Community → Content → Library → Sponsors → Growth
            </p>
            <Link
              href="mailto:build@434media.com?subject=Digital%20Canvas%20Sponsorship%20Inquiry"
              className="group inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 transition-all"
            >
              <span>Partner With Digital Canvas</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
