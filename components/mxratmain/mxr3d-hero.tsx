"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ChristmasScene from "./christmas-scene"
import { SceneErrorBoundary } from "./scene-error-boundary"
import { AudioProvider, useAudio } from "./audio-provider"
import { Calendar, MapPin, ArrowRight, Play, Pause, Music, SkipForward, Ticket } from "lucide-react"
import { useState, useEffect } from "react"

function LogoHeader() {
  const { isPlaying, togglePlay, playlist, currentTrackIndex, nextTrack } = useAudio()
  const [visualizerBars, setVisualizerBars] = useState<number[]>([])

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
    <header className="w-full flex flex-col items-center justify-center pt-2 pb-1 px-4 animate-in fade-in slide-in-from-top-8 duration-1000 z-20">
      <div
        className="mt-12 md:mt-0 relative w-full max-w-2xl md:max-w-4xl aspect-3/1 scale-150 md:scale-100 cursor-pointer hover:scale-105 transition-transform duration-300 group"
        onClick={() => togglePlay()}
      >
        <div
          className={`absolute inset-0 bg-white/10 blur-3xl rounded-full transition-opacity duration-500 ${isPlaying ? "opacity-60 animate-pulse" : "opacity-30 group-hover:opacity-50"}`}
        />
        <Image
          src="https://ampd-asset.s3.us-east-2.amazonaws.com/mxr.png"
          alt="Digital Canvas Christmas"
          fill
          className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] relative z-10"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-3 border border-white/20">
            {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mt-1 md:-mt-6 flex flex-col items-center justify-center h-10">
        {isPlaying ? (
          <div className="flex flex-col items-center w-full animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="flex items-end justify-center gap-1 h-5 w-full mb-1">
              {visualizerBars.map((height, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-t-sm transition-all duration-100 ${
                    i % 3 === 0
                      ? "bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]"
                      : i % 3 === 1
                        ? "bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"
                        : "bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.5)]"
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[9px] md:text-xs text-yellow-400 font-medium tracking-wider uppercase text-center drop-shadow-md">
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
          <div className="flex items-center gap-2 text-white/40 text-[10px] font-medium tracking-widest uppercase animate-pulse">
            <Music className="w-3 h-3" />
            <span>Tap Logo to Play</span>
            <Music className="w-3 h-3" />
          </div>
        )}
      </div>
    </header>
  )
}

function ChristmasContent() {
  const { isPlaying } = useAudio()

  return (
    <main className="relative h-screen w-full bg-black text-white selection:bg-white/20 flex flex-col overflow-hidden">
      <div className="fixed inset-0 z-0">
        <SceneErrorBoundary>
          <ChristmasScene />
        </SceneErrorBoundary>
      </div>

      <div className="relative z-10 flex flex-col h-full py-2 px-4 pointer-events-none justify-between">
        <div className="pointer-events-auto w-full flex justify-center shrink-0">
          <LogoHeader />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-4 duration-1000 delay-200 pointer-events-auto">
          <div
            className={`backdrop-blur-md border rounded-2xl p-3 md:p-5 max-w-sm w-full text-center transition-all duration-700 ${
              isPlaying
                ? "bg-black/60 border-yellow-500/30 shadow-[0_0_30px_rgba(250,204,21,0.15)]"
                : "bg-black/40 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            }`}
          >
            {isPlaying && (
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-yellow-500/10 to-transparent opacity-50 animate-pulse" />
              </div>
            )}
            <h2 className="text-lg md:text-xl font-bold mb-2 bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">
              A Free Community Experience by <span className="font-menda-black block">434 MEDIA</span>
            </h2>
            <p className="text-white/60 mb-3 text-xs md:text-sm leading-relaxed md:tracking-tighter tracking-normal">
              A holiday party for molecules & musicians, scientists & screwups, techies & teachers, founders & funders,
              gamers & grunts. If you belong to something, you belong.
            </p>
            <div className="flex flex-col gap-1.5 mb-4">
              <div className="flex items-center justify-center gap-2 text-[10px] md:text-xs text-balance tracking-tighter text-white/80">
                <Ticket className="w-3 h-3 text-white/60 shrink-0" />
                <span>Admission: Bring an unwrapped children&apos;s toy (ages 2+)</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-[10px] md:text-xs text-white/80">
                <Calendar className="w-3 h-3 text-white/60 shrink-0" />
                <span>Dec 12th, 2025 • 7:00 PM</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-[10px] md:text-xs text-white/80">
                <MapPin className="w-3 h-3 text-white/60 shrink-0" />
                <span>300 Main Rooftop</span>
              </div>
            </div>

            <Button
              asChild
              size="default"
              className="w-full bg-white text-black hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 font-medium text-sm h-9 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Link href="/events/mxratmain/rsvp">
                RSVP Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="h-4 shrink-0" />
      </div>
    </main>
  )
}

export default function Mxr3dHero() {
  return (
    <AudioProvider>
      <ChristmasContent />
    </AudioProvider>
  )
}
