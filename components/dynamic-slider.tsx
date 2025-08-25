"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Play, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react"
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
  const [mobileScrollPosition, setMobileScrollPosition] = useState(0)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [videoDuration, setVideoDuration] = useState<number>(0)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isManualSelection, setIsManualSelection] = useState(false)
  const autoSwitchRef = useRef<NodeJS.Timeout | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const videoDelayRef = useRef<NodeJS.Timeout | null>(null)
  const mobileScrollRef = useRef<HTMLDivElement>(null)
  const desktopScrollRef = useRef<HTMLDivElement>(null)

  const cardWidth = 282 // 280px width + 2px gap
  const visibleCards = 5 // Number of cards visible at once
  const maxScroll = Math.max(0, (items.length - visibleCards) * cardWidth)

  const mobileCardWidth = 204 // 192px width + 12px gap
  const mobileVisibleCards = 2 // Number of cards visible at once on mobile
  const mobileMaxScroll = Math.max(0, (items.length - mobileVisibleCards) * mobileCardWidth)

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

  const handleVideoEnded = () => {
    if (isManualSelection) {
      setIsManualSelection(false)
      startAutoSwitch()
    }
  }

  const stopCurrentVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const switchToNextItem = () => {
    stopCurrentVideo()

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
    if (isManualSelection) {
      return
    }

    if (autoSwitchRef.current) {
      clearInterval(autoSwitchRef.current)
    }
    const duration = getSwitchDuration()
    autoSwitchRef.current = setInterval(switchToNextItem, duration)
  }, [videoDuration, isVideoLoaded, selectedMovie.mediaType, selectedMovie.video, isManualSelection])

  const stopAutoSwitch = () => {
    if (autoSwitchRef.current) {
      clearInterval(autoSwitchRef.current)
      autoSwitchRef.current = null
    }
  }

  const clearVideoDelay = () => {
    if (videoDelayRef.current) {
      clearTimeout(videoDelayRef.current)
      videoDelayRef.current = null
    }
  }

  const startVideoDelay = () => {
    videoDelayRef.current = setTimeout(() => {
      setShowVideo(true)
    }, 2000) // Adjust the delay time as needed
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
    if (selectedMovie.mediaType === "video" && isVideoLoaded && !isManualSelection) {
      stopAutoSwitch()
      startAutoSwitch()
    }
  }, [videoDuration, isVideoLoaded, startAutoSwitch, isManualSelection])

  const scrollLeft = () => {
    const newPosition = Math.max(0, scrollPosition - cardWidth)
    setScrollPosition(newPosition)
    if (desktopScrollRef.current) {
      desktopScrollRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    const newPosition = Math.min(scrollPosition + cardWidth, maxScroll)
    setScrollPosition(newPosition)
    if (desktopScrollRef.current) {
      desktopScrollRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })
    }
  }

  const mobileScrollLeft = () => {
    const newPosition = Math.max(0, mobileScrollPosition - mobileCardWidth)
    setMobileScrollPosition(newPosition)
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })
    }
  }

  const mobileScrollRight = () => {
    const newPosition = Math.min(mobileScrollPosition + mobileCardWidth, mobileMaxScroll)
    setMobileScrollPosition(newPosition)
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })
    }
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

  const handleVideoSwitch = (movie: DynamicItem) => {
    stopCurrentVideo()
    stopAutoSwitch()
    setIsManualSelection(true)

    const movieIndex = items.findIndex((item) => item.id === movie.id)
    setCurrentItemIndex(movieIndex)
    setSelectedMovie(movie)
    setIsVideoLoaded(false)
    setVideoDuration(0)
    setShowVideo(false)
    clearVideoDelay()
    startVideoDelay()
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
                      loop={!isManualSelection}
                      onLoadedMetadata={handleVideoLoadedMetadata}
                      onError={handleVideoError}
                      onEnded={handleVideoEnded}
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
              ref={desktopScrollRef}
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
                  onClick={() => handleVideoSwitch(movie)}
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
        {/* Main Video Section - Mobile */}
        <div className="h-[60vh] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMovie.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <div className="absolute inset-0 z-0">
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
                    loop={!isManualSelection}
                    onLoadedMetadata={handleVideoLoadedMetadata}
                    onError={handleVideoError}
                    onEnded={handleVideoEnded}
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
              </div>

              <div className="relative z-10 h-full flex items-end p-6">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-3 max-w-sm"
                >
                  <h1 className="text-2xl font-bold">{selectedMovie.title}</h1>
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">{selectedMovie.description}</p>
                  <div className="flex gap-2">
                    {selectedMovie.mediaType === "video" && selectedMovie.video && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-black/50 border-white/20 text-white hover:bg-black/70 w-10 h-10"
                        onClick={toggleAudio}
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Netflix-style Horizontal Scroll Section - Mobile */}
        <div className="xs:h-[35vh] h-[40vh] p-4 bg-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Digital Canvas Network</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-black/50 border-white/20 text-white hover:bg-black/70 w-8 h-8"
                onClick={mobileScrollLeft}
                disabled={mobileScrollPosition === 0}
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-black/50 border-white/20 text-white hover:bg-black/70 w-8 h-8"
                onClick={mobileScrollRight}
                disabled={mobileScrollPosition >= mobileMaxScroll}
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div
            ref={mobileScrollRef}
            className="overflow-x-auto overflow-y-hidden scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="flex gap-3 pb-2" style={{ width: `${items.length * mobileCardWidth}px` }}>
              {items.map((movie) => (
                <motion.div
                  key={movie.id}
                  className={`cursor-pointer group/card transition-all duration-300 relative rounded-lg overflow-hidden flex-shrink-0 w-48 ${
                    movie.id === selectedMovie.id ? "ring-2 ring-white" : ""
                  }`}
                  onClick={() => handleVideoSwitch(movie)}
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
                      <h3 className="text-xs font-semibold line-clamp-1 mb-1">{movie.title}</h3>
                      <p className="text-xs text-gray-300 line-clamp-1">{movie.description}</p>
                    </div>
                    {movie.mediaType === "video" && (
                      <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                        <Play className="h-2 w-2 text-white" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
