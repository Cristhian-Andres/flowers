import "@testing-library/jest-dom"
import { vi } from "vitest"

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => <img src={src || "/placeholder.svg"} alt={alt} {...props} />,
}))

// Mock environment variables
vi.mock("process", () => ({
  env: {
    GOOGLE_GENERATIVE_AI_API_KEY: "test-api-key",
    GOOGLE_APPS_SCRIPT_URL: "https://script.google.com/test",
    NEXT_PUBLIC_INSTAGRAM_URL: "https://instagram.com/test",
    NEXT_PUBLIC_INSTAGRAM_USERNAME: "@test",
    NEXT_PUBLIC_LINKEDIN_URL: "https://linkedin.com/in/test",
    NEXT_PUBLIC_LINKEDIN_USERNAME: "Test User",
  },
}))
