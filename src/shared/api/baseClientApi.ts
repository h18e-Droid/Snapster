import axios from "axios"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import handleClientError from "@/shared/lib/api/handleClientError"

export const axiosInstance = axios.create({
  baseURL: "https://snap-ster.net",
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

export const baseClientApi = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: "https://snap-ster.net",
      prepareHeaders: (headers) => {
        headers.set("Authorization", `Bearer ${localStorage.getItem("accessToken")}`)
      },
    })(args, api, extraOptions)
    handleClientError({ result, api })
    return result
  },
  endpoints: () => ({}),
  tagTypes: ["me"],
})
