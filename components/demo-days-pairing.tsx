'use client'

import { useEffect, useRef } from 'react'

type ParticleType = 'builder' | 'investor'

interface Particle {
  type: ParticleType
  baseX: number
  baseY: number
  x: number
  y: number
  phase: number
  speed: number
  radius: number
}

const BUILDER_COLOR = '#ffffff'
const INVESTOR_COLOR = '#fbbf24'
const LINE_COLOR = '#fbbf24'

export default function DemoDaysPairing() {
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

    const makeParticle = (type: ParticleType): Particle => {
      const baseX = Math.random() * width
      const baseY = Math.random() * height
      return {
        type,
        baseX,
        baseY,
        x: baseX,
        y: baseY,
        phase: Math.random() * Math.PI * 2,
        // Each particle has its own drift speed so the two populations look
        // independent — no synchronized swimming.
        speed: 0.35 + Math.random() * 0.5,
        radius: 1 + Math.random() * 1.4,
      }
    }

    const createParticles = () => {
      particles = []
      // Density scales with canvas area; split evenly between the two roles.
      const referenceArea = 1200 * 700
      const totalTarget = Math.max(
        56,
        Math.floor(80 * Math.sqrt((width * height) / referenceArea)),
      )
      const halfTarget = Math.floor(totalTarget / 2)
      for (let i = 0; i < halfTarget; i++) particles.push(makeParticle('builder'))
      for (let i = 0; i < halfTarget; i++) particles.push(makeParticle('investor'))
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Wrap time before float precision degrades over very long sessions.
      const time = (performance.now() * 0.001) % 1000
      const mouse = mousePositionRef.current

      const driftAmp = 32
      const connectRadius = 115
      const cursorReach = 190

      // Update positions — every particle drifts around its anchor on a
      // unique sinusoidal path so the two populations cross paths organically.
      for (const p of particles) {
        const targetX =
          p.baseX + Math.sin(time * p.speed + p.phase) * driftAmp
        const targetY =
          p.baseY +
          Math.cos(time * p.speed * 0.7 + p.phase * 1.5) * driftAmp * 0.85
        p.x += (targetX - p.x) * 0.045
        p.y += (targetY - p.y) * 0.045
      }

      // Conversations — lines form only between a builder and an investor.
      // Same-type pairs are skipped so the visual stays a cross-population mesh.
      ctx.strokeStyle = LINE_COLOR
      ctx.lineWidth = 0.6
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          if (a.type === b.type) continue
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectRadius) {
            ctx.globalAlpha = (1 - dist / connectRadius) * 0.32
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      // Cursor as a third participant — connects to both populations.
      if (mouse.inside) {
        ctx.strokeStyle = LINE_COLOR
        ctx.lineWidth = 0.85
        for (const p of particles) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < cursorReach) {
            ctx.globalAlpha = (1 - dist / cursorReach) * 0.5
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
          }
        }
        ctx.globalAlpha = 1
      }

      // Particles — opacity ramps up near the cursor so the field "lights up."
      for (const p of particles) {
        let alpha = 0.5
        if (mouse.inside) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < cursorReach) {
            alpha = 0.5 + (1 - dist / cursorReach) * 0.45
          }
        }
        ctx.fillStyle = p.type === 'builder' ? BUILDER_COLOR : INVESTOR_COLOR
        ctx.globalAlpha = alpha
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
