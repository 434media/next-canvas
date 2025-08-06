"use client"

import { useEffect, useState } from 'react'
import { ScrollTrigger } from '@/lib/gsap-config'

interface UseScrollTriggerHeightProps {
  triggerId: string
  endValue: string
  fallbackHeight?: string
}

export const useScrollTriggerHeight = ({ 
  triggerId, 
  endValue, 
  fallbackHeight = "100vh" 
}: UseScrollTriggerHeightProps) => {
  const [height, setHeight] = useState(fallbackHeight)

  useEffect(() => {
    const calculateHeight = () => {
      const trigger = ScrollTrigger.getById(triggerId)
      
      if (trigger) {
        // Get the actual scroll distance from the trigger
        const scrollDistance = trigger.end - trigger.start
        // Convert to viewport height units
        const heightInVh = Math.ceil(scrollDistance / window.innerHeight * 100)
        setHeight(`${heightInVh}vh`)
      } else {
        // Parse the endValue and convert to responsive vh units
        const match = endValue.match(/\+=\s*(\d+)/)
        if (match) {
          const pixels = parseInt(match[1])
          // Convert pixels to viewport height units
          const heightInVh = Math.ceil(pixels / window.innerHeight * 100)
          setHeight(`${heightInVh}vh`)
        } else {
          setHeight(fallbackHeight)
        }
      }
    }

    // Calculate on mount and window resize
    calculateHeight()
    window.addEventListener('resize', calculateHeight)
    
    return () => {
      window.removeEventListener('resize', calculateHeight)
    }
  }, [triggerId, endValue, fallbackHeight])

  return height
}