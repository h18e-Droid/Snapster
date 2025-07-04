import { RootState } from "@/app/store"
import { appActions } from "@/features/app/model/slice"
import { errorResponse } from "@/shared/types/types"
import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from "@reduxjs/toolkit/query"

type Props = {
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
  api: BaseQueryApi
}

const HandleClientError = ({ result, api }: Props) => {
  const res = result.error as errorResponse
  const state = api.getState() as RootState
  let error = null

  if (res) {
    error = res.data?.errorsMessages ? res.data.errorsMessages[0].message : null

    switch (res.status) {
      case "FETCH_ERROR":
      case "PARSING_ERROR":
      case "CUSTOM_ERROR":
        error = error ?? "Network error. Please check your connection and try again."
        break

      case 403:
        error = error ?? "Access denied. You do not have the required permissions."
        break
      case 404:
        error = error ?? "Resource not found. Please check the URL or try again later."
        break
      case 500:
        error = error ?? "Server error. Our team is working to fix this. Please try again later."
        break

      case 401:
        error = null
        break

      default:
        break
    }
    if (state.app.error || error) {
      api.dispatch(appActions.setError({ error }))
    }
  }

  if (!error && state.app.error) {
    api.dispatch(appActions.setDefaultStatus())
  }
}

export default HandleClientError
