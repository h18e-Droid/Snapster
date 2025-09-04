export type FieldError = {
  field: "userName" | "email" | "password" | "confirmPassword" | "agree" | `root.${string}` | "root"
  message: string
}

export type FieldErrors = FieldError[]

export type ErrorResponse = {
  data: {
    errorsMessages: FieldErrors
  }
}
