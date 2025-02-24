"use client"

import type React from "react"
import { motion } from "framer-motion"

interface GradientCircleProps {
  gradientColors: string[]
  onClick: () => void
  label: string
  isActive: boolean
}

export const GradientCircle: React.FC<GradientCircleProps> = ({ gradientColors, onClick, label, isActive }) => {
  return (
    <motion.button
      layout
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-24 h-24 rounded-full flex items-center justify-center text-white font-medium cursor-pointer overflow-hidden"
      onClick={onClick}
      aria-label={label}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isActive
            ? "linear-gradient(135deg, #ffffff, #ffffff)"
            : `linear-gradient(135deg, ${gradientColors.join(", ")})`,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <span
        className="relative z-10 transition-colors duration-300"
        style={{ color: isActive ? gradientColors[0] : "white" }}
      >
        {label}
      </span>
    </motion.button>
  )
}

