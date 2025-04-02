import {Dispatch} from "redux";
import {LoginArgs} from "@/features/auth/api/authApi.types";
import {authApi} from "@/features/auth/api/authApi";
import {setAppStatusAC} from "@/features/app/appReducer";
import {handleServerAppError} from "@/shared/lib/utils/handleServerAppError";
import {handleServerNetworkError} from "@/shared/lib/utils/handleSeverNetworkError";
import {ResultCode} from "@/shared/enums/enums";

type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
}

type ActionTypes = ReturnType<typeof setIsLoggedInAC>

export const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN": {
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
      }
    }
    default: {
      return state
    }
  }
}

const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}

export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("success"))
        dispatch(setIsLoggedInAC(true))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("success"))
        dispatch(setIsLoggedInAC(false))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}
