import { describe, it, expect, vi, beforeEach } from "vitest"
import { POST as generateMessage } from "@/app/api/generate-message/route"
import { POST as trackUsage } from "@/app/api/track-usage/route"

// Mock environment variables
vi.mock("process", () => ({
  env: {
    GOOGLE_GENERATIVE_AI_API_KEY: "test-api-key",
    GOOGLE_APPS_SCRIPT_URL: "https://script.google.com/test",
  },
}))

describe("API Routes", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("/api/generate-message", () => {
    it("should generate a message for a valid name", async () => {
      const request = new Request("http://localhost:3000/api/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "María" }),
      })

      const response = await generateMessage(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty("message")
      expect(data.message).toContain("María")
      expect(data.message.length).toBeLessThanOrEqual(15 * 6) // ~15 words max
    })

    it("should reject empty names", async () => {
      const request = new Request("http://localhost:3000/api/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "" }),
      })

      const response = await generateMessage(request)
      expect(response.status).toBe(400)
    })

    it("should handle API errors gracefully", async () => {
      // Mock API failure
      vi.mock("@ai-sdk/google", () => ({
        google: () => ({}),
      }))

      const request = new Request("http://localhost:3000/api/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Test" }),
      })

      const response = await generateMessage(request)
      expect(response.status).toBeLessThanOrEqual(500)
    })
  })

  describe("/api/track-usage", () => {
    it("should track usage data successfully", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })

      const request = new Request("http://localhost:3000/api/track-usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "María",
          message: "Test message",
          timestamp: new Date().toISOString(),
        }),
      })

      const response = await trackUsage(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty("success", true)
    })

    it("should handle tracking failures", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

      const request = new Request("http://localhost:3000/api/track-usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test",
          message: "Test message",
          timestamp: new Date().toISOString(),
        }),
      })

      const response = await trackUsage(request)
      expect(response.status).toBe(500)
    })
  })
})
