import { configureStore, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit"
import { authReducer } from "@/features/auth/model/authReducer"
import { appReducer } from "@/features/app/appReducer"

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const store = configureStore({
  reducer: {
    auth: authReducer as any,
    app: appReducer as any,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
