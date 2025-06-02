"use client"

import MyProfile from "@/views/myProfile/MyProfile"
import { useEffect, useState } from "react"
import { Loader } from "@/shared/ui/loader"

export type UserData = {
  id: string
  userName: string
  email: string
  createdAt: string
  updatedAt: string
  bio: string
  oAuthAccounts: [
    {
      id: string
      provider: string
      providerUserId: string
      providerEmail: string
      createdAt: string
      updatedAt: string
      userId: string
    },
  ]
}


const Page =  () => {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("accessToken")
      if (!token) return
      try {
        const authRes = await fetch("https://snap-ster.net/api/v1/auth/jwt-test", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const { userId } = await authRes.json()

        const res = await fetch(`https://snap-ster.net/api/v1/sa/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) return

        const data = await res.json()
        setUserData(data)
      } catch (err) {
        console.error("Error fetching user data:", err)
      }
    }
   void getUserData()

  }, [])

  if (!userData) return <Loader/>

  return <MyProfile {...userData}/>
}

export default Page
