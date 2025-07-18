import { cookies } from "next/headers"
import { api } from "@/shared/api/baseServerApi"
import { serverApiError } from "@/shared/types/types"

export const getUserData = async (): Promise<{ userId: string } | null> => {
  const cookiesResponse = await cookies()
  const token = cookiesResponse?.get("accessToken")?.value

  try {
    let result = null as { userId: string } | null
    if (token) {
      result = await api.get("api/v1/auth/jwt-test")
    }
    if (result && result.userId) {
      return result
    }
    return null
  } catch (error) {
    const err = error as serverApiError
    if (err.status === 401) {
      //refreshLogic
    }

    return null
  }
}
