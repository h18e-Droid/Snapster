import { api } from "@/shared/api/baseClientApi"

export const createNewPasswordApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    newPassword: build.mutation({
      query: (payload) => {
        return {
          method: "POST",
          url: "/api/v1/auth/new-password",
          body: payload,
        }
      },
      extraOptions: { skipGlobalError: true },
    }),
  }),
})

export const { useNewPasswordMutation } = createNewPasswordApi
