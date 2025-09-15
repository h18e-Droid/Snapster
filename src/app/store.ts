import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "@/features/auth"
import { userReducer } from "@/entities/user"
import { appReducer } from "@/features/app"
import { postReducer } from "@/features/crudPost"
import { generalInfoReducer } from "@/features/generalInfo/model/generalInfoSlice"
import { profileReducer } from "@/features/profile/model/profileReducer"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    app: appReducer,
    post: postReducer,
    generalInfo: generalInfoReducer,
    profile: profileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
