import { FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from "@reduxjs/toolkit/query"

type Props = {
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
}
type token = { accessToken: string }

export const setToken = async ({ result }: Props) => {
  const res = result.data as token
  if (res) {
    try {
      localStorage.setItem("accessToken", res.accessToken)
      await fetch("/api/set-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: res.accessToken }),
      })
    } catch (err) {
      console.error("Login or token set failed:", err)
    }
  }
}
