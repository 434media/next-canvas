"use client"

import React, { useState, useLayoutEffect, useRef, createContext, useContext, useCallback } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import { WireframeBackground } from "./wireframe-background"
import "remixicon/fonts/remixicon.css"
import DynamicSliderComponent from "./dynamic-slider"
// import HeroSection from "./3d-scroll"

/*
// Context for sharing slider state and handlers
interface SliderContextType {
  currentIndex: number
  setCurrentIndex: (index: number) => void
  isSliding: boolean
  setIsSliding: (sliding: boolean) => void
  slideWidth: number
  setSlideWidth: (width: number) => void
  containerWidth: number
  setContainerWidth: (width: number) => void
  goToSlide: (index: number) => void
  goToNext: () => void
  goToPrevious: () => void
}

const SliderContext = createContext<SliderContextType | null>(null)

// Custom hook for getting element size
const useSizeElement = (ref: React.RefObject<HTMLElement | null>) => {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (!ref.current) return

    const updateSize = () => {
      if (ref.current) {
        setSize({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [ref])

  return size
}

// Custom hook for sliding logic
const useSliding = (totalSlides: number) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const [slideWidth, setSlideWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= totalSlides || isSliding) return
    
    setIsSliding(true)
    setCurrentIndex(index)
    
    // Reset sliding state after animation
    setTimeout(() => setIsSliding(false), 300)
  }, [totalSlides, isSliding])

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1)
  }, [currentIndex, goToSlide])

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex - 1)
  }, [currentIndex, goToSlide])

  return {
    currentIndex,
    setCurrentIndex,
    isSliding,
    setIsSliding,
    slideWidth,
    setSlideWidth,
    containerWidth,
    setContainerWidth,
    goToSlide,
    goToNext,
    goToPrevious,
  }
}

// Hook to use slider context
const useSliderContext = () => {
  const context = useContext(SliderContext)
  if (!context) {
    throw new Error('useSliderContext must be used within a SliderProvider')
  }
  return context
}
*/
const ipProperties = [
  {
    id: "digital-canvas",
    name: "Digital Canvas",
    tagline: "The Creative Layer of 434 MEDIA",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg",
    website: { url: "#", show: true },
    instagram: { url: "#", show: true },
    linkedin: { url: "#", show: true },
    color: "from-purple-500 to-blue-500",
  },
  {
    id: "devsa",
    name: "DEVSA",
    tagline: "Uniting The San Antonio Tech Community",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "https://devsanantonio.com", show: true },
    instagram: { url: "https://instagram.com/devsatx", show: true },
    linkedin: { url: "https://linkedin.com/company/devsatx", show: true },
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "ampd",
    name: "The AMPD Project",
    tagline: "Changing The World Through Art",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "https://ampdproject.com", show: true },
    instagram: { url: "https://instagram.com/ampdproject", show: true },
    linkedin: { url: "https://linkedin.com/company/ampd-project", show: false },
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "vemosvamos",
    name: "Vemos Vamos",
    tagline: "Bilingual Space Helping Others Grow",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "https://vemosvamos.com", show: true },
    instagram: { url: "https://instagram.com/vemosvamos", show: true },
    linkedin: { url: "https://linkedin.com/company/vemos-vamos", show: true },
    color: "from-green-500 to-teal-500",
  },
  {
    id: "txmx",
    name: "TXMX Boxing",
    tagline: "Made From BLOOD, SWEAT, and TEARS",
    image: "/TXMXBack.svg",
    website: { url: "#", show: true },
    instagram: { url: "https://instagram.com/txmxboxing", show: true },
    linkedin: { url: "https://linkedin.com/company/txmx-boxing", show: false },
    color: "from-red-500 to-orange-500",
  },
  {
    id: "salute",
    name: "Salute to Troops",
    tagline: "Promoting Federal And Military Innovation",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "#", show: true },
    instagram: { url: "https://instagram.com/salutetotroops", show: true },
    linkedin: { url: "https://linkedin.com/company/salute-to-troops", show: false },
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: "aimsatx",
    name: "AIM Health R&D Summit",
    tagline: "Accelerating Innovation In Military Medicine",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "#", show: true },
    instagram: { url: "https://instagram.com/aimsatx", show: true },
    linkedin: { url: "https://linkedin.com/company/aim-satx", show: false },
    color: "from-emerald-500 to-green-500",
  },
]


// Dynamic Slider Section Component
const DynamicSliderSection = () => {
  // Convert IP properties to the format expected by the Dynamic slider
  const dynamicItems = ipProperties.map(item => ({
    id: item.id,
    title: item.name,
    description: item.tagline,
    genre: "Creative Innovation",
    year: "2024",
    rating: "PG",
    image: item.image,
    backdrop: item.image,
    website: item.website,
    instagram: item.instagram,
    linkedin: item.linkedin,
    color: item.color
  }))



  return (
    <div className="relative py-0 lg:py-0">
      {/* Section Header */}


      {/* Dynamic Slider */}
      <div className="w-full">
        <DynamicSliderComponent items={dynamicItems} />
      </div>
    </div>
  )
}

const DigitalCanvasNetwork = () => {

  return (
    <section className="relative overflow-hidden" id="network">
      {/* Wireframe Background */}
      <WireframeBackground />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Main Section Header */}
        <motion.div
        >
        </motion.div>
          
        {/* In-House Properties Section - Now visible without masking */}
        <div className="relative z-0">
          <DynamicSliderSection />
        </div>

      </div>
    </section>
  )
}

export default DigitalCanvasNetwork
