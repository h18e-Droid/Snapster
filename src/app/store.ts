import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "@/features/auth"
import { userReducer } from "@/entities/user"
import { appReducer } from "@/features/app"
import { postReducer } from "@/features/crudPost"
import { api } from "@/shared/api/baseClientApi"
import { setupListeners } from "@reduxjs/toolkit/query/react"
import { signInApi } from "@/features/auth/signIn/api/signInApi"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    app: appReducer,
    post: postReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
