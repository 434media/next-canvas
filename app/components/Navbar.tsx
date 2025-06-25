"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "motion/react"
import SlideoverMenu from "./slideover-menu"
import "remixicon/fonts/remixicon.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const [gridPoints, setGridPoints] = useState<Array<{ left: string; top: string; delay: number }>>([])

  // Start blur immediately when content touches navbar
  const navbarOpacity = useTransform(scrollY, [0, 50], [0.75, 0.98])
  const navbarBlur = useTransform(scrollY, [0, 50], [0, 60])
  const backgroundOpacity = useTransform(scrollY, [0, 50], [0, 0.95])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Generate grid points only on client side to avoid hydration mismatch
    const points = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
    }))
    setGridPoints(points)
  }, [])

  return (
    <>
      {/* Main Navbar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          backdropFilter: `blur(${navbarBlur}px) saturate(200%)`,
          WebkitBackdropFilter: `blur(${navbarBlur}px) saturate(200%)`,
        }}
      >
        {/* Black Grid Background */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
          {/* Grid intersection highlights */}
          <div className="absolute inset-0">
            {gridPoints.map((point, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
                style={{
                  left: point.left,
                  top: point.top,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: point.delay,
                }}
              />
            ))}
          </div>
        </div>

        {/* Strong background overlay to block content */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "rgba(0, 0, 0, 0.92)",
            opacity: backgroundOpacity,
          }}
        />

        {/* Additional solid background for complete coverage */}
        <motion.div
          className="absolute inset-0 bg-black"
          animate={{
            opacity: isScrolled ? 0.85 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        <motion.nav
          className="relative border-b"
          style={{
            background: `rgba(0, 0, 0, ${navbarOpacity})`,
          }}
          animate={{
            borderColor: isScrolled ? "rgba(236, 72, 153, 0.3)" : "rgba(34, 211, 238, 0.2)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Enhanced gradient border */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: isScrolled
                ? "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.6), rgba(236, 72, 153, 0.6), rgba(34, 211, 238, 0.6), transparent)"
                : "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.3), rgba(236, 72, 153, 0.3), rgba(34, 211, 238, 0.3), transparent)",
            }}
            animate={{
              opacity: isScrolled ? 1 : 0.7,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          {/* Glass morphism overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: isScrolled
                ? "linear-gradient(90deg, rgba(34, 211, 238, 0.15), rgba(236, 72, 153, 0.15), rgba(34, 211, 238, 0.15))"
                : "linear-gradient(90deg, rgba(34, 211, 238, 0.08), rgba(236, 72, 153, 0.08), rgba(34, 211, 238, 0.08))",
            }}
          />

          {/* Navbar content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <motion.div
                className="flex-shrink-0 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Link href="/" passHref>
                  <motion.div className="relative cursor-pointer">
                    <div className="relative z-10">
                      <Image
                        src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
                        alt="Digital Canvas Logo"
                        width={150}
                        height={40}
                        className="transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                      />

                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 opacity-0 group-hover:opacity-100"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>

                    <motion.div
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-cyan-400 font-medium opacity-0 group-hover:opacity-100 whitespace-nowrap"
                      initial={{ y: 5, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      The Creative Layer of 434 MEDIA
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(true)}
                className="text-white/90 hover:text-cyan-400 transition-colors duration-300 relative group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                aria-label="Open menu"
              >
                <div className="relative p-2">
                  <motion.i
                    className="ri-menu-line text-2xl"
                    animate={{ rotate: isMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-pink-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-cyan-400/20 group-hover:border-pink-500/30" />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.nav>
      </motion.header>

      <SlideoverMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}

export default Navbar
