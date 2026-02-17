"use client"

import { AnimatePresence, motion } from "motion/react"
import { X } from "lucide-react"
import Link from "next/link"

interface ConferencePopupProps {
  showModal: boolean
  onClose: () => void
}

const upcomingEvent = {
  title: "More Human Than Human",
  subtitle: "AI Conference • Powered by DevSA",
  date: "Feb 28, 2026",
  venue: "San Antonio, TX",
  description:
    "Join San Antonio's builders, dreamers, and technologists for a deep dive into how AI is re-architecting the way we write code, secure the internet, and lead organizations.",
  tagline:
    "Where local builders shape the future of AI in San Antonio",
  image: "https://devsa-assets.s3.us-east-2.amazonaws.com/HEAD_v01.mp4",
  href: "/conferences/morehumanthanhuman",
}

function AztecCorner({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}) {
  const rotations = {
    "top-left": "rotate-0",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  }

  return (
    <div className={`w-12 h-12 lg:w-16 lg:h-16 ${rotations[position]}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
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

export default function ConferencePopup({
  showModal,
  onClose,
}: ConferencePopupProps) {
  if (!showModal) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl overflow-hidden max-h-[85vh] md:max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30 p-2 bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#333] text-white hover:border-[#ff9900] transition-all duration-300 focus:outline-none"
            aria-label="Close conference announcement"
          >
            <X className="h-5 w-5" />
          </button>

          <Link href={upcomingEvent.href} onClick={onClose} className="group block">
            <div className="relative border border-[#333] bg-[#111] overflow-hidden transition-all duration-500 group-hover:border-[#fbbf24]/50">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 z-20">
                <AztecCorner position="top-left" />
              </div>
              <div className="absolute top-0 right-0 z-20">
                <AztecCorner position="top-right" />
              </div>
              <div className="absolute bottom-0 left-0 z-20">
                <AztecCorner position="bottom-left" />
              </div>
              <div className="absolute bottom-0 right-0 z-20">
                <AztecCorner position="bottom-right" />
              </div>

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
                      <span className="text-[#fbbf24]">
                        {upcomingEvent.title.split(" ").slice(0, 2).join(" ")}
                      </span>
                      <span className="block">
                        {upcomingEvent.title.split(" ").slice(2).join(" ")}
                      </span>
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
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
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
      </motion.div>
    </AnimatePresence>
  )
}
