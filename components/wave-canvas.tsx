"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { createNoise3D } from "simplex-noise"

/**
 * Animated 3D-style wave canvas inspired by Stripe Tour.
 * Uses simplex noise to generate smooth, organic wave motion
 * with the More Human Than Human color palette.
 */
export function WaveCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const noise = createNoise3D()
    let w = (canvas.width = canvas.offsetWidth * 2)
    let h = (canvas.height = canvas.offsetHeight * 2)
    let nt = 0
    let animationId: number

    const waveColors = [
      "rgba(255,153,0,0.4)",   // #ff9900  orange
      "rgba(0,242,255,0.35)",  // #00f2ff  cyan
      "rgba(251,191,36,0.3)",  // #fbbf24  gold
      "rgba(255,153,0,0.25)",  // #ff9900  orange (softer)
      "rgba(0,242,255,0.2)",   // #00f2ff  cyan (softer)
      "rgba(251,191,36,0.15)", // #fbbf24  gold (softer)
    ]

    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth * 2
      h = canvas.height = canvas.offsetHeight * 2
    }

    window.addEventListener("resize", handleResize)

    const render = () => {
      ctx.fillStyle = "#050505"
      ctx.fillRect(0, 0, w, h)

      nt += 0.0015

      for (let i = 0; i < waveColors.length; i++) {
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.strokeStyle = waveColors[i]

        // Each wave has a different vertical offset
        const yBase = h * 0.3 + i * (h * 0.08)

        for (let x = 0; x < w; x += 4) {
          const noiseVal = noise(x / 600, 0.3 * i, nt)
          const amplitude = 60 + i * 15
          const y = yBase + noiseVal * amplitude
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
        ctx.closePath()

        // Fill below the wave with a gradient fade
        ctx.beginPath()
        for (let x = 0; x < w; x += 4) {
          const noiseVal = noise(x / 600, 0.3 * i, nt)
          const amplitude = 60 + i * 15
          const y = yBase + noiseVal * amplitude
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.lineTo(w, h)
        ctx.lineTo(0, h)
        ctx.closePath()

        const grad = ctx.createLinearGradient(0, yBase, 0, h)
        grad.addColorStop(0, waveColors[i])
        grad.addColorStop(1, "rgba(5,5,5,0)")
        ctx.fillStyle = grad
        ctx.fill()
      }

      animationId = requestAnimationFrame(render)
    }

    if (!prefersReducedMotion) {
      render()
    } else {
      // Draw a single static frame
      ctx.fillStyle = "#050505"
      ctx.fillRect(0, 0, w, h)
      for (let i = 0; i < waveColors.length; i++) {
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.strokeStyle = waveColors[i]
        const yBase = h * 0.3 + i * (h * 0.08)
        for (let x = 0; x < w; x += 4) {
          const noiseVal = noise(x / 600, 0.3 * i, 0)
          const amplitude = 60 + i * 15
          const y = yBase + noiseVal * amplitude
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
        ctx.closePath()
      }
    }

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    const cleanup = draw()
    return cleanup
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ width: "100%", height: "100%" }}
    />
  )
}
