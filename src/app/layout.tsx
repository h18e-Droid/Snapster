import React from "react"
import "@/shared/styles/_colors.scss"
import "@/shared/styles/_typography.scss"
import "./globals.css"
import { Inter, Roboto } from "next/font/google"
import { cookies } from "next/headers"
import { Providers } from "./Providers"
import { Header } from "@/widgets/header"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  preload: true,
  variable: "--font-inter",
})

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-roboto",
})

export const metadata = {
  title: "My App",
  description: "...",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover", // ✅ додай сюди
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookiesResponse = cookies()
  const isAuth = React.use(cookiesResponse).has("refreshTokenCustom")
  console.log("cookiesResponse::", isAuth)

  return (
    <html lang="en" className={`${inter.className} ${roboto.className}`}>
      <body>
        <Providers>
          <Header isAuth={isAuth} />
          <div className="contentWrapper">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
