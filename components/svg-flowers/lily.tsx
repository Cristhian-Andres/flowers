import type { FlowerProps } from "./flower-generator"

export function Lily({
  className = "w-full h-full",
  primaryColor = "#ff7675",
  secondaryColor = "#fab1a0",
  accentColor = "#00b894",
  backgroundColor = "#fff5f5",
}: FlowerProps) {
  return (
    <svg viewBox="0 0 400 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lilyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="50%" stopColor={primaryColor} />
          <stop offset="100%" stopColor="#e74c3c" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="600" fill={backgroundColor} />

      {/* Stem */}
      <rect x="195" y="350" width="10" height="200" fill="#27ae60" />

      {/* Leaves */}
      <ellipse cx="170" cy="430" rx="8" ry="40" fill={accentColor} transform="rotate(-10 170 430)" />
      <ellipse cx="230" cy="470" rx="8" ry="35" fill={accentColor} transform="rotate(15 230 470)" />

      {/* Lily petals */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i * 60 * Math.PI) / 180
        const x = 200 + Math.cos(angle) * 60
        const y = 280 + Math.sin(angle) * 40
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="15"
            ry="50"
            fill="url(#lilyGradient)"
            transform={`rotate(${i * 60 + 90} ${x} ${y})`}
          />
        )
      })}

      {/* Center stamens */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i * 60 * Math.PI) / 180
        const x = 200 + Math.cos(angle) * 15
        const y = 280 + Math.sin(angle) * 15
        return (
          <g key={i}>
            <line x1="200" y1="280" x2={x} y2={y} stroke="#8b4513" strokeWidth="2" />
            <circle cx={x} cy={y} r="3" fill="#daa520" />
          </g>
        )
      })}

      {/* Center */}
      <circle cx="200" cy="280" r="8" fill="#2d5016" />

      {/* Decorative spots on petals */}
      <circle cx="180" cy="250" r="2" fill="#8b0000" opacity="0.7" />
      <circle cx="220" cy="260" r="2" fill="#8b0000" opacity="0.7" />
      <circle cx="200" cy="230" r="1.5" fill="#8b0000" opacity="0.7" />

      {/* Decorative elements */}
      <circle cx="110" cy="120" r="3" fill={primaryColor} opacity="0.5" />
      <circle cx="290" cy="160" r="4" fill={accentColor} opacity="0.6" />
    </svg>
  )
}
