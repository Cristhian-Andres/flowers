"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface FlowerAnimationProps {
  onComplete: () => void
}

export function FlowerAnimation({ onComplete }: FlowerAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 500) // Wait for fade out animation
    }, 3000) // Show for 3 seconds

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center z-50 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="text-center animate-scale-in">
        <div className="relative w-48 h-48 mx-auto mb-8">
          <Image src="/images/sunflower.png" alt="Sunflower" fill className="object-contain animate-pulse" priority />
        </div>
        <h1 className="font-playfair text-4xl font-bold text-foreground mb-2">Flores para Ella</h1>
        <p className="font-source-sans text-muted-foreground text-lg">Creando algo especial...</p>
      </div>
    </div>
  )
}
