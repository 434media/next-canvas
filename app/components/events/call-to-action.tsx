"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import WireframeButton from "./wireframe-button"

const CallToActionSection = () => {
  const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-t border-white/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              y: [0, -50],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-6 relative"
            animate={{
              rotate: [0, 360],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-500/30"></div>
            <div className="absolute inset-2 rounded-full border-4 border-dashed border-purple-500/30"></div>
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <motion.i
                className="ri-rocket-line text-3xl text-white"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Workflow?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join 30 ambitious creators and innovators in this intensive 6-week program. Limited spots available - secure
            your place today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <WireframeButton href="#enroll" variant="primary" className="text-lg px-8 py-4">
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Enroll Now - Starting at $100
              </motion.span>
              <motion.i
                className="ri-arrow-right-line ml-2"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            </WireframeButton>
            <WireframeButton
              href="mailto:hello@digitalcanvas.community"
              variant="secondary"
              className="text-lg px-8 py-4"
            >
              Have Questions?
              <motion.i
                className="ri-mail-line ml-2"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </WireframeButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CallToActionSection
