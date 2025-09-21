export function selectFlowerImage(sessionId: string): string {
  const flowerImages = [
    "/flowers/flower-1.jpeg", // Girasol individual con tallo
    "/flowers/flower-2.jpeg", // Tres girasoles pequeños
    "/flowers/flower-3.jpeg", // Ramo de girasoles en jarrón
    "/flowers/flower-4.jpeg", // Girasol con mariposa
    "/flowers/flower-5.jpeg", // Dos girasoles minimalistas
    "/flowers/flower-6.jpeg", // Girasol artístico detallado
    "/flowers/flower-7.jpeg", // Flores amarillas tipo margarita
    "/flowers/flower-8.jpeg", // Dos girasoles botánicos
    "/flowers/flower-9.jpeg", // Tres gerberas coloridas
  ]

  // Generate deterministic index based on session ID
  let hash = 0
  for (let i = 0; i < sessionId.length; i++) {
    const char = sessionId.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }

  const index = Math.abs(hash) % flowerImages.length
  return flowerImages[index]
}
