import type { FlowerProps } from "./flower-generator"

export function Orchid({
  className = "w-full h-full",
  primaryColor = "#a29bfe",
  secondaryColor = "#fd79a8",
  accentColor = "#fdcb6e",
  backgroundColor = "#f8f6ff",
}: FlowerProps) {
  return (
    <svg viewBox="0 0 400 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="orchidGradient" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor={accentColor} />
          <stop offset="50%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="600" fill={backgroundColor} />

      {/* Stem */}
      <rect x="195" y="380" width="10" height="170" fill="#2e7d32" />

      {/* Leaves */}
      <ellipse cx="160" cy="450" rx="12" ry="50" fill="#4caf50" transform="rotate(-20 160 450)" />
      <ellipse cx="240" cy="490" rx="10" ry="40" fill="#4caf50" transform="rotate(25 240 490)" />

      {/* Orchid petals - top */}
      <ellipse cx="200" cy="220" rx="25" ry="40" fill="url(#orchidGradient)" transform="rotate(0 200 220)" />
      <ellipse cx="170" cy="250" rx="20" ry="35" fill="url(#orchidGradient)" transform="rotate(-30 170 250)" />
      <ellipse cx="230" cy="250" rx="20" ry="35" fill="url(#orchidGradient)" transform="rotate(30 230 250)" />

      {/* Orchid lip (bottom petal) */}
      <path d="M200 300 Q160 320 150 360 Q170 380 200 370 Q230 380 250 360 Q240 320 200 300 Z" fill={secondaryColor} />
      <path
        d="M200 320 Q180 330 175 350 Q190 360 200 355 Q210 360 225 350 Q220 330 200 320 Z"
        fill={primaryColor}
        opacity="0.8"
      />

      {/* Center column */}
      <ellipse cx="200" cy="280" rx="8" ry="15" fill="#ffffff" />
      <circle cx="200" cy="275" r="3" fill={primaryColor} />

      {/* Decorative spots */}
      <circle cx="185" cy="240" r="2" fill="#6c5ce7" opacity="0.8" />
      <circle cx="215" cy="245" r="1.5" fill="#6c5ce7" opacity="0.8" />
      <circle cx="200" cy="340" r="2" fill="#e84393" opacity="0.7" />

      {/* Decorative elements */}
      <circle cx="100" cy="140" r="3" fill={primaryColor} opacity="0.4" />
      <circle cx="300" cy="180" r="2" fill={secondaryColor} opacity="0.5" />
    </svg>
  )
}
