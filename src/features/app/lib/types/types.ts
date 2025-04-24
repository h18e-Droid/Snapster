export type statusType = "idle" | "success" | "fail" | "loading"

export type InitialState = {
  error: string | null
  status: statusType
}
