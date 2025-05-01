"use client"
import React from "react"
import { Provider } from "react-redux"
import ContainerLayout from "@/app/container/ContainerLayout"
import { store } from "@/app/store"

type ContainerProvider = {
  children: React.ReactNode
  isAuth: boolean
}

export const ContainerProvider = ({ children, isAuth }: ContainerProvider) => {
  return (
    <Provider store={store}>
      <ContainerLayout isServerAuth={isAuth}>{children}</ContainerLayout>
    </Provider>
  )
}
