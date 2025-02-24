"use client"

import type React from "react"
import { motion } from "motion/react"

export const SanAntonioSection: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-gray-900 to-gray-800"
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
        The Creative Tech Community
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl"
      >
        Discover how San Antonio creatives are pushing the boundaries of art and technology
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl"
      >
        {["Design", "Development", "Photography", "Videography"].map((field) => (
          <motion.div
            key={field}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-2">{field}</h3>
            <p className="text-gray-300">Explore innovative {field.toLowerCase()} projects and techniques.</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

