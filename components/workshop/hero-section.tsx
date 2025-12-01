"use client"

import { motion } from "motion/react"
import { ArrowRight, Star, Zap } from 'lucide-react'
import Image from "next/image"

interface HeroSectionProps {
  theme: "good" | "hood"
}

export function HeroSection({ theme }: HeroSectionProps) {
  const isDark = theme === "hood"

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      className={`relative min-h-screen overflow-hidden px-4 py-24 md:px-6 md:py-24 ${
        isDark ? "bg-black" : "bg-linear-to-b from-white to-gray-50"
      }`}
      style={{ viewTransitionName: "hero-content" }}
    >
      {isDark ? (
        <div className="absolute inset-0 overflow-hidden">
          {/* Bold rectangular blocks - Run-DMC style */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 0.15, x: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute left-0 top-[15%] h-32 w-64 bg-[#dc143c]"
            style={{ transform: "rotate(-5deg)" }}
          />
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute right-0 bottom-[20%] h-40 w-72 bg-white"
            style={{ transform: "rotate(3deg)" }}
          />
          
          {/* Chain link fence pattern */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 1 }}
            className="absolute left-[10%] bottom-[30%]"
          >
            <svg width="200" height="200" className="text-white">
              <pattern id="chainlink" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20 L20 0 L40 20 L20 40 Z" stroke="currentColor" strokeWidth="2" fill="none" />
              </pattern>
              <rect width="200" height="200" fill="url(#chainlink)" />
            </svg>
          </motion.div>
          
          {/* Bold typography elements - NWA style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.12, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute right-[20%] top-[25%] font-(--font-menda-black) text-[120px] text-[#dc143c]"
            style={{ transform: "rotate(-15deg)" }}
          >
            ★
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.1, rotate: 10 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute left-[15%] top-[35%] font-(--font-menda-black) text-[80px] text-white"
          >
            ✖
          </motion.div>
          
          {/* Boombox silhouette */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.08, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-[15%] left-[8%]"
          >
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <div className="h-20 w-20 rounded-full border-4 border-white" />
                <div className="h-20 w-20 rounded-full border-4 border-[#dc143c]" />
              </div>
              <div className="h-8 w-full bg-white" />
            </div>
          </motion.div>
          
          {/* Microphone on stand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute right-[10%] bottom-[35%]"
          >
            <div className="relative">
              <div className="h-24 w-16 rounded-t-full border-4 border-[#dc143c] bg-black" />
              <div className="mx-auto h-20 w-3 bg-white" />
              <div className="mx-auto h-6 w-12 rounded-full bg-[#dc143c]" />
            </div>
          </motion.div>
          
          {/* Adidas-style stripes */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.08, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute left-[25%] bottom-[10%] flex gap-3"
          >
            <div className="h-32 w-8 bg-white" style={{ transform: "skewX(-10deg)" }} />
            <div className="h-32 w-8 bg-[#dc143c]" style={{ transform: "skewX(-10deg)" }} />
            <div className="h-32 w-8 bg-white" style={{ transform: "skewX(-10deg)" }} />
          </motion.div>
          
          {/* Vinyl record */}
          <motion.div
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 0.12, rotate: -25 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute right-[5%] top-[40%] h-40 w-40 rounded-full border-8 border-white bg-black"
          >
            <div className="absolute inset-6 rounded-full border-4 border-[#dc143c]" />
            <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          </motion.div>
          
          {/* Bold text stamp - "REAL" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="absolute left-[50%] top-[10%] -translate-x-1/2 border-8 border-white bg-[#dc143c] p-4"
            style={{ transform: "translate(-50%, 0) rotate(5deg)" }}
          >
            <span className="font-(--font-menda-black) text-4xl text-white">REAL</span>
          </motion.div>
        </div>
      ) : (
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-linear-to-br from-[#2563eb]/20 to-[#60a5fa]/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-linear-to-tr from-[#1e40af]/10 to-[#2563eb]/10"
          />
        </div>
      )}

      <div className="relative z-10 mx-auto min-h-[calc(100vh-8rem)] max-w-7xl">
        <div className="grid min-h-[calc(100vh-8rem)] items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 ${
                isDark ? "bg-[#dc143c] border-2 border-white" : "bg-[#2563eb]/10 border-2 border-[#2563eb]"
              }`}
            >
              <Zap className={isDark ? "text-white" : "text-[#2563eb]"} size={20} />
              <span className={`text-sm font-(--font-menda-black) tracking-wide ${isDark ? "text-white" : "text-[#2563eb]"}`}>
                {isDark ? "EARNED, NOT GIVEN" : "Learn • Earn • Return"}
              </span>
            </motion.div>

            <h1
              className={`mb-4 leading-[0.95] md:mb-6 ${
                isDark
                  ? "font-(--font-menda-black) text-4xl tracking-tighter md:text-5xl lg:text-6xl"
                  : "font-(--font-geist-sans) text-3xl md:text-4xl lg:text-5xl"
              }`}
            >
              {isDark ? (
                <>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="distressed-text block text-[#dc143c]"
                    data-text="STREET"
                  >
                    STREET
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="block text-white"
                  >
                    SMARTS
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="block text-[#dc143c]"
                  >
                    MEET
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="block text-white"
                  >
                    BOARDROOM
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="block text-[#dc143c]"
                  >
                    WINS
                  </motion.span>
                </>
              ) : (
                <>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="block text-[#1a1a1a]"
                  >
                    Modern
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="block text-[#2563eb]"
                  >
                    Leadership
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="block text-[#1e40af]"
                  >
                    Meets
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="block text-[#1a1a1a]"
                  >
                    Real Results
                  </motion.span>
                </>
              )}
            </h1>

            {/* Description - Different for each mode */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className={`mb-6 max-w-xl text-sm leading-relaxed md:text-base lg:text-lg ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {isDark ? (
                <>
                  The <span className="font-(--font-menda-black) text-[#dc143c]">Lighthouse Workshop</span> translates{" "}
                  <span className="font-(--font-menda-black) text-white">hood economics</span> into{" "}
                  <span className="font-(--font-menda-black) text-[#dc143c]">corporate strategy</span>. Real talk. Real impact.
                </>
              ) : (
                <>
                  Transform your team with the <span className="font-semibold text-[#2563eb]">Lighthouse Workshop</span>{" "}
                  — a keynote experience that bridges{" "}
                  <span className="font-semibold text-[#1e40af]">authentic leadership</span> with proven business
                  principles.
                </>
              )}
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              onClick={scrollToContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group layered-shadow inline-flex w-fit items-center gap-3 rounded-lg px-6 py-3 text-sm font-(--font-menda-black) md:px-8 md:py-4 md:text-base ${
                isDark ? "bg-[#dc143c] text-white hover:bg-white hover:text-black" : "bg-[#2563eb] text-white hover:bg-[#1e40af]"
              }`}
            >
              {isDark ? "LET'S WORK" : "Book a Workshop"}
              <ArrowRight className="transition-transform group-hover:translate-x-2" size={20} />
            </motion.button>

            {/* Social proof badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-6 flex flex-wrap items-center gap-3 md:gap-4"
            >
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                <span className={`block text-lg font-(--font-menda-black) md:text-xl ${isDark ? "text-white" : "text-[#2563eb]"}`}>
                  500+
                </span>
                Leaders Transformed
              </div>
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                <span className={`block text-lg font-(--font-menda-black) md:text-xl ${isDark ? "text-[#dc143c]" : "text-[#2563eb]"}`}>
                  50+
                </span>
                Organizations
              </div>
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                <span className={`block text-lg font-(--font-menda-black) md:text-xl ${isDark ? "text-white" : "text-[#2563eb]"}`}>
                  100%
                </span>
                Real Impact
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            {isDark ? (
              // Hood Kid: 90s hip hop street-art style image
              <div className="relative h-[500px] w-full md:h-[600px]">
                <div
                  className="sticker relative h-full w-full overflow-hidden border-8 border-[#dc143c] bg-black shadow-2xl"
                  style={{ transform: "rotate(2deg)" }}
                >
                  {/* Generated 90s hip hop style image */}
                  <Image
                    src="https://ampd-asset.s3.us-east-2.amazonaws.com/hood.webp"
                    alt="Hood Kid 90s hip hop aesthetic"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay elements for authenticity */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="font-(--font-menda-black) text-6xl text-white md:text-7xl">HOOD</div>
                    <div className="font-(--font-menda-black) text-5xl text-[#dc143c] md:text-6xl">KID</div>
                  </div>
                  <div className="absolute right-4 top-4 h-20 w-20 rounded-full border-4 border-white bg-[#dc143c] opacity-90" />
                </div>
              </div>
            ) : (
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl md:h-[450px]">
                {/* Generated professional image */}
                <Image
                  src="https://ampd-asset.s3.us-east-2.amazonaws.com/good.webp"
                  alt="Good Kid professional leadership"
                  fill  
                  className="object-cover"
                  priority
                />
                {/* Overlay linear */}
                <div className="absolute inset-0 bg-linear-to-t from-[#2563eb]/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="font-(--font-geist-sans) text-6xl text-white md:text-7xl">GOOD</div>
                  <div className="font-(--font-geist-sans) text-5xl text-[#60a5fa] md:text-6xl">KID</div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
