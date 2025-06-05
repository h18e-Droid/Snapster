import { isUserAuthenticated } from "@/shared/lib/state/isUserAuthenticated"
import PrivateHome from "./(private)/Home"
import PublicHome from "./(public)/Home"
import React, { Suspense } from "react"
import { Loader } from "@/shared/ui/loader"

export default function Home() {
  const isAuth = isUserAuthenticated()

  return <Suspense fallback={<Loader />}>{isAuth ? <PrivateHome /> : <PublicHome />}</Suspense>
}
