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

export type errorResponse = {
  status: number | string
  data: {
    errorsMessages: { field: string; message: string }[]
  } | null
}
