"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "motion/react"
import SlideoverMenu from "./slideover-menu"
import "remixicon/fonts/remixicon.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const lastYRef = useRef(0)
  const [showNavbar, setShowNavbar] = useState(true)

  // Start blur immediately when content touches navbar
  const navbarOpacity = useTransform(scrollY, [0, 50], [0.75, 0.98])
  const navbarBlur = useTransform(scrollY, [0, 500], [0, 60])
  const backgroundOpacity = useTransform(scrollY, [0, 50], [0, 0.95])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (current) => {
      const last = lastYRef.current
      const delta = current - last

      if (current <= 0) {
        setShowNavbar(true)
      } else if (delta > 0 && current > 80) {
        // scrolling down past threshold -> hide
        setShowNavbar(false)
      } else if (delta < 0) {
        // scrolling up -> show
        setShowNavbar(true)
      }

      lastYRef.current = current
    })
    return () => unsubscribe()
  }, [scrollY])

  return (
    <>
      {/* Main Navbar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40"
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          backdropFilter: `blur(${navbarBlur}px) saturate(200%)`,
          WebkitBackdropFilter: `blur(${navbarBlur}px) saturate(200%)`,
        }}
      >
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
            borderColor: isScrolled ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Enhanced gradient border */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: isScrolled
                ? "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.6), rgba(168, 85, 247, 0.6), rgba(20, 184, 166, 0.6), transparent)"
                : "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3), rgba(20, 184, 166, 0.3), transparent)",
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
                ? "linear-gradient(90deg, rgba(59, 130, 246, 0.15), rgba(168, 85, 247, 0.15), rgba(20, 184, 166, 0.15))"
                : "linear-gradient(90deg, rgba(59, 130, 246, 0.08), rgba(168, 85, 247, 0.08), rgba(20, 184, 166, 0.08))",
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
                        width={135}
                        height={36}
                        className="transition-all duration-300 group-hover:brightness-110"
                      />

                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 opacity-0 group-hover:opacity-100"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(true)}
                className="text-white/90 hover:text-white transition-colors duration-300 relative group"
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
                  <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
