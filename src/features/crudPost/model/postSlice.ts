import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "@/shared/lib/state/createAppAsyncThunk"
import { postApi } from "../api/postApi"
import { PostType } from "../api/postApi"

interface PostState {
  currentPost: PostType | null
  isLoading: boolean
  error: string | null
}

const initialState: PostState = {
  currentPost: null,
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setCurrentPost: (state, action: PayloadAction<PostType | null>) => {
      state.currentPost = action.payload
    },
    clearPostState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentPost = action.payload
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch post"
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentPost = action.payload
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to update post"
      })
  },
})

export const fetchPost = createAppAsyncThunk<PostType, number>(
  `${slice.name}/fetchPost`,
  async (postId, { rejectWithValue }) => {
    try {
      const response = await postApi.getPost(postId)
      return (response as any).data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const updatePost = createAppAsyncThunk<PostType, { postId: number; description: string }>(
  `${slice.name}/updatePost`,
  async ({ postId, description }, { rejectWithValue }) => {
    try {
      const response = await postApi.updatePost(postId, { description })
      return (response as any).data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const postActions = slice.actions
export const postReducer = slice.reducer
