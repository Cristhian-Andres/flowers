export function SunflowerIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Petals */}
      <g fill="#f6e7c1" stroke="#4b5563" strokeWidth="1.5">
        <ellipse cx="50" cy="25" rx="8" ry="15" />
        <ellipse cx="50" cy="75" rx="8" ry="15" />
        <ellipse cx="25" cy="50" rx="15" ry="8" />
        <ellipse cx="75" cy="50" rx="15" ry="8" />
        <ellipse cx="35" cy="35" rx="12" ry="6" transform="rotate(-45 35 35)" />
        <ellipse cx="65" cy="35" rx="12" ry="6" transform="rotate(45 65 35)" />
        <ellipse cx="35" cy="65" rx="12" ry="6" transform="rotate(45 35 65)" />
        <ellipse cx="65" cy="65" rx="12" ry="6" transform="rotate(-45 65 65)" />
      </g>
      {/* Center */}
      <circle cx="50" cy="50" r="12" fill="#8b4513" stroke="#4b5563" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="8" fill="#654321" />
      {/* Center pattern */}
      <circle cx="47" cy="47" r="1.5" fill="#4b5563" />
      <circle cx="53" cy="47" r="1.5" fill="#4b5563" />
      <circle cx="50" cy="53" r="1.5" fill="#4b5563" />
    </svg>
  )
}
