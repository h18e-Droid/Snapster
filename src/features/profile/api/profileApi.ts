import { api } from "@/shared/api/baseClientApi"


export type ProfileType = {
  userName: string
  bio: string
  avatarUrl: string
  following: number
  followers: number
  publications: number
}


export const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<ProfileType, string>({
      query: (userId: string) => `/api/v1/profiles/${userId}`,
      providesTags: ["me"],
    }),
    updateProfile: build.mutation<ProfileType, FormData>({
      query: (formData) => ({
        url: `/api/v1/profiles/picture`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["me"],
    }),
  }),
})

export const {useGetProfileQuery, useUpdateProfileMutation} = profileApi