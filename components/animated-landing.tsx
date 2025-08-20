"use client"

import { useEffect, useRef, useState } from "react"
import { gsap, ScrollTrigger, initializeGSAP } from "@/lib/gsap-config"
import Box from "./box"
import { useScrollTriggerHeight } from "../hooks/useScrollTriggerHeight"

export default function AnimatedLanding() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mainBoxRef = useRef<HTMLDivElement>(null)
  const boxesRef = useRef<HTMLDivElement>(null)
  const welcomeTextRef = useRef<HTMLHeadingElement>(null)
  const discoverTextRef = useRef<HTMLHeadingElement>(null)
  const mediaTextRef = useRef<HTMLHeadingElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const continueButtonRef = useRef<HTMLButtonElement>(null)

  const [animationPaused, setAnimationPaused] = useState(false)
  const [showContinueButton, setShowContinueButton] = useState(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const layoutConfig = {
    gutter: 0.3, // Reduced gutter for maximum space usage
    initialCenterWidth: 65, // Larger initial presence
    initialCenterHeight: 85, // Increased height for better impact
    mediumCenterWidth: 32,
    mediumCenterHeight: 55,
    finalCenterWidth: 16, // Slightly larger for better visibility
    finalCenterHeight: 16,
  }

  const calculateBoxLayout = () => {
    const gutter = layoutConfig.gutter
    const centerSize = layoutConfig.finalCenterHeight
    const centerHeight = layoutConfig.finalCenterHeight
    const centerWidth = layoutConfig.finalCenterWidth

    const availableWidth = 52 // Increased for better space utilization
    const availableHeight = 100 // Full viewport height usage

    const sideStackWidth = (availableWidth - centerWidth) / 2.1
    const sideBoxHeight = availableHeight / 2.05 // Better height distribution

    return {
      red: {
        x: -50 + sideStackWidth / 2 + gutter,
        y: -50 + sideBoxHeight / 2 + gutter * 0.3,
        width: sideStackWidth,
        height: sideBoxHeight - gutter,
      },
      purple: {
        x: -50 + sideStackWidth / 2 + gutter,
        y: 50 - sideBoxHeight / 2 - gutter * 0.3,
        width: sideStackWidth,
        height: sideBoxHeight - gutter,
      },
      green: {
        x: 50 - sideStackWidth / 2 - gutter,
        y: -50 + sideBoxHeight / 2 + gutter * 0.3,
        width: sideStackWidth,
        height: sideBoxHeight - gutter,
      },
      cyan: {
        x: 50 - sideStackWidth / 2 - gutter,
        y: sideBoxHeight / 2 - gutter * 0.3,
        width: sideStackWidth,
        height: sideBoxHeight - gutter,
      },
      orange: {
        x: -((50 - sideStackWidth - gutter - centerWidth / 2) / 2),
        y: (-50 - centerHeight / 2) / 2,
        width: availableWidth + centerWidth / 2 - gutter - sideStackWidth,
        height: sideBoxHeight - centerHeight / 2 - gutter,
      },
      pink: {
        x: (50 - sideStackWidth - gutter - centerWidth / 2) / 2,
        y: (50 + centerHeight / 2) / 2,
        width: availableWidth + centerWidth / 2 - gutter - sideStackWidth,
        height: sideBoxHeight - centerHeight / 2 - gutter,
      },
      blue: {
        x: centerWidth / 2 + (50 - sideStackWidth - gutter - centerWidth / 2) / 2,
        y: -((50 - centerHeight / 2 - gutter) / 2),
        width: 50 - sideStackWidth - centerWidth / 2 - gutter * 2,
        height: sideBoxHeight + centerHeight / 2 - gutter * 0.3,
      },
      yellow: {
        x: -(centerWidth / 2 + (50 - sideStackWidth - gutter - centerWidth / 2) / 2),
        y: (50 - centerHeight / 2 - gutter) / 2,
        width: 50 - sideStackWidth - centerWidth / 2 - gutter * 2,
        height: sideBoxHeight + centerHeight / 2 - gutter * 0.3,
      },
      center: {
        x: 0,
        y: 0,
        width: centerSize,
        height: centerSize,
      },
    }
  }

  const boxLayout = calculateBoxLayout()

  const sectionHeight = useScrollTriggerHeight({
    triggerId: "animated-landing",
    endValue: "+=2400", // Increased to accommodate pause time
    fallbackHeight: "300vh", // Increased fallback height
  })

  useEffect(() => {
    initializeGSAP()

    const container = containerRef.current
    const mainBox = mainBoxRef.current
    const boxesContainer = boxesRef.current
    const welcomeText = welcomeTextRef.current
    const discoverText = discoverTextRef.current
    const mediaText = mediaTextRef.current
    const background = backgroundRef.current
    const continueButton = continueButtonRef.current

    if (
      !container ||
      !mainBox ||
      !boxesContainer ||
      !welcomeText ||
      !discoverText ||
      !mediaText ||
      !background ||
      !continueButton
    )
      return

    const savedY = sessionStorage.getItem("saved-scroll")
    const boxOrder = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "cyan"]

    gsap.set(discoverText, { opacity: 0 })
    gsap.set(mediaText, { opacity: 0 })
    gsap.set(background, { backgroundColor: "white" })
    gsap.set(continueButton, { opacity: 0, scale: 0.8, pointerEvents: "none" }) // Hide continue button initially

    const tl = gsap.timeline({
      scrollTrigger: {
        id: "animated-landing",
        trigger: container,
        start: "top top",
        end: "+=2400", // Extended for pause functionality
        scrub: 0.2,
        pin: true,
        anticipatePin: 1,
        preventOverlaps: true,
        refreshPriority: 1,
        onRefresh: () => {
          if (savedY !== null) {
            setTimeout(() => {
              window.scrollTo({
                top: Number.parseInt(savedY, 10),
                behavior: "instant",
              })
              sessionStorage.removeItem("saved-scroll")
            }, 100)
          }
        },
      },
    })

    timelineRef.current = tl

    tl.to(
      mainBox,
      {
        width: `${layoutConfig.mediumCenterWidth}vw`,
        height: `${layoutConfig.mediumCenterHeight}vh`,
        backgroundColor: "#000000", // Black for Digital Canvas theme
        duration: 0.35,
        ease: "power3.inOut",
      },
      0,
    ).to(
      mainBox,
      {
        borderRadius: "12px", // Larger border radius for modern look
        duration: 0.35,
        ease: "power3.inOut",
      },
      0,
    )

    tl.to(
      welcomeText,
      {
        opacity: 0,
        scale: 0.9,
        duration: 0.15,
        ease: "power2.inOut",
      },
      0.25,
    ).to(
      discoverText,
      {
        opacity: 1,
        scale: 1,
        duration: 0.15,
        ease: "power2.inOut",
      },
      0.3,
    )

    tl.to(
      mainBox,
      {
        width: `${layoutConfig.finalCenterWidth}vw`,
        height: `${layoutConfig.finalCenterHeight}vh`,
        backgroundColor: "#000000", // Maintain black theme
        duration: 0.4,
        ease: "power3.inOut",
      },
      0.45,
    )

    tl.to(
      discoverText,
      {
        opacity: 0,
        scale: 0.9,
        duration: 0.15,
        ease: "power2.inOut",
      },
      0.75,
    ).to(
      mediaText,
      {
        opacity: 1,
        scale: 1,
        duration: 0.15,
        ease: "power2.inOut",
      },
      0.8,
    )

    gsap.utils.toArray(".box").forEach((box, index) => {
      const boxKey = boxOrder[index]
      const layout = boxLayout[boxKey as keyof typeof boxLayout]
      const boxElement = box as HTMLElement

      gsap.set(boxElement, {
        willChange: "transform, opacity",
        x: `${layout.x * 2.2}vw`, // Reduced multiplier for tighter initial positioning
        y: `${layout.y * 2.2}vh`,
        width: `${layout.width}vw`,
        height: `${layout.height}vh`,
        opacity: 0,
        scale: 0.8, // Better initial scale for smoother entrance
        pointerEvents: "none",
      })

      tl.to(
        boxElement,
        {
          x: `${layout.x}vw`,
          y: `${layout.y}vh`,
          width: `${layout.width}vw`,
          height: `${layout.height}vh`,
          opacity: 1,
          scale: 1,
          pointerEvents: "auto",
          duration: 0.6, // Longer duration for smoother animation
          ease: "power2.out", // Smoother easing for better visual flow
          immediateRender: false,
        },
        0.7 + index * 0.035, // Optimized stagger timing
      )
    })

    tl.call(
      () => {
        setAnimationPaused(true)
        setShowContinueButton(true)
        gsap.to(continueButton, {
          opacity: 1,
          scale: 1,
          pointerEvents: "auto",
          duration: 0.5,
          ease: "back.out(1.7)",
        })
        // Pause the ScrollTrigger
        ScrollTrigger.getById("animated-landing")?.disable()
      },
      [],
      1.5,
    ) // Pause after boxes are fully connected

    const separationTl = gsap.timeline({ paused: true })

    gsap.utils.toArray(".box").forEach((box, index) => {
      const boxElement = box as HTMLElement

      separationTl.to(
        boxElement,
        {
          x: `${Math.random() * 200 - 100}vw`,
          y: `${Math.random() * 200 - 100}vh`,
          opacity: 0,
          scale: 0.3,
          rotation: Math.random() * 360,
          duration: 1.2,
          ease: "power2.in",
        },
        index * 0.1,
      )
    })

    const continueAnimation = () => {
      setShowContinueButton(false)
      gsap.to(continueButton, {
        opacity: 0,
        scale: 0.8,
        pointerEvents: "none",
        duration: 0.3,
      })

      // Re-enable ScrollTrigger and play separation
      ScrollTrigger.getById("animated-landing")?.enable()
      separationTl.play()

      setTimeout(() => {
        setAnimationPaused(false)
      }, 1500)
    }

    const handleContinue = () => {
      continueAnimation()
    }

    continueButton.addEventListener("click", handleContinue)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      continueButton.removeEventListener("click", handleContinue)
    }
  }, [])

  return (
    <section className="relative w-full bg-white overflow-hidden" style={{ height: sectionHeight, zIndex: 30 }}>
      <div ref={backgroundRef} className="absolute inset-0" style={{ backgroundColor: "white", zIndex: 1 }}></div>
      <div
        className="h-screen"
        style={{
          background: "linear-gradient(to bottom, white 0%, #f8fafc 50%, white 100%)",
          zIndex: 2,
        }}
      ></div>
      <div
        ref={containerRef}
        className="h-screen w-full flex items-center justify-center bg-white relative"
        style={{ zIndex: 10 }}
      >
        <div
          ref={mainBoxRef}
          className="relative flex items-center justify-center shadow-2xl"
          style={{
            width: `${layoutConfig.initialCenterWidth}vw`,
            height: `${layoutConfig.initialCenterHeight}vh`,
            backgroundColor: "white",
            border: "4px solid #000000",
            borderRadius: "0px",
            zIndex: 20,
          }}
        >
          <h2
            ref={welcomeTextRef}
            className="absolute text-black text-3xl md:text-5xl lg:text-6xl font-black text-center px-4 tracking-tight"
            style={{ opacity: 1 }}
          >
            WELCOME TO THE
          </h2>

          <h2
            ref={discoverTextRef}
            className="absolute text-white text-2xl md:text-4xl font-bold text-center px-4 tracking-tight"
            style={{ opacity: 0 }}
          >
            <img
              src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
              alt="Digital Canvas House"
              className="mx-auto mb-2 w-40 h-auto"
              width={100}
              height={100}
            />
            HOUSE
          </h2>

          <h2
            ref={mediaTextRef}
            className="absolute text-white text-xl md:text-3xl lg:text-4xl font-menda-black text-center px-4 tracking-wider"
            style={{ opacity: 0 }}
          >
            434 MEDIA
          </h2>
        </div>

        <div
          ref={boxesRef}
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ zIndex: 15 }}
        >
          <Box color="bg-rose-500" title="Creative" />
          <Box color="bg-sky-400" title="Digital" />
          <Box color="bg-amber-400" title="Innovation" />
          <Box color="bg-orange-500" title="Media" />
          <Box color="bg-yellow-400" title="Design" />
          <Box color="bg-rose-400" title="Strategy" />
          <Box color="bg-sky-500" title="Brand" />
          <Box color="bg-amber-500" title="Vision" />
        </div>
      </div>
      <div
        className="h-screen"
        style={{
          background: "linear-gradient(to bottom, white 0%, #f8fafc 50%, white 100%)",
          zIndex: 2,
        }}
      ></div>
    </section>
  )
}
