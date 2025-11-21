"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type ColorContextType = {
  treeColor: string
  toggleColor: () => void
}

const ColorContext = createContext<ColorContextType | undefined>(undefined)

const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#eab308", "#a855f7"] // Green, Red, Blue, Gold, Purple

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [colorIndex, setColorIndex] = useState(0)

  // Timer to change colors automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % COLORS.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const toggleColor = () => {
    setColorIndex((prev) => (prev + 1) % COLORS.length)
  }

  return (
    <ColorContext.Provider value={{ treeColor: COLORS[colorIndex], toggleColor }}>{children}</ColorContext.Provider>
  )
}

export function useColor() {
  const context = useContext(ColorContext)
  if (context === undefined) {
    throw new Error("useColor must be used within a ColorProvider")
  }
  return context
}
