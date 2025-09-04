import React from "react"
import Profile from "@/views/profile"
import { api } from "@/shared/api/baseServerApi"
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
      return <Profile user={user} />
    } else return <UserNotFound />
  } catch {
    return <UserNotFound />
  }
}
