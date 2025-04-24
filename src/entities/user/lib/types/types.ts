export type user = {
  id: string
  username: string
  token: string
}

export type initialStateType = {
  user: null | user
  isAuth: boolean
}
