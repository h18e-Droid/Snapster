"use client"
import React from "react"
import { Provider } from "react-redux"
import { store } from "@/app/store"
import { AppInitializer } from "@/app/AppInitializer"


type Providers = {
  children: React.ReactNode
}

export const Providers = ({ children }: Providers) => {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>
    </Provider>
  )
}
