"use client"

import React, { useState, useLayoutEffect, useRef, createContext, useContext, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import { WireframeBackground } from "./wireframe-background"
import "remixicon/fonts/remixicon.css"
import DynamicSliderComponent from "./dynamic-slider"
// import HeroSection from "./3d-scroll"

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

const clientWork = [
  {
    id: "velocitytx",
    name: "VelocityTX",
    tagline: "Accelerating Texas Innovation",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "https://velocitytx.com", show: true },
    instagram: { url: "https://instagram.com/velocitytx", show: true },
    linkedin: { url: "https://linkedin.com/company/velocitytx", show: true },
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: "methodist",
    name: "Methodist Healthcare Ministries",
    tagline: "Healing Communities With Compassion",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "https://mhm.org", show: true },
    instagram: { url: "https://instagram.com/methodisthealthcare", show: false },
    linkedin: { url: "https://linkedin.com/company/methodist-healthcare-ministries", show: true },
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "healthcell",
    name: "Health Cell",
    tagline: "Revolutionizing Cellular Health",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "https://healthcell.com", show: true },
    instagram: { url: "https://instagram.com/healthcell", show: false },
    linkedin: { url: "https://linkedin.com/company/health-cell", show: true },
    color: "from-green-600 to-emerald-600",
  },
  {
    id: "techbloc",
    name: "TechBloc",
    tagline: "Building San Antonio's Tech Future",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "https://techbloc.org", show: true },
    instagram: { url: "https://instagram.com/techbloc", show: true },
    linkedin: { url: "https://linkedin.com/company/techbloc", show: true },
    color: "from-purple-600 to-violet-600",
  },
  {
    id: "alamoangels",
    name: "Alamo Angels",
    tagline: "Fueling Innovation Through Investment",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "https://alamoangels.com", show: true },
    instagram: { url: "https://instagram.com/alamoangels", show: true },
    linkedin: { url: "https://linkedin.com/company/alamo-angels", show: true },
    color: "from-amber-500 to-orange-500",
  },
]

// Dynamic-style Slider Components
const DynamicSlider = ({ children }: { children: React.ReactNode }) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const { width: containerWidth } = useSizeElement(sliderRef)
  const slidingLogic = useSliding(React.Children.count(children))

  const contextValue = {
    ...slidingLogic,
    containerWidth,
  }

  return (
    <SliderContext.Provider value={contextValue}>
      <div ref={sliderRef} className="relative">
        {children}
      </div>
    </SliderContext.Provider>
  )
}

const DynamicSliderContainer = ({ children }: { children: React.ReactNode }) => {
  const { currentIndex, slideWidth, containerWidth } = useSliderContext()
  
  const translateX = -(currentIndex * slideWidth)
  const maxTranslateX = -(React.Children.count(children) * slideWidth - containerWidth)

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(${Math.max(translateX, maxTranslateX)}px)`,
          width: `${React.Children.count(children) * slideWidth}px`,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

const DynamicSliderItem = ({ 
  item, 
  onItemClick 
}: { 
  item: (typeof ipProperties)[0]
  onItemClick: (id: string) => void 
}) => {
  const { setSlideWidth } = useSliderContext()
  const itemRef = useRef<HTMLDivElement>(null)
  const { width } = useSizeElement(itemRef)

  useLayoutEffect(() => {
    if (width > 0) {
      setSlideWidth(width)
    }
  }, [width, setSlideWidth])

  return (
    <div ref={itemRef} className="flex-shrink-0 px-2">
      <motion.div
        className="group relative cursor-pointer"
        onClick={() => onItemClick(item.id)}
        whileTap={{ scale: 0.95 }}
      >
        {/* Image Card */}
        <div className="relative w-[200px] h-[120px] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-out">
          <Image 
            src={item.image || "/placeholder.svg"} 
            alt={item.name} 
            fill 
            className="object-cover object-center" 
            sizes="200px"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Dropdown Content */}
        <div
          className="absolute top-full left-0 right-0 mt-2 w-[200px] bg-neutral-900/95 backdrop-blur-sm rounded-lg border border-neutral-700 shadow-2xl overflow-hidden transition-all duration-300 ease-out z-40"
          style={{ 
            opacity: 0,
            transform: "translateY(-8px) scale(0.95)",
            height: "0px",
            pointerEvents: "none"
          }}
        >
          {/* Card Content */}
          <div className="p-3">
            {/* Title */}
            <h4 className="font-semibold text-white text-sm mb-2">{item.name}</h4>
            
            {/* Description */}
            <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
              {item.tagline}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const DynamicSliderControls = () => {
  const { currentIndex, goToNext, goToPrevious, containerWidth, slideWidth } = useSliderContext()
  const totalSlides = 5 // This should be dynamic based on your data
  const maxIndex = totalSlides - Math.floor(containerWidth / slideWidth)

  return (
    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
      {/* Previous Button */}
      {currentIndex > 0 && (
        <motion.button
          className="pointer-events-auto w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-300 ml-4"
          onClick={goToPrevious}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="ri-arrow-left-s-line text-xl" />
        </motion.button>
      )}

      {/* Next Button */}
      {currentIndex < maxIndex && (
        <motion.button
          className="pointer-events-auto w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-300 mr-4"
          onClick={goToNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="ri-arrow-right-s-line text-xl" />
        </motion.button>
      )}
    </div>
  )
}

// Mobile version components
const DynamicSliderMobile = ({ children }: { children: React.ReactNode }) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const { width: containerWidth } = useSizeElement(sliderRef)
  const slidingLogic = useSliding(React.Children.count(children))

  const contextValue = {
    ...slidingLogic,
    containerWidth,
  }

  return (
    <SliderContext.Provider value={contextValue}>
      <div ref={sliderRef} className="relative">
        {children}
      </div>
    </SliderContext.Provider>
  )
}

const DynamicSliderContainerMobile = ({ children }: { children: React.ReactNode }) => {
  const { currentIndex, slideWidth, containerWidth } = useSliderContext()
  
  const translateX = -(currentIndex * slideWidth)
  const maxTranslateX = -(React.Children.count(children) * slideWidth - containerWidth)

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(${Math.max(translateX, maxTranslateX)}px)`,
          width: `${React.Children.count(children) * slideWidth}px`,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

const DynamicSliderItemMobile = ({ 
  item, 
  onItemClick 
}: { 
  item: (typeof ipProperties)[0]
  onItemClick: (id: string) => void 
}) => {
  const { setSlideWidth } = useSliderContext()
  const itemRef = useRef<HTMLDivElement>(null)
  const { width } = useSizeElement(itemRef)

  useLayoutEffect(() => {
    if (width > 0) {
      setSlideWidth(width)
    }
  }, [width, setSlideWidth])

  return (
    <div ref={itemRef} className="flex-shrink-0 px-1.5">
      <motion.div
        className="group relative cursor-pointer"
        onClick={() => onItemClick(item.id)}
        whileTap={{ scale: 0.95 }}
      >
        {/* Image Card */}
        <div className="relative w-[140px] h-[84px] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-out">
          <Image 
            src={item.image || "/placeholder.svg"} 
            alt={item.name} 
            fill 
            className="object-cover object-center" 
            sizes="140px"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Dropdown Content */}
        <div
          className="absolute top-full left-0 right-0 mt-2 w-[140px] bg-neutral-900/95 backdrop-blur-sm rounded-lg border border-neutral-700 shadow-2xl overflow-hidden transition-all duration-300 ease-out z-40"
          style={{ 
            opacity: 0,
            transform: "translateY(-8px) scale(0.95)",
            height: "0px",
            pointerEvents: "none"
          }}
        >
          {/* Card Content */}
          <div className="p-2">
            {/* Title */}
            <h4 className="font-semibold text-white text-xs mb-1">{item.name}</h4>
            
            {/* Description */}
            <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
              {item.tagline}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}



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

        {/* Overlay Container - In-House Properties behind Scroll Component */}
        {/* <div className="relative overlay-container"> */}
          {/* In-House Properties Section (Background Layer) - Will be masked */}
          {/* <div className="relative z-0 properties-section" style={{
            mask: 'url(#overlay-mask)',
            WebkitMask: 'url(#overlay-mask)',
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat'
          }}>
            <DynamicSliderSection />
          </div> */}
          
        {/* In-House Properties Section - Now visible without masking */}
        <div className="relative z-0">
          <DynamicSliderSection />
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center py-16 lg:py-20 px-4 relative z-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl p-8 lg:p-12 border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl lg:text-4xl font-bold text-white mb-6">Join the Digital Canvas Network</h3>
            <p className="text-white/80 text-lg lg:text-xl mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed">
              Become part of our creative ecosystem where innovative IP properties and transformative client
              partnerships shape the future together.
            </p>
            <motion.button
              className="px-8 lg:px-12 py-4 lg:py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-base lg:text-lg rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect With Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DigitalCanvasNetwork
