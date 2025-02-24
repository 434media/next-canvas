"use client"

import type React from "react"
import { motion } from "motion/react"

export const PartnersSection: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-gray-600 to-gray-500"
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
        Building a Creative Movement
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl md:text-2xl text-gray-300 text-center max-w-4xl space-y-6"
      >
        <p>
          We're not just building an event series; we're building a movement. We envision Digital Canvas becoming a
          cornerstone of the San Antonio creative ecosystem, connecting and inspiring individuals across all
          disciplines.
        </p>
        <p>
          We're proud to partner with local organizations and businesses to bring you the best of the San Antonio
          creative tech community.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl"
      >
        {[
          "Local Businesses",
          "Tech Companies",
          "Art Galleries",
          "Educational Institutions",
          "Community Organizations",
          "Media Partners",
        ].map((partner, index) => (
          <motion.div
            key={partner}
            className="bg-gray-500 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-2">{partner}</h3>
            <p className="text-gray-200">Collaborating to foster innovation and creativity.</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

