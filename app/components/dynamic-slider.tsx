"use client"

import { useState } from "react"
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
  items?: DynamicItem[]
}

const defaultMovies: DynamicItem[] = [
  {
    id: "1",
    title: "Stranger Things",
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    genre: "Sci-Fi, Horror, Drama",
    year: "2016",
    rating: "TV-14",
    image: "/placeholder.svg?height=200&width=350",
    backdrop: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "2",
    title: "The Crown",
    description:
      "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    genre: "Drama, History",
    year: "2016",
    rating: "TV-MA",
    image: "/placeholder.svg?height=200&width=350",
    backdrop: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "3",
    title: "Ozark",
    description:
      "A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.",
    genre: "Crime, Drama, Thriller",
    year: "2017",
    rating: "TV-MA",
    image: "/placeholder.svg?height=200&width=350",
    backdrop: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "4",
    title: "The Witcher",
    description:
      "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    genre: "Action, Adventure, Drama",
    year: "2019",
    rating: "TV-MA",
    image: "/placeholder.svg?height=200&width=350",
    backdrop: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "5",
    title: "Money Heist",
    description:
      "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
    genre: "Action, Crime, Mystery",
    year: "2017",
    rating: "TV-MA",
    image: "/placeholder.svg?height=200&width=350",
    backdrop: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "6",
    title: "Bridgerton",
    description:
      "Wealth, lust, and betrayal set in the backdrop of Regency era England, seen through the eyes of the powerful Bridgerton family.",
    genre: "Drama, Romance",
    year: "2020",
    rating: "TV-MA",
    image: "/placeholder.svg?height=200&width=350",
    backdrop: "/placeholder.svg?height=600&width=1000",
  },
]

export default function DynamicSlider({ items = defaultMovies }: DynamicSliderProps) {
  const [selectedMovie, setSelectedMovie] = useState(items[0])
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const cardWidth = 282 // 280px width + 2px gap
  const visibleCards = 4 // Number of cards visible at once
  const maxScroll = Math.max(0, (items.length - visibleCards) * cardWidth)

  const scrollLeft = () => {
    const newPosition = Math.max(0, scrollPosition - cardWidth)
    setScrollPosition(newPosition)
    setActiveIndex(Math.floor(newPosition / cardWidth))
  }

  const scrollRight = () => {
    const newPosition = Math.min(scrollPosition + cardWidth, maxScroll)
    setScrollPosition(newPosition)
    setActiveIndex(Math.floor(newPosition / cardWidth))
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
    <div className="min-h-screen bg-black text-white">
      {/* Movie Slider */}
      <div className="relative px-6 mb-4">

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
          <div className="overflow-hidden px-1 py-3 pb-6 pl-4">
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
                    setSelectedMovie(movie)
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
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-white"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Selected Movie Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMovie.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="px-6 py-16 relative"
        >
          {/* Full Width Backdrop Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
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
          <div className="relative z-10 max-w-6xl mx-auto">
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
    </div>
  )
}