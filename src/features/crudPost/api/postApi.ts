import { api } from "@/shared/api/baseClientApi"


export type PostType = {
  id: string
  description: string
  userName: string
  createdAt: string
  pictures: {url: string}[]
}

export type UpdatePostPayload = {
  description: string
}

export type ResponsesAddPost = {
  id: string
  description: string
  userName: string
  createdAt: string
}

export type ResponsesGetAllPosts = {
  userId: string
  sortDirection?: string
  pageNumber?: number
  pageSize?: number
  sortBy?: string
}

export type GetAllPosts = {
  pagesCount: number
  pageNumber: number
  pageSize: number
  totalCount: number
  items: PostType[]
}

// export const postApi = {
//   updatePost: async (postId: number, data: UpdatePostPayload) => {
//     // return api.patch<PostType>(`/api/v1/posts/${postId}`, data)
//   },
//
//   getPost: async (postId: number) => {
//     // return api.get<PostType>(`/api/v1/posts/${postId}`)
//   },
// }

export const postApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPost: build.query<PostType, number>({
      query: (postId: number) => `/api/v1/posts/${postId}`,
      providesTags: ["me"],
    }),
    getAllPosts: build.query<GetAllPosts, ResponsesGetAllPosts>({
      query: (arg) => `/api/v1/posts/all-posts/${arg.userId}`,
      providesTags: ["me"],
    }),
    addPost: build.mutation<ResponsesAddPost, FormData>({
      query: (body) => ({
        url: "/api/v1/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["me"],
    }),
    updatePost: build.mutation<UpdatePostPayload, ResponsesAddPost>({
      query: ({ id, description }) => ({
        url: `/api/v1/posts/${id}`,
        method: "PUT",
        body: { description },
      }),
      invalidatesTags: ["me"],
    }),
  }),
})

export const {useGetPostQuery, useGetAllPostsQuery, useUpdatePostMutation, useAddPostMutation,} = postApi
