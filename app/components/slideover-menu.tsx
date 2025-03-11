"use client"

import type React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"

interface SlideoverMenuProps {
  isOpen: boolean
  onClose: () => void
}

const SlideoverMenu: React.FC<SlideoverMenuProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("")
  
  const year = new Date().getFullYear()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md">
            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <motion.div
                className="w-screen max-w-md"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="h-full flex flex-col py-6 bg-neutral-900 shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Image
                          src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
                          alt="Digital Canvas Logo"
                          width={150}
                          height={40}
                        />
                      </motion.div>
                      <motion.button
                        onClick={onClose}
                        className="text-white hover:text-blue-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <i className="ri-close-line text-2xl"></i>
                      </motion.button>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <motion.div
                      className="space-y-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div>
                        <p className="text-white/70 text-sm">
                          The Creative Tech Community
                        </p>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                          <li>
                            <a href="/coworking-space" className="text-white/70 hover:text-white transition-colors">
                              Coworking Space
                            </a>
                          </li>
                          <li>
                            <a href="https://lu.ma/digitalcanvas" className="text-white/70 hover:text-white transition-colors">
                              Community Calendar
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                          <a href="https://discord.gg/SCfmebDfW6" className="text-white/70 hover:text-white transition-colors">
                            <i className="ri-discord-fill text-2xl"></i>
                          </a>
                          <a href="https://www.instagram.com/digitalcanvas.community/" className="text-white/70 hover:text-white transition-colors">
                            <i className="ri-instagram-line text-2xl"></i>
                          </a>
                          <a href="https://x.com/digitalcanvas__" className="text-white/70 hover:text-white transition-colors">
                            <i className="ri-twitter-x-line text-2xl"></i>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/10 text-center px-4 sm:px-6">
                    <p className="text-white/50 text-sm">&copy; {year} Digital Canvas. All rights reserved.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SlideoverMenu

