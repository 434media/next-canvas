"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { pricingPlans } from "../../data/prompt-to-product"
import WireframeButton from "./wireframe-button"

const RegistrationForm = () => {
  const [selectedPlan, setSelectedPlan] = useState("full-series")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    experience: "",
    goals: "",
    dietaryRestrictions: "",
    sessions: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([])

  // Generate particles on client side only
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    setParticles(newParticles)
  }, [])

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const selectedPlanData = pricingPlans.find((plan) => plan.id === selectedPlan)

  return (
    <div className="bg-neutral-800/70 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-xl relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              y: [0, -50],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <motion.i
            className="ri-graduation-cap-line mr-3 text-blue-400"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          Choose Your Learning Path
        </h3>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              className="text-green-400 text-6xl mb-4"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{ duration: 1 }}
            >
              <i className="ri-checkbox-circle-line"></i>
            </motion.div>
            <h4 className="text-xl font-bold text-white mb-2">Enrollment Complete!</h4>
            <p className="text-white/70 mb-6">Welcome to the program! Check your email for next steps.</p>
            <WireframeButton onClick={() => setIsSubmitted(false)} variant="secondary">
              Enroll Another
            </WireframeButton>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Enhanced Pricing Plans - Fixed badge positioning */}
            <div className="space-y-4">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Badge container - positioned outside the card with proper spacing */}
                  <div className="relative mb-2 h-6 flex justify-end">
                    {plan.badge && (
                      <motion.div
                        className="bg-linear-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg mr-2"
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                      >
                        <motion.span
                          animate={{
                            scale: [1, 1.02],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }}
                          className="flex items-center"
                        >
                          💎 {plan.badge}
                        </motion.span>
                      </motion.div>
                    )}

                    {plan.popular && (
                      <motion.div
                        className="bg-linear-to-r from-blue-500 to-cyan-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg"
                        initial={{ scale: 0, rotate: 10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.05, rotate: -2 }}
                      >
                        <motion.span
                          animate={{
                            opacity: [1, 0.8],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }}
                          className="flex items-center"
                        >
                          ⭐ MOST POPULAR
                        </motion.span>
                      </motion.div>
                    )}
                  </div>

                  {/* Main pricing card */}
                  <motion.div
                    className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-500 overflow-hidden ${
                      selectedPlan === plan.id
                        ? `border-transparent bg-linear-to-r ${plan.gradient} shadow-2xl`
                        : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      boxShadow:
                        selectedPlan === plan.id
                          ? "0 20px 40px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255,255,255,0.1)"
                          : undefined,
                    }}
                  >
                    {/* Enhanced animated background for selected plan */}
                    {selectedPlan === plan.id && (
                      <>
                        <motion.div
                          className="absolute inset-0 bg-linear-to-r from-white/10 to-white/5"
                          animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                          style={{ backgroundSize: "200% 200%" }}
                        />

                        {/* Floating particles for selected plan */}
                        <div className="absolute inset-0 pointer-events-none">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-white/30 rounded-full"
                              style={{
                                left: `${10 + i * 10}%`,
                                top: `${20 + (i % 3) * 20}%`,
                              }}
                              animate={{
                                y: [0, -15, 0],
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <motion.div
                            className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-300 ${
                              selectedPlan === plan.id ? "border-white bg-white" : "border-white/40"
                            }`}
                            animate={selectedPlan === plan.id ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.3 }}
                          >
                            {selectedPlan === plan.id && (
                              <motion.div
                                className="w-2.5 h-2.5 bg-blue-600 rounded-full"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </motion.div>
                          <div>
                            <motion.h4 className="text-lg font-bold text-white" whileHover={{ scale: 1.02 }}>
                              {plan.name}
                            </motion.h4>
                            <p className="text-white/60 text-sm">{plan.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            {plan.originalPrice && (
                              <motion.span
                                className="text-white/40 text-lg line-through mr-2"
                                animate={{ opacity: [0.4, 0.6] }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "reverse",
                                  ease: "easeInOut",
                                }}
                              >
                                {plan.originalPrice}
                              </motion.span>
                            )}
                            <motion.div className="text-2xl font-bold text-white" whileHover={{ scale: 1.05 }}>
                              {plan.price}
                            </motion.div>
                          </div>
                          {plan.id === "per-session" && <div className="text-white/60 text-xs">per session</div>}
                          {plan.savings && (
                            <motion.div
                              className="text-green-400 text-xs font-bold flex items-center justify-end mt-1"
                              animate={{
                                scale: [1, 1.05],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                                ease: "easeInOut",
                              }}
                            >
                              <motion.i
                                className="ri-money-dollar-circle-line mr-1"
                                animate={{ rotate: [0, 360] }}
                                transition={{
                                  duration: 4,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "linear",
                                }}
                              />
                              Save {plan.savings}!
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <div className="text-white/70 text-sm mb-3">{plan.total}</div>

                      {/* Enhanced feature display */}
                      <AnimatePresence>
                        {selectedPlan === plan.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-white/20"
                          >
                            <ul className="space-y-2">
                              {plan.features.map((feature, featureIndex) => (
                                <motion.li
                                  key={featureIndex}
                                  className="flex items-center text-white/90 text-sm"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: featureIndex * 0.1 }}
                                  whileHover={{ x: 4, color: "#ffffff" }}
                                >
                                  <motion.i
                                    className="ri-check-line text-green-400 mr-2 text-sm"
                                    animate={{ scale: [1, 1.2] }}
                                    transition={{
                                      delay: featureIndex * 0.1,
                                      duration: 0.5,
                                      repeat: Number.POSITIVE_INFINITY,
                                      repeatType: "reverse",
                                      ease: "easeInOut",
                                    }}
                                  />
                                  {feature}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Registration Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4 pt-6 border-t border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                    Full Name *
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-neutral-700/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Your full name"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                    Email Address *
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-neutral-700/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="you@example.com"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-1">
                    Company/Organization
                  </label>
                  <motion.input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-neutral-700/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Your company (optional)"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-white/80 mb-1">
                    Experience Level *
                  </label>
                  <motion.select
                    id="experience"
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-neutral-700/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner (0-2 years)</option>
                    <option value="intermediate">Intermediate (2-5 years)</option>
                    <option value="advanced">Advanced (5+ years)</option>
                  </motion.select>
                </div>
              </div>

              {selectedPlan === "per-session" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label htmlFor="sessions" className="block text-sm font-medium text-white/80 mb-1">
                    Which sessions are you interested in? *
                  </label>
                  <motion.textarea
                    id="sessions"
                    name="sessions"
                    required
                    value={formData.sessions}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 bg-neutral-700/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="e.g., Week 1, Week 3, Week 5..."
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
              )}

              <div>
                <label htmlFor="goals" className="block text-sm font-medium text-white/80 mb-1">
                  Learning Goals
                </label>
                <motion.textarea
                  id="goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="What do you hope to achieve from this program?"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              <div>
                <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-white/80 mb-1">
                  Dietary Restrictions
                </label>
                <motion.input
                  type="text"
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Any dietary restrictions for catered sessions"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              <div className="pt-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <WireframeButton type="submit" disabled={isSubmitting} className="w-full justify-center text-lg py-4">
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <motion.svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
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
                        </motion.svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <motion.i
                          className="ri-rocket-line mr-2"
                          animate={{ y: [0, -2] }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }}
                        />
                        Enroll Now - {selectedPlanData?.price}
                        <motion.i
                          className="ri-arrow-right-line ml-2"
                          animate={{ x: [0, 3] }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }}
                        />
                      </span>
                    )}
                  </WireframeButton>
                </motion.div>
              </div>

              <p className="text-xs text-white/50 text-center mt-4">
                By enrolling, you agree to our Terms of Service and Privacy Policy.
              </p>
            </motion.form>
          </div>
        )}
      </div>
    </div>
  )
}

export default RegistrationForm
