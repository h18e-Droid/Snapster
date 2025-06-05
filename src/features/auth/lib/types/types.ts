export type authStatus = "idle" | "success" | "failed" | "loading"
export type emailRegisteredType = 'idle' | 'registered' | 'not_registered'
export type PasswordResetStatus = "idle" | "success" | "expired"

export type InitialState = {
  status: authStatus
  isAuth: boolean
  error: string
  fieldErrors: FieldErrors
  loader: boolean
  emailRegistered: emailRegisteredType
  passwordResetStatus: PasswordResetStatus
}

export type signInPayload = {
  email: string
  password: string
}

export type signUpPayload = {
  userName: string
  email: string
  password: string
}

export type confirmRegistrationPayload = {
  code: string
}

export type verificationEmailPayload = {
  email: string
}

export type forgotPasswordPayload = {
  email: string
  reCaptchaToken: string
}

export type createNewPasswordPayload = {
  newPassword: string
  recoveryCode: string
}

export type FieldError = {
  field: "userName" | "email" | "password" | "confirmPassword" | "agree" | `root.${string}` | "root"
  message: string
}

export type FieldErrors = FieldError[]
