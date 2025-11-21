"use client"

import { useAudio } from "./audio-provider"
import { Play, Pause, SkipForward, Music } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

export function MusicBox() {
  const { isPlaying, togglePlay, nextTrack, currentTrackIndex, playlist } = useAudio()
  const [visualizerBars, setVisualizerBars] = useState<number[]>([])

  // Simulate visualizer
  useEffect(() => {
    if (!isPlaying) {
      setVisualizerBars(Array(8).fill(10))
      return
    }
    const interval = setInterval(() => {
      setVisualizerBars(Array.from({ length: 8 }, () => Math.random() * 60 + 20))
    }, 100)
    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className="relative group w-56 h-40 transform transition-transform hover:scale-105">
      {/* Box Background & Clipped Elements */}
      <div className="absolute inset-0 bg-red-900/90 backdrop-blur-md border-4 border-yellow-500/50 rounded-xl shadow-[0_0_40px_rgba(220,38,38,0.3)] overflow-hidden">
        {/* Decorative Corner Ornaments */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />

        {/* Decorative Snow/Sparkles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
      </div>

      {/* Content Layer (Allows Overflow for Logo) */}
      <div className="relative w-full h-full flex flex-col items-center justify-center pt-2">
        {/* Green Plate */}
        <div className="relative w-32 h-6 bg-green-800 rounded-full border border-yellow-500/30 shadow-sm flex items-center justify-center z-20 mb-3">
          {/* Logo Overlay - The only element extending past the box */}
          <div className="absolute w-48 h-24 -top-11 left-1/2 -translate-x-1/2 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
            <Image src="https://ampd-asset.s3.us-east-2.amazonaws.com/flyers-63-xmas.png" alt="Digital Canvas" fill className="object-contain" />
          </div>
        </div>

        {/* Visualizer Screen */}
        <div className="w-40 h-12 bg-black/80 border-2 border-yellow-600/50 rounded-lg overflow-hidden flex items-center justify-center shadow-inner z-10 relative">
          {/* Screen Glare */}
          <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-white/5 to-transparent pointer-events-none z-10" />

          {/* Content */}
          <div className="w-full h-full p-1 flex flex-col items-center justify-center gap-0.5">
            {isPlaying ? (
              <>
                <div className="flex items-end justify-center gap-1 h-5 w-full mb-0.5">
                  {visualizerBars.map((height, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-t-sm transition-all duration-100 ${
                        i % 3 === 0 ? "bg-red-500" : i % 3 === 1 ? "bg-green-500" : "bg-yellow-400"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="text-[8px] text-yellow-400 font-medium truncate w-full text-center animate-pulse px-1">
                  {playlist?.[currentTrackIndex]?.title || "Unknown Track"}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center text-white/40">
                <Music className="w-4 h-4 mb-0.5 opacity-50" />
                <span className="text-[8px] font-medium tracking-wider">PRESS PLAY</span>
              </div>
            )}
          </div>
        </div>

        {/* Controls / Buttons */}
        <div className="flex justify-center gap-4 z-10 mt-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="group/btn relative w-8 h-8 rounded-full bg-green-700 shadow-[0_2px_0_#14532d] active:shadow-none active:translate-y-0.5 flex items-center justify-center transition-all border border-green-400/30"
          >
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/30 to-transparent" />
            {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
          </button>

          {/* Next Button */}
          <button
            onClick={nextTrack}
            className="group/btn relative w-8 h-8 rounded-full bg-red-700 shadow-[0_2px_0_#7f1d1d] active:shadow-none active:translate-y-0.5 flex items-center justify-center transition-all border border-red-400/30"
          >
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/30 to-transparent" />
            <SkipForward className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
