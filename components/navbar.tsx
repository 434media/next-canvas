"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "motion/react"
import SlideoverMenu from "./slideover-menu"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  const navbarOpacity = useTransform(scrollY, [0, 50], [0.85, 0.98])
  const backgroundOpacity = useTransform(scrollY, [0, 50], [0, 0.95])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 ${isScrolled ? "backdrop-blur-xl" : "backdrop-blur-md"}`}
      >
        <div className="absolute inset-0 bg-white/20">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        <motion.div
          className="absolute inset-0 bg-white/30"
          style={{
            opacity: backgroundOpacity,
          }}
        />

        <motion.nav
          className="relative border-b-4 border-black"
          style={{
            background: `rgba(255, 255, 255, 0.1)`,
          }}
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <motion.div
                className="flex-shrink-0 relative group sr-only"
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
                        className="transition-all duration-300"
                        style={{
                          filter: "drop-shadow(2px 2px 0px white) drop-shadow(4px 4px 0px black)",
                        }}
                      />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>

              <div className="flex-1"></div>

              <motion.button
                onClick={() => setIsMenuOpen(true)}
                className="transition-colors duration-300 relative group bg-black border border-white p-2 transform hover:rotate-1 shadow-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                aria-label="Open menu - Digital Canvas"
                style={{
                  filter: "drop-shadow(2px 2px 0px black)",
                }}
              >
                <motion.div animate={{ rotate: isMenuOpen ? 5 : 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                  <Image
                    src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
                    alt="Digital Canvas Menu"
                    width={36}
                    height={36}
                    className="transition-all duration-300"
                  />
                </motion.div>
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
