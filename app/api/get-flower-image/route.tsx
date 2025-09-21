import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const sessionId = url.searchParams.get("session") || Date.now().toString()

    // Generate SVG as data URL for consistent behavior with existing image handling
    const svgDataUrl = `data:image/svg+xml;base64,${Buffer.from(generateSVGString(sessionId)).toString("base64")}`

    return NextResponse.json({
      imageUrl: svgDataUrl,
      metadata: {
        aspectRatio: "9:16",
        resolution: "400x600",
        source: "Generated SVG",
        optimized: true,
        flowerType: getFlowerType(sessionId),
      },
    })
  } catch (error) {
    console.error("Error generating flower SVG:", error)
    return NextResponse.json({ error: "Failed to generate flower image" }, { status: 500 })
  }
}

function generateSVGString(sessionId: string): string {
  const hash = sessionId.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

  const flowerTypes = ["rose", "sunflower", "tulip", "daisy", "lily", "orchid", "peony", "hibiscus"]
  const colorPalettes = [
    { primary: "#ff6b9d", secondary: "#ffc3d8", accent: "#4ecdc4", bg: "#fff5f8" },
    { primary: "#ff8c42", secondary: "#ffd662", accent: "#ff6b9d", bg: "#fff8f0" },
    { primary: "#a8e6cf", secondary: "#dcedc1", accent: "#ffd3a5", bg: "#f8fff8" },
    { primary: "#74b9ff", secondary: "#81ecec", accent: "#fd79a8", bg: "#f0f8ff" },
    { primary: "#fdcb6e", secondary: "#e17055", accent: "#6c5ce7", bg: "#fffbf0" },
    { primary: "#a29bfe", secondary: "#fd79a8", accent: "#fdcb6e", bg: "#f8f6ff" },
    { primary: "#ff7675", secondary: "#fab1a0", accent: "#00b894", bg: "#fff5f5" },
    { primary: "#00b894", secondary: "#55efc4", accent: "#ff7675", bg: "#f0fff4" },
  ]

  const flowerIndex = Math.abs(hash) % flowerTypes.length
  const colorIndex = Math.abs(hash >> 4) % colorPalettes.length

  const flowerType = flowerTypes[flowerIndex]
  const colors = colorPalettes[colorIndex]

  return generateFlowerSVG(flowerType, colors)
}

function getFlowerType(sessionId: string): string {
  const hash = sessionId.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

  const flowerTypes = ["Rosa", "Girasol", "Tulipán", "Margarita", "Lirio", "Orquídea", "Peonía", "Hibisco"]
  const flowerIndex = Math.abs(hash) % flowerTypes.length
  return flowerTypes[flowerIndex]
}

function generateFlowerSVG(type: string, colors: any): string {
  const { primary, secondary, accent, bg } = colors

  switch (type) {
    case "rose":
      return `<svg viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="roseGradient" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="${secondary}" />
            <stop offset="100%" stop-color="${primary}" />
          </radialGradient>
        </defs>
        <rect width="400" height="600" fill="${bg}" />
        <path d="M200 350 Q195 400 200 450 Q205 500 200 550" stroke="#2d7d32" stroke-width="8" fill="none" />
        <ellipse cx="180" cy="400" rx="15" ry="25" fill="#4caf50" transform="rotate(-30 180 400)" />
        <ellipse cx="220" cy="480" rx="12" ry="20" fill="#4caf50" transform="rotate(45 220 480)" />
        <circle cx="200" cy="300" r="80" fill="url(#roseGradient)" opacity="0.8" />
        <circle cx="180" cy="280" r="60" fill="${primary}" opacity="0.7" />
        <circle cx="220" cy="280" r="60" fill="${primary}" opacity="0.7" />
        <circle cx="200" cy="260" r="50" fill="${secondary}" opacity="0.9" />
        <circle cx="200" cy="280" r="40" fill="url(#roseGradient)" />
        <circle cx="190" cy="270" r="25" fill="${secondary}" />
        <circle cx="210" cy="270" r="25" fill="${secondary}" />
        <circle cx="200" cy="260" r="20" fill="${primary}" />
        <circle cx="200" cy="270" r="8" fill="#8b0000" />
      </svg>`

    case "sunflower":
      return `<svg viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="600" fill="${bg}" />
        <rect x="195" y="350" width="10" height="200" fill="#4a7c59" />
        <ellipse cx="170" cy="420" rx="20" ry="35" fill="#4a7c59" transform="rotate(-20 170 420)" />
        <ellipse cx="230" cy="480" rx="18" ry="30" fill="#4a7c59" transform="rotate(25 230 480)" />
        ${Array.from({ length: 16 }, (_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180
          const x = 200 + Math.cos(angle) * 70
          const y = 280 + Math.sin(angle) * 70
          return `<ellipse cx="${x}" cy="${y}" rx="12" ry="35" fill="${primary}" transform="rotate(${i * 22.5} ${x} ${y})" />`
        }).join("")}
        <circle cx="200" cy="280" r="45" fill="#654321" />
      </svg>`

    case "tulip":
      return `<svg viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="600" fill="${bg}" />
        <rect x="195" y="320" width="10" height="230" fill="#2e7d32" />
        <ellipse cx="160" cy="400" rx="15" ry="60" fill="#4caf50" transform="rotate(-15 160 400)" />
        <ellipse cx="240" cy="450" rx="12" ry="50" fill="#4caf50" transform="rotate(20 240 450)" />
        <path d="M200 180 Q160 220 170 300 Q185 320 200 320 Q215 320 230 300 Q240 220 200 180 Z" fill="${primary}" />
        <path d="M200 180 Q180 200 175 280 Q190 310 200 320 Q210 310 225 280 Q220 200 200 180 Z" fill="${secondary}" opacity="0.8" />
        <ellipse cx="200" cy="240" rx="8" ry="30" fill="${accent}" opacity="0.6" />
      </svg>`

    case "daisy":
      return `<svg viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="600" fill="${bg}" />
        <rect x="195" y="340" width="10" height="210" fill="#228b22" />
        <ellipse cx="175" cy="420" rx="12" ry="25" fill="#32cd32" transform="rotate(-25 175 420)" />
        <ellipse cx="225" cy="480" rx="10" ry="20" fill="#32cd32" transform="rotate(30 225 480)" />
        ${Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30 * Math.PI) / 180
          const x = 200 + Math.cos(angle) * 50
          const y = 280 + Math.sin(angle) * 50
          return `<ellipse cx="${x}" cy="${y}" rx="8" ry="25" fill="white" stroke="${secondary}" stroke-width="1" transform="rotate(${i * 30} ${x} ${y})" />`
        }).join("")}
        <circle cx="200" cy="280" r="25" fill="${accent}" />
      </svg>`

    case "lily":
      return `<svg viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="600" fill="${bg}" />
        <rect x="195" y="350" width="10" height="200" fill="#27ae60" />
        <ellipse cx="170" cy="430" rx="8" ry="40" fill="${accent}" transform="rotate(-10 170 430)" />
        <ellipse cx="230" cy="470" rx="8" ry="35" fill="${accent}" transform="rotate(15 230 470)" />
        ${Array.from({ length: 6 }, (_, i) => {
          const angle = (i * 60 * Math.PI) / 180
          const x = 200 + Math.cos(angle) * 60
          const y = 280 + Math.sin(angle) * 40
          return `<ellipse cx="${x}" cy="${y}" rx="15" ry="50" fill="${primary}" transform="rotate(${i * 60 + 90} ${x} ${y})" />`
        }).join("")}
        <circle cx="200" cy="280" r="8" fill="#2d5016" />
      </svg>`

    case "orchid":
      return `<svg viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="600" fill="${bg}" />
        <rect x="195" y="380" width="10" height="170" fill="#2e7d32" />
        <ellipse cx="160" cy="450" rx="12" ry="50" fill="#4caf50" transform="rotate(-20 160 450)" />
        <ellipse cx="240" cy="490" rx="10" ry="40" fill="#4caf50" transform="rotate(25 240 490)" />
        <ellipse cx="200" cy="220" rx="25" ry="40" fill="${primary}" />
        <ellipse cx="170" cy="250" rx="20" ry="35" fill="${primary}" transform="rotate(-30 170 250)" />
        <ellipse cx="230" cy="250" rx="20" ry="35" fill="${primary}" transform="rotate(30 230 250)" />
        <path d="M200 300 Q160 320 150 360 Q170 380 200 370 Q230 380 250 360 Q240 320 200 300 Z" fill="${secondary}" />
        <ellipse cx="200" cy="280" rx="8" ry="15" fill="white" />
      </svg>`

    case "peony":
      return `<svg viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="600" fill="${bg}" />
        <rect x="195" y="360" width="10" height="190" fill="#388e3c" />
        <ellipse cx="170" cy="420" rx="15" ry="30" fill="${accent}" transform="rotate(-25 170 420)" />
        <ellipse cx="230" cy="470" rx="12" ry="25" fill="${accent}" transform="rotate(20 230 470)" />
        ${Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45 * Math.PI) / 180
          const x = 200 + Math.cos(angle) * 70
          const y = 280 + Math.sin(angle) * 50
          return `<ellipse cx="${x}" cy="${y}" rx="20" ry="35" fill="${primary}" opacity="0.8" transform="rotate(${i * 45} ${x} ${y})" />`
        }).join("")}
        <circle cx="200" cy="280" r="15" fill="${secondary}" />
      </svg>`

    case "hibiscus":
    default:
      return `<svg viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="600" fill="${bg}" />
        <rect x="195" y="370" width="10" height="180" fill="#2e7d32" />
        <path d="M160 440 Q140 460 150 490 Q170 480 180 460 Q170 440 160 440 Z" fill="#4caf50" />
        <path d="M240 480 Q260 500 250 530 Q230 520 220 500 Q230 480 240 480 Z" fill="#4caf50" />
        ${Array.from({ length: 5 }, (_, i) => {
          const angle = (i * 72 * Math.PI) / 180
          const x = 200 + Math.cos(angle) * 80
          const y = 280 + Math.sin(angle) * 60
          return `<ellipse cx="${x}" cy="${y}" rx="35" ry="60" fill="${primary}" transform="rotate(${i * 72 + 90} ${x} ${y})" />`
        }).join("")}
        <circle cx="200" cy="280" r="12" fill="#8b4513" />
        <rect x="195" y="220" width="10" height="60" fill="${accent}" />
        <circle cx="200" cy="220" r="8" fill="${accent}" />
      </svg>`
  }
}
