'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import {
  DIGITAL_PATHS,
  CANVAS_PATHS,
  DIGITAL_CANVAS_VIEWBOX,
} from './digital-canvas-logo-paths'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  isTopRow: boolean
  life: number
}

export default function DigitalCanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  const drawLogoPaths = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, mobile: boolean) => {
      const vb = DIGITAL_CANVAS_VIEWBOX
      const logoHeight = mobile ? 80 : 160
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
          return {
            x,
            y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            isTopRow: y < midY,
            life: Math.random() * 100 + 50,
          }
        }
      }
      return null
    }

    function createInitialParticles() {
      if (!canvas) return
      const baseCount = 7000
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
      const maxDist = 240

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (
          dist < maxDist &&
          (isTouchingRef.current || !('ontouchstart' in window))
        ) {
          const force = (maxDist - dist) / maxDist
          const angle = Math.atan2(dy, dx)
          p.x = p.baseX - Math.cos(angle) * force * 60
          p.y = p.baseY - Math.sin(angle) * force * 60
          // Top row "DIGITAL" scatters mhth orange, bottom row "CANVAS" scatters mhth cyan
          ctx.fillStyle = p.isTopRow ? '#ff9900' : '#00f2ff'
        } else {
          p.x += (p.baseX - p.x) * 0.1
          p.y += (p.baseY - p.y) * 0.1
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
      const baseCount = 7000
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
        aria-label="Interactive parParticlesPlay CancvasGame PParticle effect displaying the Digital Canvas logo"
      />
      <p className="absolute bottom-10 font-mono text-neutral-500 text-xs z-10 select-none pointer-events-none">
        {isMobile ? 'Tap and drag' : 'Move your cursor'} to interact
      </p>
    </div>
  )
}
