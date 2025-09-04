"use client"
import React, { useEffect } from "react"
import { useMeQuery } from "@/features/auth/me"
import { Loader } from "@/shared/ui/loader"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"
import { useAppDispatch } from "@/shared/lib/state/useAppDispatch"
import { appActions } from "@/features/app/model/slice"

type AppInitializerProps = {
  children: React.ReactNode
}

export const AppInitializer = ({ children }: AppInitializerProps) => {
  const { isError, isSuccess, refetch } = useMeQuery(undefined)
  const dispatch = useAppDispatch()
  const initialized = useAppSelector((state) => state.app.initialized)
  const accessToken = useAppSelector((state) => state.auth.accessToken)

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("accessToken")
    }
    dispatch(appActions.setInitialized())
  }, [isError, isSuccess])

  useEffect(() => {
    if (accessToken) {
      refetch()
    }
  }, [accessToken])

  return (
    <>
      {!initialized && <Loader />}
      {children}
    </>
  )
}
