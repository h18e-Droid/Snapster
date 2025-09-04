import { api } from "@/shared/api/baseClientApi"
import { authActions } from "@/entities/auth"

export const signOutApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    signOut: build.mutation({
      query: () => {
        return { method: "POST", url: "/api/v1/auth/logout" }
      },
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled
          if (res) {
            dispatch(authActions.clearAuth())
          }
        } catch (err) {
          dispatch(authActions.clearAuth())
          console.log(err)
        }
      },
    }),
  }),
})

export const { useSignOutMutation } = signOutApi
