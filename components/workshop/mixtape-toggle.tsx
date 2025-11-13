"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"

interface MixtapeToggleProps {
  theme: "good" | "hood"
  onToggle: () => void
  isMenuOpen?: boolean
}

export function MixtapeToggle({ theme, onToggle, isMenuOpen }: MixtapeToggleProps) {
  const isDark = theme === "hood"
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  const scale = useTransform(scrollY, [0, 200], [1, 0.7])

  // Delayed shake state and glow
  const [shouldShake, setShouldShake] = useState(false)
  const [showGlow, setShowGlow] = useState(false)

  useEffect(() => {
    // Random delay between 5-20 seconds
    const delay = 5000
    const shakeTimer = setTimeout(() => {
      setShouldShake(true)
      setShowGlow(true)
      // Remove shake and glow after animation
      setTimeout(() => {
        setShouldShake(false)
        setShowGlow(false)
      }, 900)
    }, delay)
    return () => clearTimeout(shakeTimer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.button
      onClick={onToggle}
      className={`fixed right-0 md:right-4 top-12 md:top-20 z-30 group overflow-visible transition-all focus:outline-none focus:ring-0 ${
        isMenuOpen ? "opacity-0 pointer-events-none" : ""
      }`}
      style={{ scale }}
      whileHover={{ scale: isScrolled ? 0.75 : 1.1 }}
      whileTap={{ scale: isScrolled ? 0.65 : 0.95 }}
      aria-label="Toggle between Good Kid and Hood Kid themes"
    >
      <motion.div
        className="relative w-40 h-40"
        animate={
          shouldShake
            ? {
                rotate: isDark ? [0, -8, 8, -8, 8, 0] : [0, 8, -8, 8, -8, 0],
                y: [0, -6, 6, -6, 6, 0],
                rotateY: isDark ? 180 : 0,
              }
            : { rotateY: isDark ? 180 : 0 }
        }
        transition={{ duration: shouldShake ? 0.9 : 0.6, ease: [0.4, 0, 0.2, 1] }}
        whileHover={{
          rotate: isDark ? [0, -3, 3, -3, 0] : [0, 2, -2, 2, 0],
          y: [-2, 2, -2],
        }}
      >
        {showGlow && (
          <div
            className={`absolute inset-0 rounded-full z-0 animate-pulse pointer-events-none ${
              isDark
                ? "bg-[#ff6b35]/40 shadow-[0_0_40px_20px_rgba(255,107,53,0.5)]"
                : "bg-[#2563eb]/30 shadow-[0_0_40px_20px_rgba(37,99,235,0.4)]"
            }`}
            style={{ filter: isDark ? "blur(8px)" : "blur(8px)" }}
          />
        )}
        <Image
          src="https://ampd-asset.s3.us-east-2.amazonaws.com/mixtape.png"
          alt="Mixtape cassette"
          width={160}
          height={160}
          className={`w-full h-full object-contain transition-all duration-500 cursor-pointer ${
            isDark
              ? "brightness-110 contrast-125 saturate-150 hue-rotate-[-15deg]"
              : "brightness-100 contrast-110 saturate-100 hue-rotate-15"
          }`}
          style={{
            filter: isDark
              ? "drop-shadow(0 0 12px rgba(255, 215, 63, 0.6)) drop-shadow(0 0 20px rgba(255, 107, 53, 0.5)) drop-shadow(0 0 30px rgba(255, 107, 53, 0.3))"
              : "drop-shadow(0 0 8px rgba(96, 165, 250, 0.5)) drop-shadow(0 0 16px rgba(37, 99, 235, 0.3))",
          }}
        />
      </motion.div>

      <motion.div className="-mt-10 md:-mt-10 text-center" initial={{ opacity: 0.6 }} whileHover={{ opacity: 1 }}>
        <span
          className={`block font-bold text-xs tracking-[0.25em] uppercase ${
            isDark
              ? "text-[#ff6b35] drop-shadow-[0_0_8px_rgba(255,107,53,0.9)]"
              : "text-[#2563eb] drop-shadow-[0_0_6px_rgba(37,99,235,0.6)]"
          }`}
        >
          {isDark ? "HOOD KID" : "GOOD KID"}
        </span>
      </motion.div>
    </motion.button>
  )
}
