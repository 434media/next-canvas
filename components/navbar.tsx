"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { Menu } from "lucide-react"
import SlideoverMenu from "./slideover-menu"

const navLinks = [
  { href: "/workshops", label: "Workflows" },
  { href: "/agents", label: "Agents" },
  { href: "/thefeed", label: "The Feed" },
  { href: "/events", label: "Events" },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
        <div className="absolute inset-0 bg-black" />

        <motion.nav
          className="relative border-b border-[#333]"
          style={{
            background: '#000000',
          }}
        >
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center py-3">
              <motion.div
                className="shrink-0 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Link href="/" passHref>
                  <motion.div
                    className="relative cursor-pointer bg-black border border-[#333] p-1 transform hover:rotate-1 hover:border-[#ff9900] transition-colors"
                  >
                    <div className="relative z-10">
                      <Image
                        src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
                        alt="Digital Canvas Logo"
                        width={64}
                        height={20}
                        className="transition-all duration-300"
                      />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Desktop navigation links */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative font-(family-name:--font-geist-pixel-square) text-xs text-white/70 uppercase tracking-widest hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => {
                  setIsMenuOpen(true)
                  window.dispatchEvent(new CustomEvent("navbar-menu-toggle", { detail: { isOpen: true } }))
                }}
                className="md:hidden transition-colors duration-300 relative group bg-black border border-[#333] p-1.5 transform hover:rotate-1 hover:border-[#ff9900]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                aria-label="Open menu - Digital Canvas"
              >
                <motion.div animate={{ rotate: isMenuOpen ? 5 : 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                  <Menu className="w-4 h-4 text-white" />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.nav>
      </motion.header>

      <SlideoverMenu
        isOpen={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false)
          window.dispatchEvent(new CustomEvent("navbar-menu-toggle", { detail: { isOpen: false } }))
        }}
      />
    </>
  )
}

export default Navbar
