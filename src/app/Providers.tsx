"use client"
import React from "react"
import { Provider } from "react-redux"
import { store } from "@/app/store"
import { AppInitializer } from "@/app/AppInitializer"

type Providers = {
  children: React.ReactNode
  isAuth: boolean
}

export const Providers = ({ children, isAuth }: Providers) => {
  return (
    <Provider store={store}>
      <AppInitializer isAuth={isAuth}>{children}</AppInitializer>
    </Provider>
  )
}
