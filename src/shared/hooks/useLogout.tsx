import { userActions } from "@/entities/user"
import { useRouter } from "next/navigation"
import { axiosInstance } from "@/shared/api/axiosInstance"
import { appRoutes } from "@/shared/lib/routes"
import { useAppDispatch } from "@/shared/lib/state/useAppDispatch"

export const useLogout = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const logOut = async () => {
    try {
      await axiosInstance.post("/api/v1/auth/logout")
      await axiosInstance.delete("/api/v1/security/sessions")
      dispatch(userActions.clearUser())
      router.push(appRoutes.public.signIn)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }
  return logOut
}
