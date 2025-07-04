import React from "react"
import "@/shared/styles/_colors.scss"
import "@/shared/styles/_typography.scss"
import "./globals.css"
import { Inter, Roboto } from "next/font/google"
import { Providers } from "./Providers"
import { Header } from "@/widgets/header"
import { isUserAuthenticated } from "@/shared/lib/state/isUserAuthenticated"
import { getUserData } from "@/shared/lib/state/getUserData"

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const userData = await getUserData()

  return (
    <html lang="en" className={`${inter.className} ${roboto.className}`}>
      <body>
        <Providers userData={userData}>
          <Header isAuth={!!userData} />
          <div className="content-wrapper">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
