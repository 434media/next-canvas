"use client"

import React, { useState, useLayoutEffect, useRef, createContext, useContext, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import { WireframeBackground } from "./wireframe-background"
import "remixicon/fonts/remixicon.css"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import DynamicSliderComponent from "./dynamic-slider"

gsap.registerPlugin(ScrollTrigger)

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

const NetworkSection = ({
  title,
  items,
}: {
  title: string
  items: typeof ipProperties
}) => {
  const [activeItem, setActiveItem] = useState<string>(items[0]?.id || "")

  const currentItem = items.find((item) => item.id === activeItem) || items[0]

  const renderSocialLinks = (item: (typeof items)[0]) => {
    const links = []

    if (item.website.show) {
      links.push(
        <motion.a
          key="website"
          href={item.website.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="ri-global-line text-xl" />
        </motion.a>,
      )
    }

    if (item.instagram.show) {
      links.push(
        <motion.a
          key="instagram"
          href={item.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="ri-instagram-line text-xl" />
        </motion.a>,
      )
    }

    if (item.linkedin.show) {
      links.push(
        <motion.a
          key="linkedin"
          href={item.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="ri-linkedin-line text-xl" />
        </motion.a>,
      )
    }

    return links
  }

  return (
    <div className="h-full flex flex-col justify-center px-8">
      {/* Section Header */}
      <motion.div
        className="text-center mb-8 lg:mb-12 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{title}</h2>
        <div className="w-24 h-px bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
      </motion.div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-1 min-h-0">
        {/* Left Panel - Image Section */}
        <div className="w-1/2 relative flex items-center justify-center">
          {/* Decorative square */}
            <AnimatePresence mode="wait">
              {currentItem && (
                <>
                  {/* Square with an oval/arc cutout similar to Apple logo bite */}
                  <motion.div
                    key={`square-${currentItem.id}`}
                    className={`absolute left-[6.5rem] top-1/2 -translate-y-1/2 w-[25rem] h-[40rem] rounded-xl bg-gradient-to-r ${currentItem.color} z-0`}
                    style={{
                      WebkitMaskImage:
                        'radial-gradient(ellipse 12rem 20rem at 30rem center, transparent 12rem, black 12.1rem)',
                      maskImage:
                        'radial-gradient(ellipse 12rem 20rem at 30rem center, transparent 12rem, black 12.1rem)',
                      WebkitMaskComposite: 'destination-out',
                      maskComposite: 'exclude',
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8 }}
                  />
                </>
              )}
            </AnimatePresence>


          {/* Image Container */}
          <div className="relative z-10 w-[26rem] h-[34rem] rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              {currentItem && (
                <motion.div
                  key={currentItem.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={currentItem.image || "/placeholder.svg"}
                    alt={currentItem.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Panel - Info Section */}
        <div className="w-1/2 flex flex-col justify-center pl-8">
          {/* Property Info */}
          <div className="mb-8">
            <AnimatePresence mode="wait">
              {currentItem && (
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Title */}
                  <h3 className={`text-3xl lg:text-4xl font-bold mb-4 leading-tight bg-gradient-to-r ${currentItem.color} text-transparent bg-clip-text`}>
                    {currentItem.name}
                  </h3>

                  {/* Description */}
                  <p className="text-base lg:text-lg text-neutral-300 mb-6 leading-relaxed max-w-lg">
                    {currentItem.tagline}
                  </p>

                  {/* Social Links */}
                  <div className="flex space-x-6">
                    {renderSocialLinks(currentItem)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dynamic-style Slider */}
          <div className="w-full">
            <DynamicSlider>
              <DynamicSliderContainer>
                {items.map((item) => (
                  <DynamicSliderItem
                    key={item.id}
                    item={item}
                    onItemClick={setActiveItem}
                  />
                ))}
              </DynamicSliderContainer>
              <DynamicSliderControls />
            </DynamicSlider>
          </div>

          {/* Custom CSS for Dynamic-style hover effects */}
          <style dangerouslySetInnerHTML={{
            __html: `
              .dynamic-slider {
                position: relative;
              }
              
              .dynamic-item {
                transition: transform 0.3s ease-out;
              }
              
              .dynamic-slider:hover .dynamic-item {
                transform: translateX(-25%);
              }
              
              .dynamic-item:hover {
                transform: scale(1.5) translateX(25%) !important;
                z-index: 50;
              }
              
              .dynamic-item:hover ~ .dynamic-item {
                transform: translateX(25%);
              }
              
              /* Mobile Dynamic-style effects */
              .dynamic-slider-mobile {
                position: relative;
              }
              
              .dynamic-item-mobile {
                transition: transform 0.3s ease-out;
              }
              
              .dynamic-slider-mobile:hover .dynamic-item-mobile {
                transform: translateX(-15%);
              }
              
              .dynamic-item-mobile:hover {
                transform: scale(1.3) translateX(15%) !important;
                z-index: 50;
              }
              
              .dynamic-item-mobile:hover ~ .dynamic-item-mobile {
                transform: translateX(15%);
              }
              
              .group:hover > div:nth-child(2) {
                opacity: 1 !important;
                transform: translateY(0px) scale(1) !important;
                height: 80px !important;
              }
              
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `
          }} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden flex-1 flex flex-col justify-center">
        <div className="space-y-6">
          {/* Mobile Image */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {currentItem && (
                <motion.div
                  key={currentItem.id}
                  className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={currentItem.image || "/placeholder.svg"}
                    alt={currentItem.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Info */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {currentItem && (
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${currentItem.color} text-transparent bg-clip-text`}>
                    {currentItem.name}
                  </h3>
                  <p className="text-neutral-300 mb-4 leading-relaxed text-sm">{currentItem.tagline}</p>
                  <div className="flex space-x-4 mb-4">
                    {renderSocialLinks(currentItem)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Dynamic-style Slider */}
            <div className="w-full">
              <DynamicSliderMobile>
                <DynamicSliderContainerMobile>
                  {items.map((item) => (
                    <DynamicSliderItemMobile
                      key={item.id}
                      item={item}
                      onItemClick={setActiveItem}
                    />
                  ))}
                </DynamicSliderContainerMobile>
              </DynamicSliderMobile>
            </div>
          </div>
        </div>
      </div>
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
    <div className="relative bg-black py-12 lg:py-16">
      {/* Section Header */}
      <motion.div
        className="text-center mb-8 lg:mb-12 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="inline-block mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* <span className="inline-flex items-center justify-center w-16 lg:w-20 h-16 lg:h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 lg:p-5 backdrop-blur-sm border border-white/10">
            <i className="ri-film-line text-2xl lg:text-3xl text-white"></i>
          </span> */}
        </motion.div>

        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
        In-House{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
            Properties
          </span>
        </h2>
      </motion.div>

      {/* Dynamic Slider */}
      <div className="max-w-7xl mx-auto px-4">
        <DynamicSliderComponent items={dynamicItems} />
      </div>
    </div>
  )
}

const DigitalCanvasNetwork = () => {
  const component = useRef<HTMLDivElement>(null)
  const slider = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!slider.current) return

    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".panel")
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + (slider.current?.offsetWidth || 0),
          markers: false,
        }
      })
    }, component)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative bg-black overflow-hidden" id="network">
      {/* Wireframe Background */}
      <WireframeBackground />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Main Section Header */}
        <motion.div
          className="text-center py-16 lg:py-20 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center justify-center w-16 lg:w-20 h-16 lg:h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 lg:p-5 backdrop-blur-sm border border-white/10">
              <i className="ri-share-line text-2xl lg:text-3xl text-white"></i>
            </span>
          </motion.div>

          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 lg:mb-8">
            The{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
              Digital Canvas
            </span>{" "}
            Network
          </h1>
          <p className="text-lg lg:text-2xl text-neutral-300 max-w-4xl mx-auto leading-relaxed">
            Where our creative partnerships shape the future together.
          </p>
        </motion.div>

        {/* Dynamic Slider Section */}
        <DynamicSliderSection />

        {/* Horizontal Scroll Container */}
        <div ref={component}>

          {/* Horizontal Scroll Slider */}
          <div ref={slider} className="container flex w-[200vw] h-screen">
            {/* In-House Properties Panel */}
            <div className="panel w-screen h-screen flex-shrink-0">
              <NetworkSection title="In-House Properties" items={ipProperties} />
            </div>

            {/* Client Work Panel */}
            <div className="panel w-screen h-screen flex-shrink-0">
              <NetworkSection title="Client Work" items={clientWork} />
            </div>
          </div>
        </div>


        {/* Call to Action */}
        <motion.div
          className="text-center py-16 lg:py-20 px-4"
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
