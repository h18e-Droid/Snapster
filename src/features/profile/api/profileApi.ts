import { axiosInstance } from "@/shared/api/baseClientApi"


export type ProfileType = {
  userName: string
  bio: string
  avatarUrl: string
  following: number
  followers: number
  publications: number
}

export const profileApi = {
  getProfile: async (userId: string) => {
    return axiosInstance.get<ProfileType>(`/api/v1/profiles/${userId}`)
  }
}