"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { pricingPlans } from "../../data/prompt-to-product"

const PricingSection = () => {
  const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/10 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
              y: [0, -100],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
              Learning Path
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Flexible options designed to fit your schedule and learning goals
          </p>
        </motion.div>

        {/* Added pt-4 to provide space for badges */}
        <div className="grid md:grid-cols-3 gap-6 pt-4">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center relative group ${
                plan.popular ? "border-blue-500/50" : ""
              }`}
              whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.3)" }}
            >
              {/* Popular badge - fixed positioning */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-bold z-10"
                  animate={{
                    boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.6)"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  MOST POPULAR
                </motion.div>
              )}

              {/* Best value badge - fixed positioning */}
              {plan.badge && !plan.popular && (
                <motion.div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-bold z-10"
                  animate={{
                    scale: [1, 1.05],
                    boxShadow: ["0 0 0 rgba(168, 85, 247, 0)", "0 0 25px rgba(168, 85, 247, 0.8)"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  {plan.badge}
                </motion.div>
              )}

              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center mb-1">
                  {plan.originalPrice && (
                    <span className="text-white/40 text-lg line-through mr-2">{plan.originalPrice}</span>
                  )}
                  <div className="text-3xl font-bold text-white">{plan.price}</div>
                </div>

                <p className="text-white/60 text-sm mb-6">{plan.description}</p>

                <ul className="space-y-2 text-white/70 text-sm mb-6">
                  {plan.features.slice(0, 4).map((feature, featureIndex) => (
                    <motion.li key={featureIndex} className="flex items-center justify-center" whileHover={{ x: 2 }}>
                      <i className="ri-check-line text-green-400 mr-2"></i>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom card text with value proposition */}
                <motion.div
                  className={`mt-auto ${
                    plan.savings
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  } text-xs font-medium px-3 py-2 rounded-full inline-flex items-center`}
                  animate={{
                    scale: [1, 1.05],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  {plan.id === "per-session" && (
                    <>
                      <i className="ri-focus-3-line mr-1"></i>
                      Perfect for trying specific topics
                    </>
                  )}
                  {plan.id === "full-series" && (
                    <>
                      <i className="ri-money-dollar-circle-line mr-1"></i>
                      Save $100 vs per-session
                    </>
                  )}
                  {plan.id === "full-plus" && (
                    <>
                      <i className="ri-vip-crown-line mr-1"></i>
                      $500 in membership value included
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection
