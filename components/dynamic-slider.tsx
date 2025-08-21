"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Play, Volume2, VolumeX, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

interface DynamicItem {
  id: string
  title: string
  description: string
  year?: string
  rating?: string
  image: string
  backdrop: string
  video?: string | null
  mediaType?: "image" | "video"
  website?: { url: string; show: boolean }
}

interface DynamicSliderProps {
  items: DynamicItem[]
}

export default function DynamicSlider({ items }: DynamicSliderProps) {
  const [selectedMovie, setSelectedMovie] = useState(items[0])
  const [scrollPosition, setScrollPosition] = useState(0)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [videoDuration, setVideoDuration] = useState<number>(0)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showMobileModal, setShowMobileModal] = useState(false)
  const [modalItem, setModalItem] = useState<DynamicItem | null>(null)
  const autoSwitchRef = useRef<NodeJS.Timeout | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const videoDelayRef = useRef<NodeJS.Timeout | null>(null)

  const cardWidth = 282 // 280px width + 2px gap
  const visibleCards = 5 // Number of cards visible at once
  const maxScroll = Math.max(0, (items.length - visibleCards) * cardWidth)

  const getSwitchDuration = () => {
    if (selectedMovie.mediaType === "video" && selectedMovie.video && isVideoLoaded) {
      return Math.max((videoDuration + 5) * 1000, 10000)
    }
    return 10000
  }

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration)
      setIsVideoLoaded(true)
    }
  }

  const handleVideoError = (e: any) => {
    setIsVideoLoaded(false)
    setVideoDuration(0)
  }

  const startVideoDelay = () => {
    if (videoDelayRef.current) {
      clearTimeout(videoDelayRef.current)
    }

    if (selectedMovie.mediaType === "video" && selectedMovie.video) {
      setShowVideo(false)
      videoDelayRef.current = setTimeout(() => {
        setShowVideo(true)
      }, 5000)
    } else {
      setShowVideo(false)
    }
  }

  const clearVideoDelay = () => {
    if (videoDelayRef.current) {
      clearTimeout(videoDelayRef.current)
      videoDelayRef.current = null
    }
  }

  const switchToNextItem = () => {
    const nextIndex = (currentItemIndex + 1) % items.length
    setCurrentItemIndex(nextIndex)
    setSelectedMovie(items[nextIndex])

    setIsVideoLoaded(false)
    setVideoDuration(0)
    setShowVideo(false)

    clearVideoDelay()

    startVideoDelay()

    const newScrollPosition = Math.min(nextIndex * cardWidth, maxScroll)
    setScrollPosition(newScrollPosition)
  }

  const startAutoSwitch = useCallback(() => {
    if (autoSwitchRef.current) {
      clearInterval(autoSwitchRef.current)
    }
    const duration = getSwitchDuration()
    autoSwitchRef.current = setInterval(switchToNextItem, duration)
  }, [videoDuration, isVideoLoaded, selectedMovie.mediaType, selectedMovie.video])

  const stopAutoSwitch = () => {
    if (autoSwitchRef.current) {
      clearInterval(autoSwitchRef.current)
      autoSwitchRef.current = null
    }
  }

  useEffect(() => {
    startAutoSwitch()

    return () => {
      stopAutoSwitch()
    }
  }, [currentItemIndex, startAutoSwitch])

  useEffect(() => {
    startVideoDelay()

    return () => {
      clearVideoDelay()
    }
  }, [selectedMovie.id])

  useEffect(() => {
    if (selectedMovie.mediaType === "video" && isVideoLoaded) {
      stopAutoSwitch()
      startAutoSwitch()
    }
  }, [videoDuration, isVideoLoaded, startAutoSwitch])

  const scrollLeft = () => {
    const newPosition = Math.max(0, scrollPosition - cardWidth)
    setScrollPosition(newPosition)
  }

  const scrollRight = () => {
    const newPosition = Math.min(scrollPosition + cardWidth, maxScroll)
    setScrollPosition(newPosition)
  }

  const openMobileModal = (item: DynamicItem) => {
    setModalItem(item)
    setShowMobileModal(true)
    stopAutoSwitch()
  }

  const closeMobileModal = () => {
    setShowMobileModal(false)
    setModalItem(null)
    startAutoSwitch()
  }

  const toggleAudio = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !isMuted
    }
  }

  return (
    <div className="min-h-screen text-white">
      <div className="hidden md:block md:h-screen">
        {/* Main Video Section */}
        <div className="h-3/4 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMovie.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <div className="absolute inset-0 z-0 flex items-center justify-center p-8">
                <div className="w-full max-w-none aspect-video">
                  {selectedMovie.mediaType === "video" && selectedMovie.video && showVideo ? (
                    <motion.video
                      key={selectedMovie.video}
                      ref={videoRef}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      src={selectedMovie.video}
                      className="w-full h-full object-cover rounded-lg"
                      autoPlay
                      muted={isMuted}
                      loop
                      onLoadedMetadata={handleVideoLoadedMetadata}
                      onError={handleVideoError}
                      playsInline
                    />
                  ) : (
                    <motion.img
                      key={selectedMovie.backdrop}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      src={selectedMovie.backdrop}
                      alt={selectedMovie.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>

              <div className="relative z-10 h-full flex items-end p-12">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-4 max-w-lg"
                >
                  <h1 className="text-4xl lg:text-5xl font-bold">{selectedMovie.title}</h1>
                  <p className="text-lg text-gray-300 leading-relaxed line-clamp-3">{selectedMovie.description}</p>
                  <div className="flex gap-3">
                    {selectedMovie.mediaType === "video" && selectedMovie.video && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-black/50 border-white/20 text-white hover:bg-black/70 w-12 h-12"
                        onClick={toggleAudio}
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </Button>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="h-1/4 p-8 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Digital Canvas Network</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                onClick={scrollLeft}
                disabled={scrollPosition === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                onClick={scrollRight}
                disabled={scrollPosition >= maxScroll}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{ x: -scrollPosition }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {items.map((movie) => (
                <motion.div
                  key={movie.id}
                  className={`cursor-pointer group/card transition-all duration-300 relative rounded-lg overflow-hidden flex-shrink-0 w-70 ${
                    movie.id === selectedMovie.id ? "ring-2 ring-white" : ""
                  }`}
                  onClick={() => {
                    const movieIndex = items.findIndex((item) => item.id === movie.id)
                    setCurrentItemIndex(movieIndex)
                    setSelectedMovie(movie)
                    setIsVideoLoaded(false)
                    setVideoDuration(0)
                    setShowVideo(false)
                    clearVideoDelay()
                    startVideoDelay()
                    stopAutoSwitch()
                    startAutoSwitch()
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                >
                  <div className="relative aspect-video">
                    <img
                      src={movie.image || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                    />
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-sm font-semibold line-clamp-1 mb-1">{movie.title}</h3>
                      <p className="text-xs text-gray-300 line-clamp-1">{movie.description}</p>
                    </div>
                    {movie.mediaType === "video" && (
                      <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                        <Play className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMovie.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full aspect-video"
          >
            {selectedMovie.mediaType === "video" && selectedMovie.video && showVideo ? (
              <motion.video
                key={selectedMovie.video}
                ref={videoRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                src={selectedMovie.video}
                className="w-full h-full object-cover"
                autoPlay
                muted={isMuted}
                loop
                onLoadedMetadata={handleVideoLoadedMetadata}
                onError={handleVideoError}
                playsInline
              />
            ) : (
              <motion.img
                key={selectedMovie.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                src={selectedMovie.backdrop}
                alt={selectedMovie.title}
                className="w-full h-full object-cover"
              />
            )}

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="text-2xl font-bold mb-2">{selectedMovie.title}</h1>
              <div className="flex gap-3">
                {selectedMovie.mediaType === "video" && selectedMovie.video && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                    onClick={toggleAudio}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Digital Canvas Network</h2>
          <div className="grid grid-cols-2 gap-4">
            {items.map((movie) => (
              <motion.div
                key={movie.id}
                className={`cursor-pointer group/card transition-all duration-300 relative rounded-lg overflow-hidden ${
                  movie.id === selectedMovie.id ? "ring-2 ring-white" : ""
                }`}
                onClick={() => openMobileModal(movie)}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
              >
                <div className="relative aspect-video">
                  <img
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-sm font-semibold line-clamp-1">{movie.title}</h3>
                    <p className="text-xs text-gray-300 line-clamp-1">{movie.description}</p>
                  </div>
                  {movie.mediaType === "video" && (
                    <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                      <Play className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showMobileModal && modalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:hidden"
            onClick={closeMobileModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm aspect-[4/5] bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-black/50 text-white hover:bg-black/70"
                onClick={closeMobileModal}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="relative w-full h-full">
                {modalItem.mediaType === "video" && modalItem.video ? (
                  <video
                    ref={modalVideoRef}
                    src={modalItem.video}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={modalItem.backdrop || modalItem.image}
                    alt={modalItem.title}
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
                  <h2 className="text-lg font-bold">{modalItem.title}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    {modalItem.year && <span>• {modalItem.year}</span>}
                    {modalItem.rating && <span>• {modalItem.rating}</span>}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">{modalItem.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {modalItem.mediaType === "video" && modalItem.video && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                        onClick={toggleAudio}
                      >
                        {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
