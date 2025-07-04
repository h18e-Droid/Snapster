import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "@/features/auth"
import { userReducer } from "@/entities/user"
import { appReducer } from "@/features/app"
import { postReducer } from "@/features/crudPost"
import { baseClientApi } from "@/shared/api/baseClientApi"
import { setupListeners } from "@reduxjs/toolkit/query/react"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    app: appReducer,
    post: postReducer,
    [baseClientApi.reducerPath]: baseClientApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseClientApi.middleware),
})
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
