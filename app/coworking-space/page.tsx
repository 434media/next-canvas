"use client"

import type React from "react"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"

interface WireframeButtonProps {
  href: string
  children: React.ReactNode
  className?: string
}

const WireframeButton: React.FC<WireframeButtonProps> = ({ href, children, className = "" }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative inline-block">
    <Link
      href={href}
      className={`inline-block px-8 py-4 bg-transparent text-white font-semibold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 relative z-10 ${className}`}
    >
      {children}
      <div className="absolute inset-0 border border-blue-500/40 rounded-lg" />
      <div className="absolute inset-0 bg-blue-500/10 rounded-lg" />
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/60" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-500/60" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-500/60" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/60" />
    </Link>
  </motion.div>
)

const GradientTitle: React.FC<{ children: React.ReactNode; as?: "h1" | "h2" }> = ({ children, as = "h2" }) => {
  const Tag = as
  return (
    <Tag className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-teal-300 to-purple-500 text-transparent bg-clip-text">
      {children}
    </Tag>
  )
}

const CoworkingSpacePage = () => {

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <div className="h-full w-full bg-grid-pattern" />
        </motion.div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <GradientTitle as="h1">Learn. Build. Connect.</GradientTitle>
          </motion.div>
          <motion.p
            className="text-xl sm:text-2xl mb-10 text-gray-300 leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Professional, student, or simply passionate about art and technology? You&apos;ll find a supportive community
            inside our Coworking Space.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <WireframeButton href="https://discord.gg/SCfmebDfW6">Join Our Community</WireframeButton>
          </motion.div>
        </div>
      </section>

      {/* Geekdom Partnership */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-800">
        <div className="max-w-4xl mx-auto text-center">
          <GradientTitle>Powered by Geekdom</GradientTitle>
          <motion.p
            className="text-lg sm:text-xl mb-10 text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Enjoy the benefits of the Geekdom ecosystem – high-speed internet, coffee, snacks, and a vibrant downtown
            location. Connect with like-minded professionals in the San Antonio art and tech community.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="https://geekdom.com/wp-content/uploads/2021/09/geekdom_logo_full.svg"
              alt="Geekdom Logo"
              width={250}
              height={125}
              className="mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Discord Access Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <GradientTitle>Access Managed through Discord</GradientTitle>
          <motion.p
            className="text-lg sm:text-xl mb-10 text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Access to the Coworking Space is managed through our Discord server. Use the dedicated coworking-space
            channel to request access and stay connected with the community.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <WireframeButton
              href="https://discord.gg/SCfmebDfW6"
              className="bg-indigo-500/10 hover:bg-indigo-500/20"
            >
              Join Our Discord
            </WireframeButton>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CoworkingSpacePage

