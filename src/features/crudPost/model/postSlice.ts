import { createSlice, PayloadAction } from "@reduxjs/toolkit"
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

})


export const postActions = slice.actions
export const postReducer = slice.reducer
