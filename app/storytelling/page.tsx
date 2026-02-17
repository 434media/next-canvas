"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { WaveCanvas } from "@/components/wave-canvas"

type Story = {
  title: string
  subtitle: string
  date: string
  href?: string
  external?: boolean
  active: boolean
  video?: string
  previewVideo?: string
}

const stories: Story[] = [
  {
    title: "More Human Than Human",
    subtitle: "AI Conference",
    date: "Feb 28, 2026",
    href: "/conferences/morehumanthanhuman",
    active: true,
    previewVideo:
      "https://devsa-assets.s3.us-east-2.amazonaws.com/HEAD_v01.mp4",
  },
  {
    title: "The Feed",
    subtitle: "Newsletters, Articles & Podcasts",
    date: "Ongoing",
    href: "/thefeed",
    active: true,
    previewVideo:
      "https://ampd-asset.s3.us-east-2.amazonaws.com/digitalcanvas.mov",
  },
  {
    title: "DevSA",
    subtitle: "Community Spotlight",
    date: "Ongoing",
    href: "https://www.devsa.community/",
    external: true,
    active: true,
    previewVideo:
      "https://ampd-asset.s3.us-east-2.amazonaws.com/DEVSA+Web+Banner.mp4",
  },
  {
    title: "Learn2AI",
    subtitle: "Workshop Recap",
    date: "",
    active: true,
    video:
      "https://ampd-asset.s3.us-east-2.amazonaws.com/Learn2AI+-+081825+G.mp4",
    previewVideo:
      "https://ampd-asset.s3.us-east-2.amazonaws.com/Learn2AI+-+081825+G.mp4",
  },
  {
    title: "SDOH Accelerator",
    subtitle: "Program Recap",
    date: "",
    active: true,
    video:
      "https://ampd-asset.s3.us-east-2.amazonaws.com/SDOH+ACCELERATOR+PROGRAM+RECAP_2025.mp4",
    previewVideo:
      "https://ampd-asset.s3.us-east-2.amazonaws.com/SDOH+ACCELERATOR+PROGRAM+RECAP_2025.mp4",
  },
]

/* ─── Fullscreen Video Modal ─── */
function VideoModal({
  src,
  onClose,
}: {
  src: string
  onClose: () => void
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl mx-4 aspect-video"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors font-(family-name:--font-geist-pixel-square) text-xs uppercase tracking-widest"
        >
          Close ✕
        </button>
        <video
          src={src}
          className="w-full h-full object-contain rounded-sm"
          controls
          autoPlay
          playsInline
        />
      </motion.div>
    </motion.div>
  )
}

/* ─── Story Row ─── */
function StoryRow({
  story,
  index,
  onPlayVideo,
}: {
  story: Story
  index: number
  onPlayVideo: (src: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const previewRef = useRef<HTMLVideoElement>(null)
  const rowRef = useRef<HTMLLIElement>(null)

  /* Play/pause preview video when hover state changes */
  useEffect(() => {
    const vid = previewRef.current
    if (!vid) return
    if (hovered) {
      vid.currentTime = 0
      vid.play().catch(() => {})
    } else {
      vid.pause()
      vid.currentTime = 0
    }
  }, [hovered])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!rowRef.current) return
      const rect = rowRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    },
    []
  )

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      setHovered(true)
      if (rowRef.current) {
        const rect = rowRef.current.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    },
    []
  )

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
  }, [])

  const handleClick = () => {
    if (story.video && !story.href) {
      onPlayVideo(story.video)
    }
  }

  /* Determine the wrapper element */
  const isVideoOnly = story.video && !story.href
  const isExternal = story.external && story.href

  const inner = (
    <>
      <div className="flex items-center gap-4 min-w-0">
        <span className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base text-white uppercase tracking-wide truncate">
          {story.title}
        </span>
        <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-widest text-white/30">
          {story.subtitle}
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs font-mono text-white/40">{story.date}</span>
        {isVideoOnly ? (
          <div className="flex items-center gap-1 text-white/40 group-hover:text-[#fbbf24] transition-colors overflow-hidden w-6">
            {/* Play icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-0 -translate-x-6"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-white/40 group-hover:text-[#fbbf24] transition-colors overflow-hidden w-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-0 -translate-x-6"
            >
              <path d="m11.875 6.981-.608.609 3.985 3.981H7.285v.858h7.967l-3.985 3.981.608.609L16.89 12z" />
            </svg>
          </div>
        )}
      </div>
    </>
  )

  const rowClassName = `group relative flex items-center justify-between py-4 px-2 transition-all duration-300 w-full text-left ${
    story.active
      ? "hover:bg-white/5 cursor-pointer"
      : "opacity-50 cursor-default"
  }`

  return (
    <motion.li
      ref={rowRef}
      className="relative border-b border-[#333]"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.8 + index * 0.08 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {isVideoOnly ? (
        <button onClick={handleClick} className={rowClassName}>
          {inner}
        </button>
      ) : isExternal ? (
        <a
          href={story.href}
          target="_blank"
          rel="noopener noreferrer"
          className={rowClassName}
        >
          {inner}
        </a>
      ) : (
        <Link href={story.href || "#"} className={rowClassName}>
          {inner}
        </Link>
      )}

      {/* Hover preview video — always mounted for instant playback */}
      {story.previewVideo && (
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="fixed z-30 pointer-events-none"
              style={{
                left: (rowRef.current?.getBoundingClientRect().left ?? 0) + mousePos.x + 16,
                top: (rowRef.current?.getBoundingClientRect().top ?? 0) + mousePos.y - 100,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <div className="w-52 aspect-video rounded overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] bg-black">
                <video
                  ref={previewRef}
                  src={story.previewVideo}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  loop
                  preload="auto"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.li>
  )
}

/* ─── Page ─── */
export default function StorytellingPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  return (
    <div className="relative min-h-dvh bg-[#050505] overflow-hidden">
      {/* Fullscreen video modal */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal
            src={activeVideo}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-dvh flex flex-col items-center justify-center">
        {/* Wave Canvas Background */}
        <div className="absolute inset-0 z-0">
          <WaveCanvas className="absolute inset-0" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
          <motion.h1
            className="font-(family-name:--font-geist-pixel-square) text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white uppercase tracking-tight leading-none mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[#fbbf24]">Human</span>
            <span className="text-[#00f2ff]">+</span>
          </motion.h1>

          <motion.p
            className="text-white/50 text-sm md:text-base font-mono uppercase tracking-[0.2em] mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Builders x Bits
          </motion.p>

          <motion.p
            className="text-white/40 text-base md:text-lg max-w-xl leading-relaxed mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            This is where we explore the human side of innovation in a world of
            increasingly capable AI.
          </motion.p>
        </div>

        {/* Story List */}
        <motion.div
          className="relative z-10 w-full max-w-3xl mx-auto mt-12 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <ul className="border-t border-[#333]">
            {stories.map((story, index) => (
              <StoryRow
                key={story.title}
                story={story}
                index={index}
                onPlayVideo={(src) => setActiveVideo(src)}
              />
            ))}
          </ul>
        </motion.div>
      </section>
    </div>
  )
}
