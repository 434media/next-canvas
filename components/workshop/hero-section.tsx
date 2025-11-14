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
        isDark ? "bg-[#1a1a1a]" : "bg-linear-to-b from-white to-gray-50"
      }`}
      style={{ viewTransitionName: "hero-content" }}
    >
      {/* Background elements - Different for each mode */}
      {isDark ? (
        // Hood Kid: Collage-style layered elements
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute -left-20 top-20 h-60 w-60 rounded-full bg-[#c8102e]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="absolute right-32 top-40 h-40 w-40 rounded-full bg-[#ffd700]"
          />

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 0.6, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute bottom-32 left-0 h-48 w-64 bg-[#002654]"
            style={{ transform: "rotate(-5deg)" }}
          />

          <motion.div
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 0.15, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute right-20 top-1/3 font-(--font-menda-black) text-[120px] text-[#c8102e]"
          >
            V
          </motion.div>

          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="absolute"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            >
              <Star className="text-[#ffd700]" size={i % 2 === 0 ? 24 : 16} fill={i % 3 === 0 ? "#ffd700" : "none"} />
            </motion.div>
          ))}
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

      {/* Content */}
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
                isDark ? "bg-[#c8102e]/20 border-2 border-[#c8102e]" : "bg-[#2563eb]/10 border-2 border-[#2563eb]"
              }`}
            >
              <Zap className={isDark ? "text-[#ffd700]" : "text-[#2563eb]"} size={20} />
              <span className={`text-sm font-bold tracking-wide ${isDark ? "text-[#ffd700]" : "text-[#2563eb]"}`}>
                {isDark ? "EARNED, NOT GIVEN" : "Learn • Earn • Return"}
              </span>
            </motion.div>

            {/* Main headline - Different text for each mode */}
            <h1
              className={`mb-4 font-bold leading-[0.95] md:mb-6 ${
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
                    className="distressed-text block text-[#c8102e]"
                    data-text="STREET"
                  >
                    STREET
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="block text-[#ffd700]"
                  >
                    SMARTS
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="block text-white"
                  >
                    MEET
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="block text-[#002654]"
                  >
                    BOARDROOM
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="block text-[#c8102e]"
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
                isDark ? "text-[#d4d4d4]" : "text-gray-700"
              }`}
            >
              {isDark ? (
                <>
                  The <span className="font-bold text-[#c8102e]">Lighthouse Workshop</span> translates{" "}
                  <span className="font-bold text-[#ffd700]">hood economics</span> into{" "}
                  <span className="font-bold text-white">corporate strategy</span>. Real talk. Real impact.
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
              className={`group layered-shadow inline-flex w-fit items-center gap-3 rounded-lg px-6 py-3 text-sm font-bold transition-all md:px-8 md:py-4 md:text-base ${
                isDark ? "bg-[#c8102e] text-white hover:bg-[#002654]" : "bg-[#2563eb] text-white hover:bg-[#1e40af]"
              }`}
            >
              {isDark ? "Let's Work" : "Book a Workshop"}
              <ArrowRight className="transition-transform group-hover:translate-x-2" size={20} />
            </motion.button>

            {/* Social proof badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-6 flex flex-wrap items-center gap-3 md:gap-4"
            >
              <div className={`text-xs ${isDark ? "text-[#a3a3a3]" : "text-gray-600"}`}>
                <span className={`block font-bold text-lg md:text-xl ${isDark ? "text-white" : "text-[#2563eb]"}`}>
                  500+
                </span>
                Leaders Transformed
              </div>
              <div className={`text-xs ${isDark ? "text-[#a3a3a3]" : "text-gray-600"}`}>
                <span className={`block font-bold text-lg md:text-xl ${isDark ? "text-[#ffd700]" : "text-[#2563eb]"}`}>
                  50+
                </span>
                Organizations
              </div>
              <div className={`text-xs ${isDark ? "text-[#a3a3a3]" : "text-gray-600"}`}>
                <span className={`block font-bold text-lg md:text-xl ${isDark ? "text-[#c8102e]" : "text-[#2563eb]"}`}>
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
                  className="sticker relative h-full w-full overflow-hidden border-8 border-[#c8102e] bg-[#1a1a1a] shadow-2xl"
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
                    <div className="font-(--font-menda-black) text-6xl text-[#ffd700] md:text-7xl">HOOD</div>
                    <div className="font-(--font-menda-black) text-5xl text-[#002654] md:text-6xl">KID</div>
                  </div>
                  <div className="absolute right-4 top-4 h-20 w-20 rounded-full bg-[#ffd700] opacity-80" />
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
