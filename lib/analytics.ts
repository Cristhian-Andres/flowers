interface TrackingData {
  name: string
  message: string
  sessionId?: string
  timestamp?: string
  userAgent?: string
}

export async function trackUsage(data: TrackingData): Promise<boolean> {
  try {
    const response = await fetch("/api/track-usage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        timestamp: data.timestamp || new Date().toISOString(),
        userAgent: data.userAgent || navigator.userAgent,
      }),
    })

    const result = await response.json()
    return result.success || false
  } catch (error) {
    console.error("Error tracking usage:", error)
    return false
  }
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function getDeviceInfo() {
  const userAgent = navigator.userAgent
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent)

  let deviceType = "desktop"
  if (isMobile && !isTablet) deviceType = "mobile"
  if (isTablet) deviceType = "tablet"

  return {
    userAgent,
    deviceType,
    isMobile,
    isTablet,
    language: navigator.language,
    platform: navigator.platform,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
  }
}
