import { cookies } from "next/headers"
import { serverApiError } from "@/shared/types/types"

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

  const cookiesResponse = await cookies()
  const token = cookiesResponse?.get("accessToken")?.value // важливо: .value

  const headersWithAuth: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  }

  if (token) {
    headersWithAuth["Authorization"] = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, {
      method,
      headers: headersWithAuth,
      ...(body ? { body: JSON.stringify(body) } : {}),
    })

    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`)
      throw { ...error, status: response.status, response } as serverApiError
    }

    const contentType = response.headers.get("content-type") || ""
    if (contentType.includes("application/json")) {
      return response.json()
    }

    return {} as TResponse
  } catch (error) {
    throw error as serverApiError
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
