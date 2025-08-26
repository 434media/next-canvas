"use client"

import React, { useEffect, useRef } from "react"
import { gsap, ScrollTrigger, initializeGSAP } from "@/lib/gsap-config"
import Box from "./box"
import { useScrollTriggerHeight } from '../hooks/useScrollTriggerHeight'

export default function AnimatedLanding() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mainBoxRef = useRef<HTMLDivElement>(null)
  const boxesRef = useRef<HTMLDivElement>(null)
  const welcomeTextRef = useRef<HTMLHeadingElement>(null)
  const discoverTextRef = useRef<HTMLHeadingElement>(null)
  const mediaTextRef = useRef<HTMLHeadingElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const reverseOneTextRef = useRef<HTMLHeadingElement>(null)
  const reverseTwoTextRef = useRef<HTMLHeadingElement>(null)

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

  // Calculate dynamic height based on ScrollTrigger
  const sectionHeight = useScrollTriggerHeight({
    triggerId: "animated-landing",
    endValue: "+=3000",
    fallbackHeight: "500vh"
  })

  useEffect(() => {
    // Initialize GSAP using the centralized configuration
    initializeGSAP()

    const container = containerRef.current
    const mainBox = mainBoxRef.current
    const boxesContainer = boxesRef.current
    const welcomeText = welcomeTextRef.current
    const discoverText = discoverTextRef.current
    const mediaText = mediaTextRef.current
    const background = backgroundRef.current
    const reverseOneText = reverseOneTextRef.current
    const reverseTwoText = reverseTwoTextRef.current

    if (!container || !mainBox || !boxesContainer || !welcomeText || !discoverText || !mediaText || !background || !reverseOneText || !reverseTwoText) return

    // Check for saved scroll position
    const savedY = sessionStorage.getItem("saved-scroll")

    // Define box order to match the layout
    const boxOrder = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan']

    // Set initial text states
    gsap.set(discoverText, { opacity: 0 })
    gsap.set(mediaText, { opacity: 0 })
    gsap.set(background, { backgroundColor: 'transparent' })
    gsap.set(reverseOneText, { opacity: 0 })
    gsap.set(reverseTwoText, { opacity: 0 })

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "animated-landing",
        trigger: container,
        start: "top top",
        end: "+=3000", // Extended to accommodate reverse animation with buffer
        scrub: 0.4,
        pin: true,
        anticipatePin: 1,
        preventOverlaps: true,
        onRefresh: () => {
          // Restore scroll position after ScrollTrigger is fully initialized
          if (savedY !== null) {
            setTimeout(() => {
              window.scrollTo({
                top: parseInt(savedY, 10),
                behavior: "instant",
              })
              sessionStorage.removeItem("saved-scroll")
            }, 100)
          }
        }
      }
    })

    // Stage 1: Large to Medium (0-0.3)
    tl.to(
      mainBox,
      {
        width: `${layoutConfig.mediumCenterWidth}vw`,
        height: `${layoutConfig.mediumCenterHeight}vh`,
        backgroundColor: '#3b82f6', // Change to blue background
        duration: 0.3,
        ease: "power2.inOut",
      },
      0,
    )
    // Add border radius animation for Stage 1
    .to(
      mainBox,
      {
        borderRadius: "8px", // Add rounded corners when transitioning to medium
        duration: 0.3,
        ease: "power2.inOut",
      },
      0,
    )
    // Add background transition from transparent to white
    .to(
      background,
      {
        backgroundColor: 'white',
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
        backgroundColor: '#3b82f6', // Keep blue background
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
        // Use x and y properties that will be added to the existing transform
        x: `${layout.x * 3}vw`,
        y: `${layout.y * 3}vh`,
        width: `${layout.width}vw`,
        height: `${layout.height}vh`,
        opacity: 0,
        scale: 0.8,
        pointerEvents: "none", // Disable pointer events initially
      })

      // Animate to final position
      tl.to(
        boxElement,
        {
          // Use x and y properties that will be added to the existing transform
          x: `${layout.x}vw`,
          y: `${layout.y}vh`,
          width: `${layout.width}vw`,
          height: `${layout.height}vh`,
          opacity: 1,
          scale: 1,
          pointerEvents: "auto", // Enable pointer events when animation completes
          duration: 0.4,
          ease: "power2.out",
          immediateRender: false
        },
        0.6 + index * 0.05,
      )
    })

    // BUFFER TIME - Hold the final state (1.0-1.5)
    // No animations during this time, just hold the completed state

    // REVERSE ANIMATION - Stage 5: Boxes move outward (1.5-1.9)
    gsap.utils.toArray('.box').forEach((box, index) => {
      const boxKey = boxOrder[boxOrder.length - 1 - index] // Reverse order
      const boxElement = box as HTMLElement

      tl.to(
        boxElement,
        {
          x: `${boxLayout[boxKey as keyof typeof boxLayout].x * 3}vw`,
          y: `${boxLayout[boxKey as keyof typeof boxLayout].y * 3}vh`,
          opacity: 0,
          scale: 0.8,
          pointerEvents: "none",
          duration: 0.4,
          ease: "power2.in",
          immediateRender: false
        },
        1.5 + index * 0.05,
      )
    })

    // Stage 6: Text transition - 434 Media to Reverse Stage 1 (unique) (1.9-2.0)
    tl.to(
      mediaText,
      {
        opacity: 0,
        duration: 0.1,
        ease: "power2.inOut",
      },
      2.3,
    )
    .to(
      reverseOneText,
      {
        opacity: 1,
        duration: 0.1,
        ease: "power2.inOut",
      },
      2.3,
    )

    // Stage 7: Small to Medium (2.0-3.0) — match initial Stage 3 duration (1.0s)
    tl.to(
      mainBox,
      {
        width: `${layoutConfig.mediumCenterWidth}vw`,
        height: `${layoutConfig.mediumCenterHeight}vh`,
        backgroundColor: '#3b82f6',
        duration: 1.0,
        ease: "power2.inOut",
      },
      1.9,
    )

    // Stage 8: Text transition - Reverse Stage 1 to Reverse Stage 2 (unique) (3.0-3.1)
    tl.to(
      reverseOneText,
      {
        opacity: 0,
        duration: 0.1,
        ease: "power2.inOut",
      },
      3.3,
    )
    .to(
      reverseTwoText,
      {
        opacity: 1,
        duration: 0.1,
        ease: "power2.inOut",
      },
      3.3,
    )

    // Stage 9: Medium to Large (3.1-3.4) — match initial Stage 1 duration (0.3s)
    tl.to(
      mainBox,
      {
        width: `${layoutConfig.initialCenterWidth}vw`,
        height: `${layoutConfig.initialCenterHeight}vh`,
        backgroundColor: 'transparent',
        border: '3px solid #3b82f6',
        borderRadius: '0px',
        duration: 0.3,
        ease: "power2.inOut",
      },
      3.1,
    )
    // Revert border radius
    .to(
      mainBox,
      {
        borderRadius: "0px",
        duration: 0.3,
        ease: "power2.inOut",
      },
      3.1,
    )
    // Revert background to transparent
    .to(
      background,
      {
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: "power2.inOut",
      },
      3.1,
    )

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section className="relative w-full bg-transparent">
      {/* Background div that will transition from transparent to white */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{ backgroundColor: 'transparent' }}
      ></div>

      {/* Spacer to allow scrolling */}
      <div 
        className="h-screen" 
        style={{ 
        //   background: 'linear-gradient(to bottom, transparent 20%, white 80%)'
          background: 'linear-gradient(to bottom, transparent 20%, transparent 80%)'
        }}
      ></div>

      {/* Animation container */}
      <div ref={containerRef} className="h-screen w-full flex items-center justify-center bg-transparent">
        {/* Main central box */}
        <div
          ref={mainBoxRef}
          className="relative z-10 flex items-center justify-center shadow-lg"
          style={{
            width: `${layoutConfig.initialCenterWidth}vw`,
            height: `${layoutConfig.initialCenterHeight}vh`,
            backgroundColor: 'transparent', // Start transparent
            border: '3px solid #3b82f6', // Blue border
            borderRadius: '0px', // Start with square edges
          }}
        >
          {/* Welcome text (initial) */}
          <h2 
            ref={welcomeTextRef}
            className="absolute top-4 left-4 text-blue-600 text-2xl md:text-3xl lg:text-4xl font-bold text-left pr-6"
            style={{ opacity: 1 }}
          >
            At Digital Canvas, <br /> we bring creativity, <br /> imagination, and bold thinking <br /> to industries shaping the future.
          </h2>
          
          {/* Discover text (transition) */}
          <h2 
            ref={discoverTextRef}
            className="absolute top-4 left-4 text-white text-3xl md:text-4xl lg:text-5xl font-bold text-left pr-6"
            style={{ opacity: 0 }}
          >
            From healthcare to defense, energy to education, our partners help us transform ambitious ideas into meaningful impact.
          </h2>

          {/* 434 Media text (final) */}
          <h2 
            ref={mediaTextRef}
            className="absolute text-white text-2xl font-bold text-center px-4"
            style={{ opacity: 0 }}
          >
            434 Media
          </h2>

          {/* Reverse unique stage texts inside the main box */}
          <h2 
            ref={reverseOneTextRef}
            className="absolute top-4 left-4 text-white text-2xl md:text-3xl lg:text-4xl font-bold text-left pr-6"
            style={{ opacity: 0 }}
          >
            As we move forward, <br /> so do our partners <br /> — <br /> bold, curious, <br /> and ready to <br /> build the future <br /> with us.
          </h2>
          <h2 
            ref={reverseTwoTextRef}
            className="absolute top-4 left-4 text-blue-600 text-3xl md:text-4xl lg:text-5xl font-bold text-left pr-6"
            style={{ opacity: 0 }}
          >
            Innovation doesn’t <br /> happen in isolation <br /> —  <br />it’s what we create <br /> together that defines <br /> progress.
          </h2>
        </div>

        {/* Secondary boxes that will slide in - only 8 boxes, no center */}
        <div ref={boxesRef} className="absolute inset-0 flex items-center justify-center">
          <Box color="bg-red-400" title="VelocityTX" />
          <Box color="bg-blue-400" title="Health Cell SOI" />
          <Box color="bg-green-400" title="AIM Health R&D Summit" />
          <Box color="bg-yellow-400" title="Tech Bloc" />
          <Box color="bg-orange-400" title="Alamo Angels" />
          <Box color="bg-purple-400" title="Methodist Healthcare Ministries" />
          <Box color="bg-pink-400" title="Pink" />
          <Box color="bg-cyan-400" title="Cyan" />
        </div>
      </div>

    </section>
  )
} 