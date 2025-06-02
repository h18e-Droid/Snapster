import React from "react"
import HomePage from "@/views/homePage/ui/HomePage"
import { api } from "@/shared/api/api"
import Layout from "./layout"

export default async function Home() {
  const users = await api.get<unknown[]>("api/v1/sa/users")

  return (
    <Layout>
      <HomePage users={users} />
    </Layout>
  )
}
