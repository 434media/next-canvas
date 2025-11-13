"use client"

import React from "react"
import { ChevronDownIcon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useState, useRef, useEffect } from "react"

import { cn } from "@/lib/utils"

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children?: React.ReactNode
  placeholder?: string
  disabled?: boolean
  className?: string
  name?: string
  required?: boolean
}

interface SelectContextType {
  value?: string
  onValueChange?: (value: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const SelectContext = React.createContext<SelectContextType | null>(null)

function Select({ value, onValueChange, children, placeholder, disabled, className, name, required }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(value)

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue)
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  return (
    <SelectContext.Provider value={{ value: internalValue, onValueChange: handleValueChange, isOpen, setIsOpen }}>
      <motion.div
        className={cn("relative w-full", className)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {name && <input type="hidden" name={name} value={internalValue || ""} required={required} />}
        {children}
      </motion.div>
    </SelectContext.Provider>
  )
}

function SelectTrigger({ children, className }: { children?: React.ReactNode; className?: string }) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectTrigger must be used within Select")

  return (
    <motion.button
      type="button"
      onClick={() => context.setIsOpen(!context.isOpen)}
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 dark:hover:bg-input/50",
        "flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow,transform] outline-none focus-visible:ring-[3px]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "hover:border-ring/50",
        className,
      )}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <ChevronDownIcon
        className={cn("size-4 opacity-50 transition-transform duration-200", context.isOpen && "rotate-180")}
      />
    </motion.button>
  )
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectValue must be used within Select")

  return <span className="text-muted-foreground">{context.value || placeholder}</span>
}

function SelectContent({ children, className }: { children?: React.ReactNode; className?: string }) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectContent must be used within Select")

  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        context.setIsOpen(false)
      }
    }

    if (context.isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [context.isOpen])

  return (
    <AnimatePresence>
      {context.isOpen && (
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "bg-popover text-popover-foreground absolute top-full left-0 z-50 mt-1 w-full min-w-[8rem] overflow-hidden rounded-md border shadow-md",
            className,
          )}
        >
          <div className="p-1 max-h-60 overflow-y-auto">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SelectItem({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectItem must be used within Select")

  return (
    <motion.button
      type="button"
      onClick={() => context.onValueChange?.(value)}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-pointer items-center rounded-sm py-1.5 px-2 text-sm outline-none select-none",
        "hover:bg-accent/50 transition-colors",
        context.value === value && "bg-accent",
        className,
      )}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
