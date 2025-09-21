"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SunflowerIcon } from "@/components/sunflower-icon"
import { DownloadManager } from "@/components/download-manager"
import { SocialLinks } from "@/components/social-links"
import { RotateCcw, Share2, Heart, Download, ImageIcon } from "lucide-react"

interface ResultDisplayProps {
  userName: string
  message: string
  imageUrl: string
  onStartOver: () => void
}

export function ResultDisplay({ userName, message, imageUrl, onStartOver }: ResultDisplayProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showDownloadOptions, setShowDownloadOptions] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)

  useEffect(() => {
    if (imageUrl) {
      const img = new window.Image()
      img.onload = () => setImageLoaded(true)
      img.src = imageUrl
    }
  }, [imageUrl])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Flores para Ella",
          text: message,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
        setShowShareOptions(true)
      }
    } else {
      setShowShareOptions(true)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${message}\n\n✿ Creado en Flores para Ella ✿`)
      // Could add a toast notification here
    } catch (error) {
      console.error("Error copying to clipboard:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SunflowerIcon className="w-8 h-8" />
            <h1 className="font-playfair text-2xl font-bold text-foreground">Flores para Ella</h1>
          </div>
          <Button variant="outline" onClick={onStartOver} className="flex items-center gap-2 bg-transparent">
            <RotateCcw className="w-4 h-4" />
            Crear otro
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Image Preview Card */}
          <Card className="overflow-hidden shadow-xl animate-scale-in">
            <div className="relative aspect-[9/16] bg-muted">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <SunflowerIcon className="w-12 h-12 animate-spin opacity-50" />
                </div>
              )}
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt="Beautiful flower arrangement"
                fill
                className={`object-contain transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                priority
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="border border-primary/30 rounded-lg p-4 backdrop-blur-sm bg-black/20">
                  <div className="flex items-center justify-center mb-2">
                    <Heart className="w-4 h-4 text-primary mr-2" />
                    <div className="h-px bg-primary/50 flex-1" />
                    <Heart className="w-4 h-4 text-primary mx-2" />
                    <div className="h-px bg-primary/50 flex-1" />
                    <Heart className="w-4 h-4 text-primary ml-2" />
                  </div>
                  <p className="font-playfair text-xl font-bold text-center leading-relaxed text-balance">{message}</p>
                  <p className="font-source-sans text-sm text-center mt-3 opacity-80">✿ Flores para Ella ✿</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Descargar
                  </Button>
                  <Button variant="outline" onClick={handleShare} className="flex items-center gap-2 bg-transparent">
                    <Share2 className="w-4 h-4" />
                    Compartir
                  </Button>
                </div>

                {showShareOptions && (
                  <div className="p-4 bg-muted rounded-lg space-y-2 animate-fade-in-up">
                    <p className="text-sm font-medium text-center">Compartir mensaje:</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                      className="w-full text-left justify-start"
                    >
                      Copiar texto
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowShareOptions(false)}
                      className="w-full text-muted-foreground"
                    >
                      Cerrar
                    </Button>
                  </div>
                )}

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Tu mensaje personalizado con flor única seleccionada</p>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <ImageIcon className="w-3 h-3" />
                    <span>Diseño floral artístico</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Options */}
          {showDownloadOptions && (
            <div className="animate-fade-in-up">
              <DownloadManager userName={userName} message={message} imageUrl={imageUrl} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <p className="font-source-sans text-sm text-muted-foreground">
              © {new Date().getFullYear()} Flores para Ella
            </p>
            <SocialLinks />
          </div>
        </div>
      </footer>
    </div>
  )
}
