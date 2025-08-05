"use client"

import { useEffect, useRef, useState } from "react"
import { WireframeBackground } from "./wireframe-background"

const ClientStart = () => {
  return (
    <div className="h-screen overflow-hidden relative">
      <WireframeBackground />
      <div className="container mx-auto px-0 py-10 h-full relative z-10">
        {/* Header space to match methodist component */}
        <div className="mb-16"></div>

        <div className="grid lg:grid-cols-1 gap-16 items-center h-full">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
                MEET OUR PARTNERS
              </span>
            </h1>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 via-teal-400 to-blue-400 text-transparent bg-clip-text">
                THOSE AT THE FOREFRONT OF INNOVATION
              </span>
            </h1>
          </div>

          {/* Right side - empty to match methodist layout */}
          <div className="relative h-full flex items-center justify-center">
            {/* Empty space to match methodist component layout */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientStart