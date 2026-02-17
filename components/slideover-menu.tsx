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

const navLinks = [
  { href: "/conferences", label: "Conferences" },
  { href: "/workshops", label: "Workshops" },
  { href: "/storytelling", label: "Storytelling" },
  { href: "/thefeed", label: "The Feed" },
  { href: "/agents", label: "Agents", comingSoon: true },
]

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/434media",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/digitalcanvashq/",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M7.03.084c-1.277.06-2.149.264-2.91.563a5.874 5.874 0 00-2.124 1.388 5.878 5.878 0 00-1.38 2.127C.321 4.926.12 5.8.064 7.076.008 8.354-.005 8.764.001 12.023c.007 3.259.021 3.667.083 4.947.061 1.277.264 2.149.563 2.911.308.789.72 1.457 1.388 2.123a5.872 5.872 0 002.129 1.38c.763.295 1.636.496 2.913.552 1.278.056 1.689.069 4.947.063 3.257-.007 3.668-.021 4.947-.082 1.28-.06 2.147-.265 2.91-.563a5.881 5.881 0 002.123-1.388 5.881 5.881 0 001.38-2.129c.295-.763.496-1.636.551-2.912.056-1.28.07-1.69.063-4.948-.006-3.258-.02-3.667-.081-4.947-.06-1.28-.264-2.148-.564-2.911a5.892 5.892 0 00-1.387-2.123 5.857 5.857 0 00-2.128-1.38C19.074.322 18.202.12 16.924.066 15.647.009 15.236-.006 11.977 0 8.718.008 8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.736 3.736 0 01-1.382-.895 3.695 3.695 0 01-.9-1.378c-.165-.423-.363-1.058-.417-2.228-.06-1.264-.072-1.644-.08-4.848-.006-3.204.006-3.583.061-4.848.05-1.169.246-1.805.408-2.228.216-.561.477-.96.895-1.382a3.705 3.705 0 011.379-.9c.423-.165 1.057-.361 2.227-.417 1.265-.06 1.644-.072 4.848-.08 3.203-.006 3.583.006 4.85.062 1.168.05 1.804.244 2.227.408.56.216.96.475 1.382.895.421.42.681.817.9 1.378.165.422.362 1.056.417 2.227.06 1.265.074 1.645.08 4.848.005 3.203-.006 3.583-.061 4.848-.051 1.17-.245 1.805-.408 2.23-.216.56-.477.96-.896 1.38a3.705 3.705 0 01-1.378.9c-.422.165-1.058.362-2.226.418-1.266.06-1.645.072-4.85.079-3.204.007-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 101.437-1.442 1.44 1.44 0 00-1.437 1.442M5.839 12.012a6.161 6.161 0 1012.323-.024 6.162 6.162 0 00-12.323.024M8 12.008A4 4 0 1112.008 16 4 4 0 018 12.008" />
      </svg>
    ),
  },
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
                className="h-full flex flex-col bg-[#050505] shadow-2xl overflow-y-auto border-l border-[#333] relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
              >
                {/* Header */}
                <div className="relative z-10 px-6 py-4 border-b border-white/5">
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
                          width={100}
                          height={26}
                        />
                      </NextLink>
                    </motion.div>
                    <motion.button
                      onClick={onClose}
                      className="text-white hover:text-white/80 transition-colors duration-300 relative group bg-black border border-[#333] p-1.5"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <X className="w-4.5 h-4.5" />
                    </motion.button>
                  </div>
                </div>

                {/* Spotlight: Brand Description */}
                <motion.div
                  className="relative z-10 px-6 pt-8 pb-6"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
                >
                  <h2 className="font-(family-name:--font-geist-pixel-square) text-[9px] tracking-[0.3em] uppercase text-[#ff9900]/60 mb-4">
                    Digital Canvas
                  </h2>
                  <p className="font-(family-name:--font-geist-pixel-square) text-[13px] leading-[1.8] font-normal text-white/50">
                    Powered by{" "}
                    <span className="text-[#ff9900] font-semibold">DEVSA</span>
                    {" x "}
                    <span className="text-[#ff9900] font-semibold">434 MEDIA</span>
                    , Digital Canvas connects creativity, community, and technology through curated conferences, workshops, storytelling, and agentic tools.
                  </p>
                </motion.div>

                {/* Divider */}
                <div className="mx-6 h-px bg-white/5" />

                {/* Navigation */}
                <div className="relative z-10 px-6 pt-6 pb-4">
                  <h3 className="font-(family-name:--font-geist-pixel-square) text-[9px] tracking-[0.3em] uppercase text-white/20 mb-4">
                    Navigate
                  </h3>
                  <nav className="space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.06, duration: 0.4, ease: "easeOut" }}
                      >
                        <NextLink
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center justify-between py-3 px-4 text-white/40 hover:text-[#ff9900] font-(family-name:--font-geist-pixel-square) text-sm uppercase tracking-widest hover:bg-white/2 transition-all duration-200"
                        >
                          <span className="flex items-center gap-2">
                            {link.label}
                            {link.comingSoon && (
                              <span className="font-(family-name:--font-geist-pixel-square) text-[7px] uppercase tracking-wider bg-[#ff9900] text-[#0a0a0a] px-1.5 py-px leading-tight font-semibold">
                                in development
                              </span>
                            )}
                          </span>
                          <ArrowRightIcon className="w-3.5 h-3.5 opacity-30" />
                        </NextLink>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Divider */}
                <div className="mx-6 h-px bg-white/5" />

                {/* Connect — mirrors footer */}
                <motion.div
                  className="relative z-10 px-6 pt-6 pb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.4, ease: "easeOut" }}
                >
                  <h3 className="font-(family-name:--font-geist-pixel-square) text-[9px] tracking-[0.3em] uppercase text-white/20 mb-4">
                    Connect
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-[#ff9900] transition-colors duration-200"
                        aria-label={`Follow Digital Canvas on ${social.name}`}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                  <a
                    href="https://digitalcanvas.community"
                    className="inline-block mt-3 font-(family-name:--font-geist-pixel-square) text-[9px] tracking-[0.2em] uppercase text-white/15 hover:text-white/40 transition-colors"
                  >
                    digitalcanvas.community
                  </a>
                </motion.div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom bar — mirrors footer */}
                <motion.div
                  className="relative z-10 px-6 py-5 border-t border-white/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
                >
                  <p className="font-(family-name:--font-geist-pixel-square) text-white/15 text-[9px] tracking-wider uppercase">
                    &copy; {new Date().getFullYear()} Digital Canvas
                  </p>
                  <p className="font-(family-name:--font-geist-pixel-square) text-white/10 text-[8px] tracking-wider uppercase mt-1">
                    San Antonio, TX
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SlideoverMenu
