'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  speed: number
  phase: number
  radius: number
}

const FLOW_COLOR = '#ffffff'
const ACCENT = '#FF006E'

export default function WorkshopsFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // inside = false means the viewer is outside the hero; x/y are canvas-local pixels.
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
    let lastTime = performance.now()

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
      // Density scales with canvas area so the current looks roughly consistent
      // across viewport sizes.
      const referenceArea = 1200 * 700
      const target = Math.max(
        70,
        Math.floor(160 * Math.sqrt((width * height) / referenceArea)),
      )
      for (let i = 0; i < target; i++) {
        particles.push(spawnParticle(true))
      }
    }

    // Spawn a particle. When `initial` is true, distribute across the canvas
    // so the field is full on the first frame instead of empty-then-filling.
    const spawnParticle = (initial: boolean): Particle => {
      const radius = 0.6 + Math.random() * 1.4
      // Larger particles flow slightly faster — gives a faint parallax/depth read.
      const speed = 40 + Math.random() * 70 + radius * 12
      return {
        x: initial ? Math.random() * width : -10 - Math.random() * 40,
        y: Math.random() * height,
        speed,
        phase: Math.random() * Math.PI * 2,
        radius,
      }
    }

    const animate = (now: number) => {
      // Clamp dt so a tab-switched frame doesn't fling particles to infinity.
      const dt = Math.min(0.05, (now - lastTime) / 1000)
      lastTime = now

      ctx.clearRect(0, 0, width, height)

      const time = (now * 0.001) % 1000
      const mouse = mousePositionRef.current
      const repelRadius = 200
      const repelStrength = 380 // px/sec at the center, linear falloff out

      for (const p of particles) {
        // Base current — rightward flow at each particle's own pace.
        p.x += p.speed * dt

        // Gentle vertical wobble — keeps the flow from looking like rigid stripes.
        p.y += Math.sin(time * 0.5 + p.phase) * 6 * dt

        let intensity = 0

        if (mouse.inside) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001
          if (dist < repelRadius) {
            const t = 1 - dist / repelRadius
            intensity = t
            // Push particle away from cursor along (dx, dy). Linear falloff
            // so the deflection feels smooth, not a sudden shove.
            const force = t * repelStrength * dt
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
            // Slight slowdown — water pauses at the obstacle before flowing past.
            p.x -= p.speed * dt * t * 0.35
          }
        }

        // Recycle: exits the visible area → respawn on the left edge with new y.
        if (
          p.x > width + 10 ||
          p.y < -20 ||
          p.y > height + 20
        ) {
          const fresh = spawnParticle(false)
          p.x = fresh.x
          p.y = Math.random() * height
          p.speed = fresh.speed
          p.phase = fresh.phase
          p.radius = fresh.radius
        }

        // Render — brighten + tint magenta near the cursor so the deflection reads.
        const alpha = 0.28 + intensity * 0.55
        ctx.fillStyle = intensity > 0.4 ? ACCENT : FLOW_COLOR
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    animationFrameId = requestAnimationFrame(animate)

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
