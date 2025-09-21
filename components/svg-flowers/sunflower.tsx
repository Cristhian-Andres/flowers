import type { FlowerProps } from "./flower-generator"

export function Sunflower({
  className = "w-full h-full",
  primaryColor = "#fdcb6e",
  secondaryColor = "#e17055",
  accentColor = "#6c5ce7",
  backgroundColor = "#fffbf0",
}: FlowerProps) {
  return (
    <svg viewBox="0 0 400 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sunflowerCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b4513" />
          <stop offset="100%" stopColor="#654321" />
        </radialGradient>
        <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="600" fill={backgroundColor} />

      {/* Stem */}
      <rect x="195" y="350" width="10" height="200" fill="#4a7c59" />

      {/* Leaves */}
      <ellipse cx="170" cy="420" rx="20" ry="35" fill="#4a7c59" transform="rotate(-20 170 420)" />
      <ellipse cx="230" cy="480" rx="18" ry="30" fill="#4a7c59" transform="rotate(25 230 480)" />

      {/* Sunflower petals */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180
        const x = 200 + Math.cos(angle) * 70
        const y = 280 + Math.sin(angle) * 70
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="12"
            ry="35"
            fill="url(#petalGradient)"
            transform={`rotate(${i * 22.5} ${x} ${y})`}
          />
        )
      })}

      {/* Center */}
      <circle cx="200" cy="280" r="45" fill="url(#sunflowerCenter)" />

      {/* Center pattern */}
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i * 18 * Math.PI) / 180
        const radius = 15 + (i % 3) * 8
        const x = 200 + Math.cos(angle) * radius
        const y = 280 + Math.sin(angle) * radius
        return <circle key={i} cx={x} cy={y} r="2" fill="#2c1810" />
      })}

      {/* Decorative elements */}
      <circle cx="80" cy="120" r="4" fill={primaryColor} opacity="0.6" />
      <circle cx="320" cy="160" r="3" fill={accentColor} opacity="0.5" />
      <circle cx="60" cy="480" r="2" fill={secondaryColor} opacity="0.7" />
    </svg>
  )
}
