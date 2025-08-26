"use client"

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"

export default function ConditionalNavbar() {
  const pathname = usePathname()
  const isMethodistPage = pathname === "/boxes/methodist"

  if (isMethodistPage) {
    return null
  }

  return <Navbar />
}

