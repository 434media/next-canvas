"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { WireframeBackground } from "./wireframe-background"
import ImageUnmaskComponent from "./3d-scroll"
import "./ImageUnmaskComponent.css"
import "remixicon/fonts/remixicon.css"

gsap.registerPlugin(ScrollTrigger)

const MissionStatement = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)


  // Grid items for the 3D animation
  const gridItems = [
    "Innovation", "Creativity", "Community", "Technology", "Art", "Growth",
    "Collaboration", "Excellence", "Impact", "Vision", "Leadership", "Transformation",
    "Connection", "Inspiration", "Progress", "Excellence", "Partnership", "Success",
    "Development", "Advancement", "Empowerment", "Discovery", "Achievement", "Excellence",
    "Innovation", "Creativity", "Community", "Technology", "Art", "Growth",
    "Collaboration", "Excellence", "Impact", "Vision", "Leadership", "Transformation",
    "Connection", "Inspiration", "Progress", "Excellence", "Partnership", "Success",
    "Development", "Advancement", "Empowerment", "Discovery", "Achievement", "Excellence"
  ]


  useEffect(() => {
    const svg = document.querySelector('#svg') as SVGSVGElement
    const circle = document.querySelector('#circle') as SVGCircleElement
    
    if (!svg || !circle) return
    
    // Start with a small circle radius
    const startRadius = 10
    // End with a large circle radius - will be calculated
    let maxRadius = 1000

    // Set initial circle radius
    gsap.set(circle, {
      attr: { r: startRadius }
    })

    // Create the timeline animation
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".overlay-container",
        pin: true,
        start: "top top",
        end: "+=2000",
        scrub: 1,
        markers: false,
      }
    })
    
    // Add animation to increase circle radius
    tl.to(circle, {
      attr: { r: () => maxRadius },
      ease: "power1.inOut",
      duration: 1
    })

    // Function to handle resizing
    function resize() {
      if (!svg) return
      
      // Calculate container dimensions
      const r = svg.getBoundingClientRect()
      const rectWidth = r.width + 4 // pad
      const rectHeight = r.height + 4 // pad
      
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
    
    // Set a timeout to ensure the DOM is fully rendered
    const timer = setTimeout(() => {
      resize()
    }, 500)
    
    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("load", resize)
      clearTimeout(timer)
      tl.kill()
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden" ref={containerRef}>
      {/* Wireframe Background */}
      <WireframeBackground />

      {/* Text Section */}
      <div
        ref={textRef}
        className="relative z-20 flex items-center justify-center min-h-screen px-4"
      >
        <div className="text-center max-w-5xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
              DIFFERENT AVENUES
            </span>
          </h1>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 via-teal-400 to-blue-400 text-transparent bg-clip-text">
              SAME MISSION
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 mt-8 max-w-2xl mx-auto leading-relaxed">
            Uniting diverse creative pathways under a shared vision of innovation and impact
          </p>
                  </div>
        </div>

      {/* 3D Scroll Effect Section */}
      <div className="relative overlay-container">
        {/* Background layer with 3D grid - Will be masked */}
        <div className="relative z-0 properties-section" style={{
          mask: 'url(#overlay-mask)',
          WebkitMask: 'url(#overlay-mask)',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat'
        }}>
          {/* 3D Grid Animation behind the mask */}
          <div className="stuck-grid">
            {gridItems.map((item, index) => (
              <div 
                key={index} 
                className={`grid-item${index === 10 ? " special" : ""}`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* SVG Mask that will be applied to the entire overlay container */}
        <svg id="svg" className="w-full h-full pointer-events-none">
          <defs>
            <mask id="overlay-mask">
              <rect width="100%" height="100%" fill="white"></rect>
              <circle
                id="circle"
                cx="50%"
                cy="50%"
                r="10"
                fill="black"
              ></circle>
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="white"
            opacity="0"
            mask="url(#overlay-mask)"
          ></rect>
        </svg>
      </div>

      {/* Additional scroll space for the effect */}
      {/* <div className="h-screen"></div> */}
    </section>
  )
}

export default MissionStatement
