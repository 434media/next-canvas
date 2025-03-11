"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import SlideoverMenu from "./slideover-menu"
import "remixicon/fonts/remixicon.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex-shrink-0">
              <Link href="/" passHref>
                <Image
                  src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
                  alt="Digital Canvas Logo"
                  width={150}
                  height={40}
                  className="cursor-pointer"
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/coworking-space" className="text-white hover:text-blue-400 transition-colors">
                Coworking Space
              </Link>
              <Link href="https://lu.ma/digitalcanvas" className="text-white hover:text-blue-400 transition-colors">
                Community Calendar
              </Link>
              <Link href="#" className="text-white hover:text-blue-400 transition-colors">
                Newsletter
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://discord.gg/SCfmebDfW6" className="text-white hover:text-blue-400 transition-colors" aria-label="Discord">
                <i className="ri-discord-fill text-xl"></i>
              </a>
              <a href="https://www.instagram.com/digitalcanvas.community/" className="text-white hover:text-blue-400 transition-colors" aria-label="Instagram">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="https://x.com/digitalcanvas__" className="text-white hover:text-blue-400 transition-colors" aria-label="Twitter">
                <i className="ri-twitter-x-line text-xl"></i>
              </a>
              <motion.button
                onClick={() => setIsMenuOpen(true)}
                className="text-white hover:text-blue-400 transition-colors md:hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Open menu"
              >
                <i className="ri-menu-line text-2xl"></i>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>
      <SlideoverMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}

export default Navbar

