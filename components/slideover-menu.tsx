"use client"

import type React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"
import { House, HouseIcon, X } from "lucide-react"

interface SlideoverMenuProps {
  isOpen: boolean
  onClose: () => void
}

const SlideoverMenu: React.FC<SlideoverMenuProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
      }, 3000)
    }, 1500)
  }

  const ipChannels = [
    {
      href: "https://devsa.io",
      label: "DEVSA",
      description: "San Antonio's premier developer community",
    },
    {
      href: "https://ampdproject.com",
      label: "AMPD Project",
      description: "Amplifying creative voices and projects",
    },
    {
      href: "https://vemosvamos.com",
      label: "Vemos Vamos",
      description: "Connecting Latino entrepreneurs and creators",
    },
    {
      href: "https://txmxboxing.com",
      label: "TXMX Boxing",
      description: "Championship boxing content and events",
    },
    {
      href: "https://salutetotroops.org",
      label: "Salute to Troops",
      description: "Honoring military service and stories",
    },
    {
      href: "https://aimsatx.com",
      label: "AIM SATX",
      description: "Advancing innovation and mentorship",
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
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
                className="h-full flex flex-col bg-white shadow-2xl overflow-y-scroll border-l-4 border-black relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
              >
                {/* Subtle dot pattern background */}
                <div className="absolute inset-0 bg-white">
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
                      backgroundSize: "20px 20px",
                    }}
                  />
                </div>

                {/* Header */}
                <div className="relative z-10 px-6 py-6 border-b-2 border-black">
                  <div className="flex items-center justify-between">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                    >
                      <Image
                        src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
                        alt="Digital Canvas Logo"
                        width={150}
                        height={40}
                        className="invert"
                      />
                    </motion.div>
                    <motion.button
                      onClick={onClose}
                      className="text-black hover:text-black transition-colors duration-300 relative group bg-white border-2 border-black p-2 transform hover:rotate-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      style={{
                        filter: "drop-shadow(2px 2px 0px black)",
                      }}
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 px-6 py-8 space-y-8">
                  {/* Creative Layer Banner */}
                  <motion.div
                    className="bg-black text-white p-4 transform rotate-1 shadow-lg border-2 border-black"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                  >
                    <p
                      className="text-base font-bold uppercase tracking-wide text-center whitespace-nowrap overflow-hidden">
                      The Creative Layer of <span className="bg-white text-black px-1 sm:px-2 py-1 font-menda-black">434 MEDIA</span>
                    </p>
                  </motion.div>

                  {/* Newsletter Signup */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
                    className="bg-white border-2 border-black p-6 transform -rotate-1 shadow-lg"
                    style={{
                      filter: "drop-shadow(4px 4px 0px black)",
                    }}
                  >
                    <h3
                      className="text-black font-bold mb-4 text-lg uppercase tracking-wide"
                      style={{ fontFamily: "Arial Black, sans-serif" }}
                    >
                      Stay Updated
                    </h3>

                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-center py-4"
                      >
                        <div className="text-black text-3xl mb-2">✓</div>
                        <p className="text-black font-bold">Thanks for subscribing!</p>
                        <p className="text-black/70 text-sm">Check your email for confirmation.</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder-black/50 focus:outline-none focus:ring-0 transition-all duration-300"
                        />
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-black text-white font-bold uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-black border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          style={{ fontFamily: "Arial Black, sans-serif" }}
                        >
                          {isSubmitting ? "Subscribing..." : "Subscribe"}
                        </motion.button>
                      </form>
                    )}
                  </motion.div>

                   {/* HQ */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
                    className="bg-white border-2 border-black p-6 transform rotate-1 shadow-lg"
                    style={{
                      filter: "drop-shadow(4px 4px 0px black)",
                    }}
                  >
                    <h3
                      className="text-black font-bold mb-4 text-lg uppercase tracking-wide"
                      style={{ fontFamily: "Arial Black, sans-serif" }}
                    >
                      Our creative house
                    </h3>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
                      className="text-black/70 text-sm"
                    >
                      <span className="block font-bold">FINESILVER</span>
                      816 Camaron St, San Antonio, TX, USA
                    </motion.p>
                  </motion.div>

                  {/* IP Channels Section */}
                  {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
                  >
                    <h3
                      className="text-black font-bold mb-6 text-lg uppercase tracking-wide"
                      style={{ fontFamily: "Arial Black, sans-serif" }}
                    >
                      OUR HOUSE
                    </h3>

                    <div className="grid grid-cols-1 gap-3">
                      {ipChannels.map((channel, index) => (
                        <motion.a
                          key={channel.label}
                          href={channel.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between p-4 bg-white border-2 border-black transition-all duration-300 hover:bg-black hover:text-white transform hover:rotate-1"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.4, ease: "easeOut" }}
                          style={{
                            filter: "drop-shadow(2px 2px 0px black)",
                          }}
                        >
                          <div className="flex-1">
                            <div
                              className="font-bold text-lg uppercase tracking-wide"
                              style={{ fontFamily: "Arial Black, sans-serif" }}
                            >
                              {channel.label}
                            </div>
                            <div className="text-sm opacity-70">{channel.description}</div>
                          </div>
                          <div className="text-xl">→</div>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div> */}
                </div>

                {/* Footer */}
                <motion.div
                  className="relative z-10 px-6 py-6 border-t-2 border-black text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
                >
                  <p
                    className="text-black/50 text-sm font-bold uppercase tracking-wide"
                    style={{ fontFamily: "Arial Black, sans-serif" }}
                  >
                    &copy; <span className="font-menda-black">434 MEDIA</span>
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
