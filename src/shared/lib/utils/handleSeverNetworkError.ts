import {setAppErrorAC, setAppStatusAC} from "@/features/app/appReducer";
import {Dispatch} from "redux";


export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}