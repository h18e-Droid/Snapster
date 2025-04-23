import { RootState } from "@/app/store"

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const selectLoggedIn = (state: RootState) => (state.auth as any).isLoggedIn
