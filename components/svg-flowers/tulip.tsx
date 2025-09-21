import type { FlowerProps } from "./flower-generator"

export function Tulip({
  className = "w-full h-full",
  primaryColor = "#a8e6cf",
  secondaryColor = "#dcedc1",
  accentColor = "#ffd3a5",
  backgroundColor = "#f8fff8",
}: FlowerProps) {
  return (
    <svg viewBox="0 0 400 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tulipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="600" fill={backgroundColor} />

      {/* Stem */}
      <rect x="195" y="320" width="10" height="230" fill="#2e7d32" />

      {/* Leaves */}
      <ellipse cx="160" cy="400" rx="15" ry="60" fill="#4caf50" transform="rotate(-15 160 400)" />
      <ellipse cx="240" cy="450" rx="12" ry="50" fill="#4caf50" transform="rotate(20 240 450)" />

      {/* Tulip petals */}
      <path
        d="M200 180 Q160 220 170 300 Q185 320 200 320 Q215 320 230 300 Q240 220 200 180 Z"
        fill="url(#tulipGradient)"
      />
      <path
        d="M200 180 Q180 200 175 280 Q190 310 200 320 Q210 310 225 280 Q220 200 200 180 Z"
        fill={primaryColor}
        opacity="0.8"
      />
      <path d="M200 180 Q190 190 185 260 Q195 300 200 320 Q205 300 215 260 Q210 190 200 180 Z" fill={secondaryColor} />

      {/* Inner highlight */}
      <ellipse cx="200" cy="240" rx="8" ry="30" fill={accentColor} opacity="0.6" />

      {/* Decorative elements */}
      <circle cx="100" cy="100" r="3" fill={primaryColor} opacity="0.5" />
      <circle cx="300" cy="140" r="4" fill={accentColor} opacity="0.6" />
      <circle cx="80" cy="500" r="2" fill={secondaryColor} opacity="0.7" />
      <circle cx="320" cy="480" r="3" fill={primaryColor} opacity="0.4" />
    </svg>
  )
}
