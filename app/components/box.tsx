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
  // Function to get the page slug based on box color and title
  const getPageSlug = (boxColor: string, boxTitle: string) => {
    // Special case for Methodist Healthcare Ministries
    if (boxTitle === "Methodist Healthcare Ministries") {
      return "methodist"
    }
    
    // Default color-based routing
    switch (boxColor) {
      case "bg-red-400":
        return "red"
      case "bg-blue-400":
        return "blue"
      case "bg-green-400":
        return "green"
      case "bg-yellow-400":
        return "yellow"
      case "bg-orange-400":
        return "orange"
      case "bg-purple-400":
        return "purple"
      case "bg-pink-400":
        return "pink"
      case "bg-cyan-400":
        return "cyan"
      default:
        return "red"
    }
  }
  
  // Function to get darker text color based on box color
  const getTextColor = (boxColor: string) => {
    switch (boxColor) {
      case "bg-red-400":
        return "text-red-800"
      case "bg-blue-400":
        return "text-blue-800"
      case "bg-green-400":
        return "text-green-800"
      case "bg-yellow-400":
        return "text-yellow-800"
      case "bg-orange-400":
        return "text-orange-800"
      case "bg-purple-400":
        return "text-purple-800"
      case "bg-pink-400":
        return "text-pink-800"
      case "bg-cyan-400":
        return "text-cyan-800"
      default:
        return "text-white"
    }
  }
  
  const handleClick = () => {
    // Save current scroll position before navigating
    sessionStorage.setItem("saved-scroll", window.scrollY.toString())
  }
  
  return (
    <Link href={`/boxes/${getPageSlug(color, title)}`} className="block" onClick={handleClick}>
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
        <h3 className={`absolute top-3 left-3 text-2xl md:text-3xl font-bold ${getTextColor(color)}`}>{title}</h3>
      </div>
    </Link>
  )
} 