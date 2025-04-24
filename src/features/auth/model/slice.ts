import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "@/shared/lib/state/createAppAsyncThunk"
import { authApi } from "@/features/auth/api/authApi"
import { userActions } from "@/entities/user"
import { authStatus, InitialState } from "@/features/auth/lib/types/types"

const initialState: InitialState = {
  isLoggedIn: true,
  error: "string",
  status: "idle" as authStatus,
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<{ status: authStatus }>) => {
      state.status = action.payload.status
    },
  },
})

export const signIn = createAppAsyncThunk<void, { email: string; password: string }>(
  "signIn",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(slice.actions.setStatus({ status: "loading" }))
      const res = await authApi.signIn(arg)
      if (res.resultCode === 200) {
        dispatch(userActions.setUser(res.data))
      } else {
        dispatch(authActions.setStatus({ status: "fail" }))
      }
    } catch (error) {
      rejectWithValue(error)
    }
  },
)

export const authReducer = slice.reducer
const authActions = slice.actions
export const authThunks = { signIn }
