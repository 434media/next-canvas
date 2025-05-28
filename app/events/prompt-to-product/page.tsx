"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import "remixicon/fonts/remixicon.css"

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
  const baseClasses = "relative inline-block px-6 py-3 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40",
    outline: "bg-transparent text-white border border-blue-500/40 hover:border-blue-400/80"
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
        <Link
          href={href}
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
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
        className={`${baseClasses} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      >
        {ButtonContent}
      </button>
    </motion.div>
  )
}

// Weekly curriculum data
const weeklyProgram = [
  {
    week: 1,
    title: "Project Requirements Capture",
    subtitle: "What it Takes to Start",
    description: "Learn how to effectively capture, analyze, and document project requirements. Master the art of translating ideas into actionable specifications that drive successful outcomes.",
    topics: [
      "Stakeholder analysis and requirement gathering",
      "User story creation and acceptance criteria",
      "Technical specification documentation",
      "Risk assessment and mitigation planning"
    ],
    speakers: [
      {
        name: "Sarah Chen",
        role: "Product Strategy Director",
        company: "Microsoft",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Sarah has led product strategy for enterprise solutions at Microsoft for over 8 years, specializing in requirements engineering and stakeholder alignment.",
        expertise: ["Requirements Engineering", "Product Strategy", "Stakeholder Management"]
      },
      {
        name: "Marcus Rodriguez",
        role: "Senior Business Analyst",
        company: "Atlassian",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "Marcus brings 10+ years of experience in business analysis and requirements capture, having worked with Fortune 500 companies to streamline their development processes.",
        expertise: ["Business Analysis", "Process Optimization", "Documentation"]
      }
    ],
    color: "from-blue-500 to-cyan-500",
    icon: "ri-file-list-3-line"
  },
  {
    week: 2,
    title: "Workflow & Connected Systems",
    subtitle: "Internal Systems Integration",
    description: "Discover how to design and implement efficient internal workflows. Learn to connect disparate systems and create seamless data flow within your organization.",
    topics: [
      "Internal system architecture design",
      "API integration strategies",
      "Data flow optimization",
      "Automation workflow creation"
    ],
    speakers: [
      {
        name: "Dr. Priya Patel",
        role: "Solutions Architect",
        company: "AWS",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Dr. Patel is a cloud solutions architect with expertise in designing scalable internal systems and microservices architectures for enterprise clients.",
        expertise: ["Cloud Architecture", "Microservices", "System Integration"]
      },
      {
        name: "James Thompson",
        role: "DevOps Engineer",
        company: "GitLab",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "James specializes in CI/CD pipeline optimization and internal tooling, helping teams achieve faster deployment cycles and better system reliability.",
        expertise: ["DevOps", "CI/CD", "Infrastructure Automation"]
      }
    ],
    color: "from-purple-500 to-pink-500",
    icon: "ri-git-merge-line"
  },
  {
    week: 3,
    title: "Workflow & Connected Systems",
    subtitle: "External System Integration",
    description: "Master the complexities of external system integration. Learn best practices for API management, third-party service integration, and maintaining system reliability.",
    topics: [
      "Third-party API integration",
      "Webhook implementation and management",
      "External service reliability patterns",
      "Security and authentication strategies"
    ],
    speakers: [
      {
        name: "Elena Vasquez",
        role: "Integration Specialist",
        company: "Zapier",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Elena leads integration architecture at Zapier, where she's responsible for connecting thousands of apps and services seamlessly.",
        expertise: ["API Integration", "Webhook Architecture", "Service Reliability"]
      },
      {
        name: "David Kim",
        role: "Platform Engineer",
        company: "Stripe",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "David builds and maintains the platform infrastructure that powers millions of API calls daily, focusing on reliability and developer experience.",
        expertise: ["Platform Engineering", "API Design", "Developer Experience"]
      }
    ],
    color: "from-green-500 to-teal-500",
    icon: "ri-links-line"
  },
  {
    week: 4,
    title: "UX/UI Design",
    subtitle: "User-Centered Design Excellence",
    description: "Create intuitive and engaging user experiences. Learn modern design principles, prototyping techniques, and how to validate your designs with real users.",
    topics: [
      "User research and persona development",
      "Information architecture and wireframing",
      "Visual design and design systems",
      "Usability testing and iteration"
    ],
    speakers: [
      {
        name: "Alex Morgan",
        role: "Senior UX Designer",
        company: "Airbnb",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Alex has designed user experiences for millions of Airbnb users, focusing on creating intuitive interfaces that drive engagement and conversion.",
        expertise: ["User Experience", "Design Systems", "User Research"]
      },
      {
        name: "Ryan Foster",
        role: "Product Designer",
        company: "Figma",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "Ryan works on Figma's core design tools, helping millions of designers worldwide create better products through improved design workflows.",
        expertise: ["Product Design", "Design Tools", "Collaboration"]
      }
    ],
    color: "from-orange-500 to-red-500",
    icon: "ri-palette-line"
  },
  {
    week: 5,
    title: "AI Content Generation",
    subtitle: "Leveraging AI for Creative Output",
    description: "Harness the power of AI to accelerate content creation. Learn to integrate AI tools into your workflow for text, images, and multimedia content generation.",
    topics: [
      "AI prompt engineering and optimization",
      "Content generation workflows",
      "Quality control and human oversight",
      "Ethical AI usage and best practices"
    ],
    speakers: [
      {
        name: "Dr. Sophia Liu",
        role: "AI Research Scientist",
        company: "OpenAI",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Dr. Liu researches large language models and their applications in creative workflows, focusing on making AI tools more accessible to creators.",
        expertise: ["AI Research", "Language Models", "Creative AI"]
      },
      {
        name: "Carlos Mendez",
        role: "AI Product Manager",
        company: "Adobe",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "Carlos leads AI product development at Adobe, working on integrating generative AI capabilities into creative software used by millions.",
        expertise: ["AI Product Development", "Creative Tools", "Generative AI"]
      }
    ],
    color: "from-violet-500 to-purple-500",
    icon: "ri-magic-line"
  },
  {
    week: 6,
    title: "Automated Distribution",
    subtitle: "Scaling Your Reach",
    description: "Learn to automate content distribution across multiple channels. Master the tools and strategies for reaching your audience efficiently and effectively.",
    topics: [
      "Multi-channel distribution strategies",
      "Marketing automation workflows",
      "Analytics and performance tracking",
      "Scaling and optimization techniques"
    ],
    speakers: [
      {
        name: "Maya Patel",
        role: "Growth Marketing Director",
        company: "HubSpot",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        bio: "Maya leads growth marketing initiatives at HubSpot, specializing in automated marketing workflows that have driven millions in revenue.",
        expertise: ["Growth Marketing", "Marketing Automation", "Analytics"]
      },
      {
        name: "Jordan Lee",
        role: "Content Strategy Lead",
        company: "Buffer",
        image: "https://ampd-asset.s3.us-east-2.amazonaws.com/philip-martin-5aGUyCW_PJw-unsplash.jpg",
        bio: "Jordan develops content distribution strategies for Buffer's global audience, focusing on automation and cross-platform optimization.",
        expertise: ["Content Strategy", "Social Media", "Distribution Automation"]
      }
    ],
    color: "from-emerald-500 to-green-500",
    icon: "ri-rocket-line"
  }
]

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    experience: "",
    goals: "",
    dietaryRestrictions: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  return (
    <div className="bg-neutral-800/70 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-xl">
      <h3 className="text-2xl font-bold text-white mb-6">Enroll in Prompt to Product</h3>

      {isSubmitted ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
          <div className="text-green-400 text-5xl mb-4">
            <i className="ri-checkbox-circle-line"></i>
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Enrollment Complete!</h4>
          <p className="text-white/70 mb-6">Welcome to the program! Check your email for next steps.</p>
          <WireframeButton onClick={() => setIsSubmitted(false)} variant="secondary">Enroll Another</WireframeButton>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-neutral-700/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
              Email Address *
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
              placeholder="Your company (optional)"
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-white/80 mb-1">
              Experience Level *
            </label>
            <select
              id="experience"
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-neutral-700/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your experience level</option>
              <option value="beginner">Beginner (0-2 years)</option>
              <option value="intermediate">Intermediate (2-5 years)</option>
              <option value="advanced">Advanced (5+ years)</option>
            </select>
          </div>

          <div>
            <label htmlFor="goals" className="block text-sm font-medium text-white/80 mb-1">
              Learning Goals
            </label>
            <textarea
              id="goals"
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 bg-neutral-700/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What do you hope to achieve from this program?"
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
              placeholder="Any dietary restrictions for catered sessions"
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
                "Enroll Now - $899"
              )}
            </WireframeButton>
          </div>

          <p className="text-xs text-white/50 text-center mt-4">
            By enrolling, you agree to our Terms of Service and Privacy Policy.
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
    <h3 className="text-xl font-bold text-white mb-4">Program Details</h3>
    <div className="space-y-4">
      <div className="flex items-start">
        <i className="ri-calendar-line text-blue-400 text-xl mr-3 mt-0.5"></i>
        <div>
          <p className="text-white font-medium">6 Weeks Starting March 15, 2025</p>
          <p className="text-white/70 text-sm">Saturdays, 10:00 AM - 2:00 PM CST</p>
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
          <p className="text-white font-medium">$899 - Early Bird</p>
          <p className="text-white/70 text-sm">Price increases to $1,199 on March 1st</p>
        </div>
      </div>
      <div className="flex items-start">
        <i className="ri-group-line text-blue-400 text-xl mr-3 mt-0.5"></i>
        <div>
          <p className="text-white font-medium">Limited to 30 Participants</p>
          <p className="text-white/70 text-sm">Small cohort for personalized attention</p>
        </div>
      </div>
    </div>

    <div className="mt-6 pt-6 border-t border-white/10">
      <h4 className="text-white font-medium mb-2">What&apos;s Included</h4>
      <ul className="space-y-2 text-white/70 text-sm">
        <li className="flex items-center">
          <i className="ri-check-line text-green-400 mr-2"></i>
          6 intensive workshop sessions
        </li>
        <li className="flex items-center">
          <i className="ri-check-line text-green-400 mr-2"></i>
          Expert instruction from industry leaders
        </li>
        <li className="flex items-center">
          <i className="ri-check-line text-green-400 mr-2"></i>
          Hands-on project work
        </li>
        <li className="flex items-center">
          <i className="ri-check-line text-green-400 mr-2"></i>
          Catered lunch each session
        </li>
        <li className="flex items-center">
          <i className="ri-check-line text-green-400 mr-2"></i>
          Digital resources and templates
        </li>
        <li className="flex items-center">
          <i className="ri-check-line text-green-400 mr-2"></i>
          Certificate of completion
        </li>
      </ul>
    </div>

    <div className="mt-6 pt-6 border-t border-white/10">
      <h4 className="text-white font-medium mb-2">Share this program</h4>
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

const SpeakerCard = ({ speaker, index }: { speaker: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-neutral-800/50 backdrop-blur-sm rounded-lg p-6 border border-white/10 group hover:border-white/20 transition-colors duration-300"
  >
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
        <Image src={speaker.image || "/placeholder.svg"} alt={speaker.name} fill className="object-cover" />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h4 className="text-lg font-bold text-white mb-1">{speaker.name}</h4>
        <p className="text-blue-400 mb-2 text-sm">
          {speaker.role} @ {speaker.company}
        </p>
        <p className="text-white/70 text-sm mb-3 leading-relaxed">{speaker.bio}</p>
        <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
          {speaker.expertise.map((skill: string) => (
            <span key={skill} className="px-2 py-1 bg-white/10 text-white/80 rounded-full text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
)

const WeekCard = ({ week, index }: { week: any; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden group hover:border-white/20 transition-colors duration-300"
    >
      {/* Week Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${week.color} flex items-center justify-center mr-4`}>
              <i className={`${week.icon} text-2xl text-white`}></i>
            </div>
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
            <div className="p-6 space-y-6">
              {/* Topics */}
              <div>
                <h5 className="text-lg font-semibold text-white mb-3">Key Topics</h5>
                <ul className="space-y-2">
                  {week.topics.map((topic: string, topicIndex: number) => (
                    <motion.li
                      key={topicIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: topicIndex * 0.1 }}
                      className="flex items-center text-white/70"
                    >
                      <i className="ri-arrow-right-s-line text-blue-400 mr-2"></i>
                      {topic}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Speakers */}
              <div>
                <h5 className="text-lg font-semibold text-white mb-4">Featured Speakers</h5>
                <div className="space-y-4">
                  {week.speakers.map((speaker: any, speakerIndex: number) => (
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
      answer: "This program is designed for all experience levels. Whether you're a beginner looking to learn the fundamentals or an experienced professional wanting to modernize your workflow, our curriculum adapts to your needs."
    },
    {
      question: "Will sessions be recorded?",
      answer: "Yes, all sessions will be recorded and made available to enrolled participants. You'll have access to recordings for 6 months after the program ends."
    },
    {
      question: "What if I miss a session?",
      answer: "We understand schedules can be challenging. Missed sessions can be made up through recordings, and our instructors offer office hours for additional support."
    },
    {
      question: "Are there any prerequisites?",
      answer: "No specific prerequisites are required. Basic computer literacy and enthusiasm to learn are all you need. We'll provide all necessary tools and resources."
    },
    {
      question: "What tools and software will we use?",
      answer: "We'll cover a variety of modern tools including Figma, various AI platforms, automation tools like Zapier, and development frameworks. Most tools offer free tiers or trial periods."
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes, we offer a full refund if you're not satisfied after the first session. After that, we offer prorated refunds on a case-by-case basis."
    }
  ]

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-neutral-800/50 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden"
        >
          <button
            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <span className="text-white font-medium">{faq.question}</span>
            <motion.i
              className="ri-arrow-down-s-line text-white/70"
              animate={{ rotate: openFAQ === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
          <AnimatePresence>
            {openFAQ === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-white/70 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
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
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
        >
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
              <i className="ri-graduation-cap-line mr-2"></i>
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
              Master the art of turning ideas into reality with AI-powered development tools and modern workflows. 
              A comprehensive 6-week intensive program for creators and innovators.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                <i className="ri-calendar-line mr-1"></i> 6 Weeks • Saturdays
              </div>
              <div className="bg-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                <i className="ri-group-line mr-1"></i> Limited to 30 Participants
              </div>
              <div className="bg-teal-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                <i className="ri-star-line mr-1"></i> Industry Expert Instructors
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <WireframeButton href="#enroll" variant="primary">
                Enroll Now - $899
                <i className="ri-arrow-right-line ml-2"></i>
              </WireframeButton>
              <WireframeButton href="#curriculum" variant="outline">
                View Curriculum
                <i className="ri-book-open-line ml-2"></i>
              </WireframeButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
                description: "Learn systematic approaches to capture requirements and translate ideas into actionable plans."
              },
              {
                icon: "ri-links-line",
                title: "System Integration",
                description: "Master the art of connecting internal and external systems for seamless workflows."
              },
              {
                icon: "ri-magic-line",
                title: "AI-Powered Creation",
                description: "Harness AI tools for content generation, design, and automated distribution at scale."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className={`${feature.icon} text-3xl text-blue-400`}></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
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
              Each week builds upon the previous, taking you from concept to completion with expert guidance and hands-on practice.
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
      <div className="relative">
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
                  <h2 className="text-3xl font-bold text-white mb-6">What You&apos;ll Learn</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      "Requirements capture and analysis",
                      "System architecture design",
                      "API integration strategies",
                      "User experience design principles",
                      "AI prompt engineering",
                      "Content automation workflows",
                      "Multi-channel distribution",
                      "Performance optimization"
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
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Product Managers",
                          description: "Learn to streamline product development with AI-powered workflows"
                        },
                        {
                          title: "Designers & Developers",
                          description: "Integrate AI tools into your creative and development process"
                        },
                        {
                          title: "Entrepreneurs",
                          description: "Build and scale products faster with modern automation"
                        },
                        {
                          title: "Marketing Professionals",
                          description: "Master automated content creation and distribution strategies"
                        }
                      ].map((audience, index) => (
                        <div key={index} className="text-center">
                          <h3 className="text-lg font-semibold text-white mb-2">{audience.title}</h3>
                          <p className="text-white/70 text-sm">{audience.description}</p>
                        </div>
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
                  <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
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
                    "Performance optimization"
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
                        description: "Learn to streamline product development with AI-powered workflows"
                      },
                      {
                        title: "Designers & Developers",
                        description: "Integrate AI tools into your creative and development process"
                      },
                      {
                        title: "Entrepreneurs",
                        description: "Build and scale products faster with modern automation"
                      },
                      {
                        title: "Marketing Professionals",
                        description: "Master automated content creation and distribution strategies"
                      }
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
              <div id="enroll" className="mb-12">
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
      <section className="py-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join 30 ambitious creators and innovators in this intensive 6-week program. 
              Limited spots available - secure your place today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <WireframeButton href="#enroll" variant="primary" className="text-lg px-8 py-4">
                Enroll Now - $899
                <i className="ri-arrow-right-line ml-2"></i>
              </WireframeButton>
              <WireframeButton href="mailto:hello@digitalcanvas.community" variant="secondary" className="text-lg px-8 py-4">
                Have Questions?
                <i className="ri-mail-line ml-2"></i>
              </WireframeButton>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
