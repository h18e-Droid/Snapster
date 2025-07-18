import { getUserData } from "@/shared/lib/state/getUserData"

export const isUserAuthenticated = async (): Promise<boolean> => !!(await getUserData())
