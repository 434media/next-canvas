"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { gsap, ScrollTrigger, initializeGSAP, registerPinnedSection, unregisterPinnedSection, registerScrollTrigger, unregisterScrollTrigger } from "../../lib/gsap-config"
import { WireframeBackground } from "./wireframe-background"
import "./ImageUnmaskComponent.css"
import "remixicon/fonts/remixicon.css"
import { redirect } from "next/dist/server/api-utils"

// Initialize GSAP once
initializeGSAP();

// Global reference to horizontal scroller trigger
let horizontalScrollerTrigger: ScrollTrigger | null = null;
let horizontalScrollerEnabled = false;

// Function to set the horizontal scroller trigger reference
export const setHorizontalScrollerTrigger = (trigger: ScrollTrigger) => {
  horizontalScrollerTrigger = trigger;
  console.log("Horizontal scroller trigger registered");
};

const MissionStatement = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const sectionId = "mission-statement";
  const triggerId = "mission-statement-trigger";

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
    // Register this section as pinned
    registerPinnedSection(sectionId);

    // Add scroll listener for better coordination
    const handleScroll = () => {
      if (horizontalScrollerTrigger && !horizontalScrollerEnabled) {
        const missionSection = document.querySelector('.mission-overlay-container');
        if (missionSection) {
          const missionRect = missionSection.getBoundingClientRect();
          // Enable horizontal scroller only when mission section is completely below viewport
          if (missionRect.top > window.innerHeight + 100) { // Add 100px buffer
            horizontalScrollerTrigger.enable();
            horizontalScrollerEnabled = true;
            console.log("Horizontal scroller enabled via scroll listener");
            // Remove the scroll listener once enabled
            window.removeEventListener('scroll', handleScroll);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      const svg = document.querySelector('#svg') as SVGSVGElement
      const circle = document.querySelector('#circle') as SVGCircleElement
      
      if (!svg || !circle) {
        console.warn('SVG or circle element not found', { svg: !!svg, circle: !!circle })
        return
      }
      
      console.log('GSAP animation setup successful', { svg, circle })
      
      // Start with a small circle radius
      const startRadius = 0
      // End with a large circle radius - will be calculated
      let maxRadius = 1000

      // Set initial circle radius
      gsap.set(circle, {
        attr: { r: startRadius }
      })

      // Set initial rim circle radius
      const rimCircle = document.querySelector('#rim-circle') as SVGCircleElement
      if (rimCircle) {
        gsap.set(rimCircle, {
          attr: { r: startRadius } // Rim is 5px larger than mask circle
        })
      }

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
              gsap.set([circle, rimCircle], {
                attr: { r: startRadius }
              })
            }
            // Log when animation is complete
            if (self.progress >= 0.99) {
              console.log("Mission statement animation completed");
            }
            // Log progress for debugging
            if (self.progress % 0.25 < 0.01) {
              console.log(`Mission statement progress: ${Math.round(self.progress * 100)}%`);
            }
            
            // Don't enable horizontal scroller during animation - only after it's completely done
          },
          onLeave: () => {
            console.log("Mission statement left viewport");
            // Only enable horizontal scroller when mission statement is completely out of view
            if (horizontalScrollerTrigger && !horizontalScrollerEnabled) {
              // Check if we're actually past the mission statement section
              const missionSection = document.querySelector('.mission-overlay-container');
              if (missionSection) {
                const missionRect = missionSection.getBoundingClientRect();
                // Only enable if the mission section is completely below the viewport
                if (missionRect.top > window.innerHeight) {
                  horizontalScrollerTrigger.enable();
                  horizontalScrollerEnabled = true;
                  console.log("Horizontal scroller trigger enabled - mission statement completely out of view");
                } else {
                  console.log("Mission statement still partially in view - waiting to enable horizontal scroller");
                }
              }
            }
          },
          onEnterBack: () => {
            console.log("Mission statement re-entered viewport");
            // Disable horizontal scroller when going back up
            if (horizontalScrollerTrigger) {
              horizontalScrollerTrigger.disable();
              horizontalScrollerEnabled = false;
              console.log("Horizontal scroller trigger disabled");
            }
          }
        }
      })
      
      // Register the ScrollTrigger
      const scrollTrigger = tl.scrollTrigger;
      if (scrollTrigger) {
        registerScrollTrigger(triggerId, scrollTrigger);
      }
      
      // Add animation to increase both circle radii with buffer
      tl.to([circle, rimCircle], {
        attr: { r: (i) => i === 0 ? maxRadius : maxRadius + 5 },
        ease: "power2.out",
        duration: 0.6, // Faster duration for quicker growth
        delay: 0.1 // 10% delay to create buffer
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
      
      // Initial resize
      resize()
      
      // Cleanup function
      return () => {
        window.removeEventListener("resize", resize)
        window.removeEventListener("load", resize)
        window.removeEventListener('scroll', handleScroll)
        tl.kill()
        unregisterPinnedSection(sectionId)
        unregisterScrollTrigger(triggerId)
      }
    }, 100) // Small delay to ensure DOM is ready
    
    return () => {
      clearTimeout(timer)
    }
  }, [])

    return (
    <section className="relative min-h-screen overflow-hidden" ref={containerRef}>
      {/* Wireframe Background */}
      <WireframeBackground />

      {/* Overlay Container - Mission Statement over 3D Scroll Component */}
      <div className="relative mission-overlay-container min-h-screen">
        {/* 3D Scroll Effect Section (Background Layer) - Masked by circle */}
        <div className="relative z-0 properties-section" style={{
          position: 'absolute',
          inset: '0',
          width: '100%',
          height: '100%'
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

        {/* SVG Mask - Only for the text layer */}
        <svg id="svg" className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <mask id="overlay-mask">
              <rect width="100%" height="100%" fill="black"></rect>
              <circle
                id="circle"
                cx="10%"
                cy="50%"
                r="10"
                fill="white"
              ></circle>
            </mask>

            <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="white"
            opacity="0"
            mask="url(#overlay-mask)"
          ></rect>
          {/* Colored rim around the circle */}
          <circle
            id="rim-circle"
            cx="10%"
            cy="50%"
            r="15"
            fill= "none"
            stroke="url(#circleGradient)"
            strokeWidth="3"
            opacity="0.8"
          ></circle>
        </svg>

        {/* Mission Statement Content (Foreground Layer) - Masked */}
        <div
          ref={textRef}
          className="relative z-20 flex items-center justify-start min-h-screen px-4"
          style={{
            mask: 'url(#overlay-mask)',
            WebkitMask: 'url(#overlay-mask)',
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat'
          }}
        >
          <div className="text-left max-w-5xl">
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

          </div>
        </div>
      </div>

      {/* Additional scroll space for the effect */}
      <div className="h-screen"></div>
    </section>
  )
}

export default MissionStatement
