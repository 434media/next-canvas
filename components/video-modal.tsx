"use client"

import { motion, AnimatePresence } from "motion/react"
import { useEffect, useRef } from "react"
import "remixicon/fonts/remixicon.css"
import Image from "next/image"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
}

const VideoModal = ({ isOpen, onClose }: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play()
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Ambient Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.2, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
            />
          </div>

          {/* Modal Content */}
          <motion.div
            className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-neutral-900/95 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
              <div className="flex items-center space-x-4">
                <motion.div
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(59, 130, 246, 0)",
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                      "0 0 0 rgba(59, 130, 246, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <i className="ri-gift-line text-white text-lg sm:text-xl" />
                </motion.div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Overdrive</h2>
                  <p className="text-neutral-400 text-xs sm:text-sm">Created by Human & Google Veo 3</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200 group"
              >
                <i className="ri-close-line text-white text-lg sm:text-xl group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>

            {/* Video Container */}
            <div className="relative w-full" style={{ aspectRatio: "16/9", maxHeight: "calc(90vh - 200px)" }}>
              <video
                ref={videoRef}
                className="w-full h-full object-cover bg-black"
                controls
                controlsList="nodownload nofullscreen"
                disablePictureInPicture
                poster="/placeholder.svg?height=720&width=1280"
                preload="metadata"
              >
                <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/OVERDRIVE_1080_v02.MOV" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Overlay Effects */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <div className="px-2 py-1 sm:px-3 sm:py-1 bg-red-500/90 backdrop-blur-sm rounded-full">
                    <span className="text-white text-xs font-medium flex items-center">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full mr-1 sm:mr-2 animate-pulse" />
                      EXCLUSIVE
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-neutral-900/50 to-neutral-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                    src="https://ampd-asset.s3.us-east-2.amazonaws.com/434MediaICONWHITE.png"
                    alt="434 MEDIA"
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                  />
                  <div>
                    <p className="text-white font-medium text-sm sm:text-base">434 MEDIA</p>
                    <p className="text-neutral-400 text-xs sm:text-sm">Digital Canvas Network</p>
                  </div>
                </div>
                <motion.div
                  className="flex items-center space-x-2 text-green-400"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <i className="ri-check-line text-sm sm:text-base" />
                  <span className="text-xs sm:text-sm font-medium">Easter Egg Unlocked</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default VideoModal
