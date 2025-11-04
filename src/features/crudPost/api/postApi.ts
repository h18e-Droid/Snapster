import { api } from "@/shared/api/baseClientApi"


export type PostType = {
  id: string
  description: string
  location: string
  userName: string
  createdAt: string
  pictures: {url: string}[]
}

export type UpdatePostPayload = {
  description: string
  location?: string
}

export type ResponsesAddPost = {
  id: string
  description: string
  location: string
  userName: string
  createdAt: string
}

export type GetAllPosts  = {
  userId: string
  sortDirection?: string
  pageNumber?: number
  pageSize?: number
  sortBy?: string
}

export type ResponsesGetAllPosts = {
  pagesCount: number
  pageNumber: number
  pageSize: number
  totalCount: number
  items: PostType[]
}


export const postApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPost: build.query<PostType, number>({
      query: (postId: number) => `/api/v1/posts/${postId}`,
      providesTags: ["me"],
    }),
    getAllPosts: build.query<ResponsesGetAllPosts, GetAllPosts>({
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
