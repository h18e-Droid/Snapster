import { axiosInstance } from "@/shared/api/baseClientApi"
import {
  confirmRegistrationPayload,
  createNewPasswordPayload,
  forgotPasswordPayload,
  signInPayload,
  signUpPayload,
  verificationEmailPayload,
} from "@/features/auth/lib/types/types"

export const authApi = {
  signIn: async (payload: signInPayload) => {
    return axiosInstance.post("/api/v1/auth/login", payload)
  },
  signUp: async (payload: signUpPayload) => {
    return axiosInstance.post("/api/v1/auth/registration", payload)
  },
  confirmRegistration: async (payload: confirmRegistrationPayload) => {
    return axiosInstance.post("/api/v1/auth/registration-confirmation", payload)
  },
  verificationEmail: async (payload: verificationEmailPayload) => {
    return axiosInstance.post("/api/v1/auth/registration-email-resending", payload)
  },
  me: async () => {
    return axiosInstance.get("/api/v1/auth/jwt-test")
  },
  forgotPassword: async (payload: forgotPasswordPayload) => {
    return axiosInstance.post("/api/v1/auth/password-recovery", payload)
  },
  createNewPassword: async (payload: createNewPasswordPayload) => {
    return axiosInstance.post("/api/v1/auth/new-password", payload)
  },
}
