"use client"

import { useState, useEffect } from "react"

export const useScrollObserver = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold },
    )

    const currentElement = document.querySelector("#hero-section")
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [threshold])

  return isInView
}

