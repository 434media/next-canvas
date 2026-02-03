"use client"
import { useState, useEffect } from "react"
import type React from "react"
import Link from "next/link"
import { motion, useAnimation } from "motion/react"

// Navigation links
const navLinks = [
  { name: "Events", href: "/events" },
  { name: "Workshops", href: "/workshops" },
  { name: "The Feed", href: "/thefeed" },
]

// In-house brands from the creative team
const brands = [
  { name: "DEVSA", url: "https://devsa.community" },
  { name: "The AMPD Project", url: "https://theampdproject.com" },
  { name: "TXMX Boxing", url: "https://txmxboxing.com" },
  { name: "Vemoas Vamos", url: "https://vemoasvamos.com" },
  { name: "Mil City USA", url: "https://milcityusa.com" },
  { name: "Que es SDOH", url: "https://queessdoh.com" },
  { name: "AIM", url: "https://aim.434media.com" },
  { name: "Tech Day", url: "https://techday.434media.com" },
]

const Footer = () => {
  const [isClient, setIsClient] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    setIsClient(true)
    controls.start("visible")
  }, [controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <footer className="bg-[#0a0a0a] relative overflow-hidden z-10">
      {/* Main Footer Content */}
      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Top border */}
        <div className="h-px w-full bg-[#222]" />
        {/* Bottom Bar */}
        <motion.div
          className="py-6 px-6"
          variants={itemVariants}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Copyright & Brand */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <a
                  href="https://434media.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold text-sm uppercase tracking-widest hover:text-[#fbbf24] transition-colors"
                >
                  434 Media
                </a>
                <span className="hidden sm:inline text-[#333]">•</span>
                <p className="text-[#525252] text-xs font-normal">
                  &copy; {new Date().getFullYear()} All rights reserved
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/company/434media"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#525252] hover:text-white transition-colors"
                  aria-label="Follow 434 Media on LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/digitalcanvashq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#525252] hover:text-white transition-colors"
                  aria-label="Follow Digital Canvas on Instagram"
                >
                  <InstagramIcon className="w-[18px] h-[18px]" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props} fill="currentColor" aria-hidden="true">
      <path d="M7.03.084c-1.277.06-2.149.264-2.91.563a5.874 5.874 0 00-2.124 1.388 5.878 5.878 0 00-1.38 2.127C.321 4.926.12 5.8.064 7.076.008 8.354-.005 8.764.001 12.023c.007 3.259.021 3.667.083 4.947.061 1.277.264 2.149.563 2.911.308.789.72 1.457 1.388 2.123a5.872 5.872 0 002.129 1.38c.763.295 1.636.496 2.913.552 1.278.056 1.689.069 4.947.063 3.257-.007 3.668-.021 4.947-.082 1.28-.06 2.147-.265 2.91-.563a5.881 5.881 0 002.123-1.388 5.881 5.881 0 001.38-2.129c.295-.763.496-1.636.551-2.912.056-1.28.07-1.69.063-4.948-.006-3.258-.02-3.667-.081-4.947-.06-1.28-.264-2.148-.564-2.911a5.892 5.892 0 00-1.387-2.123 5.857 5.857 0 00-2.128-1.38C19.074.322 18.202.12 16.924.066 15.647.009 15.236-.006 11.977 0 8.718.008 8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.736 3.736 0 01-1.382-.895 3.695 3.695 0 01-.9-1.378c-.165-.423-.363-1.058-.417-2.228-.06-1.264-.072-1.644-.08-4.848-.006-3.204.006-3.583.061-4.848.05-1.169.246-1.805.408-2.228.216-.561.477-.96.895-1.382a3.705 3.705 0 011.379-.9c.423-.165 1.057-.361 2.227-.417 1.265-.06 1.644-.072 4.848-.08 3.203-.006 3.583.006 4.85.062 1.168.05 1.804.244 2.227.408.56.216.96.475 1.382.895.421.42.681.817.9 1.378.165.422.362 1.056.417 2.227.06 1.265.074 1.645.08 4.848.005 3.203-.006 3.583-.061 4.848-.051 1.17-.245 1.805-.408 2.23-.216.56-.477.96-.896 1.38a3.705 3.705 0 01-1.378.9c-.422.165-1.058.362-2.226.418-1.266.06-1.645.072-4.85.079-3.204.007-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 101.437-1.442 1.44 1.44 0 00-1.437 1.442M5.839 12.012a6.161 6.161 0 1012.323-.024 6.162 6.162 0 00-12.323.024M8 12.008A4 4 0 1112.008 16 4 4 0 018 12.008" />
    </svg>
  )
}