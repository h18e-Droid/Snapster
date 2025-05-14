import React from "react"
import PrivateLayout from "@/app/(private)/layout"
import PublicLayout from "@/app/(public)/layout"
import { cookies } from "next/headers"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookiesResponse = cookies()
  const isAuth = React.use(cookiesResponse).has("refreshTokenCustom")

  return isAuth ? <PrivateLayout>{children}</PrivateLayout> : <PublicLayout>{children}</PublicLayout>
}
