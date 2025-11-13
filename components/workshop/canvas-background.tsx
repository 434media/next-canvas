"use client"

import { useEffect, useRef } from "react"

interface CanvasBackgroundProps {
  isDark: boolean
}

export function CanvasBackground({ isDark }: CanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isDark || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateSize()
    window.addEventListener("resize", updateSize)

    // Draw canvas texture with noise
    const drawTexture = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 30
        data[i] = 10 + noise // R
        data[i + 1] = 10 + noise // G
        data[i + 2] = 10 + noise // B
        data[i + 3] = 255 // A
      }

      ctx.putImageData(imageData, 0, 0)
    }

    drawTexture()

    return () => {
      window.removeEventListener("resize", updateSize)
    }
  }, [isDark])

  if (!isDark) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 opacity-[0.03]"
      style={{ mixBlendMode: "overlay" }}
    />
  )
}
