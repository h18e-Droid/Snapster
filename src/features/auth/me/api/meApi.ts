import { api } from "@/shared/api/baseClientApi"

export const meApi = api.injectEndpoints({
  endpoints: (build) => ({
    me: build.query({
      query: () => {
        return {
          url: "/api/v1/auth/jwt-test",
          method: "GET",
        }
      },
      providesTags: ["me"],
    }),
  }),
})

export const { useMeQuery } = meApi
