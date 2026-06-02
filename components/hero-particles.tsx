'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'motion/react'
import {
  DIGITAL_PATHS,
  CANVAS_PATHS,
  DIGITAL_CANVAS_VIEWBOX,
} from './digital-canvas-logo-paths'

type ParticleRole = 'normal' | 'wanderer' | 'scout'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  isTopRow: boolean
  life: number
  role: ParticleRole
  phase: number
}

export default function DigitalCanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  const drawLogoPaths = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, mobile: boolean) => {
      const vb = DIGITAL_CANVAS_VIEWBOX
      // Larger logo — fills more of the viewport on both mobile and desktop
      const logoHeight = mobile ? 120 : 280
      const scale = logoHeight / vb.height
      const logoWidth = vb.width * scale

      ctx.save()
      ctx.fillStyle = 'white'
      ctx.translate(
        canvas.width / 2 - logoWidth / 2,
        canvas.height / 2 - logoHeight / 2
      )
      ctx.scale(scale, scale)

      for (const d of DIGITAL_PATHS) {
        const p = new Path2D(d)
        ctx.fill(p)
      }
      for (const d of CANVAS_PATHS) {
        const p = new Path2D(d)
        ctx.fill(p)
      }

      ctx.restore()
    },
    []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let mobile = window.innerWidth < 768
    setIsMobile(mobile)

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }

    updateCanvasSize()

    let particles: Particle[] = []
    let textImageData: ImageData | null = null

    function createTextImage() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawLogoPaths(ctx, canvas, mobile)
      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    function createParticle(): Particle | null {
      if (!canvas || !textImageData) return null
      const data = textImageData.data
      const w = canvas.width
      const h = canvas.height
      const midY = h / 2

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * w)
        const y = Math.floor(Math.random() * h)
        if (data[(y * w + x) * 4 + 3] > 128) {
          // Role distribution: ~88% normal, ~7% wanderers, ~5% scouts.
          // Wanderers visibly orbit their anchor; scouts sense the cursor
          // from farther away — together they read as a living swarm.
          const r = Math.random()
          const role: ParticleRole =
            r < 0.07 ? 'wanderer' : r < 0.12 ? 'scout' : 'normal'

          return {
            x,
            y,
            baseX: x,
            baseY: y,
            // Scale particles up on desktop so the larger logo reads at distance
            size: Math.random() * (mobile ? 1 : 1.5) + (mobile ? 0.5 : 1),
            isTopRow: y < midY,
            life: Math.random() * 100 + 50,
            role,
            phase: Math.random() * Math.PI * 2,
          }
        }
      }
      return null
    }

    function createInitialParticles() {
      if (!canvas) return
      const baseCount = 12000
      const count = Math.floor(
        baseCount *
          Math.sqrt((canvas.width * canvas.height) / (1920 * 1080))
      )
      for (let i = 0; i < count; i++) {
        const p = createParticle()
        if (p) particles.push(p)
      }
    }

    let animationFrameId: number

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const { x: mx, y: my } = mousePositionRef.current
      const baseDist = 240
      // Time in seconds — drives all idle motion. Wrapped so we don't accumulate
      // huge values that could lose float precision over long sessions.
      const time = (performance.now() * 0.001) % 1000

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // DIGITAL (top row) is static at rest — no drift, no roles — but does
        // react to the cursor like a normal particle. The fixed brand identity
        // engages when touched, then snaps back.
        if (p.isTopRow) {
          const dx = mx - p.x
          const dy = my - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          const interacting =
            dist < baseDist &&
            (isTouchingRef.current || !('ontouchstart' in window))

          if (interacting) {
            const force = (baseDist - dist) / baseDist
            const angle = Math.atan2(dy, dx)
            p.x = p.baseX - Math.cos(angle) * force * 60
            p.y = p.baseY - Math.sin(angle) * force * 60
          } else {
            p.x = p.baseX
            p.y = p.baseY
          }

          ctx.fillStyle = '#ffffff'
          ctx.fillRect(p.x, p.y, p.size, p.size)

          p.life--
          if (p.life <= 0) {
            const np = createParticle()
            if (np) {
              particles[i] = np
            } else {
              particles.splice(i, 1)
              i--
            }
          }
          continue
        }

        // CANVAS (bottom row) carries all the alive behaviors — drift, wanderers,
        // scouts that sense the cursor from afar, and scatter on interaction.
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Scouts feel the cursor from farther out — creates a wave of motion
        // that ripples inward as the user approaches the wordmark.
        const detectDist = p.role === 'scout' ? 380 : baseDist

        const interacting =
          dist < detectDist &&
          (isTouchingRef.current || !('ontouchstart' in window))

        if (interacting) {
          const force = (detectDist - dist) / detectDist
          const angle = Math.atan2(dy, dx)
          p.x = p.baseX - Math.cos(angle) * force * 60
          p.y = p.baseY - Math.sin(angle) * force * 60
          ctx.fillStyle = '#88FF00'
        } else {
          // Idle motion — drift so the swarm reads as alive.
          // Wanderers orbit their anchor visibly. Normals and scouts breathe softly.
          let targetX = p.baseX
          let targetY = p.baseY

          if (p.role === 'wanderer') {
            const radius = 14
            const speed = 0.25
            targetX += Math.cos(time * speed + p.phase) * radius
            targetY += Math.sin(time * speed + p.phase * 1.3) * radius * 0.7
          } else {
            const amplitude = p.role === 'scout' ? 4 : 2.5
            const speed = 0.4
            targetX += Math.sin(time * speed + p.phase) * amplitude
            targetY +=
              Math.cos(time * speed * 0.7 + p.phase * 1.5) * amplitude * 0.8
          }

          p.x += (targetX - p.x) * 0.08
          p.y += (targetY - p.y) * 0.08
          ctx.fillStyle = '#ffffff'
        }

        ctx.fillRect(p.x, p.y, p.size, p.size)

        p.life--
        if (p.life <= 0) {
          const np = createParticle()
          if (np) {
            particles[i] = np
          } else {
            particles.splice(i, 1)
            i--
          }
        }
      }

      // Maintain particle density
      const baseCount = 12000
      const target = Math.floor(
        baseCount *
          Math.sqrt((canvas.width * canvas.height) / (1920 * 1080))
      )
      while (particles.length < target) {
        const np = createParticle()
        if (np) particles.push(np)
        else break
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    createTextImage()
    createInitialParticles()
    animate()

    const handleResize = () => {
      updateCanvasSize()
      createTextImage()
      particles = []
      createInitialParticles()
    }

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y }
    }

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault()
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchStart = () => {
      isTouchingRef.current = true
    }

    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: 0, y: 0 }
    }

    const handleMouseLeave = () => {
      if (!('ontouchstart' in window)) {
        mousePositionRef.current = { x: 0, y: 0 }
      }
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchstart', handleTouchStart)
    canvas.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchend', handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [drawLogoPaths])

  return (
    <div className="relative w-full h-dvh flex flex-col items-center justify-center bg-[#050505]">
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute inset-0 touch-none"
        aria-label="Interactive particle effect displaying the Digital Canvas logo"
      />
      {/* Tagline + interaction hint — bottom */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 px-6 text-center z-10 pointer-events-none select-none"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.0, ease: 'easeOut' }}
      >
        <p className="font-mono text-neutral-500 text-[10px] md:text-xs">
          {isMobile ? 'Tap and drag' : 'Move your cursor'} to interact
        </p>
      </motion.div>
    </div>
  )
}
