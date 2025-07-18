import { api } from "@/shared/api/baseClientApi"
import { removeToken } from "@/shared/api/remove-token"

export const signOutApi = api.injectEndpoints({
  endpoints: (build) => ({
    signOut: build.mutation({
      query: () => {
        return { method: "POST", url: "/api/v1/auth/logout" }
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const res = await queryFulfilled
          if (res) {
            await removeToken()
          }
        } catch (err) {
          await removeToken()
          console.log(err)
        }
      },
    }),
  }),
})

export const { useSignOutMutation } = signOutApi
