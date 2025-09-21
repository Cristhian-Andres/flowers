"use client"

import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { FlowerAnimation } from "@/components/flower-animation"
import { NameForm } from "@/components/name-form"
import { generateFlowerSVG } from "@/components/svg-flowers/flower-generator"

describe("Components", () => {
  describe("FlowerAnimation", () => {
    it("should render and complete animation", async () => {
      const onComplete = vi.fn()
      render(<FlowerAnimation onComplete={onComplete} />)

      expect(screen.getByTestId("flower-animation")).toBeInTheDocument()

      // Wait for animation to complete
      await waitFor(
        () => {
          expect(onComplete).toHaveBeenCalled()
        },
        { timeout: 4000 },
      )
    })
  })

  describe("NameForm", () => {
    it("should handle form submission", async () => {
      const onSubmit = vi.fn()
      render(<NameForm onSubmit={onSubmit} />)

      const input = screen.getByPlaceholderText(/tu nombre/i)
      const button = screen.getByRole("button", { name: /crear/i })

      fireEvent.change(input, { target: { value: "María" } })
      fireEvent.click(button)

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith("María")
      })
    })

    it("should validate empty input", () => {
      const onSubmit = vi.fn()
      render(<NameForm onSubmit={onSubmit} />)

      const button = screen.getByRole("button", { name: /crear/i })
      fireEvent.click(button)

      expect(onSubmit).not.toHaveBeenCalled()
    })
  })

  describe("SVG Flower Generator", () => {
    it("should generate different flowers for different session IDs", () => {
      const flower1 = generateFlowerSVG("session1")
      const flower2 = generateFlowerSVG("session2")

      expect(flower1.component).toBeDefined()
      expect(flower2.component).toBeDefined()
      expect(flower1.colors).toBeDefined()
      expect(flower2.colors).toBeDefined()
      expect(flower1.flowerType).toBeDefined()
      expect(flower2.flowerType).toBeDefined()
    })

    it("should generate consistent flowers for same session ID", () => {
      const flower1 = generateFlowerSVG("same-session")
      const flower2 = generateFlowerSVG("same-session")

      expect(flower1.component).toBe(flower2.component)
      expect(flower1.colors).toEqual(flower2.colors)
      expect(flower1.flowerType).toBe(flower2.flowerType)
    })
  })
})
