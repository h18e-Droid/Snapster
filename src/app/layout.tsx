import React from "react"
import "@/shared/styles/_colors.scss"
import "@/shared/styles/_typography.scss"
import "./globals.css"
import { Inter, Roboto } from "next/font/google"
import { Providers } from "./Providers"
import { Header } from "@/widgets/header"
import { isUserAuthenticated } from "@/shared/lib/state/isUserAuthenticated"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuth = isUserAuthenticated()

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
