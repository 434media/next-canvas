"use client"

import { motion } from "motion/react"
import { WireframeBackground } from "./wireframe-background"

const CallToAction = () => {
  return (
    <section className="relative overflow-hidden">
      <WireframeBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          className="text-center py-16 lg:py-20 px-4 relative z-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl p-8 lg:p-12 border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl lg:text-4xl font-bold text-white mb-6">Join the Digital Canvas Network</h3>
            <p className="text-white/80 text-lg lg:text-xl mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed">
              Become part of our creative ecosystem where innovative IP properties and transformative client
              partnerships shape the future together.
            </p>
            <motion.button
              className="px-8 lg:px-12 py-4 lg:py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-base lg:text-lg rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect With Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CallToAction 