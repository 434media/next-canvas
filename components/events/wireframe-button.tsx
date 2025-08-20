"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "motion/react"

interface WireframeButtonProps {
  href?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  variant?: "primary" | "secondary" | "outline"
}

const WireframeButton: React.FC<WireframeButtonProps> = ({
  href,
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
}) => {
  const baseClasses =
    "relative inline-block px-6 py-3 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900"

  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40",
    outline: "bg-transparent text-white border border-blue-500/40 hover:border-blue-400/80",
  }

  const ButtonContent = (
    <>
      {children}
      {variant === "outline" && (
        <>
          <div className="absolute inset-0 border border-blue-500/40 rounded-lg" />
          <div className="absolute inset-0 bg-blue-500/10 rounded-lg" />
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/60" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-500/60" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-500/60" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/60" />
        </>
      )}
    </>
  )

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative inline-block">
        <Link href={href} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
          {ButtonContent}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className="relative inline-block"
    >
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      >
        {ButtonContent}
      </button>
    </motion.div>
  )
}

export default WireframeButton
