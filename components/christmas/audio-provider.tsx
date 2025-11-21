"use client"

import type React from "react"
import { createContext, useContext, useRef, useState, useEffect } from "react"

interface AudioContextType {
  isPlaying: boolean
  togglePlay: () => void
  analyser: AnalyserNode | null
  currentTrackIndex: number
  nextTrack: () => void
  playlist: { title: string; url: string }[]
  hasError: boolean
}

const AudioContext = createContext<AudioContextType | null>(null)

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) throw new Error("useAudio must be used within an AudioProvider")
  return context
}

const PLAYLIST = [
  {
    title: "Jingle Bells (Chill)",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Jingle_Bells_%28Calm%29_%28ISRC_USUAN1100188%29.mp3",
  },
  {
    title: "We Wish You a Merry Christmas",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a6/We_Wish_you_a_Merry_Christmas_%28ISRC_USUAN1100369%29.mp3",
  },
  {
    title: "Deck the Halls",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Deck_the_Halls_A_%28ISRC_USUAN1100263%29.mp3",
  },
  {
    title: "Christmas Rap (Hip Hop)",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Christmas_Rap_%28ISRC_USUAN1500080%29.mp3",
  },
]

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [hasError, setHasError] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)

  // Initialize Audio Context on first user interaction
  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      const ctx = new AudioContextClass()
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256 // Resolution of the audio data

      audioContextRef.current = ctx
      analyserRef.current = analyser

      if (audioRef.current) {
        const source = ctx.createMediaElementSource(audioRef.current)
        source.connect(analyser)
        analyser.connect(ctx.destination)
        sourceRef.current = source
      }
    } else if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume()
    }
  }

  const togglePlay = async () => {
    if (!audioRef.current) return

    // Try to initialize audio context, but don't fail if it's already running or blocked
    try {
      initAudio()
    } catch (e) {
      console.warn("Audio context init failed:", e)
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
        setHasError(false)
      } catch (err) {
        console.error("Playback failed", err)
        setHasError(true)
      }
    }
  }

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length)
  }

  // Handle track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[currentTrackIndex].url
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.error("Play error:", e))
      }
    }
  }, [currentTrackIndex])

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        togglePlay,
        analyser: analyserRef.current,
        currentTrackIndex,
        nextTrack,
        playlist: PLAYLIST,
        hasError,
      }}
    >
      <audio
        ref={audioRef}
        crossOrigin="anonymous"
        onEnded={nextTrack}
        onError={(e) => {
          const target = e.currentTarget
          const error = target.error
          console.error("Audio error details:", {
            code: error?.code,
            message: error?.message,
            src: target.src,
            networkState: target.networkState,
            readyState: target.readyState,
          })
          setHasError(true)
          // If CORS fails, we could try removing crossOrigin, but that breaks the visualizer.
          // For now, we rely on the reliable Wikimedia URLs.
        }}
      />
      {children}
    </AudioContext.Provider>
  )
}
