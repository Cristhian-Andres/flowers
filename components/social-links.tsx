"use client"

import { Instagram, Linkedin as LinkedIn } from "lucide-react"

interface SocialLinksProps {
  className?: string
  showLabels?: boolean
}

export function SocialLinks({ className = "", showLabels = true }: SocialLinksProps) {
  const socials = [
    process.env.NEXT_PUBLIC_INSTAGRAM_URL && {
      name: "Instagram",
      icon: Instagram,
      username: process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "Instagram",
      url: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
      color: "hover:text-pink-500",
    },
    process.env.NEXT_PUBLIC_LINKEDIN_URL && {
      name: "LinkedIn",
      icon: LinkedIn,
      username: process.env.NEXT_PUBLIC_LINKEDIN_USERNAME || "LinkedIn",
      url: process.env.NEXT_PUBLIC_LINKEDIN_URL,
      color: "hover:text-blue-600",
    },
  ].filter(Boolean)

  if (socials.length === 0) {
    return null
  }

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {socials.map((social) => {
        const IconComponent = social.icon
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-sm text-muted-foreground transition-colors ${social.color}`}
            aria-label={`Visitar ${social.name}`}
          >
            <IconComponent className="w-4 h-4" />
            {showLabels && social.username}
          </a>
        )
      })}
    </div>
  )
}
