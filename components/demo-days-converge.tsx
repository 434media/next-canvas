'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  speed: number
  radius: number
}

const REST_COLOR = '#ffffff'
const ACCENT = '#fbbf24'

export default function DemoDaysConverge() {
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

    // Spawn a particle. When `initial` is true, distribute across the canvas
    // so the field is full on the first frame instead of streaming in.
    const spawnParticle = (initial: boolean): Particle => {
      const radius = 0.6 + Math.random() * 1.4
      // Larger particles a touch faster — faint depth read.
      const speed = 35 + Math.random() * 55 + radius * 10
      const margin = 30

      let x = 0
      let y = 0
      if (initial) {
        x = Math.random() * width
        y = Math.random() * height
      } else {
        // Spawn on one of the four edges, position randomized on that edge.
        const edge = Math.floor(Math.random() * 4)
        switch (edge) {
          case 0: x = Math.random() * width; y = -margin; break
          case 1: x = width + margin; y = Math.random() * height; break
          case 2: x = Math.random() * width; y = height + margin; break
          default: x = -margin; y = Math.random() * height
        }
      }

      return { x, y, speed, radius }
    }

    const createParticles = () => {
      particles = []
      // Density scales with canvas area so the convergence reads at every size.
      const referenceArea = 1200 * 700
      const target = Math.max(
        70,
        Math.floor(140 * Math.sqrt((width * height) / referenceArea)),
      )
      for (let i = 0; i < target; i++) {
        particles.push(spawnParticle(true))
      }
    }

    const respawn = (p: Particle) => {
      const fresh = spawnParticle(false)
      p.x = fresh.x
      p.y = fresh.y
      p.speed = fresh.speed
      p.radius = fresh.radius
    }

    const animate = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000)
      lastTime = now

      ctx.clearRect(0, 0, width, height)

      const mouse = mousePositionRef.current
      const centerX = width / 2
      const centerY = height / 2

      // Focal point — canvas center by default; biases toward the cursor when
      // the viewer is inside the hero (the viewer becomes a secondary stage).
      let focusX = centerX
      let focusY = centerY
      if (mouse.inside) {
        focusX = centerX * 0.35 + mouse.x * 0.65
        focusY = centerY * 0.35 + mouse.y * 0.65
      }

      // Used to compute brightness ramp — particles glow as they near the focus.
      const maxRange = Math.sqrt(width * width + height * height) / 2

      for (const p of particles) {
        const dx = focusX - p.x
        const dy = focusY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist > 0.5) {
          // Slow taper inside the last 90px — particles settle into the room
          // rather than snapping through the stage.
          const speedMult = Math.min(1, dist / 90)
          const v = p.speed * speedMult
          p.x += (dx / dist) * v * dt
          p.y += (dy / dist) * v * dt
        }

        // Particles that reach the stage recycle to a fresh edge — keeps the
        // convergence continuous without piling on a single point.
        if (dist < 18) {
          respawn(p)
          continue
        }

        // Render — brighten + tint amber as particles close on the focus.
        const proximity = 1 - Math.min(1, dist / (maxRange * 0.7))
        const alpha = 0.25 + proximity * 0.6
        ctx.fillStyle = proximity > 0.55 ? ACCENT : REST_COLOR
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
