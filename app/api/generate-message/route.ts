import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const prompt = `Eres un escritor que crea mensajes románticos inspirados en la literatura universal. Genera una frase original de máximo 25 palabras para ${name} que evoque un estilo poetico: elegante, profundo y no cursi (evitar clichés, exceso de dulzura o lenguaje trivial) sin frases muy profundas, debes colocar el nombre de ${name}.

Tema central: flores como metáfora de conexión humana, usando lenguaje poético. La frase debe sonar atemporal y literaria, no como un mensaje genérico, como por ejemplo: "${name}, como flor que desafía el viento, tu esencia florece donde otros apenas sueñan con arraigar.", "${name}, como flor que desafía el viento, tu esencia florece donde otros apenas sueñan con arraigar.", "Bajo el cielo que te nombra, ${name}, florecen tus pasos como versos de Neruda: raíz, luz y eternidad en flor.".

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
