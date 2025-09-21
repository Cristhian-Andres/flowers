"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface NameFormProps {
  onSubmit: (name: string) => void
  isLoading?: boolean
}

export function NameForm({ onSubmit, isLoading = false }: NameFormProps) {
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim())
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4 animate-fade-in-up">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-playfair text-3xl text-foreground mb-2">¡Hola!</CardTitle>
          <CardDescription className="font-source-sans text-lg text-muted-foreground">
            Cuéntanos tu nombre para crear un mensaje especial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Escribe tu nombre aquí..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg py-3 font-source-sans"
                disabled={isLoading}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full py-3 text-lg font-source-sans font-medium"
              disabled={isLoading || !name.trim()}
            >
              {isLoading ? "Creando tu mensaje..." : "Crear mi mensaje"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
