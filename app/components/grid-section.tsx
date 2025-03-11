"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "motion/react"

const items = [
  {
    title: "UX/UI Design",
    description: "Figma, Sketch, Adobe XD, InVision, Framer",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/ui.avif",
  },
  {
    title: "Creative Coding",
    description: "Three.js, p5.js, D3.js, GSAP, Motion One",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/three.png",
  },
  {
    title: "Illustration",
    description: "Adobe Illustrator, Procreate, Affinity Designer",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/adobe.png",
  },
  {
    title: "3D AR/VR",
    description: "Unity, Unreal Engine, Project Neo, A-Frame, ARKit, ARCore",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/fiber.png",
  },
  {
    title: "Motion Graphics",
    description: "Adobe After Effects, Cinema 4D, Blender",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/UV.png",
  },
  {
    title: "Photography",
    description: "Adobe Lightroom, Capture One, DxO PhotoLab",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/sa.jpg",
  },
  {
    title: "Videography",
    description: "Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/cutpro.png",
  },
]

interface Item {
  title: string
  description: string
  image: string
}

const GridItem = ({
  item,
  isExpanded,
  onHover,
  isMobile,
}: {
  item: Item
  isExpanded: boolean
  onHover: (expanded: boolean) => void
  isMobile: boolean
}) => {
  return (
    <motion.li
      layout
      onHoverStart={() => !isMobile && onHover(true)}
      onHoverEnd={() => !isMobile && onHover(false)}
      className="relative overflow-hidden rounded-xl shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-400"
      style={{
        cursor: isMobile ? "default" : "pointer",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-800"
        initial={false}
        animate={{
          opacity: isExpanded ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Image background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${item.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={false}
        animate={{
          scale: isExpanded ? 1.1 : 1,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Dark overlay for better text readability when expanded */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        initial={false}
        animate={{
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Closed state content (vertical title and icon) */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end items-center p-4"
        initial={false}
        animate={{
          opacity: isExpanded ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <h3
          className="font-mono text-base sm:text-lg text-white mb-2 font-semibold"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          {item.title.toUpperCase()}
        </h3>
      </motion.div>

      {/* Expanded state content */}
      <motion.article
        className="relative z-10 w-full h-full flex flex-col justify-end p-6"
        initial={false}
        animate={{
          x: isExpanded ? "0%" : "100%",
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.h2
          className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
          initial={false}
          animate={{ opacity: 1 }}
        >
          {item.title}
        </motion.h2>
        <motion.p
          className="text-sm sm:text-base leading-relaxed text-white font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
          initial={false}
          animate={{
            y: isExpanded ? 0 : 20,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
        >
          {item.description}
        </motion.p>
      </motion.article>

      {/* Wireframe border */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
      />
    </motion.li>
  )
}

const GridSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number>(0)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (containerRef.current && !isMobile) {
      const columns = items.map((_, index) => (index === expandedIndex ? "4fr" : "1fr")).join(" ")
      containerRef.current.style.gridTemplateColumns = columns
    } else if (containerRef.current && isMobile) {
      containerRef.current.style.gridTemplateColumns = "1fr"
    }
  }, [expandedIndex, isMobile])

  return (
    <section className="py-24 bg-neutral-900" aria-labelledby="grid-section-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 id="grid-section-title" className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Your Creative{" "}
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-purple-500 text-transparent bg-clip-text">
              Toolkit
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-neutral-300 max-w-3xl mx-auto">
            Explore the cutting-edge tools and technologies used by our community to bring ideas to life.
          </p>
        </motion.div>
        <motion.ul
          ref={containerRef}
          className="grid gap-4 sm:gap-6 list-none p-0 w-full max-w-[1200px] mx-auto"
          style={{
            height: isMobile ? "auto" : "600px",
            gridAutoRows: isMobile ? "200px" : undefined,
            transition: "all 0.3s ease-in-out",
          }}
        >
          {items.map((item, index) => (
            <GridItem
              key={item.title}
              item={item}
              isExpanded={isMobile ? true : index === expandedIndex}
              onHover={(expanded) => setExpandedIndex(expanded ? index : 0)}
              isMobile={isMobile}
            />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default GridSection

