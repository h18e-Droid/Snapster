import {setAppErrorAC, setAppStatusAC} from "@/features/app/appReducer";
import {Dispatch} from "redux";
import {BaseResponse} from "@/shared/types/types";


export const handleServerAppError = <T,>(data: BaseResponse<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    }else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}