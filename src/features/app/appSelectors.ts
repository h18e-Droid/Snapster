import { RootState } from "@/app/store"

/* eslint-disable  @typescript-eslint/no-explicit-any */

export const selectThemeMode = (state: RootState) => (state.app as any).themeMode
export const selectAppStatus = (state: RootState) => (state.app as any).status
export const selectAppError = (state: RootState) => (state.app as any).error
