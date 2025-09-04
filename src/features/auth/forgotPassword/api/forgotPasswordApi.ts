import { api } from "@/shared/api/baseClientApi"

export const forgotPasswordApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    passwordRecovery: build.mutation({
      query: (payload) => {
        return {
          method: "POST",
          url: "/api/v1/auth/password-recovery",
          body: payload,
        }
      },
      extraOptions: { skipGlobalError: true },
    }),
  }),
})

export const { usePasswordRecoveryMutation } = forgotPasswordApi
