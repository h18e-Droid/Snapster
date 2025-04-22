const pr = new Promise((resolve) => {
  const randomNumber = Math.floor(Math.random() * (1000 - 400 + 1)) + 400
  setTimeout(() => {
    const successData = { resultCode: 200, message: "SignIn successful!", data: { userId: 2 } }
    // const failedData = { resultCode: 400, message: "SignIn failed!"}
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

export const Api = {
  signIn: (credentials: credentials) => {
    return instance.post(credentials)
  },
}
