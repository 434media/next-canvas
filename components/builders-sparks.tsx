'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  baseX: number
  baseY: number
  x: number
  y: number
  phase: number
  speed: number
  radius: number
  // Recent positions — used to draw the trail. Newest first.
  history: { x: number; y: number }[]
}

const HEAD_COLOR = '#ffffff'
const TRAIL_COLOR = '#88FF00'
const TRAIL_LENGTH = 22

export default function BuildersSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // inside = false means viewer is outside the hero; x/y are canvas-local pixels.
  const mousePositionRef = useRef({ x: 0, y: 0, inside: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let width = 0
    let height = 0
    let animationFrameId = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      createParticles()
    }

    const createParticles = () => {
      particles = []
      // Lower density than other heroes — trails add their own visual weight,
      // so a packed field would read as a green wash.
      const referenceArea = 1200 * 700
      const target = Math.max(
        40,
        Math.floor(60 * Math.sqrt((width * height) / referenceArea)),
      )
      for (let i = 0; i < target; i++) {
        const baseX = Math.random() * width
        const baseY = Math.random() * height
        particles.push({
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          phase: Math.random() * Math.PI * 2,
          // Each particle has its own drift cadence — paths cross naturally.
          speed: 0.3 + Math.random() * 0.5,
          radius: 0.8 + Math.random() * 1.1,
          history: [],
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Wrap time before float precision degrades over very long sessions.
      const time = (performance.now() * 0.001) % 1000
      const mouse = mousePositionRef.current

      const driftAmp = 42

      for (const p of particles) {
        // Idle target — slow sinusoidal drift around the particle's anchor.
        const anchorX =
          p.baseX + Math.sin(time * p.speed + p.phase) * driftAmp
        const anchorY =
          p.baseY +
          Math.cos(time * p.speed * 0.7 + p.phase * 1.5) * driftAmp * 0.85

        // Cursor pulls particles toward it — sparks bend toward the focal point.
        let targetX = anchorX
        let targetY = anchorY
        if (mouse.inside) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const pullRadius = 260
          if (dist < pullRadius) {
            const t = 1 - dist / pullRadius
            const blend = Math.pow(t, 0.7) * 0.65
            targetX = anchorX * (1 - blend) + mouse.x * blend
            targetY = anchorY * (1 - blend) + mouse.y * blend
          }
        }

        // Smooth motion toward target — fast enough to leave a visible trail.
        p.x += (targetX - p.x) * 0.075
        p.y += (targetY - p.y) * 0.075

        // Push current position to history — newest at index 0.
        p.history.unshift({ x: p.x, y: p.y })
        if (p.history.length > TRAIL_LENGTH) p.history.pop()
      }

      // Pass 1 — trails. Drawn before heads so heads sit on top.
      ctx.strokeStyle = TRAIL_COLOR
      ctx.lineWidth = 0.9
      ctx.lineCap = 'round'
      for (const p of particles) {
        for (let i = 0; i < p.history.length - 1; i++) {
          // Fade from full at the head (i=0) to transparent at the tail.
          const alpha = (1 - i / TRAIL_LENGTH) * 0.55
          ctx.globalAlpha = alpha
          ctx.beginPath()
          ctx.moveTo(p.history[i].x, p.history[i].y)
          ctx.lineTo(p.history[i + 1].x, p.history[i + 1].y)
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1

      // Pass 2 — particle heads. White, slightly brighter than the trails.
      for (const p of particles) {
        ctx.fillStyle = HEAD_COLOR
        ctx.globalAlpha = 0.85
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        inside: true,
      }
    }

    const handleMouseLeave = () => {
      mousePositionRef.current = { x: 0, y: 0, inside: false }
    }

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
