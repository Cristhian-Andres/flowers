import type { FlowerProps } from "./flower-generator"

export function Hibiscus({
  className = "w-full h-full",
  primaryColor = "#ff8c42",
  secondaryColor = "#ffd662",
  accentColor = "#ff6b9d",
  backgroundColor = "#fff8f0",
}: FlowerProps) {
  return (
    <svg viewBox="0 0 400 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hibiscusGradient" cx="30%" cy="30%" r="80%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="60%" stopColor={primaryColor} />
          <stop offset="100%" stopColor="#e74c3c" />
        </radialGradient>
        <linearGradient id="stamenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor={accentColor} />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="600" fill={backgroundColor} />

      {/* Stem */}
      <rect x="195" y="370" width="10" height="180" fill="#2e7d32" />

      {/* Leaves */}
      <path d="M160 440 Q140 460 150 490 Q170 480 180 460 Q170 440 160 440 Z" fill="#4caf50" />
      <path d="M240 480 Q260 500 250 530 Q230 520 220 500 Q230 480 240 480 Z" fill="#4caf50" />

      {/* Hibiscus petals */}
      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i * 72 * Math.PI) / 180
        const x = 200 + Math.cos(angle) * 80
        const y = 280 + Math.sin(angle) * 60
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="35"
            ry="60"
            fill="url(#hibiscusGradient)"
            transform={`rotate(${i * 72 + 90} ${x} ${y})`}
          />
        )
      })}

      {/* Center stamen */}
      <circle cx="200" cy="280" r="12" fill="#8b4513" />
      <rect x="195" y="220" width="10" height="60" fill="url(#stamenGradient)" />

      {/* Stamen top */}
      <circle cx="200" cy="220" r="8" fill={accentColor} />
      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i * 72 * Math.PI) / 180
        const x = 200 + Math.cos(angle) * 12
        const y = 220 + Math.sin(angle) * 12
        return <circle key={i} cx={x} cy={y} r="2" fill="#fff" />
      })}

      {/* Decorative elements */}
      <circle cx="110" cy="150" r="3" fill={primaryColor} opacity="0.6" />
      <circle cx="290" cy="170" r="4" fill={accentColor} opacity="0.5" />
      <circle cx="80" cy="460" r="2" fill={secondaryColor} opacity="0.7" />
    </svg>
  )
}
