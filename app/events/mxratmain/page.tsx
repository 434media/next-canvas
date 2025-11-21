"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import ChristmasScene from "@/components/christmas/christmas-scene"
import { SceneErrorBoundary } from "@/components/christmas/scene-error-boundary"
import { AudioProvider, useAudio } from "@/components/christmas/audio-provider"
import { ColorProvider, useColor } from "@/components/christmas/color-context"
import { Calendar, MapPin, ArrowRight, Play, Pause, Music, SkipForward, Ticket } from "lucide-react"
import { useState, useEffect } from "react"
import { RsvpModal } from "@/components/christmas/rsvp-modal"

function LogoHeader() {
  const { toggleColor } = useColor()
  const { isPlaying, togglePlay, playlist, currentTrackIndex, nextTrack } = useAudio()
  const [visualizerBars, setVisualizerBars] = useState<number[]>([])

  // Simulate visualizer
  useEffect(() => {
    if (!isPlaying) {
      setVisualizerBars(Array(12).fill(10))
      return
    }
    const interval = setInterval(() => {
      setVisualizerBars(Array.from({ length: 12 }, () => Math.random() * 60 + 20))
    }, 100)
    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <header className="w-full flex flex-col items-center justify-center pt-4 pb-2 px-4 animate-in fade-in slide-in-from-top-8 duration-1000 z-20">
      {/* Logo Container - Acts as Play/Pause Button */}
      <div
        className="mt-16 md:mt-0 relative w-full max-w-4xl aspect-3/1 md:aspect-3/1 scale-190 md:scale-100 cursor-pointer hover:scale-105 transition-transform duration-300 group"
        onClick={() => {
          togglePlay()
          toggleColor() // Keep the color toggle effect on click too
        }}
      >
        {/* Subtle glow effect behind logo */}
        <div className={`absolute inset-0 bg-white/10 blur-3xl rounded-full transition-opacity duration-500 ${isPlaying ? 'opacity-60 animate-pulse' : 'opacity-30 group-hover:opacity-50'}`} />
        
        <Image
          src="https://ampd-asset.s3.us-east-2.amazonaws.com/mxr.png"
          alt="Digital Canvas Christmas"
          fill
          className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] relative z-10"
          priority
        />

        {/* Play/Pause Overlay Hint */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-3 border border-white/20">
            {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
          </div>
        </div>
      </div>

      {/* Visualizer & Song Info */}
      <div className="w-full max-w-md mt-2 md:-mt-10 flex flex-col items-center justify-center h-12">
        {isPlaying ? (
          <div className="flex flex-col items-center w-full animate-in fade-in slide-in-from-top-2 duration-500">
            {/* Visualizer Bars */}
            <div className="flex items-end justify-center gap-1 h-6 w-full mb-1">
              {visualizerBars.map((height, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-t-sm transition-all duration-100 ${
                    i % 3 === 0 ? "bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]" : 
                    i % 3 === 1 ? "bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" : 
                    "bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.5)]"
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            {/* Song Title */}
            <div className="flex items-center gap-2 mt-1">
              <div className="text-[10px] md:text-xs text-yellow-400 font-medium tracking-wider uppercase text-center drop-shadow-md">
                Now Playing: {playlist?.[currentTrackIndex]?.title || "Christmas Mix"}
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  nextTrack()
                }}
                className="p-1 hover:bg-white/10 rounded-full transition-colors group/skip"
                title="Next Song"
              >
                <SkipForward className="w-3 h-3 text-white/50 group-hover/skip:text-white transition-colors" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-white/40 text-xs font-medium tracking-widest uppercase animate-pulse">
            <Music className="w-3 h-3" />
            <span>Tap Logo to Play Music</span>
            <Music className="w-3 h-3" />
          </div>
        )}
      </div>
    </header>
  )
}

function ChristmasContent() {
  const { isPlaying } = useAudio()
  const [isRsvpOpen, setIsRsvpOpen] = useState(false)

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black text-white selection:bg-white/20 flex flex-col">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <SceneErrorBoundary>
          <ChristmasScene />
        </SceneErrorBoundary>
      </div>

      {/* Content Overlay - Flex Column to fill screen without scroll */}
      <div className="relative z-10 flex flex-col h-full pt-12 pb-6 px-4 pointer-events-none justify-start md:justify-center">
        {/* Added pointer-events-auto to interactive children */}
        <div className="pointer-events-auto w-full flex justify-center shrink-0">
          <LogoHeader />
        </div>

        {/* Event Details below the logo */}
        <div className="flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-4 duration-1000 delay-200 pointer-events-auto mt-2 md:mt-4 shrink-0">
          <div className={`backdrop-blur-md border rounded-2xl p-4 md:p-6 max-w-md w-full text-center transition-all duration-700 ${
            isPlaying 
              ? "bg-black/60 border-yellow-500/30 shadow-[0_0_30px_rgba(250,204,21,0.15)]" 
              : "bg-black/40 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          }`}>
            {/* Living Border Effect when playing */}
            {isPlaying && (
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-yellow-500/10 to-transparent opacity-50 animate-pulse" />
              </div>
            )}

            <h2 className="text-2xl md:text-2xl font-bold mb-2 bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">
              Happy Holidays from <span className="font-menda-black block">434 MEDIA</span>
            </h2>
            <p className="text-white/60 mb-4 text-base md:text-sm leading-relaxed">
              This is a party for molecules & musicians, scientist & screwups, techies & teachers, founders & failures, gamers & grunts. If you belong to something, you belong.
            </p>

            <div className="flex flex-col gap-2 mb-5">
              <div className="flex items-center justify-center gap-2 text-xs md:text-xs text-balance tracking-tighter text-white/80">
                <Ticket className="w-3 h-3 md:w-4 md:h-4 text-white/60" />
                <span>Admission: The Worst White Elephant Gift ever Received</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-white/80">
                <Calendar className="w-3 h-3 md:w-4 md:h-4 text-white/60" />
                <span>Dec 12th, 2025 • 7:00 PM</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-white/80">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 text-white/60" />
                <span>300 Main Rooftop</span>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => setIsRsvpOpen(true)}
              className="w-full bg-white text-black hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 font-medium text-sm h-10 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              RSVP Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <RsvpModal isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)} />
    </main>
  )
}

export default function Page() {
  return (
    <AudioProvider>
      <ColorProvider>
        <ChristmasContent />
      </ColorProvider>
    </AudioProvider>
  )
}
