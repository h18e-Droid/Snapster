import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialStateType, user } from "@/entities/user/lib/types/types"

const initialState: initialStateType = {
  user: null as user | null,
  isAuth: false,
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: initialStateType, action: PayloadAction<user>) => {
      state.user = action.payload
    },
    setUserToken: (state: initialStateType, action: PayloadAction<user>) => {
      if (state.user) {
        state.user.token = action.payload.token
      }
    },
  },
})

export const userReducer = slice.reducer
export const userActions = slice.actions
