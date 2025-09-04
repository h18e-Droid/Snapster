import { api } from "@/shared/api/baseClientApi"
import { authActions } from "@/entities/auth"

export const signInApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (payload) => {
        return {
          method: "POST",
          url: "/api/v1/auth/login",
          body: payload,
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          const accessToken = (data as { accessToken: string }).accessToken

          if (accessToken) {
            dispatch(authActions.setToken({ accessToken }))
          }
        } catch (err) {
          console.log(err)
        }
      },
    }),
  }),
})

export const { useSignInMutation } = signInApi
