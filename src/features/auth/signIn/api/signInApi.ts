import handleClientError from "@/shared/lib/api/handleClientError"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setToken } from "@/features/auth/signIn/api/set-token"

export const signInApi = createApi({
  reducerPath: "signIn",
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: "https://snap-ster.net/",
    })(args, api, extraOptions)
    await setToken({ result })
    handleClientError({ result, api })
    return result
  },
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (payload) => {
        return {
          method: "POST",
          url: "/api/v1/auth/login",
          body: payload,
        }
      },
    }),
  }),
})

export const { useSignInMutation } = signInApi
