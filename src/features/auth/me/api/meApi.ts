import { baseClientApi } from "@/shared/api/baseClientApi"

export const meApi = baseClientApi.injectEndpoints({
  endpoints: (build) => ({
    me: build.query({
      query: () => {
        return {
          url: "/api/v1/auth/jwt-test",
          method: "GET",
        }
      },
    }),
  }),
})

export const { useMeQuery } = meApi
