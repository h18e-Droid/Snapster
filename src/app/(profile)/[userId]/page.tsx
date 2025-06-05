import React from "react"
import Profile from "@/views/profile"
import { api } from "@/shared/api/api"
import { cookies } from "next/headers"
import UserNotFound from "@/app/(profile)/[userId]/userNotFound"

type user = {
  userName: string
  id: string
  bio: string | null
  avatarUrl: string | null
  following: number
  followers: number
  publications: number
}

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const cookiesResponse = await cookies()
  const isAuth = cookiesResponse.has("refreshToken")
  const awaitedParams = await params
  try {
    const res: user = await api.get(`api/v1/sa/users/${awaitedParams.userId}`)
    if (res.id) {
      const user = {
        userName: res.userName,
        id: res.id,
        bio: res.bio,
        avatarUrl: res.bio,
        followers: 1234,
        following: 4332,
        publications: 1234,
      }
      return <Profile isAuth={isAuth} user={user} />
    } else return <UserNotFound />
  } catch (e) {
    console.error(e)
    return <UserNotFound />
  }
}
