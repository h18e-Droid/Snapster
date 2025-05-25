import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialStateType, user } from "@/entities/user/lib/types/types"

const initialState: initialStateType = {
  user: null as user | null,
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: initialStateType, action: PayloadAction<user>) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null
    },
  },
})

export const userReducer = slice.reducer
export const userActions = slice.actions
