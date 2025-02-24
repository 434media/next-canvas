"use client"

import type React from "react"

import { motion } from "motion/react"
import { RiArrowDownLine } from "@remixicon/react"

export const ScrollIndicator: React.FC = () => {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
      >
        <RiArrowDownLine className="text-white text-4xl" />
      </motion.div>
      <p className="text-white text-sm mt-2">Scroll to explore</p>
    </motion.div>
  )
}

