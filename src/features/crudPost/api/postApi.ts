import { axiosInstance } from "@/shared/api/axiosInstance"

export type PostType = {
  id: number
  description: string
}

type UpdatePostPayload = {
  description: string
}

export const postApi = {
  updatePost: async (postId: number, data: UpdatePostPayload) => {
    return axiosInstance.patch<PostType>(`/api/v1/posts/${postId}`, data)
  },
  
  getPost: async (postId: number) => {
    return axiosInstance.get<PostType>(`/api/v1/posts/${postId}`)
  }
}
