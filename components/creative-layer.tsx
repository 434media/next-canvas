"use client"

import { motion } from "motion/react"
import { useMobile } from "../hooks/use-mobile"

type CreativeLayerProps = {}

export function CreativeLayer({}: CreativeLayerProps) {
  const isMobile = useMobile()

  return (
    <div className="min-h-screen bg-transparent w-full flex items-center justify-center relative overflow-hidden">
      {/* Centered Logo and Banner */}
      <div className="relative z-10 text-center space-y-8">
        {/* Digital Canvas Logo */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="https://ampd-asset.s3.us-east-2.amazonaws.com/digital-canvas-dark.svg"
            alt="Digital Canvas"
            className={`${isMobile ? "w-96 h-auto" : "w-[600px] h-auto"} mx-auto`}
            style={{
              filter: "drop-shadow(4px 4px 0px white) drop-shadow(8px 8px 0px black)",
            }}
          />
        </motion.div>

        {/* Creative Layer Banner - Fixed for mobile */}
        <motion.div
          className="relative bg-black text-white p-6 transform rotate-1 shadow-2xl border-4 border-black max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p
            className="text-3xl font-bold uppercase tracking-tight text-center whitespace-nowrap"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            The Creative Layer of{" "}
            <span className="bg-white text-black px-2 py-1 md:px-3 md:py-2 font-menda-black">434 MEDIA</span>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
