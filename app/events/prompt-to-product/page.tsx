"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import "remixicon/fonts/remixicon.css"

// Import organized components
import WireframeButton from "../../components/events/wireframe-button"
import RegistrationForm from "../../components/events/registration-form"
import EventDetails from "../../components/events/event-details"
import WeekCard from "../../components/events/week-card"
import FAQSection from "../../components/events/faq-section"
import PricingSection from "../../components/events/pricing-section"
import CallToActionSection from "../../components/events/call-to-action"

// Import data
import { weeklyProgram } from "../../../data/prompt-to-product"

export default function PromptToProductPage() {
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

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
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <Image
            src="https://ampd-asset.s3.us-east-2.amazonaws.com/prompt.jpeg"
            alt="Prompt to Product Workshop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-900/70 to-neutral-900"></div>
        </motion.div>

        {/* Wireframe Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative p-8 border border-blue-500/20 rounded-lg max-w-4xl"
          >
            {/* Wireframe corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-500/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-500/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-500/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-500/40" />

            <div className="text-blue-400/80 mb-2 flex items-center">
              <motion.i
                className="ri-graduation-cap-line mr-2"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <span>Digital Canvas Education Series</span>
            </div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
                Prompt to Product
              </span>
              <br />
              <span className="text-white">Build Smarter in 6 Weeks</span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Master the art of turning ideas into reality with AI-powered development tools and modern workflows. A
              comprehensive 6-week intensive program for creators and innovators.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                className="bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <i className="ri-calendar-line mr-1"></i> 6 Weeks • Saturdays
              </motion.div>
              <motion.div
                className="bg-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <i className="ri-group-line mr-1"></i> Limited to 30 Participants
              </motion.div>
              <motion.div
                className="bg-teal-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <i className="ri-star-line mr-1"></i> Industry Expert Instructors
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <WireframeButton href="#enroll" variant="primary">
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
              <WireframeButton href="#curriculum" variant="outline">
                View Curriculum
                <i className="ri-book-open-line ml-2"></i>
              </WireframeButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Pricing Comparison Section */}
      <PricingSection />

      {/* Program Overview */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Transform Your{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
                Creative Process
              </span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Learn to leverage AI and automation to accelerate your workflow from initial concept to final product.
              This intensive program combines theory with hands-on practice.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "ri-lightbulb-line",
                title: "Ideation to Execution",
                description:
                  "Learn systematic approaches to capture requirements and translate ideas into actionable plans.",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: "ri-links-line",
                title: "System Integration",
                description: "Master the art of connecting internal and external systems for seamless workflows.",
                color: "from-green-500 to-teal-500",
              },
              {
                icon: "ri-magic-line",
                title: "AI-Powered Creation",
                description: "Harness AI tools for content generation, design, and automated distribution at scale.",
                color: "from-purple-500 to-pink-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center group hover:border-white/20 transition-colors duration-300 relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <i className={`${feature.icon} text-3xl text-white`}></i>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Curriculum */}
      <section id="curriculum" className="py-16 md:py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              6-Week{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
                Curriculum
              </span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Each week builds upon the previous, taking you from concept to completion with expert guidance and
              hands-on practice.
            </p>
          </motion.div>

          <div className="space-y-8">
            {weeklyProgram.map((week, index) => (
              <WeekCard key={week.week} week={week} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section with Registration */}
      <div className="relative" id="enroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {!isMobile ? (
            <div className="flex flex-row gap-8">
              {/* Left Column - Content */}
              <div className="w-2/3">
                {/* Learning Outcomes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                    <motion.i
                      className="ri-trophy-line mr-3 text-yellow-400"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    What You&apos;ll Learn
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      "Requirements capture and analysis",
                      "System architecture design",
                      "API integration strategies",
                      "User experience design principles",
                      "AI prompt engineering",
                      "Content automation workflows",
                      "Multi-channel distribution",
                      "Performance optimization",
                    ].map((outcome, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-white/80 hover:text-white transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <motion.i
                          className="ri-check-line text-green-400 mr-3 text-xl"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ delay: index * 0.1 }}
                        />
                        {outcome}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Who Should Attend */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                    <motion.i
                      className="ri-team-line mr-3 text-blue-400"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    Who Should Attend
                  </h2>
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-white/10 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                      style={{ backgroundSize: "200% 200%" }}
                    />
                    <div className="relative z-10 grid md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Product Managers",
                          description: "Learn to streamline product development with AI-powered workflows",
                          icon: "ri-product-hunt-line",
                        },
                        {
                          title: "Designers & Developers",
                          description: "Integrate AI tools into your creative and development process",
                          icon: "ri-code-s-slash-line",
                        },
                        {
                          title: "Entrepreneurs",
                          description: "Build and scale products faster with modern automation",
                          icon: "ri-rocket-line",
                        },
                        {
                          title: "Marketing Professionals",
                          description: "Master automated content creation and distribution strategies",
                          icon: "ri-megaphone-line",
                        },
                      ].map((audience, index) => (
                        <motion.div
                          key={index}
                          className="text-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <motion.i
                            className={`${audience.icon} text-3xl text-blue-400 mb-3 block`}
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                          />
                          <h3 className="text-lg font-semibold text-white mb-2">{audience.title}</h3>
                          <p className="text-white/70 text-sm">{audience.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                    <motion.i
                      className="ri-question-line mr-3 text-purple-400"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    Frequently Asked Questions
                  </h2>
                  <FAQSection />
                </motion.div>
              </div>

              {/* Right Column - Registration */}
              <div className="w-1/3">
                <div className="sticky top-8 space-y-6">
                  <RegistrationForm />
                  <EventDetails />
                </div>
              </div>
            </div>
          ) : (
            /* Mobile Layout */
            <div>
              {/* Learning Outcomes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-6">What You&apos;ll Learn</h2>
                <div className="space-y-3">
                  {[
                    "Requirements capture and analysis",
                    "System architecture design",
                    "API integration strategies",
                    "User experience design principles",
                    "AI prompt engineering",
                    "Content automation workflows",
                    "Multi-channel distribution",
                    "Performance optimization",
                  ].map((outcome, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-white/80"
                    >
                      <i className="ri-check-line text-green-400 mr-3 text-xl"></i>
                      {outcome}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Who Should Attend */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Who Should Attend</h2>
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-white/10">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Product Managers",
                        description: "Learn to streamline product development with AI-powered workflows",
                      },
                      {
                        title: "Designers & Developers",
                        description: "Integrate AI tools into your creative and development process",
                      },
                      {
                        title: "Entrepreneurs",
                        description: "Build and scale products faster with modern automation",
                      },
                      {
                        title: "Marketing Professionals",
                        description: "Master automated content creation and distribution strategies",
                      },
                    ].map((audience, index) => (
                      <div key={index} className="text-center">
                        <h3 className="text-lg font-semibold text-white mb-2">{audience.title}</h3>
                        <p className="text-white/70 text-sm">{audience.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Mobile Registration */}
              <div className="mb-12">
                <RegistrationForm />
                <EventDetails />
              </div>

              {/* FAQ Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                <FAQSection />
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <CallToActionSection />
    </main>
  )
}
