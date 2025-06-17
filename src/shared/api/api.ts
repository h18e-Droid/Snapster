
const BASE_URL = "https://snap-ster.net/"

type RequestOptions<TBody = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  headers?: Record<string, string>
  body?: TBody
  params?: Record<string, string | number | boolean>
}

const buildUrl = (path: string, params?: Record<string, string | number | boolean>): string => {
  const url = new URL(`${BASE_URL}${path}`)

  if (params) {
    Object.entries(params)
      .filter(([, value]) => value !== undefined) // Ігноруємо 'undefined'
      .forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
  }
  return url.toString()
}

const request = async <TResponse = unknown, TBody = unknown>(
  path: string,
  { method = "GET", headers = {}, body, params }: RequestOptions<TBody> = {},
): Promise<TResponse> => {
  const url = buildUrl(path, params)

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json", // Дефолтний заголовок
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })

    const contentType = response.headers.get("content-type") || ""
    if (contentType.includes("application/json")) {
      return response.json()
    }

    return {} as TResponse
  } catch (error) {
    console.error("Request error:", error)
    throw error
  }
}

export const api = {
  get: <T = unknown>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "GET" }),

  post: <T = unknown, TBody = unknown>(path: string, body?: TBody, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T, TBody>(path, { ...options, method: "POST", body }),

  put: <T = unknown, TBody = unknown>(path: string, body?: TBody, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T, TBody>(path, { ...options, method: "PUT", body }),

  delete: <T = unknown>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "DELETE" }),
}
