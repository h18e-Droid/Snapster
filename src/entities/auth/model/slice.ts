import { createSlice } from "@reduxjs/toolkit/react"
import { PayloadAction } from "@reduxjs/toolkit"

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
})
export const authReducer = slice.reducer
export const authActions = slice.actions
