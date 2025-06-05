import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { InitialState, statusType } from "@/features/app/lib/types/types"

const initialState: InitialState = {
  error: null as string | null,
  status: "idle" as statusType,
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<{ status: statusType }>) => {
      state.status = action.payload.status
    },
    setAuthError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error
    },
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
