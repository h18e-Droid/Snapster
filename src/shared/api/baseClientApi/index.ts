import axios from "axios"
import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReAuth } from "./baseQueryWithReauth"

export const axiosInstance = axios.create({
  baseURL: "https://snap-ster.net",
  withCredentials: true,
})

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  tagTypes: ["me"],
})
