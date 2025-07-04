"use client"
import React, { useEffect } from "react"
import { useMeQuery } from "@/features/auth/me"
import { Loader } from "@/shared/ui/loader"

type AppInitializerProps = {
  children: React.ReactNode
  userData: { userId: string } | null
}

export const AppInitializer = ({ children, userData }: AppInitializerProps) => {
  const { isLoading } = useMeQuery(undefined /*{ skip: !!userData }*/)

  useEffect(() => {
    // meApi.util.upsertQueryData()
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return <>{children}</>
}
