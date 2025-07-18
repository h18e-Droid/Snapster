import axios from "axios"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import handleClientError from "@/shared/lib/api/handleClientError"
import { errorResponse } from "@/shared/types/types"
import { baseQueryWithReauth } from "@/shared/api/baseClientApi/baseQueryWithReauth"

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

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["me"],
})

/* /*const result = await fetchBaseQuery({
      baseUrl: "https://snap-ster.net",
      prepareHeaders: (headers) => {
        headers.set("Authorization", `Bearer ${localStorage.getItem("accessToken")}`)
      },
    })(args, api, extraOptions)*/

/* const res = result.error as errorResponse
 if (res.status === 401) {
 }*/
// handleClientError({ result, api })
// return result*/
