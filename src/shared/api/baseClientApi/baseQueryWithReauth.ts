import type { BaseQueryFn } from "@reduxjs/toolkit/query"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "@/app/store"
import handleClientError from "./handleClientError"
import { sessionTokenCleared, sessionTokenReceived } from "@/shared/api/baseClientApi/events/session"

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
    try {
      const url = typeof args === "string" ? args : args.url
      if (!url.includes("/login") && !url.includes("/auth/refresh-token")) {
        const refreshResult = await baseQuery({ url: "/api/v1/auth/refresh-token", method: "POST" }, api, extraOptions)
        if (refreshResult.data) {
          const accessToken = (refreshResult.data as any).accessToken
          if (accessToken) {
            api.dispatch(sessionTokenReceived({ accessToken }))
            result = await baseQuery(args, api, extraOptions)
          }
        }
      }
    } catch (err) {
      api.dispatch(sessionTokenCleared())
    }
  }

  if (!opts.skipGlobalError) {
    handleClientError({ result, api })
  }

  return result
}
