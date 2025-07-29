"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Plus, ThumbsUp, ChevronLeft, ChevronRight, Globe, Instagram, Linkedin } from "lucide-react"
import { Button } from "./ui/button"

interface DynamicItem {
  id: string
  title: string
  description: string
  genre: string
  year: string
  rating: string
  image: string
  backdrop: string
  website?: { url: string; show: boolean }
  instagram?: { url: string; show: boolean }
  linkedin?: { url: string; show: boolean }
  color?: string
}

interface DynamicSliderProps {
  items: DynamicItem[]
}



export default function DynamicSlider({ items }: DynamicSliderProps) {
  const [selectedMovie, setSelectedMovie] = useState(items[0])
  const [scrollPosition, setScrollPosition] = useState(0)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const autoSwitchRef = useRef<NodeJS.Timeout | null>(null)

  const cardWidth = 282 // 280px width + 2px gap
  const visibleCards = 5 // Number of cards visible at once
  const maxScroll = Math.max(0, (items.length - visibleCards) * cardWidth)

  // Auto-switch to next item
  const switchToNextItem = () => {
    const nextIndex = (currentItemIndex + 1) % items.length
    setCurrentItemIndex(nextIndex)
    setSelectedMovie(items[nextIndex])
    
    // Update scroll position to show the selected item
    const newScrollPosition = Math.min(nextIndex * cardWidth, maxScroll)
    setScrollPosition(newScrollPosition)
  }

  // Start auto-switch timer
  const startAutoSwitch = () => {
    if (autoSwitchRef.current) {
      clearInterval(autoSwitchRef.current)
    }
    autoSwitchRef.current = setInterval(switchToNextItem, 10000) // 10 seconds
  }

  // Stop auto-switch timer
  const stopAutoSwitch = () => {
    if (autoSwitchRef.current) {
      clearInterval(autoSwitchRef.current)
      autoSwitchRef.current = null
    }
  }

  // Auto-switch effect
  useEffect(() => {
    startAutoSwitch()
    
    // Cleanup on unmount
    return () => {
      stopAutoSwitch()
    }
  }, [currentItemIndex, startAutoSwitch]) // Restart timer when currentItemIndex changes

  const scrollLeft = () => {
    const newPosition = Math.max(0, scrollPosition - cardWidth)
    const newIndex = Math.floor(newPosition / cardWidth)
    setScrollPosition(newPosition)
    setCurrentItemIndex(newIndex)
    setSelectedMovie(items[newIndex])
    
    // Reset auto-switch timer
    stopAutoSwitch()
    startAutoSwitch()
  }

  const scrollRight = () => {
    const newPosition = Math.min(scrollPosition + cardWidth, maxScroll)
    const newIndex = Math.floor(newPosition / cardWidth)
    setScrollPosition(newPosition)
    setCurrentItemIndex(newIndex)
    setSelectedMovie(items[newIndex])
    
    // Reset auto-switch timer
    stopAutoSwitch()
    startAutoSwitch()
  }

  const renderSocialLinks = (item: DynamicItem) => {
    const links = []

    if (item.website?.show) {
      links.push(
        <Button
          key="website"
          variant="ghost"
          size="icon"
          className="text-white/60 hover:text-white hover:bg-white/10"
          onClick={() => window.open(item.website!.url, '_blank')}
        >
          <Globe className="h-5 w-5" />
        </Button>
      )
    }

    if (item.instagram?.show) {
      links.push(
        <Button
          key="instagram"
          variant="ghost"
          size="icon"
          className="text-white/60 hover:text-white hover:bg-white/10"
          onClick={() => window.open(item.instagram!.url, '_blank')}
        >
          <Instagram className="h-5 w-5" />
        </Button>
      )
    }

    if (item.linkedin?.show) {
      links.push(
        <Button
          key="linkedin"
          variant="ghost"
          size="icon"
          className="text-white/60 hover:text-white hover:bg-white/10"
          onClick={() => window.open(item.linkedin!.url, '_blank')}
        >
          <Linkedin className="h-5 w-5" />
        </Button>
      )
    }

    return links
  }

  return (
    <div className="min-h-screen text-white">
      {/* Selected Movie Details - Now at the top */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMovie.id}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="relative w-screen h-screen"
        >
          {/* Full Width Backdrop Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1 , x: -0}}
            animate={{ opacity: 1, scale: 1 , x: -0}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute inset-0 z-0"
          >
            <motion.img
              key={selectedMovie.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              src={selectedMovie.backdrop}
              alt={selectedMovie.title}
              className="w-full h-full object-cover"
            />
            {/* Black fade effect from left to right */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </motion.div>

          {/* Content overlay */}
          <div className="relative z-10 h-full flex items-center px-6">
            {/* Left Side - Movie Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 max-w-2xl"
            >
              <div>
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl md:text-5xl font-bold mb-2"
                >
                  {selectedMovie.title}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center gap-4 text-sm text-gray-300 mb-4"
                >
                  <span className="bg-gray-700 px-2 py-1 rounded">{selectedMovie.rating}</span>
                  <span>{selectedMovie.year}</span>
                  <span>{selectedMovie.genre}</span>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg text-gray-300 leading-relaxed"
              >
                {selectedMovie.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex gap-4"
              >
                <Button className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-2">
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  Learn More
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-500 text-white hover:bg-gray-800 px-8 py-2 bg-transparent"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Connect
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                  <ThumbsUp className="h-5 w-5" />
                </Button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex gap-2"
              >
                {renderSocialLinks(selectedMovie)}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Movie Slider - Now at the bottom */}
      <div className="relative px-6 mt-4">
        <div className="relative group">
          {/* Left Arrow */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Right Arrow */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={scrollRight}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Movie Cards Container */}
          <div className="overflow-hidden px-1 py-3 pt-6 pl-4">
            <motion.div
              className="flex gap-2 px-1"
              animate={{ x: -scrollPosition }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
            >
              {items.map((movie) => (
                <motion.div
                  key={movie.id}
                  className={`flex-shrink-0 w-[280px] cursor-pointer group/card transition-all duration-300 relative rounded-md ${
                    movie.id === selectedMovie.id ? "ring-4 ring-white" : ""
                  }`}
                  onClick={() => {
                    const movieIndex = items.findIndex(item => item.id === movie.id)
                    setCurrentItemIndex(movieIndex)
                    setSelectedMovie(movie)
                    
                    // Update scroll position
                    const newScrollPosition = Math.min(movieIndex * cardWidth, maxScroll)
                    setScrollPosition(newScrollPosition)
                    
                    // Reset auto-switch timer
                    stopAutoSwitch()
                    startAutoSwitch()
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                >
                  <div className="relative overflow-hidden rounded-md">
                    <img
                      src={movie.image || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-[160px] object-cover transition-transform duration-300 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <h3 className="text-sm font-semibold">{movie.title}</h3>
                    </div>
                  </div>
                  {movie.id === selectedMovie.id && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-white"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}