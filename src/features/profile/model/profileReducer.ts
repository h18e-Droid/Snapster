import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProfileType } from "@/features/profile/api/profileApi"


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
})


export const profileActions = slice.actions
export const profileReducer = slice.reducer
