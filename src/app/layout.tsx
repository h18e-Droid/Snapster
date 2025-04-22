"use client"

import React from "react"
import ContainerLayout from "@/app/containerLayout/ContainerLayout"
import "@/shared/styles/_colors.scss"
import "@/shared/styles/_typography.scss"
import "./globals.css"
import { Provider } from "react-redux"
import { store } from "@/app/store"
import { Inter, Roboto } from "next/font/google"

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
  return (
    <html lang="en" className={`${inter.className} ${roboto.className}`}>
      <body>
        <Provider store={store}>
          <ContainerLayout>{children}</ContainerLayout>
        </Provider>
      </body>
    </html>
  )
}
