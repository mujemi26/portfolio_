"use client"

import { memo, type ReactNode } from "react"
import { motion } from "framer-motion"

interface OptimizedSectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export const OptimizedSection = memo(function OptimizedSection({
  children,
  className = "",
  id,
}: OptimizedSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.section>
  )
})
