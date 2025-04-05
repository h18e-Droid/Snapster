"use client"

import React from "react"
import ContainerLayout from "@/app/containerLayout/ContainerLayout"
import "@/shared/styles/_colors.scss"
import "./globals.css"
import { Provider } from "react-redux"
import { store } from "@/app/store"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body >
        <Provider store={store}>
          <ContainerLayout>{children}</ContainerLayout>
        </Provider>
      </body>
    </html>
  )
}
