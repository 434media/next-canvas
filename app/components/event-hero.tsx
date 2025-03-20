"use client"

import { motion } from "motion/react"
import Image from "next/image"

interface EventHeroProps {
  title: string
  date: string
  location: string
  image: string
}

const EventHero = ({ title, date, location, image }: EventHeroProps) => {
  return (
    <section className="relative min-h-[60vh] flex items-center mt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-900/60 to-neutral-900"></div>
      </div>

      {/* Wireframe Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative p-8 border border-blue-500/20 rounded-lg max-w-3xl"
        >
          {/* Wireframe corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-500/40" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-500/40" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-500/40" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-500/40" />

          <div className="text-white/70 mb-2 flex items-center">
            <i className="ri-calendar-event-line mr-2"></i>
            <span>{date}</span>
          </div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-purple-500 text-transparent bg-clip-text">
              {title}
            </span>
          </motion.h1>

          <motion.div
            className="flex items-center text-white/70 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <i className="ri-map-pin-line mr-2"></i>
            <span>{location}</span>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
              <i className="ri-user-line mr-1"></i> 200+ Attendees
            </div>
            <div className="bg-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
              <i className="ri-mic-line mr-1"></i> 15+ Speakers
            </div>
            <div className="bg-teal-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
              <i className="ri-projector-line mr-1"></i> 8 Workshops
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default EventHero

