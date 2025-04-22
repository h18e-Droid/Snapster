import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

type sliceState = {
  status: "idle" | "success" | "fail" | "loading"
  error: string
}

const initialState: sliceState = { status: "idle", error: "" }

const slice = createSlice({
  name: "SignIn",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload.status
    },
  },
})

type arg = {
  email: string
  password: string
}

export const signIn = createAsyncThunk<void, arg>("signIn", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(slice.actions.setStatus({ status: "loading" }))
  } catch (error) {
    rejectWithValue(error)
  }
})

export const SignInReducer = slice.reducer
