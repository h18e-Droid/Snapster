"use client"

// Имитация задержки для асинхронных операций
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Типы для payload
type LoginPayload = {
  username: string
  password: string
}

type LogoutPayload = {
  token: string
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
type MockResponse = { data: any; status: number; statusText: string }

const mockResponse = (data: any, status = 200): MockResponse => ({
  data,
  status,
  statusText: status === 200 ? "OK" : "Error",
})

export const authApi = {
  login(payload: LoginPayload): Promise<MockResponse> {
    return new Promise((resolve, reject) => {
      delay(1000).then(() => {
        // Валидация payload
        if (!payload.username || !payload.password) {
          const response = mockResponse({ error: "Username and password are required" }, 400)
          return reject(response)
        }

        // Имитация успешного входа (только для "test"/"password")
        if (payload.username === "test" && payload.password === "password") {
          const response = mockResponse({
            userId: 1,
            token: "mock-token-123",
          })
          resolve({ data: response, status: 0, statusText: "OK" })
        } else {
          const response = mockResponse({ error: "Invalid credentials" }, 401)
          reject({ data: response, status: 1, statusText: "Not OK" })
        }
      })
    })
  },

  logout(payload: LogoutPayload): Promise<MockResponse> {
    return new Promise((resolve, reject) => {
      delay(500).then(() => {
        // Валидация токена
        if (!payload.token) {
          const response = mockResponse({ error: "Token is required" }, 400)
          return reject(response)
        }

        // Имитация успешного выхода
        const response = mockResponse({ success: true })
        resolve(response)
      })
    })
  },
}
/*

// Пример использования
authApi
  .login({ username: "test", password: "password" })
  .then((response) => {
    console.log("Login successful:", response.data)
  })
  .catch((error) => {
    console.error("Login failed:", error.data)
  })

authApi
  .logout({ token: "mock-token-123" })
  .then((response) => {
    console.log("Logout successful:", response.data)
  })
  .catch((error) => {
    console.error("Logout failed:", error.data)
  })
*/
