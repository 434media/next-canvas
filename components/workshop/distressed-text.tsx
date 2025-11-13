"use client"

import type React from "react"

import { motion } from "framer-motion"

interface DistressedTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function DistressedText({ children, className = "", delay = 0 }: DistressedTextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative inline-block ${className}`}
      style={{
        textShadow: "2px 2px 0px rgba(0, 0, 0, 0.1)",
      }}
    >
      {children}
    </motion.span>
  )
}
