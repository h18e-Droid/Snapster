import { axiosInstance } from "@/shared/api/axiosInstance"
import {
  confirmRegistrationPayload, forgotPasswordPayload,
  signInPayload,
  signUpPayload,
  verificationEmailPayload
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
  forgotPassword: async (payload: forgotPasswordPayload) => {
    return axiosInstance.post("/api/v1/auth/password-recovery", payload)
  },
}