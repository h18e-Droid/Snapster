"use client"
import React, { useEffect } from "react"
import { useAppDispatch } from "@/shared/lib/state/useAppDispatch"
import { authMe } from "@/features/auth/model/slice"

type AppInitializerProps = {
  children: React.ReactNode
  isAuth: boolean
}

export const AppInitializer = ({ children, isAuth }: AppInitializerProps) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isAuth) {
      dispatch(authMe())
    } else return
  }, [dispatch])

  return <>{children}</>
}
