"use client"

import React, { useEffect, useRef } from "react"
import { gsap, ScrollTrigger, initializeGSAP } from "@/lib/gsap-config"
import Box from "./box"

export default function AnimatedLanding() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mainBoxRef = useRef<HTMLDivElement>(null)
  const boxesRef = useRef<HTMLDivElement>(null)
  const welcomeTextRef = useRef<HTMLHeadingElement>(null)
  const discoverTextRef = useRef<HTMLHeadingElement>(null)
  const mediaTextRef = useRef<HTMLHeadingElement>(null)

  // Define the new layout structure with three stages
  const layoutConfig = {
    gutter: 1, // vw - consistent gap between all boxes
    // Initial large center box dimensions
    initialCenterWidth: 56, // vw
    initialCenterHeight: 84, // vh
    // Medium center box dimensions (transition stage)
    mediumCenterWidth: 32, // vw
    mediumCenterHeight: 60, // vh
    // Final center box dimensions (after animation)
    finalCenterWidth: 12, // vw
    finalCenterHeight: 12, // vh
  }

  // Calculate positions and sizes based on the new layout rules
  const calculateBoxLayout = () => {
    const gutter = layoutConfig.gutter
    // Use final dimensions for layout calculations
    const centerSize = (layoutConfig.finalCenterHeight)
    const centerHeight = layoutConfig.finalCenterHeight
    const centerWidth = layoutConfig.finalCenterWidth
    
    // Available space
    const availableWidth = 50
    const availableHeight = 100
    
    // Side stack dimensions (left and right columns)
    const sideStackWidth = (availableWidth - centerWidth) / 2
    const sideBoxHeight = availableHeight / 2
    
    // Center region dimensions
    const centerRegionWidth = availableWidth - sideStackWidth
    const centerRegionHeight = availableHeight - (centerHeight * 0.6)
    
    // Calculate positions
    return {
      // Side stacks - left column
      red: {
        x: -50 + (sideStackWidth / 2) + gutter,
        y: -50 + (sideBoxHeight / 2) + (gutter * 0.25),
        width: sideStackWidth,
        height: sideBoxHeight - (gutter * 1.5),
      },
      purple: {
        x: -50 + (sideStackWidth / 2) + gutter,
        y: 50 - (sideBoxHeight / 2) - (gutter * 0.25),
        width: sideStackWidth,
        height: sideBoxHeight - (gutter * 1.5),
      },
      // Side stacks - right column
      green: {
        x: 50 - (sideStackWidth / 2) - gutter,
        y: -50 + (sideBoxHeight / 2) + (gutter * 0.25),
        width: sideStackWidth,
        height: sideBoxHeight - (gutter * 1.5),
      },
      cyan: {
        x: 50 - (sideStackWidth / 2) - gutter,
        y: (sideBoxHeight / 2) - (gutter * 0.25),
        width: sideStackWidth,
        height: sideBoxHeight - (gutter * 1.5),
      },
      // Center region - top and bottom
      orange: {
        x:-1 *((50 - sideStackWidth - (2 * gutter) - (centerWidth/2)) / 2 ),
        y: (-50 - (centerHeight / 2)) / 2 ,
        width: availableWidth + (centerWidth / 2) - (gutter * 2) - sideStackWidth,
        height: sideBoxHeight - (centerHeight / 2) - (gutter * 2),
      },
      pink: {
        x:((50 - sideStackWidth - (2 * gutter) - (centerWidth/2)) / 2 ),
        y: (50 + (centerHeight / 2)) / 2 ,
        width: availableWidth + (centerWidth / 2) - (gutter * 2) - sideStackWidth,
        height: sideBoxHeight - (centerHeight / 2) - (gutter * 2),
      },
      // Between stacks - top and bottom
      blue: {
        x: (centerWidth / 2) + (50 - sideStackWidth - (gutter) - (centerWidth/2)) / 2,
        y: -1 * ((50 - (centerHeight / 2) - gutter) / 2) ,
        width: 50 - sideStackWidth - (centerWidth / 2) - (gutter * 3),
        height: sideBoxHeight + (centerHeight/2) - (gutter),
      },
      yellow: {
        x: -1 * ((centerWidth / 2) + (50 - sideStackWidth - (gutter) - (centerWidth/2)) / 2),
        y: (50 - (centerHeight / 2) - gutter) / 2 ,
        width: 50 - sideStackWidth - (centerWidth / 2) - (gutter * 3),
        height: sideBoxHeight + (centerHeight/2) - (gutter),
      },
      // Center box
      center: {
        x: 0,
        y: 0,
        width: centerSize,
        height: centerSize,
      },
    }
  }

  const boxLayout = calculateBoxLayout()

  useEffect(() => {
    // Initialize GSAP using the centralized configuration
    initializeGSAP()

    const container = containerRef.current
    const mainBox = mainBoxRef.current
    const boxesContainer = boxesRef.current
    const welcomeText = welcomeTextRef.current
    const discoverText = discoverTextRef.current
    const mediaText = mediaTextRef.current

    if (!container || !mainBox || !boxesContainer || !welcomeText || !discoverText || !mediaText) return

    // Define box order to match the layout
    const boxOrder = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan']

    // Set initial text states
    gsap.set(discoverText, { opacity: 0 })
    gsap.set(mediaText, { opacity: 0 })

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "animated-landing",
        trigger: container,
        start: "top top",
        end: "+=1200",
        scrub: 0.4,
        pin: true,
        anticipatePin: 1,
        preventOverlaps: true, // ← ADD THIS
      }
    })

    // Stage 1: Large to Medium (0-0.3)
    tl.to(
      mainBox,
      {
        width: `${layoutConfig.mediumCenterWidth}vw`,
        height: `${layoutConfig.mediumCenterHeight}vh`,
        duration: 0.3,
        ease: "power2.inOut",
      },
      0,
    )

    // Stage 2: Text transition - Welcome to Discover More (0.3-0.4)
    tl.to(
      welcomeText,
      {
        opacity: 0,
        duration: 0.1,
        ease: "power2.inOut",
      },
      0.2,
    )
    .to(
      discoverText,
      {
        opacity: 1,
        duration: 0.1,
        ease: "power2.inOut",
      },
      0.2,
    )

    // Stage 3: Medium to Small (0.4-0.6)
    tl.to(
      mainBox,
      {
        width: `${layoutConfig.finalCenterWidth}vw`,
        height: `${layoutConfig.finalCenterHeight}vh`,
        duration: 1,
        ease: "power2.inOut",
      },
      0.4,
    )

    // Stage 3.5: Text transition - Discover More to 434 Media (0.5-0.6)
    tl.to(
      discoverText,
      {
        opacity: 0,
        duration: 0.1,
        ease: "power2.inOut",
      },
      0.8,
    )
    .to(
      mediaText,
      {
        opacity: 1,
        duration: 0.1,
        ease: "power2.inOut",
      },
      0.8,
    )

    // Stage 4: Surrounding boxes animate in (0.6-1.0)
    gsap.utils.toArray('.box').forEach((box, index) => {
      const boxKey = boxOrder[index]
      const layout = boxLayout[boxKey as keyof typeof boxLayout]
      const boxElement = box as HTMLElement

      // Set initial position (off-screen, scaled from final position)
      gsap.set(boxElement, {
        willChange: "transform, opacity",
        transform: `translate(${layout.x * 3}vw, ${layout.y * 3}vh) scale(0.8)`,
        transformOrigin: '50% 50%',
        x: `${layout.x * 3}vw`,
        y: `${layout.y * 3}vh`,
        width: `${layout.width}vw`,
        height: `${layout.height}vh`,
        opacity: 0,
        scale: 0.8,
      })

      // Animate to final position
      tl.to(
        boxElement,
        {
          x: `${layout.x}vw`,
          y: `${layout.y}vh`,
          width: `${layout.width}vw`,
          height: `${layout.height}vh`,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          immediateRender: false
        },
        0.6 + index * 0.05,
      )
    })

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section className="relative w-full bg-white">
      {/* Spacer to allow scrolling */}
      <div className="h-screen"></div>

      {/* Animation container */}
      <div ref={containerRef} className="h-screen w-full flex items-center justify-center">
        {/* Main central box */}
        <div
          ref={mainBoxRef}
          className="relative z-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg"
          style={{
            width: `${layoutConfig.initialCenterWidth}vw`,
            height: `${layoutConfig.initialCenterHeight}vh`,
          }}
        >
          {/* Welcome text (initial) */}
          <h2 
            ref={welcomeTextRef}
            className="absolute text-white text-4xl font-bold text-center px-4"
            style={{ opacity: 1 }}
          >
            Welcome
          </h2>
          
          {/* Discover text (transition) */}
          <h2 
            ref={discoverTextRef}
            className="absolute text-white text-3xl font-bold text-center px-4"
            style={{ opacity: 0 }}
          >
            Discover More
          </h2>

          {/* 434 Media text (final) */}
          <h2 
            ref={mediaTextRef}
            className="absolute text-white text-2xl font-bold text-center px-4"
            style={{ opacity: 0 }}
          >
            434 Media
          </h2>
        </div>

        {/* Secondary boxes that will slide in - only 8 boxes, no center */}
        <div ref={boxesRef} className="absolute inset-0 flex items-center justify-center">
          <Box color="bg-red-400" title="Red" />
          <Box color="bg-blue-400" title="Blue" />
          <Box color="bg-green-400" title="Green" />
          <Box color="bg-yellow-400" title="Yellow" />
          <Box color="bg-orange-400" title="Orange" />
          <Box color="bg-purple-400" title="Purple" />
          <Box color="bg-pink-400" title="Pink" />
          <Box color="bg-cyan-400" title="Cyan" />
        </div>
      </div>

    </section>
  )
} 