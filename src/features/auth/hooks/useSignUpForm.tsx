import { useForm } from "react-hook-form"
import { loginSchema, Inputs } from "@/shared/lib/Schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useMemo } from "react"

export const useSignUpForm = () => {
  const {
    watch,
    formState: { isValid, isDirty, errors, touchedFields },
    ...methods
  } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: {
      text: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
    resolver: zodResolver(loginSchema),
  });

  const watchedFields = watch(["text", "email", "password", "confirmPassword", "agree"])

  const isFormFilled = useMemo(() => {
    return watchedFields.every((field) => (typeof field === "string" ? field.trim() : field))
  }, [watchedFields])

  const checkUsernameExists = useCallback(async (username: string) => {
    //заглушка пока нет бэка
    const existingUsers = ["admin", "test", "user123"]

    return existingUsers.includes(username)
  }, [])

  const isButtonDisabled = !isValid || !isFormFilled || !isDirty

  return { ...methods, 
    watchedFields, isFormFilled,
    checkUsernameExists, isButtonDisabled, formState: {errors, touchedFields }, watch }
}
