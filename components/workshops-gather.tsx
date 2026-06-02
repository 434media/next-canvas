'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  baseX: number
  baseY: number
  x: number
  y: number
  phase: number
  radius: number
}

const PULL_COLOR = '#FF006E'
const REST_COLOR = '#ffffff'

export default function WorkshopsGather() {
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
      // Density scales with canvas area so the field stays roughly consistent
      // across mobile and desktop hero heights.
      const referenceArea = 1200 * 700
      const target = Math.max(
        50,
        Math.floor(90 * Math.sqrt((width * height) / referenceArea)),
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
          radius: 0.8 + Math.random() * 1.6,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Wrap time to keep float precision stable over long sessions.
      const time = (performance.now() * 0.001) % 1000
      const mouse = mousePositionRef.current
      const pullRadius = 280

      for (const p of particles) {
        // Every particle has an ambient anchor — slow drift around its origin
        // so the field looks alive even when the cursor is elsewhere.
        const driftAmp = 5
        const driftSpeed = 0.3
        const baseTargetX =
          p.baseX + Math.sin(time * driftSpeed + p.phase) * driftAmp
        const baseTargetY =
          p.baseY +
          Math.cos(time * driftSpeed * 0.7 + p.phase * 1.5) * driftAmp * 0.8

        let targetX = baseTargetX
        let targetY = baseTargetY
        let intensity = 0 // 0 = pure drift, 1 = fully gathered around cursor

        if (mouse.inside) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < pullRadius) {
            // Soft falloff curve — gradually pulls the target between the
            // particle's idle anchor and the cursor position. Capped so
            // particles cluster *around* the cursor instead of piling on it.
            const t = 1 - dist / pullRadius
            const blend = Math.pow(t, 0.65) * 0.82
            targetX = baseTargetX * (1 - blend) + mouse.x * blend
            targetY = baseTargetY * (1 - blend) + mouse.y * blend
            intensity = t
          }
        }

        // Smooth motion toward the computed target.
        p.x += (targetX - p.x) * 0.08
        p.y += (targetY - p.y) * 0.08

        // Visual response — particles brighten and tint magenta as they cluster.
        const alpha = 0.32 + intensity * 0.55
        ctx.fillStyle = intensity > 0.35 ? PULL_COLOR : REST_COLOR
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
