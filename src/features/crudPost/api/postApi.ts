import { baseClientApi } from "@/shared/api/baseClientApi"

export type PostType = {
  id: number
  description: string
}

type UpdatePostPayload = {
  description: string
}

export const postApi = {
  updatePost: async (postId: number, data: UpdatePostPayload) => {
    return baseClientApi.patch<PostType>(`/api/v1/posts/${postId}`, data)
  },

  getPost: async (postId: number) => {
    return baseClientApi.get<PostType>(`/api/v1/posts/${postId}`)
  },
}
