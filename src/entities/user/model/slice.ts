import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialStateType, PostType, user } from "@/entities/user/lib/types/types"
import { RootState } from "@/app/store"

const initialState: initialStateType = {
  user: null as user | null,
  userId: null,
  followersList: [],
  posts: [],
  visiblePosts: [],
  hasMore: true,
  isLoading: false,
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: initialStateType, action: PayloadAction<user>) => {
      state.user = action.payload
    },
    setUserId: (state: initialStateType, action: PayloadAction<{ userId: string }>) => {
      state.userId = action.payload.userId
    },

    deleteFollower: (state: initialStateType, action: PayloadAction<string>) => {
      const index = state.followersList.findIndex((item) => item.id === action.payload)
      if (index !== -1) state.followersList.splice(index, 1)
    },
    toggleFollow: (state: initialStateType, action: PayloadAction<{ id: string; follow: boolean }>) => {
      const index = state.followersList.findIndex((item) => item.id === action.payload.id)
      state.followersList[index].follow = action.payload.follow
    },
    clearUser: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMorePosts.pending, (state: initialStateType) => {
        state.isLoading = true
      })
      .addCase(fetchMorePosts.fulfilled, (state: initialStateType, action: PayloadAction<PostType[]>) => {
        state.visiblePosts.push(...action.payload)
        state.hasMore = state.visiblePosts.length < state.posts.length
        state.isLoading = false
      })
      .addCase(fetchMorePosts.rejected, (state: initialStateType) => {
        state.isLoading = false
      })
  },
})

export const fetchMorePosts = createAsyncThunk("user/fetchMorePosts", async (_, { getState }) => {
  const state = getState() as RootState
  const { posts, visiblePosts } = state.user

  const PAGE_SIZE = 8
  const start = visiblePosts.length
  const end = start + PAGE_SIZE

  const nextPosts = posts.slice(start, end)

  return new Promise<typeof nextPosts>((resolve) => {
    setTimeout(() => {
      resolve(nextPosts)
    }, 3000)
  })
})

export const userReducer = slice.reducer
export const userActions = slice.actions
