import { createSlice } from "@reduxjs/toolkit/react"
import { PayloadAction } from "@reduxjs/toolkit"
import { sessionTokenCleared, sessionTokenReceived } from "@/shared/api/baseClientApi/events/session"

const slice = createSlice({
  name: "authSlice",
  initialState: {
    accessToken: null as string | null,
    isAuth: false,
  },
  reducers: {
    clearAuth: (state) => {
      state.isAuth = false
      state.accessToken = null
    },
    setToken(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken
      state.isAuth = true
    },
    setIsAuth: (state, action: PayloadAction<{ isAuth: boolean }>) => {
      state.isAuth = action.payload.isAuth
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sessionTokenReceived, (state, action: PayloadAction<{ accessToken: string }>) => {
        state.accessToken = action.payload.accessToken
      })
      .addCase(sessionTokenCleared, (state, action) => {
        state.accessToken = null
      })
  },
})
export const authReducer = slice.reducer
export const authActions = slice.actions
