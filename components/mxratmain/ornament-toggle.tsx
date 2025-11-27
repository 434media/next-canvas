"use client"

import Image from "next/image"

interface OrnamentToggleProps {
  isActive: boolean
  onClick: () => void
}

export function OrnamentToggle({ isActive, onClick }: OrnamentToggleProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label={isActive ? "Show default view" : "Show 3D Christmas scene"}
    >
      {/* Glow effect behind ornament */}
      <div
        className={`absolute -inset-4 rounded-full blur-xl transition-all duration-500 ${
          isActive ? "bg-red-500/50 animate-pulse" : "bg-green-500/30 group-hover:bg-green-500/50"
        }`}
      />

      {/* Ornament image */}
      <div className={`relative w-16 h-20 transition-all duration-500 ${isActive ? "scale-110" : "hover:scale-105"}`}>
        <Image
          src="https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-vv.png"
          alt="Christmas ornament"
          fill
          className="object-contain drop-shadow-lg"
        />
      </div>

      {/* Label tooltip */}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-black/80 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {isActive ? "Exit 3D View" : "View 3D Scene"}
      </span>
    </button>
  )
}
