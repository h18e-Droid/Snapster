export type statusType = "idle" | "success" | "error" | "loading"

export type InitialState = {
  error: string | null
  success: string | null
  status: statusType
  initialized: boolean
  loadingCount: number
}
