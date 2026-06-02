'use client'

import { useEffect, useRef } from 'react'

interface Node {
  baseX: number
  baseY: number
  x: number
  y: number
  phase: number
  radius: number
}

const ACCENT = '#fbbf24'

export default function AboutConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // inside = false means render the constellation in its quiet state;
  // x/y are canvas-local pixels measured from the top-left of the element.
  const mousePositionRef = useRef({ x: 0, y: 0, inside: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let nodes: Node[] = []
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
      createNodes()
    }

    const createNodes = () => {
      nodes = []
      // Scale node count to the canvas area so density stays roughly constant.
      const referenceArea = 1200 * 600
      const target = Math.max(
        24,
        Math.floor(55 * Math.sqrt((width * height) / referenceArea)),
      )
      for (let i = 0; i < target; i++) {
        const baseX = Math.random() * width
        const baseY = Math.random() * height
        nodes.push({
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          phase: Math.random() * Math.PI * 2,
          radius: 1 + Math.random() * 1.4,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Wrap time before float precision degrades over very long sessions.
      const time = (performance.now() * 0.001) % 1000
      const mouse = mousePositionRef.current
      const linkDist = 130
      const cursorReach = 200

      // Subtle drift — every node breathes around its anchor.
      for (const n of nodes) {
        const driftAmp = 5
        const driftSpeed = 0.3
        const targetX =
          n.baseX + Math.sin(time * driftSpeed + n.phase) * driftAmp
        const targetY =
          n.baseY +
          Math.cos(time * driftSpeed * 0.7 + n.phase * 1.5) * driftAmp * 0.8
        n.x += (targetX - n.x) * 0.05
        n.y += (targetY - n.y) * 0.05
      }

      // Inter-node lines — sparse mesh visible only between near neighbors.
      ctx.strokeStyle = ACCENT
      ctx.lineWidth = 0.5
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < linkDist) {
            ctx.globalAlpha = (1 - dist / linkDist) * 0.18
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      // Cursor connections — visualizes the viewer joining the network.
      if (mouse.inside) {
        ctx.strokeStyle = ACCENT
        ctx.lineWidth = 0.8
        for (const n of nodes) {
          const dx = mouse.x - n.x
          const dy = mouse.y - n.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < cursorReach) {
            ctx.globalAlpha = (1 - dist / cursorReach) * 0.45
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(n.x, n.y)
            ctx.stroke()
          }
        }
        ctx.globalAlpha = 1
      }

      // Nodes — opacity ramps up near the cursor so the network "lights up."
      for (const n of nodes) {
        let alpha = 0.4
        if (mouse.inside) {
          const dx = mouse.x - n.x
          const dy = mouse.y - n.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < cursorReach) {
            alpha = 0.4 + (1 - dist / cursorReach) * 0.55
          }
        }
        ctx.fillStyle = ACCENT
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
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
