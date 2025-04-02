import { configureStore, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit"
import { authReducer } from "@/features/auth/model/authReducer"
import { appReducer } from "@/features/app/appReducer"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
