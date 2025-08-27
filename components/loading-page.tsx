"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react"

export default function LoadingPage() {
  const [isVisible, setIsVisible] = useState(true)
  const [particles, setParticles] = useState<
    Array<{
      left: string
      top: string
      background: string
      duration: number
      delay: number
    }>
  >([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    const backgrounds = ["#fbbf24", "#f59e0b", "#f97316", "#f43f5e", "#0ea5e9"]
    const arr = Array.from({ length: 12 }, (_, i) => ({
      left: `${45 + Math.random() * 10}%`,
      top: `${45 + Math.random() * 10}%`,
      background: backgrounds[i % 5],
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
    setParticles(arr)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null
  const showParticles = particles.length === 12

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Animated circles around logo */}
        <div className="relative">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`orbit-${i}`}
              className="absolute w-3 h-3 rounded-full shadow-lg"
              style={{
                left: "50%",
                top: "50%",
                transformOrigin: `0 ${90 + i * 12}px`,
                background: ["#fbbf24", "#f59e0b", "#f97316", "#ea580c", "#f43f5e", "#e11d48", "#0ea5e9", "#38bdf8"][i],
                boxShadow: `0 0 10px ${
                  ["#fbbf24", "#f59e0b", "#f97316", "#ea580c", "#f43f5e", "#e11d48", "#0ea5e9", "#38bdf8"][i]
                }40`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: i * 0.15,
              }}
            />
          ))}

          {/* Digital Canvas Logo */}
          <motion.div
            className="relative z-20 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.img
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/digital-canvas-dark.svg"
              alt="Digital Canvas Logo"
              className="w-40 h-40 md:w-48 md:h-48 drop-shadow-lg"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        {/* Loading text */}
        <motion.div
          className="text-center md:-mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h2
            className="text-xl md:text-3xl text-neutral-800 mb-2"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            The Creative Layer of <span className="block font-menda-black">434 MEDIA</span>
          </motion.h2>
          <motion.p
            className="text-sm font-geist-mono md:text-base text-neutral-600"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            Loading creative experiences...
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-6 w-48 md:w-64 h-2 bg-neutral-200 rounded-full overflow-hidden shadow-inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #fbbf24, #f59e0b, #f97316, #f43f5e, #e11d48, #0ea5e9)",
              backgroundSize: "200% 100%",
            }}
            initial={{ width: "0%" }}
            animate={{
              width: "100%",
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
            }}
            transition={{
              width: { duration: 2.5, ease: "easeInOut", delay: 0.5 },
              backgroundPosition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
