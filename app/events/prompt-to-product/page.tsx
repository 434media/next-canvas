"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import "remixicon/fonts/remixicon.css"

// Add these interfaces after the imports
interface Speaker {
  name: string
  role: string
  company: string
  image: string
  bio: string
  expertise: string[]
}

interface WeekProgram {
  week: number
  title: string
  subtitle: string
  description: string
  topics: string[]
  speakers: Speaker[]
  color: string
  icon: string
}

interface WireframeButtonProps {
  href?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  variant?: "primary" | "secondary" | "outline"
}

const WireframeButton: React.FC<WireframeButtonProps> = ({
  href,
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
}) => {
  const baseClasses =
    "relative inline-block px-6 py-3 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900"

  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40",
    outline: "bg-transparent text-white border border-blue-500/40 hover:border-blue-400/80",
  }

  const ButtonContent = (
    <>
      {children}
      {variant === "outline" && (
        <>
          <div className="absolute inset-0 border border-blue-500/40 rounded-lg" />
          <div className="absolute inset-0 bg-blue-500/10 rounded-lg" />
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/60" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-500/60" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-500/60" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/60" />
        </>
      )}
    </>
  )

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative inline-block">
        <Link href={href} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
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
        className={`${baseClasses} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      >
        {ButtonContent}
      </button>
    </motion.div>
  )
}

// Weekly curriculum data
const weeklyProgram: WeekProgram[] = [
  {
    week: 1,
    title: "Project Requirements Capture",
    subtitle: "What it Takes to Start",
    description:
      "Learn how to effectively capture, analyze, and document project requirements. Master the art of translating ideas into actionable specifications that drive successful outcomes.",
    topics: [
      "Stakeholder analysis and requirement gathering",
      "User story creation and acceptance criteria",
      "Technical specification documentation",
      "Risk assessment and mitigation planning",
    ],
    speakers: [
      {
        name: "Sarah Chen",
        role: "Product Strategy Director",
        company: "Microsoft",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Sarah has led product strategy for enterprise solutions at Microsoft for over 8 years, specializing in requirements engineering and stakeholder alignment.",
        expertise: ["Requirements Engineering", "Product Strategy", "Stakeholder Management"],
      },
      {
        name: "Marcus Rodriguez",
        role: "Senior Business Analyst",
        company: "Atlassian",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "Marcus brings 10+ years of experience in business analysis and requirements capture, having worked with Fortune 500 companies to streamline their development processes.",
        expertise: ["Business Analysis", "Process Optimization", "Documentation"],
      },
    ],
    color: "from-blue-500 to-cyan-500",
    icon: "ri-file-list-3-line",
  },
  {
    week: 2,
    title: "Workflow & Connected Systems",
    subtitle: "Internal Systems Integration",
    description:
      "Discover how to design and implement efficient internal workflows. Learn to connect disparate systems and create seamless data flow within your organization.",
    topics: [
      "Internal system architecture design",
      "API integration strategies",
      "Data flow optimization",
      "Automation workflow creation",
    ],
    speakers: [
      {
        name: "Dr. Priya Patel",
        role: "Solutions Architect",
        company: "AWS",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Dr. Patel is a cloud solutions architect with expertise in designing scalable internal systems and microservices architectures for enterprise clients.",
        expertise: ["Cloud Architecture", "Microservices", "System Integration"],
      },
      {
        name: "James Thompson",
        role: "DevOps Engineer",
        company: "GitLab",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "James specializes in CI/CD pipeline optimization and internal tooling, helping teams achieve faster deployment cycles and better system reliability.",
        expertise: ["DevOps", "CI/CD", "Infrastructure Automation"],
      },
    ],
    color: "from-purple-500 to-pink-500",
    icon: "ri-git-merge-line",
  },
  {
    week: 3,
    title: "Workflow & Connected Systems",
    subtitle: "External System Integration",
    description:
      "Master the complexities of external system integration. Learn best practices for API management, third-party service integration, and maintaining system reliability.",
    topics: [
      "Third-party API integration",
      "Webhook implementation and management",
      "External service reliability patterns",
      "Security and authentication strategies",
    ],
    speakers: [
      {
        name: "Elena Vasquez",
        role: "Integration Specialist",
        company: "Zapier",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Elena leads integration architecture at Zapier, where she's responsible for connecting thousands of apps and services seamlessly.",
        expertise: ["API Integration", "Webhook Architecture", "Service Reliability"],
      },
      {
        name: "David Kim",
        role: "Platform Engineer",
        company: "Stripe",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "David builds and maintains the platform infrastructure that powers millions of API calls daily, focusing on reliability and developer experience.",
        expertise: ["Platform Engineering", "API Design", "Developer Experience"],
      },
    ],
    color: "from-green-500 to-teal-500",
    icon: "ri-links-line",
  },
  {
    week: 4,
    title: "UX/UI Design",
    subtitle: "User-Centered Design Excellence",
    description:
      "Create intuitive and engaging user experiences. Learn modern design principles, prototyping techniques, and how to validate your designs with real users.",
    topics: [
      "User research and persona development",
      "Information architecture and wireframing",
      "Visual design and design systems",
      "Usability testing and iteration",
    ],
    speakers: [
      {
        name: "Alex Morgan",
        role: "Senior UX Designer",
        company: "Airbnb",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Alex has designed user experiences for millions of Airbnb users, focusing on creating intuitive interfaces that drive engagement and conversion.",
        expertise: ["User Experience", "Design Systems", "User Research"],
      },
      {
        name: "Ryan Foster",
        role: "Product Designer",
        company: "Figma",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "Ryan works on Figma's core design tools, helping millions of designers worldwide create better products through improved design workflows.",
        expertise: ["Product Design", "Design Tools", "Collaboration"],
      },
    ],
    color: "from-orange-500 to-red-500",
    icon: "ri-palette-line",
  },
  {
    week: 5,
    title: "AI Content Generation",
    subtitle: "Leveraging AI for Creative Output",
    description:
      "Harness the power of AI to accelerate content creation. Learn to integrate AI tools into your workflow for text, images, and multimedia content generation.",
    topics: [
      "AI prompt engineering and optimization",
      "Content generation workflows",
      "Quality control and human oversight",
      "Ethical AI usage and best practices",
    ],
    speakers: [
      {
        name: "Dr. Sophia Liu",
        role: "AI Research Scientist",
        company: "OpenAI",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Dr. Liu researches large language models and their applications in creative workflows, focusing on making AI tools more accessible to creators.",
        expertise: ["AI Research", "Language Models", "Creative AI"],
      },
      {
        name: "Carlos Mendez",
        role: "AI Product Manager",
        company: "Adobe",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "Carlos leads AI product development at Adobe, working on integrating generative AI capabilities into creative software used by millions.",
        expertise: ["AI Product Development", "Creative Tools", "Generative AI"],
      },
    ],
    color: "from-violet-500 to-purple-500",
    icon: "ri-magic-line",
  },
  {
    week: 6,
    title: "Automated Distribution",
    subtitle: "Scaling Your Reach",
    description:
      "Learn to automate content distribution across multiple channels. Master the tools and strategies for reaching your audience efficiently and effectively.",
    topics: [
      "Multi-channel distribution strategies",
      "Marketing automation workflows",
      "Analytics and performance tracking",
      "Scaling and optimization techniques",
    ],
    speakers: [
      {
        name: "Maya Patel",
        role: "Growth Marketing Director",
        company: "HubSpot",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Maya leads growth marketing initiatives at HubSpot, specializing in automated marketing workflows that have driven millions in revenue.",
        expertise: ["Growth Marketing", "Marketing Automation", "Analytics"],
      },
      {
        name: "Jordan Lee",
        role: "Content Strategy Lead",
        company: "Buffer",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "Jordan develops content distribution strategies for Buffer's global audience, focusing on automation and cross-platform optimization.",
        expertise: ["Content Strategy", "Social Media", "Distribution Automation"],
      },
    ],
    color: "from-emerald-500 to-green-500",
    icon: "ri-rocket-line",
  },
]

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

  const pricingPlans = [
    {
      id: "per-session",
      name: "Per Session",
      price: "$100",
      originalPrice: null,
      description: "Pay as you go",
      features: [
        "Single session access",
        "Session recording",
        "Digital resources for that week",
        "Community access during session",
      ],
      popular: false,
      total: "Total varies by sessions attended",
      savings: null,
      gradient: "from-slate-500 to-gray-600",
      iconColor: "text-slate-400",
    },
    {
      id: "full-series",
      name: "Full Series",
      price: "$500",
      originalPrice: "$600",
      description: "Complete 6-week program",
      features: [
        "All 6 workshop sessions",
        "Complete session recordings",
        "All digital resources & templates",
        "Certificate of completion",
        "6 months community access",
        "Catered lunch each session",
      ],
      popular: true,
      total: "Save $100 vs per-session pricing",
      savings: "$100",
      gradient: "from-blue-500 to-purple-600",
      iconColor: "text-blue-400",
    },
    {
      id: "full-plus",
      name: "Full Series + Memberships",
      price: "$500",
      originalPrice: "$1000",
      description: "Everything + 1 year memberships",
      features: [
        "Everything in Full Series",
        "1 year DevSA membership ($200 value)",
        "1 year TechBloc membership ($300 value)",
        "Exclusive member events access",
        "Priority support & mentorship",
        "Extended community access",
      ],
      popular: false,
      total: "Best value - $500 in membership benefits included",
      savings: "$500",
      badge: "BEST VALUE",
      gradient: "from-purple-500 to-pink-600",
      iconColor: "text-purple-400",
    },
  ]

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
            {/* Enhanced Pricing Plans */}
            <div className="space-y-4">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-500 overflow-hidden ${
                    selectedPlan === plan.id
                      ? `border-transparent bg-gradient-to-r ${plan.gradient} shadow-2xl`
                      : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated background for selected plan */}
                  {selectedPlan === plan.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      style={{ backgroundSize: "200% 200%" }}
                    />
                  )}

                  {/* Badges */}
                  {plan.badge && (
                    <motion.div
                      className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg"
                      animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          "0 0 0 rgba(168, 85, 247, 0)",
                          "0 0 20px rgba(168, 85, 247, 0.5)",
                          "0 0 0 rgba(168, 85, 247, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      {plan.badge}
                    </motion.div>
                  )}

                  {plan.popular && (
                    <motion.div
                      className="absolute -top-3 left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg"
                      animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          "0 0 0 rgba(59, 130, 246, 0)",
                          "0 0 20px rgba(59, 130, 246, 0.5)",
                          "0 0 0 rgba(59, 130, 246, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      MOST POPULAR
                    </motion.div>
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
                          <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                          <p className="text-white/60 text-sm">{plan.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          {plan.originalPrice && (
                            <span className="text-white/40 text-lg line-through mr-2">{plan.originalPrice}</span>
                          )}
                          <div className="text-2xl font-bold text-white">{plan.price}</div>
                        </div>
                        {plan.id === "per-session" && <div className="text-white/60 text-xs">per session</div>}
                        {plan.savings && (
                          <motion.div
                            className="text-green-400 text-xs font-bold"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          >
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
                              >
                                <motion.i
                                  className="ri-check-line text-green-400 mr-2 text-sm"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ delay: featureIndex * 0.1 }}
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
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        />
                        Enroll Now - {selectedPlanData?.price}
                        <motion.i
                          className="ri-arrow-right-line ml-2"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
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

const EventDetails = () => {
  const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 10 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-6 bg-neutral-800/50 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-xl relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-400/20 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
              y: [0, -30],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <motion.i
            className="ri-information-line mr-2 text-teal-400"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          Program Details
        </h3>
        <div className="space-y-4">
          <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <i className="ri-calendar-line text-blue-400 text-xl mr-3 mt-0.5"></i>
            <div>
              <p className="text-white font-medium">6 Weeks Starting March 15, 2025</p>
              <p className="text-white/70 text-sm">Saturdays, 10:00 AM - 2:00 PM CST</p>
            </div>
          </motion.div>
          <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <i className="ri-map-pin-line text-blue-400 text-xl mr-3 mt-0.5"></i>
            <div>
              <p className="text-white font-medium">Geekdom Event Centre</p>
              <p className="text-white/70 text-sm">131 Soledad St, San Antonio, TX 78205</p>
            </div>
          </motion.div>
          <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <i className="ri-ticket-line text-blue-400 text-xl mr-3 mt-0.5"></i>
            <div>
              <p className="text-white font-medium">Flexible Pricing Options</p>
              <p className="text-white/70 text-sm">$100 per session or $500 for full series</p>
            </div>
          </motion.div>
          <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <i className="ri-group-line text-blue-400 text-xl mr-3 mt-0.5"></i>
            <div>
              <p className="text-white font-medium">Limited to 30 Participants</p>
              <p className="text-white/70 text-sm">Small cohort for personalized attention</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-white font-medium mb-3 flex items-center">
            <motion.i
              className="ri-money-dollar-circle-line mr-2 text-green-400"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            Pricing Breakdown
          </h4>
          <div className="space-y-2 text-sm">
            <motion.div className="flex justify-between text-white/70" whileHover={{ scale: 1.02 }}>
              <span>Per Session</span>
              <span>$100</span>
            </motion.div>
            <motion.div className="flex justify-between text-white/70" whileHover={{ scale: 1.02 }}>
              <span>Full Series (6 weeks)</span>
              <span className="flex items-center">
                <span className="line-through text-white/40 mr-2">$600</span>
                $500
              </span>
            </motion.div>
            <motion.div
              className="flex justify-between text-white font-medium border-t border-white/20 pt-2"
              whileHover={{ scale: 1.02 }}
            >
              <span>Full Series + Memberships</span>
              <span className="flex items-center">
                <span className="line-through text-white/40 mr-2">$1000</span>
                $500
              </span>
            </motion.div>
            <motion.p
              className="text-white/60 text-xs mt-2"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Memberships include 1 year DevSA + TechBloc access ($500 value)
            </motion.p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-white font-medium mb-2">Share this program</h4>
          <div className="flex space-x-4">
            {[
              { icon: "ri-twitter-x-line", color: "hover:text-blue-400" },
              { icon: "ri-facebook-fill", color: "hover:text-blue-600" },
              { icon: "ri-linkedin-fill", color: "hover:text-blue-500" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                className={`text-white/70 ${social.color} transition-colors`}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={`${social.icon} text-xl`}></i>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const SpeakerCard = ({ speaker, index }: { speaker: Speaker; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-neutral-800/50 backdrop-blur-sm rounded-lg p-6 border border-white/10 group hover:border-white/20 transition-colors duration-300 relative overflow-hidden"
  >
    {/* Hover effect background */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      initial={false}
    />

    <div className="relative z-10 flex flex-col sm:flex-row gap-4">
      <motion.div
        className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0 mx-auto sm:mx-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Image src={speaker.image || "/placeholder.svg"} alt={speaker.name} fill className="object-cover" />
      </motion.div>
      <div className="flex-1 text-center sm:text-left">
        <h4 className="text-lg font-bold text-white mb-1">{speaker.name}</h4>
        <p className="text-blue-400 mb-2 text-sm">
          {speaker.role} @ {speaker.company}
        </p>
        <p className="text-white/70 text-sm mb-3 leading-relaxed">{speaker.bio}</p>
        <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
          {speaker.expertise.map((skill: string, skillIndex: number) => (
            <motion.span
              key={skill}
              className="px-2 py-1 bg-white/10 text-white/80 rounded-full text-xs"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: skillIndex * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
)

const WeekCard = ({ week, index }: { week: WeekProgram; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden group hover:border-white/20 transition-colors duration-300 relative"
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${week.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      />

      {/* Week Header */}
      <div className="relative z-10 p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <motion.div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${week.color} flex items-center justify-center mr-4`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <i className={`${week.icon} text-2xl text-white`}></i>
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-white">Week {week.week}</h3>
              <p className="text-white/60 text-sm">{week.subtitle}</p>
            </div>
          </div>
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.i
              className="ri-arrow-down-s-line"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>

        <h4 className="text-2xl font-bold text-white mb-3">{week.title}</h4>
        <p className="text-white/80 leading-relaxed">{week.description}</p>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="relative z-10 p-6 space-y-6">
              {/* Topics */}
              <div>
                <h5 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <motion.i
                    className="ri-list-check mr-2 text-blue-400"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  Key Topics
                </h5>
                <ul className="space-y-2">
                  {week.topics.map((topic: string, topicIndex: number) => (
                    <motion.li
                      key={topicIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: topicIndex * 0.1 }}
                      className="flex items-center text-white/70 hover:text-white/90 transition-colors"
                    >
                      <motion.i
                        className="ri-arrow-right-s-line text-blue-400 mr-2"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      />
                      {topic}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Speakers */}
              <div>
                <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <motion.i
                    className="ri-user-star-line mr-2 text-purple-400"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  Featured Speakers
                </h5>
                <div className="space-y-4">
                  {week.speakers.map((speaker: Speaker, speakerIndex: number) => (
                    <SpeakerCard key={speakerIndex} speaker={speaker} index={speakerIndex} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "What experience level is required for this program?",
      answer:
        "This program is designed for all experience levels. Whether you're a beginner looking to learn the fundamentals or an experienced professional wanting to modernize your workflow, our curriculum adapts to your needs.",
    },
    {
      question: "Will sessions be recorded?",
      answer:
        "Yes, all sessions will be recorded and made available to enrolled participants. You'll have access to recordings for 6 months after the program ends.",
    },
    {
      question: "What if I miss a session?",
      answer:
        "We understand schedules can be challenging. Missed sessions can be made up through recordings, and our instructors offer office hours for additional support.",
    },
    {
      question: "Are there any prerequisites?",
      answer:
        "No specific prerequisites are required. Basic computer literacy and enthusiasm to learn are all you need. We'll provide all necessary tools and resources.",
    },
    {
      question: "What tools and software will we use?",
      answer:
        "We'll cover a variety of modern tools including Figma, various AI platforms, automation tools like Zapier, and development frameworks. Most tools offer free tiers or trial periods.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "Yes, we offer a full refund if you're not satisfied after the first session. After that, we offer prorated refunds on a case-by-case basis.",
    },
  ]

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-neutral-800/50 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden hover:border-white/20 transition-colors duration-300"
        >
          <motion.button
            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-white font-medium">{faq.question}</span>
            <motion.i
              className="ri-arrow-down-s-line text-white/70"
              animate={{ rotate: openFAQ === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          <AnimatePresence>
            {openFAQ === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-white/70 leading-relaxed">{faq.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

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

        <div className="grid md:grid-cols-3 gap-6">
          {/* Per Session Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center relative overflow-hidden group"
            whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.3)" }}
          >
            <motion.div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">Per Session</h3>
              <div className="text-3xl font-bold text-white mb-1">$100</div>
              <p className="text-white/60 text-sm mb-6">per session</p>
              <ul className="space-y-2 text-white/70 text-sm mb-6">
                <motion.li className="flex items-center justify-center" whileHover={{ x: 2 }}>
                  <i className="ri-check-line text-green-400 mr-2"></i>
                  Single session access
                </motion.li>
                <motion.li className="flex items-center justify-center" whileHover={{ x: 2 }}>
                  <i className="ri-check-line text-green-400 mr-2"></i>
                  Session recording
                </motion.li>
                <motion.li className="flex items-center justify-center" whileHover={{ x: 2 }}>
                  <i className="ri-check-line text-green-400 mr-2"></i>
                  Weekly resources
                </motion.li>
              </ul>
              <p className="text-white/50 text-xs">Perfect for trying specific topics</p>
            </div>
          </motion.div>

          {/* Full Series Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 border-2 border-blue-500/50 text-center relative overflow-hidden group"
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <motion.div
              className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-bold"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 20px rgba(59, 130, 246, 0.6)",
                  "0 0 0 rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              MOST POPULAR
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
              style={{ backgroundSize: "200% 200%" }}
            />

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">Full Series</h3>
              <div className="flex items-center justify-center mb-1">
                <span className="text-white/40 text-lg line-through mr-2">$600</span>
                <div className="text-3xl font-bold text-white">$500</div>
              </div>
              <p className="text-white/60 text-sm mb-6">complete program</p>
              <ul className="space-y-2 text-white/70 text-sm mb-6">
                <motion.li className="flex items-center justify-center" whileHover={{ x: 2 }}>
                  <i className="ri-check-line text-green-400 mr-2"></i>
                  All 6 sessions
                </motion.li>
                <motion.li className="flex items-center justify-center" whileHover={{ x: 2 }}>
                  <i className="ri-check-line text-green-400 mr-2"></i>
                  Complete recordings
                </motion.li>
                <motion.li className="flex items-center justify-center" whileHover={{ x: 2 }}>
                  <i className="ri-check-line text-green-400 mr-2"></i>
                  All resources & templates
                </motion.li>
                <motion.li className="flex items-center justify-center" whileHover={{ x: 2 }}>
                  <i className="ri-check-line text-green-400 mr-2"></i>
                  Certificate of completion
                </motion.li>
              </ul>
              <motion.p
                className="text-green-400 text-xs font-medium"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Save $100 vs per-session
              </motion.p>
            </div>
          </motion.div>

          {/* Full Series + Memberships Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border-2 border-purple-500/50 text-center relative overflow-hidden group"
            whileHover={{ y: -5, borderColor: "rgba(168, 85, 247, 0.8)" }}
          >
            <motion.div
              className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-bold"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0 rgba(168, 85, 247, 0)",
                  "0 0 25px rgba(168, 85, 247, 0.8)",
                  "0 0 0 rgba(168, 85, 247, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              BEST VALUE
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
              style={{ backgroundSize: "200% 200%" }}
            />

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">Full + Memberships</h3>
              <div className="flex items-center justify-center mb-1">
                <span className="text-white/40 text-lg line-through mr-2">$1000</span>
                <div className="text-3xl font-bold text-white">$500</div>
              </div>
              <p className="text-white/60 text-sm mb-6">everything included</p>
              <ul className="space-y-2 text-white/70 text-sm mb-6">
                <motion.li className="flex items-center justify-center" whileHover={{ x: 2 }}>
                  <i className="ri-check-line text-green-400 mr-2"></i>
                  Everything in Full Series
                </motion.li>
                <motion.li className="flex items-center justify-center" whileHover={{ x: 2 }}>
                  <i className="ri-check-line text-green-400 mr-2"></i>1 year DevSA membership
                </motion.li>
                <motion.li className="flex items-center justify-center" whileHover={{ x: 2 }}>
                  <i className="ri-check-line text-green-400 mr-2"></i>1 year TechBloc membership
                </motion.li>
                <motion.li className="flex items-center justify-center" whileHover={{ x: 2 }}>
                  <i className="ri-check-line text-green-400 mr-2"></i>
                  Exclusive member events
                </motion.li>
              </ul>
              <motion.p
                className="text-purple-400 text-xs font-medium"
                animate={{
                  scale: [1, 1.05, 1],
                  color: ["#a855f7", "#ec4899", "#a855f7"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                $500 in membership value included
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const CallToActionSection = () => {
  const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-t border-white/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
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
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-6 relative"
            animate={{
              rotate: [0, 360],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-500/30"></div>
            <div className="absolute inset-2 rounded-full border-4 border-dashed border-purple-500/30"></div>
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <motion.i
                className="ri-rocket-line text-3xl text-white"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Workflow?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join 30 ambitious creators and innovators in this intensive 6-week program. Limited spots available - secure
            your place today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <WireframeButton href="#enroll" variant="primary" className="text-lg px-8 py-4">
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
            <WireframeButton
              href="mailto:hello@digitalcanvas.community"
              variant="secondary"
              className="text-lg px-8 py-4"
            >
              Have Questions?
              <motion.i
                className="ri-mail-line ml-2"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </WireframeButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

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
                  <FAQ />
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
              >
                <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                <FAQ />
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
