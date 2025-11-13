"use client"

import { motion } from "framer-motion"
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
      className={`relative min-h-[90vh] overflow-hidden px-4 py-24 md:px-6 md:py-32 ${
        isDark ? "bg-[#0a0a0a]" : "bg-linear-to-b from-white to-gray-50"
      }`}
      style={{ viewTransitionName: "hero-content" }}
    >
      {/* Background elements - Different for each mode */}
      {isDark ? (
        // Hood Kid: Collage-style layered elements
        <div className="absolute inset-0 overflow-hidden">
          {/* Large orange circles - pop art style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute -left-20 top-20 h-60 w-60 rounded-full bg-[#ff6b35]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="absolute right-32 top-40 h-40 w-40 rounded-full bg-[#ffd23f]"
          />

          {/* Green block - reference image style */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 0.7, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute bottom-32 left-0 h-48 w-64 bg-[#2d5016]"
            style={{ transform: "rotate(-5deg)" }}
          />

          {/* Scattered typography elements */}
          <motion.div
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 0.15, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute right-20 top-1/3 font-(--font-menda-black) text-[120px] text-[#ff6b35]"
          >
            V
          </motion.div>

          {/* Stars - like in reference image */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="absolute"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            >
              <Star className="text-[#ffd23f]" size={i % 2 === 0 ? 24 : 16} fill={i % 3 === 0 ? "#ffd23f" : "none"} />
            </motion.div>
          ))}
        </div>
      ) : (
        // Good Kid: Clean, professional elements
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-linear-to-br from-[#2563eb]/20 to-[#60a5fa]/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-linear-to-tr from-[#1e40af]/10 to-[#2563eb]/10"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 ${
                isDark ? "bg-[#ff6b35]/20 border-2 border-[#ff6b35]" : "bg-[#2563eb]/10 border-2 border-[#2563eb]"
              }`}
            >
              <Zap className={isDark ? "text-[#ffd23f]" : "text-[#2563eb]"} size={20} />
              <span className={`font-bold text-sm tracking-wide ${isDark ? "text-[#ffd23f]" : "text-[#2563eb]"}`}>
                {isDark ? "EARNED, NOT GIVEN" : "Learn • Earn • Return"}
              </span>
            </motion.div>

            {/* Main headline - Different text for each mode */}
            <h1
              className={`mb-6 font-bold leading-[0.95] ${
                isDark
                  ? "font-(--font-menda-black) text-5xl tracking-tighter md:text-6xl lg:text-7xl"
                  : "font-(--font-geist-sans) text-4xl md:text-5xl lg:text-6xl"
              }`}
            >
              {isDark ? (
                <>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="distressed-text block text-[#ff6b35]"
                    data-text="STREET"
                  >
                    STREET
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="block text-[#ffd23f]"
                  >
                    SMARTS
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="neon-glow block text-[#00ff88]"
                  >
                    MEET
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="block text-[#f5f5f5]"
                  >
                    BOARDROOM
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="block text-[#ff0055]"
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
              className={`mb-8 max-w-xl text-base leading-relaxed md:text-lg lg:text-xl ${
                isDark ? "text-[#d4d4d4]" : "text-gray-700"
              }`}
            >
              {isDark ? (
                <>
                  The <span className="font-bold text-[#ff6b35]">Lighthouse Workshop</span> translates{" "}
                  <span className="font-bold text-[#ffd23f]">hood economics</span> into{" "}
                  <span className="font-bold text-[#00ff88]">corporate strategy</span>. Real talk. Real impact.
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
              className={`group layered-shadow flex items-center gap-3 rounded-lg px-6 py-3 font-bold text-base transition-all md:px-8 md:py-4 md:text-lg ${
                isDark ? "bg-[#ff6b35] text-black hover:bg-[#ffd23f]" : "bg-[#2563eb] text-white hover:bg-[#1e40af]"
              }`}
            >
              {isDark ? "Let's Work" : "Book a Workshop"}
              <ArrowRight className="transition-transform group-hover:translate-x-2" size={24} />
            </motion.button>

            {/* Social proof badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8 flex flex-wrap items-center gap-4 md:gap-6"
            >
              <div className={`text-sm ${isDark ? "text-[#a3a3a3]" : "text-gray-600"}`}>
                <span className={`block font-bold text-xl md:text-2xl ${isDark ? "text-[#00ff88]" : "text-[#2563eb]"}`}>
                  500+
                </span>
                Leaders Transformed
              </div>
              <div className={`text-sm ${isDark ? "text-[#a3a3a3]" : "text-gray-600"}`}>
                <span className={`block font-bold text-xl md:text-2xl ${isDark ? "text-[#ffd23f]" : "text-[#2563eb]"}`}>
                  50+
                </span>
                Organizations
              </div>
              <div className={`text-sm ${isDark ? "text-[#a3a3a3]" : "text-gray-600"}`}>
                <span className={`block font-bold text-xl md:text-2xl ${isDark ? "text-[#ff0055]" : "text-[#2563eb]"}`}>
                  100%
                </span>
                Real Impact
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {isDark ? (
              // Hood Kid: 90s hip hop street-art style image
              <div className="relative h-[500px] w-full md:h-[600px]">
                <motion.div
                  animate={{ rotate: [0, 2, 0, -2, 0] }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                  className="sticker relative h-full w-full overflow-hidden border-8 border-[#ff6b35] bg-[#1a1a1a] shadow-2xl"
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
                    <div className="font-(--font-menda-black) text-6xl text-[#ffd23f] md:text-7xl">HOOD</div>
                    <div className="font-(--font-menda-black) text-5xl text-[#00ff88] md:text-6xl">KID</div>
                  </div>
                  {/* Pop art circles overlay */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute right-4 top-4 h-20 w-20 rounded-full bg-[#ffd23f] opacity-80"
                  />
                </motion.div>

                {/* Scattered decorative elements around image */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#ff6b35] opacity-70"
                />
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -bottom-8 -left-8 h-16 w-16 bg-[#00ff88]"
                  style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                />
              </div>
            ) : (
              // Good Kid: Professional leadership image
              <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl md:h-[600px]">
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
