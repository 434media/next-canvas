"use client"

import type React from "react"
import Image from "next/image"
import NextLink from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { Newsletter } from "./newsletter"
import { ArrowRightIcon, X } from "lucide-react"

interface SlideoverMenuProps {
  isOpen: boolean
  onClose: () => void
}

const SlideoverMenu: React.FC<SlideoverMenuProps> = ({ isOpen, onClose }) => {
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
                      <NextLink
                        href="/"
                        onClick={onClose}
                        className="block bg-black border border-white p-2 transform hover:rotate-1 shadow-lg transition-transform duration-200 hover:scale-105"
                        style={{
                          filter: "drop-shadow(2px 2px 0px black)",
                        }}
                      >
                        <Image
                          src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
                          alt="Digital Canvas Logo"
                          width={120}
                          height={32}
                        />
                      </NextLink>
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
                    <p className="text-sm sm:text-base font-bold uppercase tracking-wide text-center wrap-break-word">
                      The Creative Layer of{" "}
                      <span className="bg-white text-black px-1 sm:px-2 py-1 font-menda-black">434 MEDIA</span>
                    </p>
                  </motion.div>

                  {/* The Feed CTA section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
                    className="bg-white border-2 border-black p-6 transform -rotate-1 shadow-lg"
                    style={{
                      filter: "drop-shadow(4px 4px 0px black)",
                    }}
                  >
                    <h3
                      className="text-black font-bold mb-3 text-lg uppercase tracking-wide"
                      style={{ fontFamily: "Arial Black, sans-serif" }}
                    >
                      The Feed
                    </h3>
                    <p className="text-black/70 text-sm mb-4">
                      Explore our latest newsletters, articles, videos, and podcasts from the Digital Canvas community.
                    </p>
                    <NextLink
                      href="/thefeed"
                      onClick={onClose}
                      className="inline-block bg-black text-white px-6 py-3 font-bold uppercase tracking-wide text-sm border-2 border-black transform hover:rotate-1 transition-all duration-200 hover:scale-105"
                      style={{
                        filter: "drop-shadow(3px 3px 0px rgba(0,0,0,0.3))",
                      }}
                    >
                      View The Feed <ArrowRightIcon className="inline-block w-4 h-4 ml-2" />
                    </NextLink>
                  </motion.div>

                  {/* HQ */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
                    className="relative bg-white border-2 border-black p-6 transform rotate-1 shadow-lg overflow-hidden"
                    style={{
                      filter: "drop-shadow(4px 4px 0px black)",
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: "url(https://ampd-asset.s3.us-east-2.amazonaws.com/finesilver.jpg)",
                      }}
                    />
                    <div className="absolute inset-0 bg-black/65" />

                    <div className="relative z-10">
                      <h3
                        className="text-white font-bold mb-3 text-lg uppercase tracking-wide drop-shadow-lg"
                        style={{ fontFamily: "Arial Black, sans-serif" }}
                      >
                        Our creative house
                      </h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
                        className="text-white/80 text-sm mb-4 drop-shadow-md"
                      >
                        Where innovation meets collaboration. Join our team in bringing
                        digital visions to life.
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
                        className="text-white/80 text-xs drop-shadow-md"
                      >
                        <span className="block font-bold">FINESILVER</span>
                        816 Camaron St, San Antonio, TX, USA
                      </motion.p>
                    </div>
                  </motion.div>

                  {/* Newsletter Signup */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
                    className="bg-white border-2 border-black p-6 transform rotate-0 shadow-lg"
                    style={{
                      filter: "drop-shadow(4px 4px 0px black)",
                    }}
                  >
                    <h3
                      className="text-black font-bold mb-4 text-lg uppercase tracking-wide"
                      style={{ fontFamily: "Arial Black, sans-serif" }}
                    >
                      Stay Connected
                    </h3>
                    <p className="text-black/70 text-sm mb-4">
                      See how we blend creativity with community impact through innovative storytelling and design.
                    </p>

                    <Newsletter />
                  </motion.div>
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
