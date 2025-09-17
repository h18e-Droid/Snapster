import { api } from "@/shared/api/baseClientApi"
import { authActions } from "@/entities/auth"
import { userActions } from "@/entities/user"

export const meApi = api.injectEndpoints({
  endpoints: (build) => ({
    me: build.query({
      query: () => {
        return {
          url: "/api/v1/auth/jwt-test",
          method: "GET",
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled
          dispatch(authActions.setIsAuth({ isAuth: true }))
          dispatch(userActions.setUserId({ userId: res.data.userId }))
        } catch {
          dispatch(authActions.clearAuth())
        }
      },
      providesTags: ["me"],
    }),
  }),
})

export const { useMeQuery, useLazyMeQuery } = meApi
