import { api } from "@/shared/api/baseClientApi"

export type PostType = {
  id: number
  description: string
}

type UpdatePostPayload = {
  description: string
}

export const postApi = {
  updatePost: async (postId: number, data: UpdatePostPayload) => {
    // return api.patch<PostType>(`/api/v1/posts/${postId}`, data)
  },

  getPost: async (postId: number) => {
    // return api.get<PostType>(`/api/v1/posts/${postId}`)
  },
}
