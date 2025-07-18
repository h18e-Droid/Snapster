import type { BaseQueryFn } from "@reduxjs/toolkit/query"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import handleClientError from "@/shared/lib/api/handleClientError"

const baseQuery = fetchBaseQuery({
  baseUrl: "https://snap-ster.net",
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Bearer ${localStorage.getItem("accessToken")}`)
  },
})

export const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  const token = localStorage.getItem("accessToken")

  if (result.error?.status === 401 && token) {
    // оновити токен
    try {
      const refreshResult = await baseQuery({ url: "/api/v1/auth/refresh-token", method: "POST" }, api, extraOptions)

      if (refreshResult.data) {
        const newAccessToken = (refreshResult.data as { accessToken: string }).accessToken
        localStorage.setItem("accessToken", newAccessToken)

        result = await baseQuery(args, api, extraOptions)
      }
    } catch (err) {
      console.error(err)
      localStorage.removeItem("accessToken")
    }
  }
  handleClientError({ result, api })

  return result
}
