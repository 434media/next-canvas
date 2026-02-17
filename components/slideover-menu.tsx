"use client"

import type React from "react"
import Image from "next/image"
import NextLink from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRightIcon, X } from "lucide-react"

interface SlideoverMenuProps {
  isOpen: boolean
  onClose: () => void
}

const mobileLinks = [
  { href: "/conferences", label: "Conferences" },
  { href: "/workshops", label: "Workshops" },
  { href: "/storytelling", label: "Storytelling" },
  { href: "/agents", label: "Agents", comingSoon: true },
]

const SlideoverMenu: React.FC<SlideoverMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-2xl"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(24px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={onClose}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <motion.div
              className="w-screen max-w-md"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
            >
              <motion.div
                className="h-full flex flex-col bg-[#050505] shadow-2xl overflow-y-scroll border-l border-[#333] relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
              >
                {/* Header */}
                <div className="relative z-10 px-6 py-6 border-b border-[#333]">
                  <div className="flex items-center justify-between">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                    >
                      <NextLink
                        href="/"
                        onClick={onClose}
                        className="block bg-black border border-[#333] p-2 transition-transform duration-200 hover:scale-105"
                      >
                        <Image
                          src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
                          alt="Digital Canvas Logo"
                          width={120}
                          height={32}
                        />
                      </NextLink>
                    </motion.div>
                    <motion.button
                      onClick={onClose}
                      className="text-white hover:text-white/80 transition-colors duration-300 relative group bg-black border border-[#333] p-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="relative z-10 flex-1 px-6 py-8">
                  <nav className="space-y-2">
                    {mobileLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + index * 0.08, duration: 0.4, ease: "easeOut" }}
                      >
                        <NextLink
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center justify-between py-4 px-4 border border-[#333] bg-black/50 text-white font-(family-name:--font-geist-pixel-square) text-sm uppercase tracking-widest hover:border-[#ff9900] hover:bg-black transition-all duration-200"
                        >
                          <span className="flex items-center gap-2">
                            {link.label}
                            {link.comingSoon && (
                              <span className="font-(family-name:--font-geist-pixel-square) text-[7px] uppercase tracking-wider bg-[#ff9900] text-[#0a0a0a] px-1.5 py-px leading-tight font-semibold">
                                in development
                              </span>
                            )}
                          </span>
                          <ArrowRightIcon className="w-4 h-4 text-white/50" />
                        </NextLink>
                      </motion.div>
                    ))}
                  </nav>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SlideoverMenu
