"use client"

import { useState } from "react"
import { FlowerAnimation } from "@/components/flower-animation"
import { NameForm } from "@/components/name-form"
import { ResultDisplay } from "@/components/result-display"
import { SunflowerIcon } from "@/components/sunflower-icon"
import { trackUsage, generateSessionId } from "@/lib/analytics"
import { selectFlowerImage } from "@/lib/flower-selector"

type AppState = "loading" | "form" | "generating" | "result"

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>("loading")
  const [userName, setUserName] = useState("")
  const [generatedMessage, setGeneratedMessage] = useState("")
  const [flowerImage, setFlowerImage] = useState("")
  const [sessionId] = useState(() => generateSessionId())

  const handleAnimationComplete = () => {
    setAppState("form")
  }

  const handleNameSubmit = async (name: string) => {
    setUserName(name)
    setAppState("generating")

    try {
      const selectedFlowerImage = selectFlowerImage(sessionId)

      // Generate AI message
      const messageResponse = await fetch("/api/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })

      if (!messageResponse.ok) {
        throw new Error("Failed to generate message")
      }

      const { message } = await messageResponse.json()

      setGeneratedMessage(message)
      setFlowerImage(selectedFlowerImage)
      setAppState("result")

      // Track usage (non-blocking)
      trackUsage({
        name: name,
        message: message,
        sessionId: sessionId,
      }).catch((error) => {
        console.log("Analytics tracking failed (non-critical):", error)
      })
    } catch (error) {
      console.error("Error generating content:", error)
      const fallbackMessage = `${name}, eres como una flor que ilumina cada día con su belleza única.`

      const fallbackFlowerImage = "/flowers/flower-1.jpeg"

      setGeneratedMessage(fallbackMessage)
      setFlowerImage(fallbackFlowerImage)
      setAppState("result")

      // Track error case
      trackUsage({
        name: name,
        message: fallbackMessage,
        sessionId: sessionId,
      }).catch((error) => {
        console.log("Analytics tracking failed (non-critical):", error)
      })
    }
  }

  const handleStartOver = () => {
    setAppState("form")
    setUserName("")
    setGeneratedMessage("")
    setFlowerImage("")
  }

  if (appState === "loading") {
    return <FlowerAnimation onComplete={handleAnimationComplete} />
  }

  if (appState === "form") {
    return <NameForm onSubmit={handleNameSubmit} />
  }

  if (appState === "generating") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
        <div className="text-center animate-scale-in">
          <SunflowerIcon className="w-16 h-16 mx-auto mb-4 animate-spin" />
          <h2 className="font-playfair text-2xl font-bold text-foreground mb-2">Creando tu mensaje especial...</h2>
          <p className="font-source-sans text-muted-foreground">Seleccionando una flor hermosa para ti</p>
          <p className="font-source-sans text-xs text-muted-foreground mt-2">Eligiendo el diseño perfecto...</p>
        </div>
      </div>
    )
  }

  return (
    <ResultDisplay
      userName={userName}
      message={generatedMessage}
      imageUrl={flowerImage}
      onStartOver={handleStartOver}
    />
  )
}
