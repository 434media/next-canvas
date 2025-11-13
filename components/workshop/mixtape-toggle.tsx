"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"

interface MixtapeToggleProps {
  theme: "good" | "hood"
  onToggle: () => void
  isMenuOpen?: boolean
}

export function MixtapeToggle({ theme, onToggle, isMenuOpen }: MixtapeToggleProps) {
  const isDark = theme === "hood"
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  // Scale from 1 to 0.7 as user scrolls from 0 to 200px
  const scale = useTransform(scrollY, [0, 200], [1, 0.7])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  // </CHANGE>

  return (
    <motion.button
      onClick={onToggle}
      className={`fixed right-6 top-20 z-30 group overflow-hidden rounded-lg border-4 p-4 shadow-2xl transition-all focus:outline-none focus:ring-4 ${
        isDark
          ? "border-[#ff6b35] bg-[#1a1a1a] focus:ring-[#ff6b35]/50"
          : "border-[#2563eb] bg-white focus:ring-[#2563eb]/50"
      } ${isMenuOpen ? "opacity-0 pointer-events-none" : ""}`}
      style={{ scale }}
      whileHover={{ scale: isScrolled ? 0.75 : 1.05, rotate: isDark ? -2 : 2 }}
      whileTap={{ scale: isScrolled ? 0.65 : 0.95 }}
      aria-label="Toggle between Good Kid and Hood Kid themes"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        {isDark ? (
          <>
            <div className="absolute right-0 top-0 h-12 w-12 rounded-full bg-[#ffd23f]" />
            <div
              className="absolute bottom-0 left-0 h-8 w-8 bg-[#00ff88]"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/20 to-[#60a5fa]/20" />
        )}
      </div>

      {/* Mixtape SVG with flip animation */}
      <motion.div
        className="mixtape-flip relative"
        animate={{ rotateY: isDark ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <svg width="80" height="50" viewBox="0 0 80 50" className="drop-shadow-lg">
          {/* Cassette body */}
          <rect
            x="4"
            y="8"
            width="72"
            height="34"
            rx="3"
            fill={isDark ? "#0a0a0a" : "#f5f5f5"}
            stroke={isDark ? "#ff6b35" : "#2563eb"}
            strokeWidth="2"
          />

          {/* Inner label area */}
          <rect x="10" y="14" width="60" height="22" rx="1" fill={isDark ? "#1a1a1a" : "#ffffff"} />

          {/* Left reel */}
          <motion.circle
            cx="25"
            cy="25"
            r="7"
            fill={isDark ? "#ff6b35" : "#2563eb"}
            animate={{ rotate: isDark ? 360 : 0 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{ transformOrigin: "25px 25px" }}
          />
          <circle cx="25" cy="25" r="4" fill={isDark ? "#0a0a0a" : "#fff"} />

          {/* Right reel */}
          <motion.circle
            cx="55"
            cy="25"
            r="7"
            fill={isDark ? "#ffd23f" : "#60a5fa"}
            animate={{ rotate: isDark ? -360 : 0 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{ transformOrigin: "55px 25px" }}
          />
          <circle cx="55" cy="25" r="4" fill={isDark ? "#0a0a0a" : "#fff"} />

          {/* Tape between reels */}
          <rect x="28" y="23" width="24" height="4" fill={isDark ? "#333" : "#cbd5e1"} />

          {/* Side label */}
          <text
            x="40"
            y="18"
            textAnchor="middle"
            fontSize="10"
            fontWeight="bold"
            fill={isDark ? "#00ff88" : "#1e40af"}
            className="font-[var(--font-menda-black)]"
          >
            SIDE {isDark ? "A" : "B"}
          </text>
        </svg>
      </motion.div>

      {/* Label text */}
      <motion.div
        className="mt-2 text-center"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <span className={`block font-bold text-xs tracking-widest ${isDark ? "text-[#ff6b35]" : "text-[#2563eb]"}`}>
          FLIP IT
        </span>
      </motion.div>
    </motion.button>
  )
}
