"use client"

import React from "react"
import Link from "next/link"

interface BoxProps {
  color: string
  title: string
  width?: string
  height?: string
}

export default function Box({ color, title, width, height }: BoxProps) {
  // Convert title to URL-friendly slug
  const slug = title.toLowerCase().replace(/\s+/g, '-') 
  
  const handleClick = () => {
    // Save current scroll position before navigating
    sessionStorage.setItem("saved-scroll", window.scrollY.toString())
  }
  
  return (
    <Link href={`/boxes/${slug}`} className="block" onClick={handleClick}>
      <div
        className={`box ${color} absolute ${color} rounded-lg flex items-center justify-center cursor-pointer shadow-md hover:scale-[1.03] transition-transform duration-200 will-change-transform`}
        style={{
          width: width || "100px", // Default size, will be overridden by GSAP
          height: height || "100px", // Default size, will be overridden by GSAP
          left: "50%",
          top: "50%",
          transform: "translate3d(-50%, -50%, 0)",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
        }}
      >
        <h3 className={`text-xl font-semibold ${color === "bg-yellow-400" ? "text-gray-800" : "text-white"}`}>{title}</h3>
      </div>
    </Link>
  )
} 