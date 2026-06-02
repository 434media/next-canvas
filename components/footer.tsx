'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  DIGITAL_PATHS,
  CANVAS_PATHS,
  DIGITAL_CANVAS_VIEWBOX,
} from './digital-canvas-logo-paths'

const programLinks = [
  { name: 'Workshops', href: '/workshops' },
  { name: 'Demo Days', href: '/demo-days' },
  { name: 'Cohort Verticals', href: '/#verticals' },
]

const audienceLinks = [
  { name: 'For Builders', href: '/builders' },
  { name: 'For Underwriters', href: '/underwriters' },
  { name: 'For Investors', href: '/demo-days' },
]

const discoverLinks = [
  { name: 'About', href: '/about' },
  { name: 'The Feed', href: '/thefeed' },
]

const contactLinks = [
  { name: 'General', href: 'mailto:hello@434media.com', address: 'hello@434media.com' },
  { name: 'Underwriter', href: 'mailto:build@434media.com', address: 'build@434media.com' },
]

const linkGroups = [
  { title: 'Program', links: programLinks },
  { title: 'Audiences', links: audienceLinks },
  { title: 'Discover', links: discoverLinks },
]

const partners = [
  {
    name: 'DevSA',
    role: 'Community',
    logo: 'https://devsa-assets.s3.us-east-2.amazonaws.com/devsa-logo.svg',
    href: 'https://www.devsa.community/',
  },
  {
    name: 'Capital Partner Network',
    role: 'Capital',
    logoText: 'Capital',
    placeholder: true,
  },
  {
    name: '434 Media',
    role: 'Operator',
    logo: 'https://storage.googleapis.com/groovy-ego-462522-v2.firebasestorage.app/434media-light.svg',
    href: 'https://434media.com/',
  },
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
        ctx.fillStyle = p.isTopRow ? '#88FF00' : '#FF006E'
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
      <div className="h-px w-full bg-linear-to-r from-transparent via-[#88FF00]/30 to-transparent" />

      {/* Ambient ripple background — DC wordmark in drifting particles */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
        <EndlessCanvas />
      </div>

      {/* Content section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand + Description — full width on mobile, 4 cols on desktop */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#88FF00]/60">
              San Antonio · Builder Program
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-md">
              Digital Canvas connects AI-native talent to industry pain points — and the capital that funds them.
            </p>
            <p className="text-white/25 text-xs font-mono tracking-[0.15em] uppercase pt-2">
              Powered by DevSA · Capital Partner Network · 434 Media
            </p>
          </div>

          {/* Sitemap groups — Program / Audiences / Discover */}
          {linkGroups.map((group) => (
            <div key={group.title} className="col-span-1 md:col-span-2">
              <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/20 mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-[#88FF00] text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact + Social */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/20 mb-4">
              Contact
            </h3>
            <ul className="space-y-3 mb-5">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group block"
                  >
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/25 group-hover:text-white/40 transition-colors duration-200">
                      {link.name}
                    </span>
                    <span className="block text-white/40 group-hover:text-[#88FF00] text-sm transition-colors duration-200">
                      {link.address}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-[#88FF00] transition-colors duration-200"
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

        {/* Powered by — partner logos */}
        <div className="mt-14 pt-10 border-t border-white/5">
          <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/20 mb-6 text-center">
            Powered by
          </h3>
          <div className="grid grid-cols-3 gap-6 md:gap-12 items-center max-w-3xl mx-auto">
            {partners.map((partner) => {
              const logoBlock = partner.placeholder ? (
                <span className="font-(family-name:--font-geist-pixel-square) text-base md:text-lg uppercase tracking-wide text-white/35">
                  {partner.logoText}
                </span>
              ) : (
                <Image
                  src={partner.logo!}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                  sizes="128px"
                  unoptimized
                />
              )

              const inner = (
                <>
                  <div className="relative w-24 md:w-32 h-10 md:h-12 flex items-center justify-center">
                    {logoBlock}
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30 group-hover:text-white/60 transition-colors duration-200">
                    {partner.role}
                  </span>
                </>
              )

              return partner.placeholder ? (
                <div
                  key={partner.name}
                  className="group flex flex-col items-center gap-2"
                >
                  {inner}
                </div>
              ) : (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2"
                >
                  {inner}
                </a>
              )
            })}
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
            San Antonio, TX &middot; 434 Media &times; DevSA
          </p>
        </div>
      </div>
    </footer>
  )
}