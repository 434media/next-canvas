"use client"

import { motion } from "motion/react"

const snowflakes = [
  { left: "8%", top: "12%", size: 14, delay: 0, duration: 8 },
  { left: "15%", top: "35%", size: 18, delay: 1.5, duration: 10 },
  { left: "22%", top: "65%", size: 12, delay: 0.5, duration: 9 },
  { left: "35%", top: "20%", size: 16, delay: 2, duration: 11 },
  { left: "45%", top: "75%", size: 20, delay: 1, duration: 8.5 },
  { left: "55%", top: "15%", size: 14, delay: 2.5, duration: 9.5 },
  { left: "65%", top: "45%", size: 18, delay: 0.8, duration: 10.5 },
  { left: "75%", top: "80%", size: 12, delay: 1.2, duration: 8 },
  { left: "85%", top: "25%", size: 16, delay: 2.2, duration: 9 },
  { left: "92%", top: "55%", size: 14, delay: 0.3, duration: 11 },
  { left: "12%", top: "85%", size: 18, delay: 1.8, duration: 10 },
  { left: "28%", top: "45%", size: 14, delay: 0.7, duration: 8.5 },
  { left: "42%", top: "90%", size: 16, delay: 2.3, duration: 9.5 },
  { left: "58%", top: "60%", size: 12, delay: 1.1, duration: 10.5 },
  { left: "72%", top: "10%", size: 20, delay: 0.4, duration: 9 },
]

export function MxrAtMainHero() {
  return (
    <section className="relative min-h-screen w-full bg-white overflow-hidden flex items-center justify-center">
      {/* Christmas Assets - Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {snowflakes.map((flake, i) => (
          <motion.div
            key={`snow-${i}`}
            className="absolute text-red-200/40"
            style={{
              left: flake.left,
              top: flake.top,
              fontSize: `${flake.size}px`,
            }}
            animate={{
              y: [0, 10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: flake.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: flake.delay,
              ease: "easeInOut",
            }}
          >
            ❄
          </motion.div>
        ))}

        {/* Christmas Ornaments - Top Left */}
        <motion.div
          className="absolute top-16 left-8 lg:top-20 lg:left-16"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-linear-to-br from-[#c41e3a] to-[#8b0000] shadow-lg">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#d4af37] rounded-sm" />
          </div>
        </motion.div>

        {/* Christmas Ornament - Top Right */}
        <motion.div
          className="absolute top-24 right-12 lg:top-28 lg:right-24"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        >
          <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-linear-to-br from-[#d4af37] to-[#b8860b] shadow-lg">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#c41e3a] rounded-sm" />
          </div>
        </motion.div>

        {/* Christmas Ornament - Bottom Left */}
        <motion.div
          className="absolute bottom-24 left-16 lg:bottom-32 lg:left-28"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-full bg-linear-to-br from-[#228b22] to-[#006400] shadow-lg">
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#d4af37] rounded-sm" />
          </div>
        </motion.div>

        {/* Christmas Ornament - Bottom Right */}
        <motion.div
          className="absolute bottom-20 right-8 lg:bottom-24 lg:right-20"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        >
          <div className="w-7 h-7 lg:w-11 lg:h-11 rounded-full bg-linear-to-br from-[#c41e3a] to-[#8b0000] shadow-lg">
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#228b22] rounded-sm" />
          </div>
        </motion.div>

        {/* Holly Leaves - Top */}
        <div className="absolute top-8 left-1/4 hidden md:block">
          <svg width="60" height="40" viewBox="0 0 60 40" className="text-[#228b22]">
            <ellipse cx="15" cy="20" rx="12" ry="8" fill="currentColor" transform="rotate(-30 15 20)" />
            <ellipse cx="30" cy="15" rx="12" ry="8" fill="currentColor" transform="rotate(10 30 15)" />
            <ellipse cx="45" cy="22" rx="12" ry="8" fill="currentColor" transform="rotate(30 45 22)" />
            <circle cx="25" cy="28" r="4" fill="#c41e3a" />
            <circle cx="32" cy="30" r="3" fill="#c41e3a" />
            <circle cx="28" cy="34" r="3.5" fill="#c41e3a" />
          </svg>
        </div>

        {/* Holly Leaves - Bottom */}
        <div className="absolute bottom-12 right-1/4 hidden md:block rotate-180">
          <svg width="60" height="40" viewBox="0 0 60 40" className="text-[#228b22]">
            <ellipse cx="15" cy="20" rx="12" ry="8" fill="currentColor" transform="rotate(-30 15 20)" />
            <ellipse cx="30" cy="15" rx="12" ry="8" fill="currentColor" transform="rotate(10 30 15)" />
            <ellipse cx="45" cy="22" rx="12" ry="8" fill="currentColor" transform="rotate(30 45 22)" />
            <circle cx="25" cy="28" r="4" fill="#c41e3a" />
            <circle cx="32" cy="30" r="3" fill="#c41e3a" />
            <circle cx="28" cy="34" r="3.5" fill="#c41e3a" />
          </svg>
        </div>

        {/* Candy Canes - Left */}
        <div className="absolute top-1/3 left-4 lg:left-12 rotate-12">
          <svg width="30" height="60" viewBox="0 0 30 60" className="w-6 h-12 lg:w-8 lg:h-16">
            <path
              d="M15 60 L15 20 Q15 5 25 5 Q30 5 30 10 Q30 15 25 15 Q20 15 20 20 L20 60"
              fill="none"
              stroke="#c41e3a"
              strokeWidth="4"
            />
            <path
              d="M15 60 L15 50 M15 45 L15 35 M15 30 L15 20 M20 60 L20 50 M20 45 L20 35 M20 30 L20 20"
              stroke="white"
              strokeWidth="4"
            />
          </svg>
        </div>

        {/* Candy Canes - Right */}
        <div className="absolute top-1/2 right-4 lg:right-12 -rotate-12">
          <svg width="30" height="60" viewBox="0 0 30 60" className="w-6 h-12 lg:w-8 lg:h-16">
            <path
              d="M15 60 L15 20 Q15 5 25 5 Q30 5 30 10 Q30 15 25 15 Q20 15 20 20 L20 60"
              fill="none"
              stroke="#228b22"
              strokeWidth="4"
            />
            <path
              d="M15 60 L15 50 M15 45 L15 35 M15 30 L15 20 M20 60 L20 50 M20 45 L20 35 M20 30 L20 20"
              stroke="white"
              strokeWidth="4"
            />
          </svg>
        </div>

        {/* Star decorations */}
        <motion.div
          className="absolute top-16 right-1/3 text-[#d4af37]"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-1/4 text-[#d4af37]/60"
          animate={{ scale: [1, 1.15, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </motion.div>

        {/* Gift box - bottom left corner */}
        <div className="absolute bottom-8 left-8 hidden lg:block">
          <svg width="50" height="50" viewBox="0 0 50 50">
            <rect x="5" y="20" width="40" height="28" fill="#c41e3a" rx="2" />
            <rect x="5" y="15" width="40" height="8" fill="#8b0000" rx="2" />
            <rect x="22" y="15" width="6" height="33" fill="#d4af37" />
            <path d="M10 15 Q25 0 25 15" fill="none" stroke="#d4af37" strokeWidth="4" />
            <path d="M40 15 Q25 0 25 15" fill="none" stroke="#d4af37" strokeWidth="4" />
          </svg>
        </div>

        {/* Gift box - bottom right corner */}
        <div className="absolute bottom-12 right-12 hidden lg:block">
          <svg width="40" height="40" viewBox="0 0 50 50">
            <rect x="5" y="20" width="40" height="28" fill="#228b22" rx="2" />
            <rect x="5" y="15" width="40" height="8" fill="#006400" rx="2" />
            <rect x="22" y="15" width="6" height="33" fill="#c41e3a" />
            <path d="M10 15 Q25 0 25 15" fill="none" stroke="#c41e3a" strokeWidth="4" />
            <path d="M40 15 Q25 0 25 15" fill="none" stroke="#c41e3a" strokeWidth="4" />
          </svg>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 pt-16 md:pt-24">
        <div className="flex flex-col items-center text-center">
          {/* Holiday Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 lg:mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#c41e3a]/10 border border-[#c41e3a]/30 rounded-full text-[#c41e3a] text-xs sm:text-sm font-semibold tracking-wide uppercase">
              <span className="text-[#d4af37]">★</span>
              Holiday Celebration
              <span className="text-[#d4af37]">★</span>
            </span>
          </motion.div>

          {/* Main Title - The Star */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-menda-black mb-4 lg:mb-6"
          >
            <span className="block text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] leading-[0.9] tracking-tighter text-[#1a1a1a]">
              MXR
            </span>
            <span className="block text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.9] tracking-tighter -mt-1 md:-mt-2">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#c41e3a] via-[#d4af37] to-[#228b22]">
                @MAIN
              </span>
            </span>
          </motion.h1>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 lg:w-32 h-1 bg-linear-to-r from-[#c41e3a] via-[#d4af37] to-[#228b22] rounded-full mb-4 lg:mb-6"
          />

          {/* Event Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-xl lg:max-w-2xl mb-4 lg:mb-6"
          >
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-700 leading-relaxed font-medium mb-2 lg:mb-3">
              Thank you to everyone who joined us for MXR @MAIN on December 12, 2025.
              It was an incredible evening of connection, celebration, and community.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-[#228b22] font-bold">
              You belonged, and you made it unforgettable.
            </p>
          </motion.div>

          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-6 lg:mb-8"
          >
            <div className="inline-flex items-center gap-3 px-8 py-3 lg:px-10 lg:py-4 bg-[#228b22] text-white text-base sm:text-lg lg:text-xl font-bold uppercase tracking-wider rounded-sm shadow-lg shadow-[#228b22]/30">
              <span>🎄</span>
              <span>Thank You!</span>
              <span>🎄</span>
            </div>
          </motion.div>

          {/* Brought to you by */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-[0.2em] font-medium">
              A free community experience brought to you by
            </p>
            <p className="font-menda-black text-xl sm:text-2xl lg:text-3xl text-[#1a1a1a]">434 MEDIA</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
