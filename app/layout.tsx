import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "RouteFlow — Bus journeys, made clearer",
  description: "Compare demo intercity bus journeys, choose your seat, and complete a safe simulated booking.",
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
