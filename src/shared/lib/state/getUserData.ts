import { cookies } from "next/headers"
import { api } from "@/shared/api/api"

export const getUserData = async (): Promise<{ userId: string } | null> => {
  const cookiesResponse = await cookies()
  const token = cookiesResponse.get("accessToken")?.value

  try {
    let res = null as { userId: string } | null
    if (token) {
      res = await api.get("api/v1/auth/jwt-test", token ? { headers: { Authorization: `Bearer ${token}` } } : {})
    }
    return res
  } catch (error) {
    console.error(error)
    return null
  }
}
