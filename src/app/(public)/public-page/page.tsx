import React from "react"
import HomePage from "@/views/homePage/ui/HomePage"
import { api } from "@/shared/api/baseServerApi"
import { user } from "@/views/homePage/lib/types"

export default async function Home() {
  try {
    const users = await api.get<user[]>("api/v1/sa/users")

    return <HomePage users={users} />
  } catch (e) {
    console.log(e)
    return <h1>Something went wrong...</h1>
  }
}
