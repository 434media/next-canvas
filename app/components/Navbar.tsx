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
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95])
  const navbarBlur = useTransform(scrollY, [0, 100], [12, 25])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Event Banner */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white py-2 px-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <motion.div
              className="flex items-center space-x-2 min-w-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.i
                className="ri-lightbulb-line text-yellow-300 text-sm sm:text-base flex-shrink-0"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <span className="text-xs sm:text-sm font-medium truncate">
                <strong>NEW:</strong> Prompt to Product: Build Smarter in 6 Weeks
              </span>
            </motion.div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0 ml-2">
            <Link
              href="/events/prompt-to-product"
              className="group relative inline-flex items-center px-3 py-1.5 sm:px-6 sm:py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold rounded-full text-xs sm:text-sm transition-all duration-300 border border-white/20 hover:border-white/40 overflow-hidden"
            >
              {/* Mobile: Show only icon */}
              <span className="sm:hidden">
                <motion.i
                  className="ri-graduation-cap-line"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </span>

              {/* Desktop: Show text with icon */}
              <span className="hidden sm:inline relative z-10">Education Series</span>
              <motion.i
                className="ri-graduation-cap-line hidden sm:inline ml-2 relative z-10"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />

              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20"
                initial={{ x: "100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                animate={{
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </Link>
          </motion.div>
        </div>

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${i * 20 + 10}%`,
                top: "50%",
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                y: [-10, 10, -10],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main Navbar */}
      <motion.header
        className="fixed top-10 left-0 right-0 z-40"
        style={{
          backdropFilter: `blur(${navbarBlur}px)`,
        }}
      >
        <motion.nav
          className="relative backdrop-blur-md"
          style={{
            background: `rgba(0, 0, 0, ${navbarOpacity})`,
          }}
          animate={{
            borderColor: isScrolled ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3), rgba(20, 184, 166, 0.3), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "200% 0%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Glass morphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-teal-500/5 rounded-lg" />

          {/* Navbar content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Enhanced Logo with Creative Animations */}
              <motion.div
                className="flex-shrink-0 relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/" passHref>
                  <motion.div
                    className="relative cursor-pointer"
                    whileHover={{
                      filter: "drop-shadow(0 0 30px rgba(59, 130, 246, 0.6))",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Animated background glow */}
                    <motion.div
                      className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100"
                      animate={{
                        background: [
                          "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2), rgba(20, 184, 166, 0.2))",
                          "linear-gradient(225deg, rgba(168, 85, 247, 0.2), rgba(20, 184, 166, 0.2), rgba(59, 130, 246, 0.2))",
                          "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2), rgba(20, 184, 166, 0.2))",
                        ],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />

                    {/* Orbiting particles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-400 rounded-full"
                          style={{
                            left: "50%",
                            top: "50%",
                          }}
                          animate={{
                            x: [0, Math.cos((i * 60 * Math.PI) / 180) * 80],
                            y: [0, Math.sin((i * 60 * Math.PI) / 180) * 80],
                            rotate: [0, 360],
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>

                    {/* Pulsing ring effect */}
                    <motion.div
                      className="absolute -inset-2 border border-blue-400/0 rounded-lg group-hover:border-blue-400/30"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Logo with subtle transform effects */}
                    <motion.div
                      className="relative z-10 md:mt-2"
                      whileHover={{
                        rotateY: 5,
                        rotateX: 2,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <Image
                        src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
                        alt="Digital Canvas Logo"
                        width={135}
                        height={36}
                        className="transition-all duration-300 group-hover:brightness-110"
                      />

                      {/* Animated underline */}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 opacity-0 group-hover:opacity-100"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </motion.div>

                    {/* Floating text effect */}
                    <motion.div
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-blue-400 font-medium opacity-0 group-hover:opacity-100 whitespace-nowrap"
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      Where Creativity Meets Technology
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Enhanced Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(true)}
                className="text-white/90 hover:text-white transition-colors duration-300 relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Open menu"
              >
                <div className="relative">
                  <motion.i
                    className="ri-menu-line text-2xl"
                    animate={{ rotate: isMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Animated ring effect */}
                  <motion.div
                    className="absolute -inset-2 rounded-full border border-white/0 group-hover:border-white/20"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Button background */}
                  <motion.div
                    className="absolute -inset-2 bg-white/10 rounded-full opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.2 }}
                  />

                  {/* Menu indicator dots */}
                  {/* <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-1 bg-blue-400 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div> */}
                </div>
              </motion.button>
            </div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                style={{
                  left: `${i * 12.5}%`,
                  top: "50%",
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.nav>
      </motion.header>

      <SlideoverMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}

export default Navbar
