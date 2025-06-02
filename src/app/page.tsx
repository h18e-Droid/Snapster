import { isUserAuthenticated } from "@/shared/lib/state/isUserAuthenticated"
import PrivateHome from "./(private)/Home"
import PublicHome from "./(public)/Home"
import React, { Suspense } from "react"

export default function Home() {
  const isAuth = isUserAuthenticated()

  return <Suspense fallback={<p>Loading...</p>}>{isAuth ? <PrivateHome /> : <PublicHome />}</Suspense>
}
