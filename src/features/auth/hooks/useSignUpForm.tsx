import { useForm } from "react-hook-form"
import { loginSchema, Inputs } from "@/shared/lib/Schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/app/store"
import { FieldErrors } from "@/features/auth/lib/types/types"

export const useSignUpForm = () => {
  const fieldErrors = useSelector<RootState, FieldErrors>((state) => state.auth.fieldErrors)
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
