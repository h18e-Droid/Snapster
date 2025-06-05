import React from "react"
import HomePage from "@/views/homePage/ui/HomePage"
import { api } from "@/shared/api/api"
import Layout from "./layout"
import { user } from "@/views/homePage/lib/types"

export default async function Home() {
  try {
    const users = await api.get<user[]>("api/v1/sa/users")

    return (
      <Layout>
        <HomePage users={users} />
      </Layout>
    )
  } catch (e) {
    console.log(e)
    return <h1>Something went wrong...</h1>
  }
}
