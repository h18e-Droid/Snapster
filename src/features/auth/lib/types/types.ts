export type authStatus = "idle" | "success" | "failed" | "loading"

export type InitialState = {
  status: authStatus
  isAuth: boolean
  error: string
}

export type signInPayload = {
  email: string
  password: string
}
