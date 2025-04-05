"use client"

// Имитация задержки для асинхронных операций
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Имитация ответа от сервера
const mockResponse = (data: object, status = 200) => ({
  data,
  status,
  statusText: status === 200 ? "OK" : "Error",
})

export const authApi = {
  login(payload: object) {
    return new Promise((resolve, reject) => {
      delay(1000).then(() => {
        // Имитация успешного ответа
        const response = mockResponse({ userId: 1, token: "mock-token" })
        if (response.status === 200) {
          resolve(response)
        } else {
          reject(response)
        }
      })
    })
  },
  logout() {
    return new Promise((resolve, reject) => {
      delay(1000).then(() => {
        // Имитация успешного ответа
        const response = mockResponse({})
        if (response.status === 200) {
          resolve(response)
        } else {
          reject(response)
        }
      })
    })
  },
}

// Пример использования
authApi
  .login({ username: "test", password: "password" })
  .then((response) => {
    console.log("Login successful:", response.data)
  })
  .catch((error) => {
    console.error("Login failed:", error)
  })

authApi
  .logout()
  .then((response) => {
    console.log("Logout successful:", response.data)
  })
  .catch((error) => {
    console.error("Logout failed:", error)
  })
