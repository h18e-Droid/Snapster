import { axiosInstance } from "@/shared/api/axiosInstance"
import { signInPayload, signUpPayload } from "@/features/auth/lib/types/types"

export const authApi = {
  signIn: async (payload: signInPayload) => {
    return axiosInstance.post("/api/v1/auth/login", payload)
  },
  signUp: async (payload: signUpPayload) => {
    return axiosInstance.post("/api/v1/auth/registration", payload)
  }
}
