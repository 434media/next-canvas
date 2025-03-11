"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import "remixicon/fonts/remixicon.css"

interface ModalContent {
  title: string
  description: string
  link: string
}

const Modal = ({
  isOpen,
  onClose,
  content,
}: {
  isOpen: boolean
  onClose: () => void
  content: ModalContent
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-neutral-900 rounded-lg p-6 w-full max-w-lg relative border border-white/10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
            <i className="ri-close-line text-2xl"></i>
          </button>
          <h3 className="text-2xl font-bold text-white mb-4">{content.title}</h3>
          <p className="text-white/70 mb-6">{content.description}</p>
          <Link
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Learn More
          </Link>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

const ScrollingText = ({ text }: { text: string }) => (
  <motion.div
    initial={{ x: "100%" }}
    animate={{ x: "-100%" }}
    transition={{
      duration: 20,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    }}
    className="whitespace-nowrap"
  >
    {text.repeat(10)}
  </motion.div>
)

const FeaturesGrid = () => {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null)

  const coworkingContent: ModalContent = {
    title: "Coworking Space",
    description:
      "Join our vibrant coworking community in the heart of San Antonio. Featuring high-speed internet, meeting rooms, event spaces, and a creative environment designed for collaboration and innovation. Open Monday through Friday from 9am to 7pm.",
    link: "https://digitalcanvas.com/coworking",
  }

  const calendarContent: ModalContent = {
    title: "Community Calendar",
    description:
      "Digital Canvas is your hub for the San Antonio art and tech space, connecting you with like-minded individuals passionate about exploring the latest technologies and tools",
    link: "https://digitalcanvas.com/calendar",
  }

  return (
    <section className="py-16 md:py-24 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-purple-500 text-transparent bg-clip-text">
              Space
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-neutral-300 max-w-3xl mx-auto">
            A hub for creativity, collaboration, and community events
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {/* Coworking Space - Large Tile */}
          <motion.div
            className="col-span-2 row-span-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 cursor-pointer overflow-hidden relative group"
            whileHover={{ scale: 0.98 }}
            onClick={() => setModalContent(coworkingContent)}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundImage:
                "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
              backgroundSize: "100px 100px",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/90 to-purple-600/90 opacity-100 group-hover:opacity-90 transition-opacity" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">Coworking Space</h3>
              <p className="text-white/90">
                <strong>Community Focused:</strong> Professional, student, or simply passionate about art and technology, you&apos;ll find a supportive community here
              </p>
              <p className="text-white/90 mt-6">
                <strong>Powered by Geekdom:</strong> Enjoy the benefits of the Geekdom ecosystem - high-speed internet, coffee, snacks, and a vibrant downtown location
              </p>
            </div>
          </motion.div>

          {/* Animated Placeholder 1 */}
          <motion.div
            className="bg-emerald-500 rounded-xl p-6 overflow-hidden hidden md:flex items-center justify-center"
            animate={{
              scale: [1, 1.02, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="text-white/20 text-9xl rotate-12">
              <i className="ri-code-line" />
            </div>
          </motion.div>

          {/* Scrolling Text Placeholder */}
          <motion.div className="bg-amber-500 rounded-xl p-6 overflow-hidden flex items-center">
            <ScrollingText text="DIGITAL CANVAS " />
          </motion.div>

          {/* Community Calendar - Medium Tile */}
          <motion.div
            className="col-span-2 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl p-8 cursor-pointer overflow-hidden relative group"
            whileHover={{ scale: 0.98 }}
            onClick={() => setModalContent(calendarContent)}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/90 to-emerald-600/90 opacity-100 group-hover:opacity-90 transition-opacity" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-3">Community Calendar</h3>
              <p className="text-white/90">
                <strong>Collaboration is at the Heart of Digital Canvas:</strong> By partnering with organizations across the city, we&apos;ve built a robust network focused on building authenic connections.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)} content={modalContent || coworkingContent} />
    </section>
  )
}

export default FeaturesGrid

