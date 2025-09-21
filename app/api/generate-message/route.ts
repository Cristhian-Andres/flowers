import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const prompt = `Crea una frase romántica e inspiradora de máximo 15 palabras en español para una mujer llamada ${name}. La frase debe estar relacionada con flores y ser muy dulce y poética. Solo responde con la frase, sin comillas ni explicaciones adicionales.`

    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt,
      maxTokens: 50,
      temperature: 0.8,
    })

    return NextResponse.json({ message: text.trim() })
  } catch (error) {
    console.error("Error generating message:", error)
    return NextResponse.json({ error: "Failed to generate message" }, { status: 500 })
  }
}
