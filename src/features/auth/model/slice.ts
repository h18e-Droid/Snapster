import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "@/shared/lib/state/createAppAsyncThunk"
import { authApi } from "@/features/auth/api/authApi"
import {
  authStatus,
  FieldErrors,
  InitialState,
  signInPayload,
  signUpPayload,
  confirmRegistrationPayload,
  verificationEmailPayload,
  forgotPasswordPayload,
  emailRegisteredType,
  createNewPasswordPayload,
  PasswordResetStatus,
} from "@/features/auth/lib/types/types"
import axios from "axios"
import { FieldError } from "@/shared/types/types"
import { userActions } from "@/entities/user"

const initialState: InitialState = {
  isAuth: false,
  error: "",
  status: "idle" as authStatus,
  fieldErrors: [],
  loader: false,
  emailRegistered: "idle" as emailRegisteredType,
  passwordResetStatus: "idle" as PasswordResetStatus,
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
    setAuthError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error
    },
    setFieldErrors: (state, action: PayloadAction<FieldErrors>) => {
      state.fieldErrors = action.payload
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload
    },
    setIsEmailRegistered(state, action: PayloadAction<{ emailRegistered: emailRegisteredType }>) {
      state.emailRegistered = action.payload.emailRegistered
    },
    setPasswordReset(state, action: PayloadAction<{ passwordResetStatus: PasswordResetStatus }>) {
      state.passwordResetStatus = action.payload.passwordResetStatus
    },
  },
})

export const signUp = createAppAsyncThunk<void, signUpPayload>(`${slice.name}/signUp`, async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI
  try {
    dispatch(setFieldErrors([]))
    await authApi.signUp(arg)
    dispatch(setStatus({ status: "success" }))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const fieldErrors: FieldErrors = error.response?.data.errorsMessages.map((el: FieldError) => el)
      dispatch(setFieldErrors(fieldErrors))
      dispatch(setStatus({ status: "failed" }))
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
        dispatch(setStatus({ status: "success" }))
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setStatus({ status: "failed" }))
      }
    } finally {
      dispatch(setLoader(true))
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
        dispatch(setAuthError({ error: error.response?.data.errorsMessages[0].message }))
      }
    }
  },
)

export const signIn = createAppAsyncThunk<void, signInPayload>(`${slice.name}/signIn`, async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI
  try {
    dispatch(setStatus({ status: "loading" }))
    const res = await authApi.signIn(arg)
    localStorage.setItem("accessToken", res.data.accessToken)
    await dispatch(authMe())
    dispatch(setStatus({ status: "success" }))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setStatus({ status: "failed" }))
      dispatch(setAuthError({ error: error.response?.data.errorsMessages[0].message }))
    } else {
      dispatch(setAuthError({ error: "An unknown error occurred" }))
    }
  }
})

export const forgotPassword = createAppAsyncThunk<void, forgotPasswordPayload>(
  `${slice.name}/forgotPassword`,
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI
    try {
      dispatch(setIsEmailRegistered({ emailRegistered: "idle" }))
      const result = await authApi.forgotPassword(arg)

      if (result.status === 204) {
        dispatch(setIsEmailRegistered({ emailRegistered: "registered" }))
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setAuthError({ error: error.response?.data.errorsMessages[0].message }))
        dispatch(setIsEmailRegistered({ emailRegistered: "not_registered" }))
      }
    }
  },
)

export const authMe = createAppAsyncThunk<void, void>(`${slice.name}/fetchMe`, async (_, thunkAPI) => {
  const { dispatch } = thunkAPI
  try {
    const res = await authApi.me()
    dispatch(slice.actions.setIsAuth({ isAuth: true }))
    dispatch(userActions.setUserId({ userId: res.data.userId }))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setAuthError({ error: "Failed to fetch user data" }))
    }
  }
})

export const createNewPassword = createAppAsyncThunk<void, createNewPasswordPayload>(
  `${slice.name}/createNewPassword`,
  async (arg, thunkApi) => {
    const { dispatch } = thunkApi
    try {
      dispatch(setPasswordReset({ passwordResetStatus: "idle" }))
      const result = await authApi.createNewPassword(arg)
      if (result.status === 204) {
        dispatch(setPasswordReset({ passwordResetStatus: "success" }))
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setAuthError({ error: error.response?.data.errorsMessages[0].message }))
        dispatch(setPasswordReset({ passwordResetStatus: "expired" }))
      }
    }
  },
)

export const authReducer = slice.reducer
export const { setStatus, setAuthError, setFieldErrors, setLoader, setIsAuth, setIsEmailRegistered, setPasswordReset } =
  slice.actions
