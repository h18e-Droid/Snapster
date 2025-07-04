import React from "react"
import PrivateLayout from "@/app/(private)/layout"
import PublicLayout from "@/app/(public)/layout"
import { isUserAuthenticated } from "@/shared/lib/state/isUserAuthenticated"

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuth = await isUserAuthenticated()

  return <>{isAuth ? <PrivateLayout>{children}</PrivateLayout> : <PublicLayout>{children}</PublicLayout>}</>
}
