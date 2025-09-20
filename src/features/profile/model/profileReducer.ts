import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { profileApi, ProfileType } from "@/features/profile/api/profileApi"
import { createAppAsyncThunk } from "@/shared/lib/state/createAppAsyncThunk"

type ProfileStateType = {
  currentProfile: ProfileType
  isLoading: boolean
  error: string | null
}

const initialState: ProfileStateType = {
  currentProfile: {
    userName: "",
    bio: "",
    avatarUrl: "",
    following: 0,
    followers: 0,
    publications: 0,
  },
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<ProfileStateType>) => {
      state = action.payload
    },
    setPhotoUser: (state, action: PayloadAction<string>) => {
      state.currentProfile.avatarUrl = action.payload
    },
    delPhotoUser: (state) => {
      state.currentProfile.avatarUrl = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentProfile = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch profile"
      })
  },
})

export const fetchProfile = createAppAsyncThunk<ProfileType, string>(
  `${slice.name}/fetchProfile`,
  async (userId, { rejectWithValue }) => {
    try {
      const response = await profileApi.getProfile(userId)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const profileActions = slice.actions
export const profileReducer = slice.reducer
