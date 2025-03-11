"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useState } from "react"

export const WireframeBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Grid Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to bottom right, rgba(200, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom right, rgba(200, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "center",
          y: backgroundY,
        }}
      />

      {/* Animated Lines */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(200, 255, 255, 0.1), transparent 50%)`,
        }}
        transition={{ type: "spring", damping: 15 }}
      />

      {/* Decorative Elements */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
        <motion.path
          d="M0,100 Q400,150 800,100 T1600,100"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.path
          d="M0,200 Q400,250 800,200 T1600,200"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </svg>
    </div>
  )
}

