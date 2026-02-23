"use client"

import { useCallback } from "react"

export default function TShirtDesignPage() {
  const handleDownload = useCallback(() => {
    const link = document.createElement("a")
    link.href = "/mhth-tshirt.svg"
    link.download = "mhth-tshirt-design.svg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  return (
    <div className="min-dvh pt-20 bg-[#0a0a0a] flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#737373] mb-2">
          T-SHIRT PRINT FILE
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          More Human Than Human
        </h1>
        <p className="text-[#a3a3a3] text-sm mt-2 max-w-md mx-auto">
          SVG design for screen printing on black shirts. Includes all sponsor and partner logos.
        </p>
      </div>

      {/* Print Specs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 max-w-2xl w-full">
        {[
          { label: "FORMAT", value: "SVG" },
          { label: "CANVAS", value: '14" × 15.3"' },
          { label: "COLORS", value: "5 spot" },
          { label: "GARMENT", value: "Black" },
        ].map((spec) => (
          <div key={spec.label} className="text-center border border-[#333] rounded-lg p-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#525252]">
              {spec.label}
            </p>
            <p className="text-white font-semibold text-sm mt-1">{spec.value}</p>
          </div>
        ))}
      </div>

      {/* Color Palette */}
      <div className="flex items-center gap-4 mb-8">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#525252]">
          PALETTE
        </p>
        <div className="flex gap-2">
          {[
            { color: "#FFFFFF", name: "White" },
            { color: "#FBBF24", name: "Gold" },
            { color: "#FF9900", name: "Orange" },
            { color: "#00F2FF", name: "Cyan" },
            { color: "#EF426F", name: "DevSA" },
            { color: "#00B2A9", name: "DevSA Teal" },
          ].map((c) => (
            <div key={c.color} className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded border border-[#333]"
                style={{ backgroundColor: c.color }}
                title={`${c.name}: ${c.color}`}
              />
              <span className="font-mono text-[8px] text-[#525252]">{c.color}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="relative w-full max-w-lg mb-8">
        <div className="bg-[#111] border border-[#333] rounded-xl p-6 sm:p-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mhth-tshirt.svg"
            alt="More Human Than Human T-Shirt Design"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="group relative px-8 py-4 bg-[#fbbf24] text-[#0a0a0a] font-black text-sm uppercase tracking-widest hover:bg-[#ff9900] transition-colors duration-200 cursor-pointer"
      >
        <span className="relative z-10">Download SVG</span>
      </button>

      {/* Print Notes */}
      <div className="mt-12 max-w-lg w-full border border-[#222] rounded-lg p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#737373] mb-3">
          PRINT NOTES
        </p>
        <ul className="space-y-2 text-[#a3a3a3] text-xs leading-relaxed">
          <li>• All artwork is 100% vector — no raster images</li>
          <li>• Designed for screen printing on black garments</li>
          <li>• Spot colors: White, Gold (#FBBF24), Orange (#FF9900), Cyan (#00F2FF), plus brand colors</li>
          <li>• Minimum line weight: 1pt for screen print compatibility</li>
          <li>• Text elements use system fonts — outline before sending to press</li>
          <li>• Canvas size: 1008 × 1100pt (14&quot; × 15.3&quot; print area)</li>
          <li>• Includes logos: v0 by Vercel, Digital Canvas Network, DEVSA, Geekdom, Lean Techniques</li>
          <li>• DevSA logo uses original brand colors (no invert); Geekdom inverted to white</li>
          <li>• Lean Techniques logo traced from PNG to vector paths</li>
          <li>• Aggressive RGB glitch effect on headline for print impact</li>
        </ul>
      </div>
    </div>
  )
}
