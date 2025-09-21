import type { FlowerProps } from "./flower-generator"

export function Peony({
  className = "w-full h-full",
  primaryColor = "#ff6b9d",
  secondaryColor = "#ffc3d8",
  accentColor = "#4ecdc4",
  backgroundColor = "#fff5f8",
}: FlowerProps) {
  return (
    <svg viewBox="0 0 400 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="peonyGradient" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="70%" stopColor={primaryColor} />
          <stop offset="100%" stopColor="#e91e63" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="600" fill={backgroundColor} />

      {/* Stem */}
      <rect x="195" y="360" width="10" height="190" fill="#388e3c" />

      {/* Leaves */}
      <ellipse cx="170" cy="420" rx="15" ry="30" fill={accentColor} transform="rotate(-25 170 420)" />
      <ellipse cx="230" cy="470" rx="12" ry="25" fill={accentColor} transform="rotate(20 230 470)" />

      {/* Peony petals - multiple layers */}
      {/* Outer layer */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45 * Math.PI) / 180
        const x = 200 + Math.cos(angle) * 70
        const y = 280 + Math.sin(angle) * 50
        return (
          <ellipse
            key={`outer-${i}`}
            cx={x}
            cy={y}
            rx="20"
            ry="35"
            fill="url(#peonyGradient)"
            opacity="0.8"
            transform={`rotate(${i * 45} ${x} ${y})`}
          />
        )
      })}

      {/* Middle layer */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i * 60 * Math.PI) / 180
        const x = 200 + Math.cos(angle) * 45
        const y = 280 + Math.sin(angle) * 35
        return (
          <ellipse
            key={`middle-${i}`}
            cx={x}
            cy={y}
            rx="15"
            ry="25"
            fill={primaryColor}
            opacity="0.9"
            transform={`rotate(${i * 60 + 30} ${x} ${y})`}
          />
        )
      })}

      {/* Inner layer */}
      {Array.from({ length: 4 }, (_, i) => {
        const angle = (i * 90 * Math.PI) / 180
        const x = 200 + Math.cos(angle) * 25
        const y = 280 + Math.sin(angle) * 20
        return (
          <ellipse
            key={`inner-${i}`}
            cx={x}
            cy={y}
            rx="12"
            ry="18"
            fill={secondaryColor}
            transform={`rotate(${i * 90 + 45} ${x} ${y})`}
          />
        )
      })}

      {/* Center */}
      <circle cx="200" cy="280" r="15" fill="url(#peonyGradient)" />
      <circle cx="200" cy="280" r="8" fill="#ad1457" />

      {/* Decorative elements */}
      <circle cx="120" cy="160" r="4" fill={primaryColor} opacity="0.5" />
      <circle cx="280" cy="140" r="3" fill={accentColor} opacity="0.6" />
      <circle cx="90" cy="480" r="2" fill={secondaryColor} opacity="0.7" />
    </svg>
  )
}
