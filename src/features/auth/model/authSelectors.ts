import {RootState} from "@/app/store";

export const selectLoggedIn = (state: RootState) => state.auth?.isLoggedIn