"use client"

import type React from "react"
import { motion } from "motion/react"

export const EventsSection: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-gray-700 to-gray-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center leading-tight"
      >
        Immersive Events & Tech Talks
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl md:text-2xl text-gray-300 text-center max-w-4xl space-y-6"
      >
        <p>Digital Canvas isn&apos;t just a showcase; it&apos;s a vibrant hub for learning and connection.</p>
        <p>Each event features tech talks focused on cutting-edge tools and programming powering creative fields.</p>
        <p>
          Think of it as DEVSA with a live music twist! We&apos;re bringing that same community focus on learning and
          networking, but adding a whole new dimension of artistic expression.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl"
      >
        {["Tech Talks", "Live Demos", "Networking", "Artistic Showcases"].map((event, index) => (
          <motion.div
            key={event}
            className="bg-gray-600 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-2">{event}</h3>
            <p className="text-gray-300">Experience the fusion of technology and creativity.</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

