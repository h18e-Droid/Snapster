import { baseClientApi } from "@/shared/api/baseClientApi"

export const signInApi = baseClientApi.injectEndpoints({
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
