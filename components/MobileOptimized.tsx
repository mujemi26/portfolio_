"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

interface MobileOptimizedProps {
  children: React.ReactNode
  className?: string
}

export function MobileOptimized({ children, className = "" }: MobileOptimizedProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    })
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart) return

      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      }

      const deltaX = touchStart.x - touchEnd.x
      const deltaY = touchStart.y - touchEnd.y

      // Handle swipe gestures
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            // Swipe left
            console.log("Swipe left")
          } else {
            // Swipe right
            console.log("Swipe right")
          }
        }
      }

      setTouchStart(null)
    },
    [touchStart],
  )

  if (!isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={`${className} touch-manipulation`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
    >
      {children}
    </motion.div>
  )
}
