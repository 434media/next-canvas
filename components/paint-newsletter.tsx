"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"

interface PaintNewsletterProps {
  isOpen: boolean
  onClose: () => void
}

export default function PaintNewsletter({ isOpen, onClose }: PaintNewsletterProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedBgColor, setSelectedBgColor] = useState("#ffffff")
  const [isMinimized, setIsMinimized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [konami, setKonami] = useState("")
  const [glitchMode, setGlitchMode] = useState(false)
  const [showBootScreen, setShowBootScreen] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [showPaintSession, setShowPaintSession] = useState(false)
  const [showBSOD, setShowBSOD] = useState(false)
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 })
  const [bootProgress, setBootProgress] = useState(0)
  const [bootMessages, setBootMessages] = useState<string[]>([])
  const [paintCanvasStrokes, setPaintCanvasStrokes] = useState<
    Array<{ x: number; y: number; color: string; size: number; tool: string }>
  >([])
  const [isPaintDrawing, setIsPaintDrawing] = useState(false)
  const [paintBrushSize, setPaintBrushSize] = useState(3)
  const [paintSelectedColor, setPaintSelectedColor] = useState("#000000")
  const [paintSelectedTool, setPaintSelectedTool] = useState("brush")
  const [showTerminal, setShowTerminal] = useState(false)
  const [showMainInterface, setShowMainInterface] = useState(false) // Declare showMainInterface

  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const paintCanvasRef = useRef<HTMLCanvasElement>(null)

  const backgroundColors = [
    { color: "#ffffff", name: "White" },
    { color: "#ff0000", name: "Bright Red" },
    { color: "#00ff00", name: "Electric Green" },
    { color: "#0066ff", name: "Electric Blue" },
    { color: "#ff6600", name: "Vivid Orange" },
    { color: "#ff00ff", name: "Hot Pink" },
    { color: "#00ffff", name: "Cyan" },
    { color: "#ffff00", name: "Bright Yellow" },
  ]

  const paintColors = ["#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffffff"]

  const tools = [
    { name: "brush", icon: "🖌️" },
    { name: "pencil", icon: "✏️" },
    { name: "eraser", icon: "🧽" },
  ]

  const paintTools = [
    { name: "brush", icon: "🖌️", cursor: "crosshair" },
    { name: "pencil", icon: "✏️", cursor: "crosshair" },
    { name: "eraser", icon: "🧽", cursor: "crosshair" },
    { name: "fill", icon: "🪣", cursor: "crosshair" },
  ]

  const handleColorClick = useCallback((color: string) => {
    setSelectedBgColor(color)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        })
      }
    },
    [isDragging, dragStart],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleFileClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowPaintSession(true)
  }, [])

  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowTerminal(true)
  }, [])

  const handleViewClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setGlitchMode(true)
    setTimeout(() => setGlitchMode(false), 3000)
  }, [])

  const handleHelpClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowBSOD(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !email.includes("@")) {
      setError("Error: Please enter a valid email address")
      inputRef.current?.focus()
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const responseData = await response.json()

      if (response.ok) {
        setEmail("")
        setIsSuccess(true)
        formRef.current?.reset()

        setTimeout(() => {
          setIsSuccess(false)
          onClose()
        }, 3000)
      } else {
        throw new Error(responseData.error || "Fatal Exception: Subscription failed")
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error)
      setError(`Fatal Exception: ${error instanceof Error ? error.message : "An error occurred"}. Please try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const startPaintDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = paintCanvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setIsPaintDrawing(true)

      if (paintSelectedTool === "eraser") {
        // Remove strokes near the click point
        setPaintCanvasStrokes((prev) =>
          prev.filter((stroke) => {
            const distance = Math.sqrt((stroke.x - x) ** 2 + (stroke.y - y) ** 2)
            return distance > paintBrushSize * 2
          }),
        )
      } else {
        const newStroke = {
          x,
          y,
          color: paintSelectedTool === "eraser" ? "#ffffff" : paintSelectedColor,
          size: paintBrushSize,
          tool: paintSelectedTool,
        }
        setPaintCanvasStrokes((prev) => [...prev, newStroke])
      }
    },
    [paintSelectedColor, paintBrushSize, paintSelectedTool],
  )

  const continuePaintDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isPaintDrawing) return

      const canvas = paintCanvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (paintSelectedTool === "eraser") {
        setPaintCanvasStrokes((prev) =>
          prev.filter((stroke) => {
            const distance = Math.sqrt((stroke.x - x) ** 2 + (stroke.y - y) ** 2)
            return distance > paintBrushSize * 2
          }),
        )
      } else {
        const newStroke = {
          x,
          y,
          color: paintSelectedColor,
          size: paintBrushSize,
          tool: paintSelectedTool,
        }
        setPaintCanvasStrokes((prev) => [...prev, newStroke])
      }
    },
    [isPaintDrawing, paintSelectedColor, paintBrushSize, paintSelectedTool],
  )

  const stopPaintDrawing = useCallback(() => {
    setIsPaintDrawing(false)
  }, [])

  const clearPaintCanvas = useCallback(() => {
    setPaintCanvasStrokes([])
  }, [])

  const savePaintCreation = useCallback(() => {
    const canvas = paintCanvasRef.current
    if (!canvas) return

    // Create a temporary canvas to render the strokes
    const tempCanvas = document.createElement("canvas")
    tempCanvas.width = 400
    tempCanvas.height = 300
    const ctx = tempCanvas.getContext("2d")

    if (ctx) {
      // Fill with white background
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, 400, 300)

      // Draw all strokes
      paintCanvasStrokes.forEach((stroke) => {
        ctx.fillStyle = stroke.color
        ctx.beginPath()
        ctx.arc(stroke.x, stroke.y, stroke.size, 0, 2 * Math.PI)
        ctx.fill()
      })

      // Download the image
      const link = document.createElement("a")
      link.download = `digital-canvas-creation-${Date.now()}.png`
      link.href = tempCanvas.toDataURL()
      link.click()
    }
  }, [paintCanvasStrokes])

  const shareToLinkedIn = useCallback(() => {
    const text = "Just created some digital art with Digital Canvas! 🎨 #DigitalCanvas #CreativeTools"
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(text)}`
    window.open(url, "_blank", "width=600,height=400")
  }, [])

  const shareToTwitter = useCallback(() => {
    const text = "Just created some digital art with Digital Canvas! 🎨 #DigitalCanvas #CreativeTools"
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`
    window.open(url, "_blank", "width=600,height=400")
  }, [])

  useEffect(() => {
    if (glitchMode) {
      const interval = setInterval(() => {
        const intensity = Math.random() * 100
        setGlitchOffset({
          x: (Math.random() - 0.5) * intensity * 0.1,
          y: (Math.random() - 0.5) * intensity * 0.1,
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [glitchMode])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const konamiCode = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA"
      const newKonami = konami + e.code

      if (konamiCode.startsWith(newKonami)) {
        setKonami(newKonami)
        if (newKonami === konamiCode) {
          setShowEasterEgg(true)
          setKonami("")
        }
      } else {
        setKonami("")
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyPress)
      return () => document.removeEventListener("keydown", handleKeyPress)
    }
  }, [isOpen, konami])

  useEffect(() => {
    if (showBootScreen) {
      const interval = setInterval(() => {
        setCurrentTime(new Date())
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [showBootScreen])

  useEffect(() => {
    if (showPaintSession) {
      const interval = setInterval(() => {}, 2000)
      return () => clearInterval(interval)
    }
  }, [showPaintSession])

  useEffect(() => {
    if (showBootScreen) {
      const bootSequence = [
        "Initializing Digital Canvas OS...",
        "Loading system drivers...",
        "Checking memory allocation...",
        "Starting graphics subsystem...",
        "Loading paint engine...",
        "Initializing color palette...",
        "Mounting creative filesystem...",
        "Starting newsletter service...",
        "Loading retro interface...",
        "System ready!",
      ]

      let messageIndex = 0
      let progress = 0

      const bootInterval = setInterval(() => {
        if (messageIndex < bootSequence.length) {
          setBootMessages((prev) => [...prev, bootSequence[messageIndex]])
          progress += 10
          setBootProgress(progress)
          messageIndex++
        } else {
          clearInterval(bootInterval)
        }
      }, 400)

      const timeInterval = setInterval(() => {
        setCurrentTime(new Date())
      }, 1000)

      return () => {
        clearInterval(bootInterval)
        clearInterval(timeInterval)
      }
    }
  }, [showBootScreen])

  useEffect(() => {
    if (isOpen && !showMainInterface) {
      setShowBootScreen(true)
      setBootProgress(0)
      setBootMessages([])

      // Auto-close boot screen after completion
      const bootTimer = setTimeout(() => {
        setShowBootScreen(false)
        setShowMainInterface(true)
      }, 5000) // 5 seconds for full boot sequence

      return () => clearTimeout(bootTimer)
    }
  }, [isOpen, showMainInterface])

  if (!isOpen) return null

  return (
    <>
      {/* Boot Screen - shows first when modal opens */}
      <AnimatePresence>
        {showBootScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black text-green-400 font-mono text-sm z-[60] flex flex-col justify-center items-start p-8"
            onClick={() => {
              setShowBootScreen(false)
              setShowMainInterface(true)
            }}
          >
            <div className="w-full max-w-2xl">
              <div className="mb-4 text-yellow-400 text-lg">DIGITAL CANVAS BOOT SEQUENCE v2.1</div>
              <div className="mb-2 text-cyan-400">System Time: {currentTime.toLocaleTimeString()}</div>
              <div className="mb-4 text-white">Copyright (C) {new Date().getFullYear()} Digital Canvas Corp.</div>

              <div className="space-y-1 mb-4 min-h-[240px]">
                {bootMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <span className="mr-2">&gt;</span>
                    <span>{message}</span>
                    {index === bootMessages.length - 1 && bootProgress < 100 && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
                        className="ml-2"
                      >
                        _
                      </motion.span>
                    )}
                    {index < bootMessages.length - 1 && <span className="ml-auto text-green-400">[OK]</span>}
                  </motion.div>
                ))}
              </div>

              <div className="mb-4">
                <div className="text-yellow-400 mb-2">Loading Progress: {bootProgress}%</div>
                <div className="w-full bg-gray-800 h-4 border border-green-400">
                  <motion.div
                    className="h-full bg-green-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${bootProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {bootProgress < 100 && (
                <div className="flex items-center text-yellow-400">
                  <span>Please wait</span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, times: [0, 0.5, 1] }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, delay: 0.5, times: [0, 0.5, 1] }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, delay: 1, times: [0, 0.5, 1] }}
                  >
                    .
                  </motion.span>
                </div>
              )}

              {bootProgress === 100 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-yellow-400 mt-4">
                  System ready! Click anywhere to continue...
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Newsletter Interface - shows after boot sequence */}
      <AnimatePresence>
        {showMainInterface && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
            style={{
              cursor: "default",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-md border-2 shadow-lg ${isMinimized ? "h-8" : "min-h-[400px]"}`}
              style={{
                borderTopColor: "#ffffff",
                borderLeftColor: "#ffffff",
                borderRightColor: "#808080",
                borderBottomColor: "#808080",
                backgroundColor: selectedBgColor,
                fontFamily: "MS Sans Serif, Tahoma, sans-serif",
                filter: glitchMode
                  ? `blur(${Math.random() * 2}px) saturate(${150 + Math.random() * 100}%) hue-rotate(${Math.random() * 360}deg) contrast(${100 + Math.random() * 50}%) brightness(${80 + Math.random() * 40}%)`
                  : "none",
                transform: glitchMode
                  ? `translate(${glitchOffset.x}px, ${glitchOffset.y}px) skew(${Math.random() * 2 - 1}deg)`
                  : "none",
                textShadow: glitchMode
                  ? `${Math.random() * 3}px 0 red, -${Math.random() * 3}px 0 cyan, 0 ${Math.random() * 3}px lime`
                  : "none",
                backgroundImage: glitchMode
                  ? `linear-gradient(${Math.random() * 360}deg, transparent ${Math.random() * 90}%, rgba(255,0,0,0.1) ${Math.random() * 10 + 90}%)`
                  : "none",
              }}
            >
              {/* Title Bar */}
              <div
                className="flex items-center justify-between px-2 py-1 text-white text-sm font-bold cursor-move"
                style={{
                  background: "linear-gradient(90deg, #0000ff 0%, #000080 100%)",
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white border border-gray-400 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-600"></div>
                  </div>
                  <span>Join the Digital Canvas Community</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setIsMinimized(!isMinimized)
                    }}
                    className="w-4 h-4 border flex items-center justify-center hover:bg-gray-300 text-black font-bold text-xs"
                    style={{
                      borderTopColor: "#ffffff",
                      borderLeftColor: "#ffffff",
                      borderRightColor: "#808080",
                      borderBottomColor: "#808080",
                      backgroundColor: "#c0c0c0",
                    }}
                  >
                    _
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onClose()
                    }}
                    className="w-4 h-4 border flex items-center justify-center hover:bg-red-300 text-black font-bold text-xs"
                    style={{
                      borderTopColor: "#ffffff",
                      borderLeftColor: "#ffffff",
                      borderRightColor: "#808080",
                      borderBottomColor: "#808080",
                      backgroundColor: "#c0c0c0",
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Menu Bar */}
                  <div
                    className="flex text-xs border-b"
                    style={{
                      backgroundColor: "#f0f0f0",
                      borderBottomColor: "#808080",
                    }}
                  >
                    <button
                      type="button"
                      onClick={handleFileClick}
                      className="px-2 py-1 hover:bg-blue-600 hover:text-white"
                    >
                      File
                    </button>
                    <button
                      type="button"
                      onClick={handleEditClick}
                      className="px-2 py-1 hover:bg-blue-600 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={handleViewClick}
                      className="px-2 py-1 hover:bg-blue-600 hover:text-white"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={handleHelpClick}
                      className="px-2 py-1 hover:bg-blue-600 hover:text-white"
                    >
                      Help
                    </button>
                  </div>

                  {/* Main Content */}
                  <div className="p-4 relative">
                    <div className="text-center mb-4">
                      <div
                        className="inline-block p-2 border-2 cursor-pointer relative overflow-hidden"
                        style={{
                          borderTopColor: "#404040",
                          borderLeftColor: "#404040",
                          borderRightColor: "#ffffff",
                          borderBottomColor: "#ffffff",
                          backgroundColor: "#ffffff",
                          boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.3)",
                        }}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setClickCount((prev) => prev + 1)
                          if (clickCount > 5) {
                            setShowEasterEgg(true)
                          }
                        }}
                      >
                        <div className="relative z-10">
                          <Image
                            src="https://ampd-asset.s3.us-east-2.amazonaws.com/digital-canvas-dark.svg"
                            alt="Digital Canvas Logo"
                            width={120}
                            height={32}
                            className="transition-all duration-300"
                            style={{
                              filter: `drop-shadow(1px 1px 0px #000000) ${glitchMode ? "hue-rotate(90deg)" : ""}`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-center mb-4 px-2">
                      <p
                        className="text-sm text-black leading-relaxed"
                        style={{ fontFamily: "MS Sans Serif, Tahoma, sans-serif" }}
                      >
                        Explore our creative ecosystem of innovative properties and groundbreaking content.
                      </p>
                    </div>

                    <div className="flex justify-center gap-1 mb-4">
                      {backgroundColors.map((bgColor) => (
                        <button
                          key={`bg-color-${bgColor.color}`}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleColorClick(bgColor.color)
                          }}
                          className={`w-6 h-6 border-2 ${selectedBgColor === bgColor.color ? "border-black" : "border-gray-400"}`}
                          style={{ backgroundColor: bgColor.color }}
                          title={bgColor.name}
                        />
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {!isSuccess ? (
                      <motion.form
                        key="form"
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="px-4 pb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <div className="mb-4">
                          <label htmlFor="newsletter-email" className="block text-sm font-bold mb-2 text-black">
                            Email:
                          </label>
                          <input
                            ref={inputRef}
                            id="newsletter-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-100 px-2 py-2 border-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{
                              borderTopColor: "#808080",
                              borderLeftColor: "#808080",
                              borderRightColor: "#ffffff",
                              borderBottomColor: "#808080",
                              backgroundColor: "#ffffff",
                              fontFamily: "Courier New, monospace",
                              maxWidth: "100%",
                            }}
                            aria-describedby={error ? "newsletter-error" : undefined}
                            disabled={isSubmitting}
                            autoComplete="email"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 sm:px-8 py-2 text-black font-bold border-2 hover:bg-gray-300 focus:outline-none disabled:opacity-50 transition-all text-xs sm:text-sm"
                            style={{
                              borderTopColor: "#ffffff",
                              borderLeftColor: "#ffffff",
                              borderRightColor: "#808080",
                              borderBottomColor: "#808080",
                              backgroundColor: "#c0c0c0",
                              fontFamily: "MS Sans Serif, Tahoma, sans-serif",
                            }}
                            aria-label="Subscribe to newsletter"
                          >
                            {isSubmitting ? "⏳ Processing..." : "✅ Subscribe"}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              onClose()
                            }}
                            className="px-4 sm:px-8 py-2 text-black font-bold border-2 hover:bg-gray-300 focus:outline-none transition-all text-xs sm:text-sm"
                            style={{
                              borderTopColor: "#ffffff",
                              borderLeftColor: "#ffffff",
                              borderRightColor: "#808080",
                              borderBottomColor: "#808080",
                              backgroundColor: "#c0c0c0",
                              fontFamily: "MS Sans Serif, Tahoma, sans-serif",
                            }}
                          >
                            Cancel
                          </button>
                        </div>

                        {error && (
                          <div
                            id="newsletter-error"
                            className="mt-3 p-2 border text-red-800 text-xs bg-red-100"
                            style={{
                              borderColor: "#ff0000",
                              fontFamily: "Courier New, monospace",
                            }}
                            role="alert"
                          >
                            {error}
                          </div>
                        )}
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success"
                        className="px-4 pb-4 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <div
                          className="p-4 border text-green-800 text-sm bg-green-100"
                          style={{
                            borderColor: "#00ff00",
                            fontFamily: "MS Sans Serif, Tahoma, sans-serif",
                          }}
                        >
                          <div className="font-bold mb-2">✅ Success!</div>
                          <div className="text-xs leading-relaxed">Welcome to the Digital Canvas community!</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Paint Session */}
      <AnimatePresence>
        {showPaintSession && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4"
            onClick={() => setShowPaintSession(false)}
          >
            <div
              className="bg-gray-200 border-2 w-full max-w-2xl"
              style={{
                borderTopColor: "#ffffff",
                borderLeftColor: "#ffffff",
                borderRightColor: "#808080",
                borderBottomColor: "#808080",
                fontFamily: "MS Sans Serif, Tahoma, sans-serif",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 py-1 text-sm font-bold flex justify-between items-center">
                <span>🎨 Digital Canvas Paint</span>
                <button
                  type="button"
                  onClick={() => setShowPaintSession(false)}
                  className="text-white hover:bg-red-600 px-1"
                >
                  ×
                </button>
              </div>

              {/* Paint Toolbar */}
              <div className="p-2 border-b bg-gray-100 flex flex-wrap gap-2 items-center">
                <div className="flex gap-1">
                  {paintTools.map((tool) => (
                    <button
                      key={`paint-tool-${tool.name}`}
                      type="button"
                      onClick={() => {
                        setPaintSelectedTool(tool.name)
                      }}
                      className={`w-8 h-8 border flex items-center justify-center text-xs ${
                        paintSelectedTool === tool.name ? "bg-blue-200 border-blue-400" : "bg-white border-gray-400"
                      }`}
                      title={tool.name}
                      style={{ cursor: tool.cursor }}
                    >
                      {tool.icon}
                    </button>
                  ))}
                </div>

                <div className="flex gap-1">
                  {paintColors.map((color) => (
                    <button
                      key={`paint-session-color-${color}`}
                      type="button"
                      onClick={() => {
                        setPaintSelectedColor(color)
                      }}
                      className={`w-6 h-6 border-2 ${paintSelectedColor === color ? "border-black" : "border-gray-400"}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs">Size:</span>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={paintBrushSize}
                    onChange={(e) => setPaintBrushSize(Number(e.target.value))}
                    className="w-16"
                  />
                  <span className="text-xs">{paintBrushSize}px</span>
                </div>

                <button
                  type="button"
                  onClick={clearPaintCanvas}
                  className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 border border-red-300"
                >
                  Clear
                </button>
              </div>

              {/* Paint Canvas */}
              <div className="p-4 bg-gray-100">
                <div
                  className="relative bg-white border-2 border-gray-400"
                  style={{ width: "400px", height: "300px", margin: "0 auto" }}
                >
                  <canvas
                    ref={paintCanvasRef}
                    width={400}
                    height={300}
                    className="absolute inset-0 cursor-crosshair"
                    onMouseDown={startPaintDrawing}
                    onMouseMove={continuePaintDrawing}
                    onMouseUp={stopPaintDrawing}
                    onMouseLeave={stopPaintDrawing}
                    style={{ cursor: paintSelectedTool === "eraser" ? "crosshair" : "crosshair" }}
                  />
                  <svg className="absolute inset-0 pointer-events-none" width={400} height={300}>
                    {paintCanvasStrokes.map((stroke, index) => (
                      <circle
                        key={`paint-canvas-stroke-${index}`}
                        cx={stroke.x}
                        cy={stroke.y}
                        r={stroke.size}
                        fill={stroke.color}
                      />
                    ))}
                  </svg>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t bg-gray-100 flex flex-wrap gap-2 justify-center">
                <button
                  type="button"
                  onClick={savePaintCreation}
                  className="px-4 py-2 text-xs bg-green-100 hover:bg-green-200 border border-green-300 flex items-center gap-1"
                >
                  💾 Save Creation
                </button>
                <button
                  type="button"
                  onClick={shareToLinkedIn}
                  className="px-4 py-2 text-xs bg-blue-100 hover:bg-blue-200 border border-blue-300 flex items-center gap-1"
                >
                  🔗 Share to LinkedIn
                </button>
                <button
                  type="button"
                  onClick={shareToTwitter}
                  className="px-4 py-2 text-xs bg-cyan-100 hover:bg-cyan-200 border border-cyan-300 flex items-center gap-1"
                >
                  🐦 Share to Twitter
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BSOD */}
      <AnimatePresence>
        {showBSOD && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-blue-800 text-white font-mono text-sm z-[60] flex flex-col justify-center items-center p-8"
            onClick={() => setShowBSOD(false)}
          >
            <div className="w-full max-w-2xl text-center space-y-4">
              <div className="text-2xl font-bold mb-8">:( :( :( :( :( :( :( :( :( :(</div>
              <div className="text-lg font-bold">
                A problem has been detected and Digital Canvas has been shut down to prevent damage to your creativity.
              </div>
              <div className="mt-4">
                <div>CREATIVE_OVERFLOW_EXCEPTION</div>
                <div className="mt-2">*** STOP: 0x0000007B (0xF78D2524, 0xC0000034, 0x00000000, 0x00000000)</div>
              </div>
              <div className="mt-6 text-sm">
                <div>If this is the first time you've seen this error screen, restart your creativity.</div>
                <div>If this screen appears again, follow these steps:</div>
                <div className="mt-2">
                  <div>* Check to make sure any new design tools are properly installed</div>
                  <div>* Try subscribing to our newsletter for updates</div>
                  <div>* Contact your system administrator for creative assistance</div>
                </div>
              </div>
              <div className="text-2xl font-bold mt-8">:) :) :) :) :) :) :) :) :) :)</div>
              <div className="text-yellow-400 mt-4">Click anywhere to recover...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal popup for Edit button */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[60]"
            onClick={() => setShowTerminal(false)}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-black text-green-400 font-mono text-sm border-2 border-green-400 w-full max-w-2xl mx-4 p-6 rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 border-b border-green-400 pb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-green-400">Terminal - Digital Canvas</span>
                <button onClick={() => setShowTerminal(false)} className="text-green-400 hover:text-white">
                  ×
                </button>
              </div>

              <div className="space-y-2">
                <div className="text-green-400">$ cat creative_team.txt</div>
                <div className="text-white mt-4 leading-relaxed">
                  <div className="text-green-400 font-bold text-lg mb-3">Meet The Creative Team</div>
                  <div className="text-green-300">
                    From bicultural media to military medicine, explore the diverse ecosystem of brands that fuel our
                    creative canvas. Our interdisciplinary collective spans industries, cultures, and creative
                    disciplines - each bringing unique perspectives that shape tomorrow's digital experiences.
                  </div>
                  <div className="mt-4 text-green-400">&gt; Connecting visionaries across boundaries</div>
                  <div className="text-green-400">&gt; Building bridges through creative innovation</div>
                  <div className="text-green-400">&gt; Transforming ideas into digital reality</div>
                </div>
                <div className="mt-6 text-green-400">
                  $ <span className="animate-pulse">_</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
