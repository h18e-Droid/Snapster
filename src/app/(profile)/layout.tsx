import React from "react"
import PrivateLayout from "@/app/(private)/layout"
import PublicLayout from "@/app/(public)/layout"
import { isUserAuthenticated } from "@/shared/lib/state/isUserAuthenticated"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuth = isUserAuthenticated()

  return <>{isAuth ? <PrivateLayout>{children}</PrivateLayout> : <PublicLayout>{children}</PublicLayout>}</>
}
