"use client"

import { useEffect, useRef } from "react"
import {
  gsap,
  ScrollTrigger,
  initializeGSAP,
  registerPinnedSection,
  unregisterPinnedSection,
  registerScrollTrigger,
  unregisterScrollTrigger,
} from "../lib/gsap-config"
import "./ImageUnmaskComponent.css"
import { useScrollTriggerHeight } from "../hooks/useScrollTriggerHeight"
import { CreativeLayer } from "./creative-layer"

// Initialize GSAP once
initializeGSAP()

// Global reference to horizontal scroller trigger
let horizontalScrollerTrigger: ScrollTrigger | null = null
let horizontalScrollerEnabled = false

// Function to set the horizontal scroller trigger reference
export const setHorizontalScrollerTrigger = (trigger: ScrollTrigger) => {
  horizontalScrollerTrigger = trigger
  console.log("Horizontal scroller trigger registered")
}

const MissionStatement = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const creativeLayerRef = useRef<HTMLDivElement>(null)
  const sectionId = "mission-statement"
  const triggerId = "mission-statement-trigger"

  const colorParticles = [
    { color: "#FF6B6B", size: "w-6 h-6", delay: 0 },
    { color: "#4ECDC4", size: "w-8 h-8", delay: 0.1 },
    { color: "#45B7D1", size: "w-5 h-5", delay: 0.2 },
    { color: "#96CEB4", size: "w-7 h-7", delay: 0.3 },
    { color: "#FFEAA7", size: "w-6 h-6", delay: 0.4 },
    { color: "#DDA0DD", size: "w-8 h-8", delay: 0.5 },
    { color: "#98D8C8", size: "w-5 h-5", delay: 0.6 },
    { color: "#F7DC6F", size: "w-7 h-7", delay: 0.7 },
    { color: "#BB8FCE", size: "w-6 h-6", delay: 0.8 },
    { color: "#85C1E9", size: "w-8 h-8", delay: 0.9 },
    { color: "#F8C471", size: "w-5 h-5", delay: 1.0 },
    { color: "#82E0AA", size: "w-7 h-7", delay: 1.1 },
    { color: "#F1948A", size: "w-6 h-6", delay: 1.2 },
    { color: "#AED6F1", size: "w-8 h-8", delay: 1.3 },
    { color: "#A9DFBF", size: "w-5 h-5", delay: 1.4 },
    { color: "#F9E79F", size: "w-7 h-7", delay: 1.5 },
    { color: "#D7BDE2", size: "w-6 h-6", delay: 1.6 },
    { color: "#A3E4D7", size: "w-8 h-8", delay: 1.7 },
    { color: "#FAD7A0", size: "w-5 h-5", delay: 1.8 },
    { color: "#D5A6BD", size: "w-7 h-7", delay: 1.9 },
    { color: "#87CEEB", size: "w-6 h-6", delay: 2.0 },
    { color: "#FFB6C1", size: "w-8 h-8", delay: 2.1 },
    { color: "#20B2AA", size: "w-5 h-5", delay: 2.2 },
    { color: "#FF7F50", size: "w-7 h-7", delay: 2.3 },
    { color: "#9370DB", size: "w-6 h-6", delay: 2.4 },
    { color: "#FF1493", size: "w-8 h-8", delay: 2.5 },
    { color: "#00CED1", size: "w-5 h-5", delay: 2.6 },
    { color: "#FF4500", size: "w-7 h-7", delay: 2.7 },
    { color: "#8A2BE2", size: "w-6 h-6", delay: 2.8 },
    { color: "#00FA9A", size: "w-8 h-8", delay: 2.9 },
    { color: "#FFD700", size: "w-5 h-5", delay: 3.0 },
    { color: "#DC143C", size: "w-7 h-7", delay: 3.1 },
    { color: "#00BFFF", size: "w-6 h-6", delay: 3.2 },
    { color: "#ADFF2F", size: "w-8 h-8", delay: 3.3 },
    { color: "#FF69B4", size: "w-5 h-5", delay: 3.4 },
    { color: "#1E90FF", size: "w-7 h-7", delay: 3.5 },
    { color: "#32CD32", size: "w-6 h-6", delay: 3.6 },
    { color: "#FF8C00", size: "w-8 h-8", delay: 3.7 },
    { color: "#BA55D3", size: "w-5 h-5", delay: 3.8 },
    { color: "#00FF7F", size: "w-7 h-7", delay: 3.9 },
    { color: "#FF6347", size: "w-6 h-6", delay: 4.0 },
    { color: "#4169E1", size: "w-8 h-8", delay: 4.1 },
    { color: "#7FFF00", size: "w-5 h-5", delay: 4.2 },
    { color: "#DA70D6", size: "w-7 h-7", delay: 4.3 },
    { color: "#00FFFF", size: "w-6 h-6", delay: 4.4 },
    { color: "#FFA500", size: "w-8 h-8", delay: 4.5 },
    { color: "#9932CC", size: "w-5 h-5", delay: 4.6 },
    { color: "#00FF00", size: "w-7 h-7", delay: 4.7 },
    { color: "#FF0000", size: "w-6 h-6", delay: 4.8 },
    { color: "#0000FF", size: "w-8 h-8", delay: 4.9 },
  ]

  // Calculate dynamic height based on ScrollTrigger
  const sectionHeight = useScrollTriggerHeight({
    triggerId: "mission-statement-trigger",
    endValue: "+=3000",
    fallbackHeight: "400vh",
  })

  useEffect(() => {
    // Register this section as pinned
    registerPinnedSection(sectionId)

    // Add scroll listener for better coordination
    const handleScroll = () => {
      if (horizontalScrollerTrigger && !horizontalScrollerEnabled) {
        const missionSection = document.querySelector(".mission-overlay-container")
        if (missionSection) {
          const missionRect = missionSection.getBoundingClientRect()
          // Enable horizontal scroller only when mission section is completely below viewport
          if (missionRect.top > window.innerHeight + 100) {
            // Add 100px buffer
            horizontalScrollerTrigger.enable()
            horizontalScrollerEnabled = true
            console.log("Horizontal scroller enabled via scroll listener")
            // Remove the scroll listener once enabled
            window.removeEventListener("scroll", handleScroll)
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      const svg = document.querySelector("#svg") as SVGSVGElement
      const circle = document.querySelector("#circle") as SVGCircleElement
      const creativeLayerElement = creativeLayerRef.current

      if (!svg || !circle || !creativeLayerElement) {
        console.warn("Required elements not found", {
          svg: !!svg,
          circle: !!circle,
          creativeLayer: !!creativeLayerElement,
        })
        return
      }

      console.log("GSAP color feeding animation setup successful")

      // Start with a small circle radius
      const startRadius = 0
      // End with a large circle radius - will be calculated
      let maxRadius = 1000

      // Set initial circle radius
      gsap.set(circle, {
        attr: { r: startRadius },
      })

      const particles = document.querySelectorAll(".color-particle")

      particles.forEach((particle, index) => {
        const angle = (index / particles.length) * Math.PI * 2
        const distance = 400 + Math.random() * 300 // Larger spread
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance

        gsap.set(particle, {
          x: x,
          y: y,
          scale: 1,
          opacity: 1,
        })
      })

      gsap.set(creativeLayerElement, {
        scale: 1,
        opacity: 1,
      })

      // Create the timeline animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mission-overlay-container",
          pin: true,
          anticipatePin: 1,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          markers: false,
          onUpdate: (self) => {
            // Add buffer - don't start animation until 10% scroll progress
            if (self.progress < 0.1) {
              gsap.set(circle, {
                attr: { r: startRadius },
              })
            }
            // Log when animation is complete
            if (self.progress >= 0.99) {
              console.log("Mission statement animation completed")
            }
            // Log progress for debugging
            if (self.progress % 0.25 < 0.01) {
              console.log(`Mission statement progress: ${Math.round(self.progress * 100)}%`)
            }
          },
          onLeave: () => {
            console.log("Mission statement left viewport")
            if (horizontalScrollerTrigger) {
              horizontalScrollerTrigger.disable()
              horizontalScrollerEnabled = false
              console.log("Horizontal scroller trigger disabled")
            }
          },
          onEnterBack: () => {
            console.log("Mission statement re-entered viewport")
            if (horizontalScrollerTrigger) {
              horizontalScrollerTrigger.disable()
              horizontalScrollerEnabled = false
              console.log("Horizontal scroller trigger disabled")
            }
          },
        },
      })

      // Register the ScrollTrigger
      const scrollTrigger = tl.scrollTrigger
      if (scrollTrigger) {
        registerScrollTrigger(triggerId, scrollTrigger)
      }

      particles.forEach((particle, index) => {
        const colorData = colorParticles[index % colorParticles.length]
        tl.to(
          particle,
          {
            x: 0,
            y: 0,
            scale: 0.2,
            opacity: 0,
            ease: "power2.in",
            duration: 0.8,
          },
          colorData.delay * 0.1, // Faster sequence
        )
      })

      tl.to(
        creativeLayerElement,
        {
          scale: 0.3,
          opacity: 0.8,
          ease: "power2.out",
          duration: 1.5,
        },
        0.5, // Start shrinking as colors are being absorbed
      )

      tl.to(
        creativeLayerElement,
        {
          scale: 0,
          opacity: 0,
          ease: "power2.in",
          duration: 0.8,
        },
        2.0, // Near the end of the animation
      )

      // Add animation to increase circle radius for the mask reveal
      tl.to(
        circle,
        {
          attr: { r: maxRadius },
          ease: "power2.out",
          duration: 0.6,
          delay: 0.1,
        },
        2.5, // After creative layer disappears
      )

      // Function to handle resizing
      function resize() {
        if (!svg) return

        // Calculate container dimensions
        const r = svg.getBoundingClientRect()
        const rectWidth = r.width + 4
        const rectHeight = r.height + 4

        // Calculate maximum radius (diagonal of the container)
        const dx = rectWidth / 2
        const dy = rectHeight / 2
        maxRadius = Math.sqrt(dx * dx + dy * dy) * 2

        // Reset timeline and refresh ScrollTrigger
        tl.invalidate()
        ScrollTrigger.refresh()
      }

      // Add event listeners
      window.addEventListener("resize", resize)
      window.addEventListener("load", resize)

      // Initial resize
      resize()

      // Cleanup function
      return () => {
        window.removeEventListener("resize", resize)
        window.removeEventListener("load", resize)
        window.removeEventListener("scroll", handleScroll)
        tl.kill()
        unregisterPinnedSection(sectionId)
        unregisterScrollTrigger(triggerId)
      }
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-white" ref={containerRef}>
      {/* Overlay Container - Mission Statement over Color Feeding */}
      <div className="relative mission-overlay-container min-h-screen">
        <div
          className="relative z-0 flex items-center justify-center"
          style={{
            position: "absolute",
            inset: "0",
            width: "100%",
            height: "100%",
          }}
        >
          {colorParticles.map((particle, index) => (
            <div
              key={index}
              className={`color-particle absolute rounded-full ${particle.size} opacity-90`}
              style={{
                backgroundColor: particle.color,
                boxShadow: `0 0 30px ${particle.color}60, 0 0 60px ${particle.color}30`,
              }}
            />
          ))}
        </div>

        {/* SVG Mask - Only for the text layer */}
        <svg id="svg" className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <mask id="overlay-mask">
              <rect width="100%" height="100%" fill="black"></rect>
              <circle id="circle" cx="50%" cy="50%" r="10" fill="white"></circle>
            </mask>

            <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="25%" stopColor="#4ECDC4" />
              <stop offset="50%" stopColor="#45B7D1" />
              <stop offset="75%" stopColor="#FFEAA7" />
              <stop offset="100%" stopColor="#DDA0DD" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="white" opacity="0" mask="url(#overlay-mask)"></rect>
        </svg>

        {/* Mission Statement Content (Foreground Layer) - Masked */}
        <div
          ref={textRef}
          className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
          style={{
            mask: "url(#overlay-mask)",
            WebkitMask: "url(#overlay-mask)",
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <div className="w-full max-w-4xl mx-auto">
            <div ref={creativeLayerRef}>
              <CreativeLayer />
            </div>
          </div>
        </div>
      </div>

      {/* Additional scroll space for the effect */}
      <div className="h-screen"></div>
    </section>
  )
}

export default MissionStatement
