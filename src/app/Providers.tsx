"use client"
import React from "react"
import { Provider } from "react-redux"
import { store } from "@/app/store"
import { AppInitializer } from "@/app/AppInitializer"

type Providers = {
  children: React.ReactNode
  userData: { userId: string } | null
}

export const Providers = ({ children, userData }: Providers) => {
  return (
    <Provider store={store}>
      <AppInitializer userData={userData}>{children}</AppInitializer>
    </Provider>
  )
}
