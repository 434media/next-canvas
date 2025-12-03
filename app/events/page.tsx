"use client"
import { motion } from "motion/react"

export default function EventsPage() {
  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-white via-neutral-50 to-neutral-100"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 -rotate-3 bg-linear-to-tr from-emerald-100/40 via-rose-100/30 to-yellow-100/40 pointer-events-none"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <img
            src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
            alt="Digital Canvas"
            className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] max-w-[90vw] h-auto mx-auto drop-shadow-2xl invert"
           
          />
        </motion.div>

        <motion.div
          className="relative p-4 sm:p-6 transform shadow-2xl mx-auto transition-all duration-500 max-w-[95vw] sm:max-w-4xl bg-white border-2 border-black -rotate-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.15)",
          }}
        >
          <p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight text-center leading-tight text-black"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            Where Stories Come to{" "}
            <span className="bg-black text-white border-2 border-black px-2 py-1 sm:px-3 sm:py-2 inline-block mt-1 sm:mt-0">
              LIFE
            </span>
          </p>
        </motion.div>
      </div>

      <motion.div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-red-200/30 rounded-full blur-3xl pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 0.7 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-orange-200/30 rounded-full blur-3xl pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-yellow-200/30 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.2, delay: 0.7 }}
      />
    </motion.section>
  )
}
