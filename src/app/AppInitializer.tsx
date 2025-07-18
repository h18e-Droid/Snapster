"use client"
import React, { useEffect } from "react"
import { useMeQuery } from "@/features/auth/me"
import { Loader } from "@/shared/ui/loader"

type AppInitializerProps = {
  children: React.ReactNode
  userData: { userId: string } | null
}

export const AppInitializer = ({ children, userData }: AppInitializerProps) => {
  const { isLoading, isError } = useMeQuery(undefined, { skip: !!userData })

  console.log(userData)

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("accessToken")
    }
    // meApi.util.upsertQueryData()
  }, [isError])

  return (
    <>
      {isLoading && <Loader />}
      {children}
    </>
  )
}
