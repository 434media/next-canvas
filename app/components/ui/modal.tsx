"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RiCloseCircleFill } from "@remixicon/react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  gradientColors: string[]
  title: string
  content: string
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, gradientColors, title, content }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            layoutId={`modal-background-${title}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl rounded-lg p-8 text-white"
            style={{
              background: `linear-gradient(135deg, ${gradientColors.join(", ")})`,
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200"
              aria-label="Close modal"
            >
              <RiCloseCircleFill size={24} />
            </button>
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-lg">{content}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

