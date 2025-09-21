import { type NextRequest, NextResponse } from "next/server"

const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwCyZtHCIgQ6JY0oKZEWFVsIA39ZGlmVtJsk3f4NFViKJSebZgAyeBvwh0tjIPY63yn/exec"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, message, sessionId, userAgent, timestamp } = body

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 })
    }

    // Prepare data for Google Apps Script
    const trackingData = {
      name: name.trim(),
      message: message.trim(),
      sessionId: sessionId || Date.now().toString(),
      timestamp: timestamp || new Date().toISOString(),
      userAgent: userAgent || request.headers.get("user-agent") || "Unknown",
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown",
      referer: request.headers.get("referer") || "Direct",
      country: request.headers.get("cf-ipcountry") || "Unknown",
      messageLength: message.trim().length,
      nameLength: name.trim().length,
    }

    // Send to Google Apps Script with retry logic
    let attempts = 0
    const maxAttempts = 3
    let lastError: Error | null = null

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trackingData),
        })

        if (response.ok) {
          const result = await response.json()
          return NextResponse.json({
            success: true,
            message: "Data tracked successfully",
            data: result,
          })
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
      } catch (error) {
        lastError = error as Error
        attempts++

        if (attempts < maxAttempts) {
          // Wait before retrying (exponential backoff)
          await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempts) * 1000))
        }
      }
    }

    // If all attempts failed, log the error but don't fail the request
    console.error("Failed to send data to Google Apps Script after", maxAttempts, "attempts:", lastError)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to track data, but this doesn't affect the user experience",
        error: lastError?.message,
      },
      { status: 200 },
    ) // Return 200 to not break user flow
  } catch (error) {
    console.error("Error in track-usage API:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 200 },
    ) // Return 200 to not break user flow
  }
}
