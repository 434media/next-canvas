"use client"

import type React from "react"

import { motion } from "motion/react"
import { useState } from "react"

interface Pixel {
  id: number
  x: number
  y: number
  color: string
}

export const FloatingPixels: React.FC = () => {
  const [pixels, setPixels] = useState<Pixel[]>([])

  const colors = ["#FF6B6B", "#4ECDC4", "#45B649", "#FF512F", "#614385"]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (Math.random() > 0.8) {
      const newPixel: Pixel = {
        id: Date.now(),
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
      }

      setPixels((prevPixels) => [...prevPixels.slice(-20), newPixel])
    }
  }

  return (
    <div className="absolute inset-0 z-10 pointer-events-none" onMouseMove={handleMouseMove}>
      {pixels.map((pixel) => (
        <motion.div
          key={pixel.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: pixel.color,
            x: pixel.x,
            y: pixel.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [1, 0],
            scale: [0, 1.5],
            x: pixel.x + (Math.random() - 0.5) * 100,
            y: pixel.y + (Math.random() - 0.5) * 100,
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

