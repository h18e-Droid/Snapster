import React from "react"
import "@/shared/styles/_colors.scss"
import "@/shared/styles/_typography.scss"
import "./globals.css"
import { Inter, Roboto } from "next/font/google"
import { cookies } from "next/headers"
import { ContainerProvider } from "@/app/container/ContainerProvider"

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
  const store = cookies()
  const isAuth = React.use(store).has("refreshTokenCustom")
  return (
    <html lang="en" className={`${inter.className} ${roboto.className}`}>
      <body>
        <ContainerProvider isAuth={isAuth}>{children}</ContainerProvider>
      </body>
    </html>
  )
}
