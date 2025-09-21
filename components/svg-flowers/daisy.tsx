import type { FlowerProps } from "./flower-generator"

export function Daisy({
  className = "w-full h-full",
  primaryColor = "#ffffff",
  secondaryColor = "#f8f9fa",
  accentColor = "#ffd662",
  backgroundColor = "#f0f8ff",
}: FlowerProps) {
  return (
    <svg viewBox="0 0 400 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="daisyCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accentColor} />
          <stop offset="100%" stopColor="#ff8c00" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="600" fill={backgroundColor} />

      {/* Stem */}
      <rect x="195" y="340" width="10" height="210" fill="#228b22" />

      {/* Leaves */}
      <ellipse cx="175" cy="420" rx="12" ry="25" fill="#32cd32" transform="rotate(-25 175 420)" />
      <ellipse cx="225" cy="480" rx="10" ry="20" fill="#32cd32" transform="rotate(30 225 480)" />

      {/* Daisy petals */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const x = 200 + Math.cos(angle) * 50
        const y = 280 + Math.sin(angle) * 50
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="8"
            ry="25"
            fill={primaryColor}
            stroke={secondaryColor}
            strokeWidth="1"
            transform={`rotate(${i * 30} ${x} ${y})`}
          />
        )
      })}

      {/* Center */}
      <circle cx="200" cy="280" r="25" fill="url(#daisyCenter)" />

      {/* Center texture */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45 * Math.PI) / 180
        const x = 200 + Math.cos(angle) * 8
        const y = 280 + Math.sin(angle) * 8
        return <circle key={i} cx={x} cy={y} r="1.5" fill="#ff6b00" />
      })}

      {/* Decorative elements */}
      <circle cx="120" cy="150" r="2" fill={accentColor} opacity="0.6" />
      <circle cx="280" cy="180" r="3" fill={primaryColor} opacity="0.8" />
      <circle cx="90" cy="450" r="2" fill={secondaryColor} opacity="0.7" />
    </svg>
  )
}
