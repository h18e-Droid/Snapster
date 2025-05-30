export type authStatus = "idle" | "success" | "failed" | "loading"

export type InitialState = {
  status: authStatus
  isAuth: boolean
  error: string
  fieldErrors: FieldErrors
  loader: boolean
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

export type FieldError = {
  field: "userName" | "email" | "password" | "confirmPassword" | "agree" | `root.${string}` | "root"
  message: string
}

export type FieldErrors = FieldError[]
