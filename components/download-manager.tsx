"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Download, ImageIcon, FileImage, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DownloadManagerProps {
  userName: string
  message: string
  imageUrl: string
}

type DownloadFormat = "social" | "wallpaper" | "story"

export function DownloadManager({ userName, message, imageUrl }: DownloadManagerProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [selectedFormat, setSelectedFormat] = useState<DownloadFormat>("social")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const downloadFormats = {
    social: { width: 1080, height: 1920, name: "Redes Sociales (9:16)" },
    wallpaper: { width: 1080, height: 1920, name: "Fondo de Pantalla" },
    story: { width: 1080, height: 1920, name: "Historia de Instagram" },
  }

  const createComposition = async (format: DownloadFormat): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current
      if (!canvas) {
        resolve(null)
        return
      }

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        resolve(null)
        return
      }

      const { width, height } = downloadFormats[format]
      canvas.width = width
      canvas.height = height

      setDownloadProgress(20)

      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        setDownloadProgress(40)

        // Draw background image
        ctx.drawImage(img, 0, 0, width, height)

        setDownloadProgress(60)

        // Create gradient overlay based on format
        let gradientStart = height * 0.75
        if (format === "story") gradientStart = height * 0.7
        if (format === "wallpaper") gradientStart = height * 0.8

        const gradient = ctx.createLinearGradient(0, gradientStart, 0, height)
        gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
        gradient.addColorStop(0.3, "rgba(0, 0, 0, 0.2)")
        gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.6)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.85)")
        ctx.fillStyle = gradient
        ctx.fillRect(0, gradientStart, width, height - gradientStart)

        setDownloadProgress(70)

        // Add decorative frame
        const frameMargin = 50
        const frameHeight = height - gradientStart - frameMargin * 2
        ctx.strokeStyle = "rgba(246, 231, 193, 0.9)"
        ctx.lineWidth = 3
        ctx.strokeRect(frameMargin, gradientStart + frameMargin, width - frameMargin * 2, frameHeight)

        // Add inner decorative elements
        ctx.strokeStyle = "rgba(246, 231, 193, 0.6)"
        ctx.lineWidth = 1
        ctx.strokeRect(
          frameMargin + 20,
          gradientStart + frameMargin + 20,
          width - (frameMargin + 20) * 2,
          frameHeight - 40,
        )

        setDownloadProgress(80)

        // Configure text styling
        ctx.fillStyle = "#ffffff"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.shadowColor = "rgba(0, 0, 0, 0.7)"
        ctx.shadowBlur = 6
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2

        // Dynamic font sizing based on format
        const fontSize = format === "story" ? 48 : 52
        ctx.font = `bold ${fontSize}px serif`

        // Word wrapping with improved algorithm
        const words = message.split(" ")
        const lines = []
        let currentLine = ""
        const maxWidth = width - 120

        for (const word of words) {
          const testLine = currentLine + (currentLine ? " " : "") + word
          const metrics = ctx.measureText(testLine)
          if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine)
            currentLine = word
          } else {
            currentLine = testLine
          }
        }
        if (currentLine) lines.push(currentLine)

        // Calculate text positioning
        const lineHeight = fontSize + 15
        const textAreaHeight = lines.length * lineHeight
        const textStartY = gradientStart + (height - gradientStart) / 2 - textAreaHeight / 2 + lineHeight / 2

        // Draw text lines
        lines.forEach((line, index) => {
          ctx.fillText(line, width / 2, textStartY + index * lineHeight)
        })

        setDownloadProgress(90)

        // Reset shadow for decorative elements
        ctx.shadowColor = "transparent"
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0

        // Add decorative flowers
        ctx.font = "24px serif"
        ctx.fillStyle = "rgba(246, 231, 193, 0.8)"
        const decorY = textStartY + lines.length * lineHeight + 30
        ctx.fillText("✿ ❀ ✿", width / 2, decorY)

        // Add watermark
        ctx.font = "20px serif"
        ctx.fillStyle = "rgba(246, 231, 193, 0.9)"
        ctx.fillText("Flores para Ella", width / 2, height - 40)

        setDownloadProgress(100)

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            resolve(blob)
          },
          "image/jpeg",
          0.95,
        )
      }

      img.onerror = () => {
        resolve(null)
      }

      img.src = imageUrl
    })
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    setDownloadProgress(0)

    try {
      const blob = await createComposition(selectedFormat)

      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `flores-para-${userName.toLowerCase().replace(/\s+/g, "-")}-${selectedFormat}.jpg`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else {
        throw new Error("Failed to create image")
      }
    } catch (error) {
      console.error("Error downloading image:", error)
    } finally {
      setIsDownloading(false)
      setDownloadProgress(0)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-playfair">
          <Download className="w-5 h-5" />
          Descargar Imagen
        </CardTitle>
        <CardDescription>Elige el formato que prefieras para descargar tu mensaje personalizado</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Format Selection */}
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(downloadFormats).map(([key, format]) => (
            <Button
              key={key}
              variant={selectedFormat === key ? "default" : "outline"}
              onClick={() => setSelectedFormat(key as DownloadFormat)}
              className="justify-start h-auto p-3"
            >
              <div className="flex items-center gap-3">
                {key === "social" && <Smartphone className="w-4 h-4" />}
                {key === "wallpaper" && <ImageIcon className="w-4 h-4" />}
                {key === "story" && <FileImage className="w-4 h-4" />}
                <div className="text-left">
                  <div className="font-medium">{format.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {format.width} × {format.height}px
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>

        {/* Download Progress */}
        {isDownloading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Creando imagen...</span>
              <span>{downloadProgress}%</span>
            </div>
            <Progress value={downloadProgress} className="w-full" />
          </div>
        )}

        {/* Download Button */}
        <Button onClick={handleDownload} disabled={isDownloading} className="w-full">
          <Download className="w-4 h-4 mr-2" />
          {isDownloading ? "Creando imagen..." : `Descargar ${downloadFormats[selectedFormat].name}`}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          La imagen se descargará en formato JPG de alta calidad
        </p>
      </CardContent>

      {/* Hidden canvas */}
      <canvas ref={canvasRef} className="hidden" />
    </Card>
  )
}
