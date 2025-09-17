"use client"
import PrivateHome from "./(private)/Home"

import React, { useEffect } from "react"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"
import { useRouter } from "next/navigation"
import { appRoutes } from "@/shared/lib/routes"
import { Loader } from "@/shared/ui/loader"

export default function Home() {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const initialized = useAppSelector((state) => state.app.initialized)
  const router = useRouter()

  useEffect(() => {
    if (initialized && !isAuth) {
      router.replace(appRoutes.public.publicPage)
    }
  }, [initialized, isAuth, router])

  if (!isAuth) return <Loader />

  return <PrivateHome />
}
