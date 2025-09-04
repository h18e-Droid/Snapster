import type { BaseQueryFn } from "@reduxjs/toolkit/query"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "@/app/store"
import handleClientError from "./handleClientError"

type ExtraOptions = {
  skipGlobalError?: boolean
}

const baseQuery = fetchBaseQuery({
  baseUrl: "https://snap-ster.net",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken
    if (token) headers.set("authorization", `Bearer ${token}`)
    return headers
  },
})

export const baseQueryWithReAuth: BaseQueryFn = async (args, api, extraOptions: ExtraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  const opts: Required<ExtraOptions> = {
    skipGlobalError: false,
    ...(extraOptions ?? {}),
  }

  if (result.error?.status === 401) {
    // оновити токен
    try {
      const url = typeof args === "string" ? args : args.url
      if (!url.includes("/login")) {
        const refreshResult = await baseQuery({ url: "/api/v1/auth/refresh-token", method: "POST" }, api, extraOptions)
        if (refreshResult.data) {
          result = await baseQuery(args, api, extraOptions)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (!opts.skipGlobalError) {
    handleClientError({ result, api })
  }

  return result
}
