import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const prompt = `Eres un poeta que crea mensajes románticos inspirados en la literatura universal. Genera una frase original de máximo 25 palabras para ${name} que evoque el estilo de Pablo Neruda o Octavio Paz (sin mencionarlos): elegante, profundo y no cursi (evitar clichés, exceso de dulzura o lenguaje trivial).

Tema central: flores como metáfora de conexión humana, usando lenguaje poético y imágenes sutiles. La frase debe sonar atemporal y literaria, no como un mensaje genérico.

Formato de respuesta: solo el texto de la frase, sin comillas, ni explicaciones, ni el nombre de la persona visible en el texto.`

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
