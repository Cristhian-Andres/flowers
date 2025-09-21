import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Flores para ti",
  description: "Crea mensajes románticos personalizados con flores hermosas usando IA",
  generator: "Cristhian.dev",
  keywords: ["flores", "mensajes románticos", "IA", "personalizado", "amor"],
  authors: [{ name: "Flores para Ella" }],
  openGraph: {
    title: "Flores para ti",
    description: "Crea mensajes románticos personalizados con flores hermosas usando IA",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flores para Ella",
    description: "Mensajes románticos personalizados con IA",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${playfair.variable} ${sourceSans.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
