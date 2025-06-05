import { cookies } from "next/headers"
import React from "react"

export const isUserAuthenticated = (): boolean => {
  const cookiesResponse = cookies()
  return React.use(cookiesResponse).has("refreshToken")
}
