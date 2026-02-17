'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  DIGITAL_PATHS,
  CANVAS_PATHS,
  DIGITAL_CANVAS_VIEWBOX,
} from './digital-canvas-logo-paths'

const navLinks = [
  { name: 'Conferences', href: '/conferences' },
  { name: 'Workshops', href: '/workshops' },
  { name: 'Storytelling', href: '/storytelling' },
  { name: 'The Feed', href: '/thefeed' },
  { name: 'Agents', href: '/agents' },
]

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/434media',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/digitalcanvashq/',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M7.03.084c-1.277.06-2.149.264-2.91.563a5.874 5.874 0 00-2.124 1.388 5.878 5.878 0 00-1.38 2.127C.321 4.926.12 5.8.064 7.076.008 8.354-.005 8.764.001 12.023c.007 3.259.021 3.667.083 4.947.061 1.277.264 2.149.563 2.911.308.789.72 1.457 1.388 2.123a5.872 5.872 0 002.129 1.38c.763.295 1.636.496 2.913.552 1.278.056 1.689.069 4.947.063 3.257-.007 3.668-.021 4.947-.082 1.28-.06 2.147-.265 2.91-.563a5.881 5.881 0 002.123-1.388 5.881 5.881 0 001.38-2.129c.295-.763.496-1.636.551-2.912.056-1.28.07-1.69.063-4.948-.006-3.258-.02-3.667-.081-4.947-.06-1.28-.264-2.148-.564-2.911a5.892 5.892 0 00-1.387-2.123 5.857 5.857 0 00-2.128-1.38C19.074.322 18.202.12 16.924.066 15.647.009 15.236-.006 11.977 0 8.718.008 8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.736 3.736 0 01-1.382-.895 3.695 3.695 0 01-.9-1.378c-.165-.423-.363-1.058-.417-2.228-.06-1.264-.072-1.644-.08-4.848-.006-3.204.006-3.583.061-4.848.05-1.169.246-1.805.408-2.228.216-.561.477-.96.895-1.382a3.705 3.705 0 011.379-.9c.423-.165 1.057-.361 2.227-.417 1.265-.06 1.644-.072 4.848-.08 3.203-.006 3.583.006 4.85.062 1.168.05 1.804.244 2.227.408.56.216.96.475 1.382.895.421.42.681.817.9 1.378.165.422.362 1.056.417 2.227.06 1.265.074 1.645.08 4.848.005 3.203-.006 3.583-.061 4.848-.051 1.17-.245 1.805-.408 2.23-.216.56-.477.96-.896 1.38a3.705 3.705 0 01-1.378.9c-.422.165-1.058.362-2.226.418-1.266.06-1.645.072-4.85.079-3.204.007-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 101.437-1.442 1.44 1.44 0 00-1.437 1.442M5.839 12.012a6.161 6.161 0 1012.323-.024 6.162 6.162 0 00-12.323.024M8 12.008A4 4 0 1112.008 16 4 4 0 018 12.008" />
      </svg>
    ),
  },
]

// --- Endless Canvas Footer ---
function EndlessCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let particles: {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      speed: number
      opacity: number
      isTopRow: boolean
    }[] = []
    let textImageData: ImageData | null = null
    let animationId: number

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      createTextImage()
      particles = []
      createParticles()
    }

    function createTextImage() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      const vb = DIGITAL_CANVAS_VIEWBOX
      const logoHeight = Math.min(height * 0.45, 80)
      const scale = logoHeight / vb.height
      const logoWidth = vb.width * scale

      ctx.save()
      ctx.fillStyle = 'white'
      ctx.translate(width / 2 - logoWidth / 2, height / 2 - logoHeight / 2)
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

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      textImageData = ctx.getImageData(0, 0, width * dpr, height * dpr)
      ctx.clearRect(0, 0, width, height)
    }

    function createParticles() {
      if (!textImageData) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const data = textImageData.data
      const iw = Math.floor(width * dpr)
      const ih = Math.floor(height * dpr)
      const midY = height / 2
      const count = Math.min(Math.floor(width * height * 0.003), 2000)

      for (let i = 0; i < count; i++) {
        for (let attempt = 0; attempt < 80; attempt++) {
          const sx = Math.floor(Math.random() * iw)
          const sy = Math.floor(Math.random() * ih)
          if (data[(sy * iw + sx) * 4 + 3] > 128) {
            const x = sx / dpr
            const y = sy / dpr
            particles.push({
              x,
              y,
              baseX: x,
              baseY: y,
              size: Math.random() * 1.2 + 0.3,
              speed: 0.15 + Math.random() * 0.35,
              opacity: 0.1 + Math.random() * 0.5,
              isTopRow: y < midY,
            })
            break
          }
        }
      }
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      const time = performance.now() * 0.001

      for (const p of particles) {
        // Gentle vertical drift — particles rise slowly then reset
        const drift = ((time * p.speed * 12) % (height + 20)) - 10
        const drawY = ((p.baseY - drift) % height + height) % height

        // Subtle horizontal sway
        const sway = Math.sin(time * 0.5 + p.baseX * 0.02) * 2

        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(time * 1.2 + p.baseX * 0.05))
        ctx.globalAlpha = alpha
        ctx.fillStyle = p.isTopRow ? '#ff9900' : '#00f2ff'
        ctx.fillRect(p.baseX + sway, drawY, p.size, p.size)
      }

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-hidden="true"
    />
  )
}

// --- Footer Component ---
export default function Footer() {
  const [year] = useState(() => new Date().getFullYear())

  return (
    <footer className="relative bg-[#050505] overflow-hidden">
      {/* Top border gradient */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-[#ff9900]/30 to-transparent" />

      {/* Content section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand + Description */}
          <div className="md:col-span-6 space-y-4">
            <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#ff9900]/60">
              Digital Canvas
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-md">
              Powered by DEVSA x 434 MEDIA, Digital Canvas connects creativity, community, and technology through curated conferences, workshops, storytelling, and agentic tools.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/20 mb-4">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-[#ff9900] text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/20 mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-[#ff9900] transition-colors duration-200"
                  aria-label={`Follow Digital Canvas on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <a
              href="https://digitalcanvas.community"
              className="inline-block mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-white/15 hover:text-white/40 transition-colors"
            >
              digitalcanvas.community
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 mb-6 h-px w-full bg-white/5" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/15 text-xs font-mono">
            &copy; {year} Digital Canvas. All rights reserved.
          </p>
          <p className="text-white/10 text-[10px] font-mono tracking-wider uppercase">
            San Antonio, TX
          </p>
        </div>
      </div>
    </footer>
  )
}