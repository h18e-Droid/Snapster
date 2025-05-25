import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "@/shared/lib/state/createAppAsyncThunk"
import { authApi } from "@/features/auth/api/authApi"
import { authStatus, FieldErrors, InitialState, signInPayload, signUpPayload, confirmRegistrationPayload, verificationEmailPayload, } from "@/features/auth/lib/types/types"
import axios from "axios"
import { FieldError } from "@/shared/types/types"

const initialState: InitialState = {
  isAuth: false,
  error: "",
  status: "idle" as authStatus,
  fieldErrors: [],
  loader: false,
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<{ status: authStatus }>) => {
      state.status = action.payload.status
    },
    setIsAuth: (state, action: PayloadAction<{ isAuth: boolean }>) => {
      state.isAuth = action.payload.isAuth
    },
    setError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error
    },
    setFieldErrors: (state, action: PayloadAction<FieldErrors>) => {
      state.fieldErrors = action.payload
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload
    },
  },
})

export const signUp = createAppAsyncThunk<void, signUpPayload>(`${slice.name}/signUp`, async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI
  try {
    dispatch(slice.actions.setFieldErrors([]))
    await authApi.signUp(arg)
    dispatch(slice.actions.setStatus({ status: "success" }))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const fieldErrors: FieldErrors = error.response?.data.errorsMessages.map((el: FieldError) => el)
      dispatch(slice.actions.setFieldErrors(fieldErrors))
      dispatch(slice.actions.setStatus({ status: "failed" }))
    }
  }
})

export const confirmRegistration = createAppAsyncThunk<void, confirmRegistrationPayload>(
  `${slice.name}/confirmRegistration`,
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI
    try {
      const res = await authApi.confirmRegistration(arg)
      if (res) {
        dispatch(slice.actions.setStatus({ status: "success" }))
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(slice.actions.setStatus({ status: "failed" }))
      }
    } finally {
      dispatch(slice.actions.setLoader(true))
    }
  },
)

export const verificationEmail = createAppAsyncThunk<void, verificationEmailPayload>(
  `${slice.name}/verificationEmail`,
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI
    try {
      await authApi.verificationEmail(arg)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(slice.actions.setError({ error: error.response?.data.errorsMessages[0].message }))
      }
    }
  },
)

//буду переделивать rejectWithValue и return value пока что так
export const signIn = createAppAsyncThunk<void, signInPayload>(`${slice.name}/signIn`, async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI
  try {
    dispatch(slice.actions.setStatus({ status: "loading" }))
    const res = await authApi.signIn(arg)
    localStorage.setItem("accessToken", res.data.accessToken)
    dispatch(slice.actions.setIsAuth({ isAuth: true }))
    dispatch(authActions.setStatus({ status: "success" }))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(slice.actions.setStatus({ status: "failed" }))
      dispatch(slice.actions.setError({ error: error.response?.data.errorsMessages[0].message }))
    } else {
      dispatch(slice.actions.setError({ error: "An unknown error occurred" }))
    }
  }
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = { signIn }
