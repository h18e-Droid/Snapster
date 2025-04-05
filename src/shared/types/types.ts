
export type FieldError = {
    error: string
    field: string
}

export type BaseResponse<D = object> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: D
}