import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "@/features/auth"
import { userReducer } from "@/entities/user"
import { appReducer } from "@/features/app"
import { postReducer } from "@/features/crudPost"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    app: appReducer,
    post: postReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
