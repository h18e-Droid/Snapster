import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit/react"
import type { PayloadAction } from "@reduxjs/toolkit"
import { InitialState, statusType } from "@/features/app/lib/types"
import NProgress from "nprogress"

const initialState: InitialState = {
  error: null as string | null,
  success: null as string | null,
  status: "idle" as statusType,
  loadingCount: 0,
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSuccess: (state, action: PayloadAction<{ success: string | null }>) => {
      return { ...state, status: "success", success: action.payload.success }
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      return { ...state, status: "error", error: action.payload.error }
    },
    setDefaultStatus: (state) => {
      state.status = "idle"
      state.error = null
      state.success = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.loadingCount += 1
        NProgress.start()
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.loadingCount -= 1
        state.status = state.loadingCount !== 0 ? "loading" : "success"
        NProgress.done()
      })
      .addMatcher(isRejected, (state) => {
        state.loadingCount -= 1
        state.status = state.loadingCount !== 0 ? "loading" : "error"
        NProgress.done()
      })
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
