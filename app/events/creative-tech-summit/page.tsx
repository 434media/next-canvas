"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import EventHero from "@/app/components/event-hero"
import EventPartners from "@/app/components/event-partners"
import RelatedEvents from "@/app/components/related-events"
import "remixicon/fonts/remixicon.css"

interface WireframeButtonProps {
  href?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

const WireframeButton: React.FC<WireframeButtonProps> = ({
  href,
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) => {
  const ButtonContent = (
    <>
      {children}
      <div className="absolute inset-0 border border-blue-500/40 rounded-lg" />
      <div className="absolute inset-0 bg-blue-500/10 rounded-lg" />
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/60" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-500/60" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-500/60" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/60" />
    </>
  )

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative inline-block">
        <Link
          href={href}
          className={`inline-block px-6 py-3 bg-transparent text-white font-semibold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 relative z-10 ${className}`}
        >
          {ButtonContent}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className="relative inline-block"
    >
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`inline-block px-6 py-3 bg-transparent text-white font-semibold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 relative z-10 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
      >
        {ButtonContent}
      </button>
    </motion.div>
  )
}

const SpeakerCard = ({
  name,
  role,
  company,
  image,
  bio,
}: { name: string; role: string; company: string; image: string; bio: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-neutral-800/50 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8"
  >
    <div className="flex flex-col sm:flex-row gap-6">
      <div className="w-24 h-24 sm:w-32 sm:h-32 relative rounded-lg overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-blue-400 mb-3">
          {role} @ {company}
        </p>
        <p className="text-white/70 text-sm">{bio}</p>
      </div>
    </div>
  </motion.div>
)

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    dietaryRestrictions: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="bg-neutral-800/70 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-xl">
      <h3 className="text-2xl font-bold text-white mb-6">Register for this Event</h3>

      {isSubmitted ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
          <div className="text-green-400 text-5xl mb-4">
            <i className="ri-checkbox-circle-line"></i>
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Registration Complete!</h4>
          <p className="text-white/70 mb-6">We&apos;ve sent the details to your email.</p>
          <WireframeButton onClick={() => setIsSubmitted(false)}>Register Another</WireframeButton>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-neutral-700/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-neutral-700/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-1">
              Company/Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-neutral-700/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional"
            />
          </div>

          <div>
            <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-white/80 mb-1">
              Dietary Restrictions
            </label>
            <input
              type="text"
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-neutral-700/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional"
            />
          </div>

          <div className="pt-2">
            <WireframeButton type="submit" disabled={isSubmitting} className="w-full justify-center">
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Register Now"
              )}
            </WireframeButton>
          </div>

          <p className="text-xs text-white/50 text-center mt-4">
            By registering, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      )}
    </div>
  )
}

const EventDetails = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="mt-6 bg-neutral-800/50 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-xl"
  >
    <h3 className="text-xl font-bold text-white mb-4">Event Details</h3>
    <div className="space-y-4">
      <div className="flex items-start">
        <i className="ri-calendar-line text-blue-400 text-xl mr-3 mt-0.5"></i>
        <div>
          <p className="text-white font-medium">June 15-16, 2025</p>
          <p className="text-white/70 text-sm">9:00 AM - 6:00 PM</p>
        </div>
      </div>
      <div className="flex items-start">
        <i className="ri-map-pin-line text-blue-400 text-xl mr-3 mt-0.5"></i>
        <div>
          <p className="text-white font-medium">Geekdom Event Centre</p>
          <p className="text-white/70 text-sm">131 Soledad St, San Antonio, TX 78205</p>
        </div>
      </div>
      <div className="flex items-start">
        <i className="ri-ticket-line text-blue-400 text-xl mr-3 mt-0.5"></i>
        <div>
          <p className="text-white font-medium">$149 - Early Bird</p>
          <p className="text-white/70 text-sm">Price increases on May 1st</p>
        </div>
      </div>
    </div>

    <div className="mt-6 pt-6 border-t border-white/10">
      <h4 className="text-white font-medium mb-2">Share this event</h4>
      <div className="flex space-x-4">
        <a href="#" className="text-white/70 hover:text-white transition-colors">
          <i className="ri-twitter-x-line text-xl"></i>
        </a>
        <a href="#" className="text-white/70 hover:text-white transition-colors">
          <i className="ri-facebook-fill text-xl"></i>
        </a>
        <a href="#" className="text-white/70 hover:text-white transition-colors">
          <i className="ri-linkedin-fill text-xl"></i>
        </a>
      </div>
    </div>
  </motion.div>
)

// Shared content components to avoid duplication
const LivePerformanceContent = () => (
  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg overflow-hidden border border-white/10">
    <div className="aspect-video relative">
      <Image
        src="https://devsa-assets.s3.us-east-2.amazonaws.com/am.png"
        alt="A.M. Architect performing live"
        fill
        className="object-cover"
      />
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-bold text-white mb-2">A.M. Architect</h3>
      <p className="text-blue-400 mb-4">Audio + Visual Art</p>
      <p className="text-white/70">
        A.M Architect blends electronic music with live visuals to create an immersive audiovisual experience. Their
        performances combine synthesizers, drum machines, and real-time generative visuals that respond to the music,
        creating a unique fusion of sound and imagery.
      </p>
      <div className="mt-6 flex space-x-4">
        <a
          href="https://amarchitect.bandcamp.com/album/avenir"
          className="text-white/70 hover:text-white transition-colors"
        >
          <i className="ri-spotify-fill text-2xl"></i>
        </a>
        <a
          href="https://www.instagram.com/a.m.architect_/"
          className="text-white/70 hover:text-white transition-colors"
        >
          <i className="ri-instagram-line text-2xl"></i>
        </a>
        <a
          href="https://www.youtube.com/watch?v=2yx1FaYaMxY"
          className="text-white/70 hover:text-white transition-colors"
        >
          <i className="ri-youtube-fill text-2xl"></i>
        </a>
      </div>
    </div>
  </div>
)

const SpeakersContent = () => (
  <>
    <SpeakerCard
      name="Dr. Maya Rodriguez"
      role="Creative Technology Director"
      company="Future Interfaces Lab"
      image="https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg"
      bio="Dr. Rodriguez specializes in human-computer interaction and immersive experiences. Her work explores how technology can enhance creative expression and storytelling through novel interfaces and interaction techniques."
    />

    <SpeakerCard
      name="James Chen"
      role="Lead Designer"
      company="Prismatic Studios"
      image="https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg"
      bio="James is a multidisciplinary designer working at the intersection of digital and physical experiences. His work combines computational design with traditional craftsmanship to create innovative products and installations."
    />
  </>
)

export default function CreativeTechSummitPage() {
  const [isMobile, setIsMobile] = useState(false)
  const formContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <main className="min-h-screen bg-neutral-900 relative">
      {/* Hero Section */}
      <EventHero
        title="Creative Tech Summit 2025"
        date="June 15-16, 2025"
        location="Geekdom Event Centre, San Antonio"
        image="https://devsa-assets.s3.us-east-2.amazonaws.com/UV-Unwrapping2.png"
      />

      {/* Main Content Section with Sticky Form - Using Flex Layout */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {!isMobile ? (
            <div className="flex flex-row">
              {/* Left Column - Scrollable Content */}
              <div className="w-2/3 pr-8">
                <div className="content-container">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="prose prose-invert max-w-none mb-12"
                  >
                    <h2 className="text-3xl font-bold text-white mb-6">About the Event</h2>
                    <p className="text-white/80">
                      Join us for the inaugural Creative Tech Summit, where art meets technology in the heart of San
                      Antonio. This two-day event brings together designers, developers, artists, and innovators to
                      explore the intersection of creativity and technology.
                    </p>
                    <p className="text-white/80">
                      Through workshops, talks, and interactive exhibitions, attendees will gain insights into emerging
                      technologies, creative coding, digital art, and the future of design. Whether you&apos;re a seasoned
                      professional or just starting your journey in the creative tech space, this summit offers
                      something for everyone.
                    </p>

                    <div className="my-8 p-6 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-4">Event Highlights</h3>
                      <ul className="list-disc pl-5 space-y-2 text-white/80">
                        <li>Interactive workshops on creative coding and digital art</li>
                        <li>Panel discussions on the future of design and technology</li>
                        <li>Networking opportunities with industry leaders</li>
                        <li>Live music and performances</li>
                        <li>Exhibition showcasing local digital artists</li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* Live Band Spotlight */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-12"
                  >
                    <h2 className="text-3xl font-bold text-white mb-6">Live Performance</h2>
                    <LivePerformanceContent />
                  </motion.div>

                  {/* Speakers */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className=""
                  >
                    <h2 className="text-3xl font-bold text-white mb-6">Featured Speakers</h2>
                    <SpeakersContent />
                  </motion.div>
                </div>
              </div>

              {/* Right Column - Fixed Registration Form */}
              <div className="w-1/3">
                <div ref={formContainerRef} className="sticky top-8 space-y-6">
                  <RegistrationForm />
                  <EventDetails />
                </div>
              </div>
            </div>
          ) : (
            /* Mobile Layout */
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="prose prose-invert max-w-none mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-6">About the Event</h2>
                <p className="text-white/80">
                  Join us for the inaugural Creative Tech Summit, where art meets technology in the heart of San
                  Antonio. This two-day event brings together designers, developers, artists, and innovators to explore
                  the intersection of creativity and technology.
                </p>
                <p className="text-white/80">
                  Through workshops, talks, and interactive exhibitions, attendees will gain insights into emerging
                  technologies, creative coding, digital art, and the future of design. Whether you&apos;re a seasoned
                  professional or just starting your journey in the creative tech space, this summit offers something
                  for everyone.
                </p>

                <div className="my-8 p-6 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">Event Highlights</h3>
                  <ul className="list-disc pl-5 space-y-2 text-white/80">
                    <li>Interactive workshops on creative coding and digital art</li>
                    <li>Panel discussions on the future of design and technology</li>
                    <li>Networking opportunities with industry leaders</li>
                    <li>Live music and performances</li>
                    <li>Exhibition showcasing local digital artists</li>
                  </ul>
                </div>
              </motion.div>

              {/* Live Band Spotlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Live Performance</h2>
                <LivePerformanceContent />
              </motion.div>

              {/* Speakers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Featured Speakers</h2>
                <SpeakersContent />
              </motion.div>

              {/* Mobile Registration Form */}
              <div className="">
                <RegistrationForm />
                <EventDetails />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Event Partners Section */}
      <EventPartners />

      {/* Related Events Section */}
      <RelatedEvents />
    </main>
  )
}

