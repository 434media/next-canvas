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

export default function DevsaTVPage() {
  const [activeTab, setActiveTab] = useState<'conferences' | 'workshops' | 'documentaries'>('conferences')

  // YouTube video IDs - extract from URL:
  const workshopVideoId = "BOCU-seUXQ8"
  const documentaryVideoId = "8pDqJVdNa44"

  const revenueOutlets = [
    { id: 'conferences' as const, label: 'Quarterly Conferences', icon: Calendar, investment: 'Powered by DevSA' },
    { id: 'workshops' as const, label: 'Sponsored Workshops', icon: Mic2, investment: 'Powered by DevSA' },
    { id: 'documentaries' as const, label: 'Documentary Stories', icon: Film, investment: 'Powered by DevSA' },
  ]

  const annualTiers = [
    {
      name: "The Documentary Story",
      tier: "Premier Tier",
      icon: Film,
      investment: "$50,000/yea",
      goal: "2 Partners",
      target: "Local Pillars (Frost, H-E-B, USAA, PortSA, UTSA, Spurs)",
      benefits: [
        "45-minute cinematic documentary chronicling your team's innovation, culture, and community impact",
        "Episodic flexibility: Option to break into a Limited Series (3 x 15-minute episodes)",
        "Exclusive red-carpet premiere screening at the DEVSA Annual Conference",
        "Permanent placement in the 434 MEDIA Library as a historical 'Source of Truth'",
        "10+ professional short-form vertical assets (Reels/TikToks) from feature content",
        "12-month 'Presented By' placement on all DEVSA TV documentary trailers and season teasers",
      ],
    },
    {
      name: "The Quarterly Conference",
      tier: "Event Tier",
      icon: Calendar,
      investment: "$25,000/event",
      goal: "4 Events per Season",
      target: "Infrastructure & Dev Tools (Vercel, Cloudflare, Microsoft, Cursor, Google)",
      benefits: [
        "Exclusive title sponsorship of one major conference (e.g., More Human Than Human)",
        "One 45-minute Main Stage Keynote or deep-dive technical showcase",
        "Professional 'Deep Dive' video of your session, edited for DEVSA TV YouTube channel",
        "Your logo featured on the DEVSA TV interview set",
      ],
    },
    {
      name: "The Sponsored Workshop",
      tier: "Growth Tier",
      icon: Mic2,
      investment: "$10,000/workshop",
      goal: "5 Workshops per Season",
      target: "Local Tech Orgs (VIA, SWBC, 80/20) or Frameworks (Laravel, Cursor, AWS)",
      benefits: [
        "A focused technical workshop where developers build using your tools or frameworks",
        "'Sponsor Story' documentary recap video (3–5 minutes) capturing builders in action",
        "Direct interaction with a 'vetted' local talent pipeline",
        "Official 'Bridge Builder' status across all channels and TheFeed",
      ],
    },
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

          {/* Featured Production Showcase - Tabbed Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <AnimatePresence mode="wait">
              {/* Quarterly Conferences Tab */}
              {activeTab === 'conferences' && (
                <motion.div
                  key="conferences"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-[#0a0a0a] p-5 sm:p-6 overflow-hidden"
                >
                  {/* Aztec corners */}
                  <div className="absolute top-1 left-1">
                    <AztecCardCorner position="top-left" />
                  </div>
                  <div className="absolute top-1 right-1">
                    <AztecCardCorner position="top-right" />
                  </div>
                  <div className="absolute bottom-1 left-1">
                    <AztecCardCorner position="bottom-left" />
                  </div>
                  <div className="absolute bottom-1 right-1">
                    <AztecCardCorner position="bottom-right" />
                  </div>
                  
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#ef426f] via-[#00f2ff] to-[#ef426f] opacity-60" />
                  
                  <div className="relative z-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 border border-[#333] bg-[#111]/80">
                      <Tv className="w-3 h-3 text-[#ff9900]" />
                      <span className="font-mono text-[9px] sm:text-[10px] text-[#a3a3a3] tracking-[0.12em] uppercase">Featured Production</span>
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 leading-tight">
                      <span className="text-[#e5e5e5]">More Human </span>
                      <span className="text-[#ff9900]">Than Human</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="font-mono text-[10px] sm:text-xs text-[#00f2ff] tracking-[0.12em] uppercase mb-3">
                      Digital Canvas AI Conference • Powered by DevSA
                    </p>

                    {/* Details */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-[#e5e5e5]">
                        <Calendar className="w-3 h-3 text-[#ff9900]" />
                        <span>Feb 28, 2026</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-[#e5e5e5]">
                        <Video className="w-3 h-3 text-[#00f2ff]" />
                        <span>Full Documentary Coverage</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href="/events/morehumanthanhuman"
                      className="group inline-flex items-center gap-1.5 bg-[#ff9900] px-3 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#0a0a0a] transition-all hover:bg-[#00f2ff]"
                    >
                      <Clapperboard className="w-3 h-3" />
                      <span className="font-mono">Learn More</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Sponsored Workshops Tab */}
              {activeTab === 'workshops' && (
                <motion.div
                  key="workshops"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-[#0a0a0a] p-5 sm:p-6 overflow-hidden"
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-[#0a0a0a] p-5 sm:p-6 overflow-hidden"
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
          </motion.div>

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

      {/* Event-Specific Tiers: More Human Than Human */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200" data-bg-type="light">
        <div className="w-full max-w-6xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-xs font-semibold tracking-wider uppercase text-cyan-600 mb-2">
              2026 Quarterly Conference Sponsorship
            </p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mb-3">
              Powered by DevSA
            </h2>
            <p className="text-sm text-slate-500 mb-3">
              4 Quarterly Conferences | Digital Canvas Event Series
            </p>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Digital Canvas conferences, powered by DevSA, bring together builders, architects, and industry leaders to explore the synergy between human creativity and machine intelligence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {eventTiers.map((tier, index) => {
              const colorClasses = {
                amber: {
                  bg: 'bg-slate-900',
                  border: 'border-amber-500/50',
                  borderB: 'border-amber-500/30',
                  icon: 'bg-amber-500',
                  iconText: 'text-slate-900',
                  title: 'text-white',
                  subtitle: 'text-amber-400',
                  limit: 'text-amber-500',
                  price: 'text-white',
                  check: 'text-amber-500',
                  benefit: 'text-slate-300',
                },
                yellow: {
                  bg: 'bg-amber-50',
                  border: 'border-amber-200',
                  borderB: 'border-amber-100',
                  icon: 'bg-amber-500',
                  iconText: 'text-white',
                  title: 'text-slate-900',
                  subtitle: 'text-amber-600',
                  limit: 'text-amber-600',
                  price: 'text-slate-900',
                  check: 'text-amber-500',
                  benefit: 'text-slate-600',
                },
                slate: {
                  bg: 'bg-slate-100',
                  border: 'border-slate-200',
                  borderB: 'border-slate-200',
                  icon: 'bg-slate-400',
                  iconText: 'text-white',
                  title: 'text-slate-900',
                  subtitle: 'text-slate-500',
                  limit: 'text-slate-500',
                  price: 'text-slate-900',
                  check: 'text-slate-400',
                  benefit: 'text-slate-600',
                },
                green: {
                  bg: 'bg-emerald-50',
                  border: 'border-emerald-200',
                  borderB: 'border-emerald-100',
                  icon: 'bg-emerald-500',
                  iconText: 'text-white',
                  title: 'text-slate-900',
                  subtitle: 'text-emerald-600',
                  limit: 'text-emerald-600',
                  price: 'text-slate-900',
                  check: 'text-emerald-500',
                  benefit: 'text-slate-600',
                },
              }
              const colors = colorClasses[tier.color]
              
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`border overflow-hidden transition-colors ${colors.bg} ${colors.border} hover:shadow-lg`}
                >
                  {/* Header */}
                  <div className={`p-5 border-b ${colors.borderB}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 flex items-center justify-center ${colors.icon}`}>
                        <tier.icon className={`w-5 h-5 ${colors.iconText}`} />
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold leading-tight ${colors.title}`}>
                          {tier.name}
                        </h3>
                        <p className={`text-xs ${colors.subtitle}`}>
                          {tier.subtitle}
                        </p>
                      </div>
                    </div>
                    {tier.limit && (
                      <p className={`text-[10px] font-semibold tracking-wider uppercase ${colors.limit} mb-2`}>
                        Limited to {tier.limit}
                      </p>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className={`text-2xl font-extrabold ${colors.price}`}>
                        {tier.investment}
                      </span>
                    </div>
                  </div>
                  
                  {/* Benefits */}
                  <div className="p-5 max-h-80 overflow-y-auto">
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${colors.check}`} />
                          <span className={`text-xs leading-relaxed ${colors.benefit}`}>
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
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
