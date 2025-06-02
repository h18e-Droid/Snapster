"use client"
import React, { useEffect } from "react"
import { useAppDispatch } from "@/shared/lib/state/useAppDispatch"
import { authThunks } from "@/features/auth"

type AppInitializerProps = {
  children: React.ReactNode
}

export const AppInitializer = ({ children }: AppInitializerProps) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunks.authMe())
  }, [dispatch])

  return <>{children}</>
}
