import { api } from "@/shared/api/baseClientApi"

export const verificationFailedApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    emailResend: build.mutation({
      query: (payload) => {
        return {
          method: "POST",
          url: "/api/v1/auth/registration-email-resending",
          body: payload,
        }
      },
      extraOptions: { skipGlobalError: true },
    }),
  }),
})

export const { useEmailResendMutation } = verificationFailedApi
