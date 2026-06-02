'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  // Semi-major and semi-minor axes — slight eccentricity per particle keeps
  // the field from looking like a perfect target pattern.
  orbitRadiusX: number
  orbitRadiusY: number
  // Signed — direction baked into the speed (positive = CCW, negative = CW).
  angularSpeed: number
  angle: number
  visualRadius: number
}

const ACCENT = '#FF006E'
const REST = '#ffffff'

export default function UnderwritersOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // inside = false means viewer is outside the hero; x/y are canvas-local pixels.
  const mousePositionRef = useRef({ x: 0, y: 0, inside: false })
  // Focal point — lerps between canvas center and cursor so the orbit
  // realigns smoothly when the viewer enters or leaves the hero.
  const focusRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let width = 0
    let height = 0
    let maxOrbit = 0
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
      // Reset focal point to canvas center on resize.
      focusRef.current.x = width / 2
      focusRef.current.y = height / 2
      maxOrbit = Math.min(width, height) * 0.6
      createParticles()
    }

    const createParticles = () => {
      particles = []
      // Density scales with canvas area so the system reads at every size.
      const referenceArea = 1200 * 700
      const target = Math.max(
        70,
        Math.floor(130 * Math.sqrt((width * height) / referenceArea)),
      )
      const minRadius = 36
      for (let i = 0; i < target; i++) {
        // Radius biased toward the inside — quadratic random gives a denser
        // core that thins toward the edge, like a planetary system.
        const t = Math.random()
        const baseRadius = minRadius + (maxOrbit - minRadius) * (t * t)
        const eccentricity = 0.82 + Math.random() * 0.35
        const orbitRadiusX = baseRadius
        const orbitRadiusY = baseRadius * eccentricity
        // Kepler-ish: closer orbits run faster than outer ones.
        const baseSpeed = (0.38 + Math.random() * 0.28) / Math.sqrt(baseRadius / 100)
        const direction = Math.random() < 0.5 ? 1 : -1
        particles.push({
          orbitRadiusX,
          orbitRadiusY,
          angularSpeed: baseSpeed * direction,
          angle: Math.random() * Math.PI * 2,
          visualRadius: 0.7 + Math.random() * 1.3,
        })
      }
    }

    const animate = (now: number) => {
      // Clamp dt so a tab-switched frame doesn't fling angles wildly.
      const dt = Math.min(0.05, (now - lastTime) / 1000)
      lastTime = now

      ctx.clearRect(0, 0, width, height)

      const mouse = mousePositionRef.current
      const targetX = mouse.inside ? mouse.x : width / 2
      const targetY = mouse.inside ? mouse.y : height / 2

      // Focal point eases toward the target — viewer feels gravity pull
      // the system instead of snapping when the cursor moves.
      focusRef.current.x += (targetX - focusRef.current.x) * 0.06
      focusRef.current.y += (targetY - focusRef.current.y) * 0.06

      const focusX = focusRef.current.x
      const focusY = focusRef.current.y

      // Faint magenta glow at the focal point — reads as the anchor brand.
      const glowSize = 80
      const grd = ctx.createRadialGradient(focusX, focusY, 0, focusX, focusY, glowSize)
      grd.addColorStop(0, 'rgba(255, 0, 110, 0.16)')
      grd.addColorStop(1, 'rgba(255, 0, 110, 0)')
      ctx.fillStyle = grd
      ctx.fillRect(focusX - glowSize, focusY - glowSize, glowSize * 2, glowSize * 2)

      for (const p of particles) {
        p.angle += p.angularSpeed * dt
        const x = focusX + Math.cos(p.angle) * p.orbitRadiusX
        const y = focusY + Math.sin(p.angle) * p.orbitRadiusY

        // Closer particles brighter — visually echoes the gravity-well metaphor.
        const proximity = 1 - p.orbitRadiusX / maxOrbit
        const alpha = 0.28 + proximity * 0.55
        ctx.fillStyle = proximity > 0.55 ? ACCENT : REST
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(x, y, p.visualRadius, 0, Math.PI * 2)
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
