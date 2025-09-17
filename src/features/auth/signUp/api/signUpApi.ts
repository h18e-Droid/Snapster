import { api } from "@/shared/api/baseClientApi"

export const signUpApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (payload) => {
        return {
          method: "POST",
          url: "/api/v1/auth/registration",
          body: payload,
        }
      },
      extraOptions: { skipGlobalError: true },
    }),
  }),
})

export const { useSignUpMutation } = signUpApi
