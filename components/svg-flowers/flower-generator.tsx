"use client"

import type React from "react"

import { Rose } from "./rose"
import { Sunflower } from "./sunflower"
import { Tulip } from "./tulip"
import { Daisy } from "./daisy"
import { Lily } from "./lily"
import { Orchid } from "./orchid"
import { Peony } from "./peony"
import { Hibiscus } from "./hibiscus"

export interface FlowerProps {
  className?: string
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
  backgroundColor?: string
}

const flowerComponents = [Rose, Sunflower, Tulip, Daisy, Lily, Orchid, Peony, Hibiscus]

const colorPalettes = [
  // Romantic Pink
  {
    primaryColor: "#ff6b9d",
    secondaryColor: "#ffc3d8",
    accentColor: "#4ecdc4",
    backgroundColor: "#fff5f8",
  },
  // Sunset Orange
  {
    primaryColor: "#ff8c42",
    secondaryColor: "#ffd662",
    accentColor: "#ff6b9d",
    backgroundColor: "#fff8f0",
  },
  // Purple Dream
  {
    primaryColor: "#a8e6cf",
    secondaryColor: "#dcedc1",
    accentColor: "#ffd3a5",
    backgroundColor: "#f8fff8",
  },
  // Ocean Blue
  {
    primaryColor: "#74b9ff",
    secondaryColor: "#81ecec",
    accentColor: "#fd79a8",
    backgroundColor: "#f0f8ff",
  },
  // Golden Yellow
  {
    primaryColor: "#fdcb6e",
    secondaryColor: "#e17055",
    accentColor: "#6c5ce7",
    backgroundColor: "#fffbf0",
  },
  // Lavender
  {
    primaryColor: "#a29bfe",
    secondaryColor: "#fd79a8",
    accentColor: "#fdcb6e",
    backgroundColor: "#f8f6ff",
  },
  // Coral
  {
    primaryColor: "#ff7675",
    secondaryColor: "#fab1a0",
    accentColor: "#00b894",
    backgroundColor: "#fff5f5",
  },
  // Mint Green
  {
    primaryColor: "#00b894",
    secondaryColor: "#55efc4",
    accentColor: "#ff7675",
    backgroundColor: "#f0fff4",
  },
]

export function generateFlowerSVG(sessionId: string): {
  component: React.ComponentType<FlowerProps>
  colors: any
  flowerType: string
} {
  // Create deterministic selection based on session ID
  const hash = sessionId.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

  const flowerIndex = Math.abs(hash) % flowerComponents.length
  const colorIndex = Math.abs(hash >> 4) % colorPalettes.length

  const FlowerComponent = flowerComponents[flowerIndex]
  const colors = colorPalettes[colorIndex]
  const flowerType = FlowerComponent.name

  return {
    component: FlowerComponent,
    colors,
    flowerType,
  }
}

export function FlowerSVG({ sessionId, className = "w-full h-full" }: { sessionId: string; className?: string }) {
  const { component: FlowerComponent, colors } = generateFlowerSVG(sessionId)

  return <FlowerComponent className={className} {...colors} />
}
