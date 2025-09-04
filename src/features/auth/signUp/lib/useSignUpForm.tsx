import { useForm } from "react-hook-form"
import { Inputs, loginSchema } from "@/features/auth/signUp/model/schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo } from "react"
import { FieldErrors } from "./types"

export const useSignUpForm = (fieldErrors: FieldErrors) => {
  const {
    watch,
    formState: { isValid, isDirty, errors, touchedFields },
    setError,
    ...methods
  } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (fieldErrors.length > 0) {
      fieldErrors.forEach((el) => {
        setError(el.field, {
          type: "manual",
          message: el.message,
        })
      })
    }
  }, [fieldErrors, setError])

  const watchedFields = watch(["userName", "email", "password", "confirmPassword", "agree"])

  const isFormFilled = useMemo(() => {
    return watchedFields.every((field) => (typeof field === "string" ? field.trim() : field))
  }, [watchedFields])

  const isButtonDisabled = !isValid || !isFormFilled || !isDirty

  return {
    ...methods,
    isFormFilled,
    isButtonDisabled,
    setError,
    formState: { errors, touchedFields },
    watch,
  }
}
