import type { FlowerProps } from "./flower-generator"

export function Rose({
  className = "w-full h-full",
  primaryColor = "#ff6b9d",
  secondaryColor = "#ffc3d8",
  accentColor = "#4ecdc4",
  backgroundColor = "#fff5f8",
}: FlowerProps) {
  return (
    <svg viewBox="0 0 400 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="roseGradient" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
        <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={accentColor} />
          <stop offset="100%" stopColor="#2d7d32" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="600" fill={backgroundColor} />

      {/* Stem */}
      <path d="M200 350 Q195 400 200 450 Q205 500 200 550" stroke="url(#stemGradient)" strokeWidth="8" fill="none" />

      {/* Leaves */}
      <ellipse cx="180" cy="400" rx="15" ry="25" fill={accentColor} transform="rotate(-30 180 400)" />
      <ellipse cx="220" cy="480" rx="12" ry="20" fill={accentColor} transform="rotate(45 220 480)" />

      {/* Rose petals - outer layer */}
      <circle cx="200" cy="300" r="80" fill="url(#roseGradient)" opacity="0.8" />
      <circle cx="180" cy="280" r="60" fill={primaryColor} opacity="0.7" />
      <circle cx="220" cy="280" r="60" fill={primaryColor} opacity="0.7" />
      <circle cx="200" cy="260" r="50" fill={secondaryColor} opacity="0.9" />

      {/* Rose petals - inner layer */}
      <circle cx="200" cy="280" r="40" fill="url(#roseGradient)" />
      <circle cx="190" cy="270" r="25" fill={secondaryColor} />
      <circle cx="210" cy="270" r="25" fill={secondaryColor} />
      <circle cx="200" cy="260" r="20" fill={primaryColor} />

      {/* Center */}
      <circle cx="200" cy="270" r="8" fill="#8b0000" />

      {/* Decorative elements */}
      <circle cx="120" cy="150" r="3" fill={primaryColor} opacity="0.6" />
      <circle cx="280" cy="180" r="4" fill={accentColor} opacity="0.5" />
      <circle cx="100" cy="450" r="2" fill={secondaryColor} opacity="0.7" />
      <circle cx="320" cy="420" r="3" fill={primaryColor} opacity="0.4" />
    </svg>
  )
}
