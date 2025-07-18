import { setToken } from "@/shared/api/set-token"
import { api } from "@/shared/api/baseClientApi"

export const signInApi = api.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (payload) => {
        return {
          method: "POST",
          url: "/api/v1/auth/login",
          body: payload,
        }
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          const accessToken = (data as { accessToken: string }).accessToken
          if (accessToken) {
            await setToken(accessToken)
          }
        } catch (err) {
          console.log(err)
        }
      },
    }),
  }),
})

export const { useSignInMutation } = signInApi
