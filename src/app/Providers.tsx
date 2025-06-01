"use client"
import React from "react"
import { Provider } from "react-redux"
import { store } from "@/app/store"


type Providers = {
  children: React.ReactNode
}

export const Providers = ({ children }: Providers) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
