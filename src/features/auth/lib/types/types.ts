export type authStatus = "idle" | "success" | "fail" | "loading"

export type InitialState = {
  status: authStatus
  isLoggedIn: boolean
  error: string
}

export type user = {
  id: string
  username: string
  token: string
}

export type credentials = {
  email: string
  password: string
}
