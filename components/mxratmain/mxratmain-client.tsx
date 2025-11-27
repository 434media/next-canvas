"use client"

import { useState, useCallback } from "react"
import { DefaultHero } from "@/components/mxratmain/default-hero"
import Mxr3dHero from "@/components/mxratmain/mxr3d-hero"
import { OrnamentToggle } from "@/components/mxratmain/ornament-toggle"

export default function MxratmainClient() {
  const [show3D, setShow3D] = useState(false)

  const handleToggle3D = useCallback(() => {
    setShow3D((prev) => !prev)
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Hero content - conditionally show 3D or default */}
      {show3D ? <Mxr3dHero /> : <DefaultHero />}

      {/* Ornament toggle button - bottom right */}
      <OrnamentToggle isActive={show3D} onClick={handleToggle3D} />
    </div>
  )
}
