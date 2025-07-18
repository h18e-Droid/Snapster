import { isUserAuthenticated } from "@/shared/lib/state/isUserAuthenticated"
import PrivateHome from "./(private)/Home"
import PublicHome from "./(public)/Home"
import React from "react"

export default async function Home() {
  const isAuth = await isUserAuthenticated()

  return <>{isAuth ? <PrivateHome /> : <PublicHome />}</>
}
