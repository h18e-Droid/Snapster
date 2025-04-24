import { user } from "@/features/auth/lib/types/types"

const successData = {
  resultCode: 200,
  message: "SignIn successful!",
  data: { id: "2", username: "blabla2", token: "123123" },
}
type successData = {
  resultCode: number
  message: string
  data: user
}
// const failedData = { resultCode: 400, message: "SignIn failed!"}

const pr = new Promise((resolve: (value: successData) => void) => {
  const randomNumber = Math.floor(Math.random() * (1000 - 400 + 1)) + 400
  setTimeout(() => {
    resolve(successData)
  }, randomNumber)
})

type credentials = { email: string; password: string }

const instance = {
  post: (credentials: credentials) => {
    credentials.email = ""
    return pr
  },
}

export const authApi = {
  signIn: (credentials: credentials) => {
    return instance.post(credentials)
  },
}
