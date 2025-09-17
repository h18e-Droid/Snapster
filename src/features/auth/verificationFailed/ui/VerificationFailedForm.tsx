import React, { useEffect } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import Input from "@/shared/ui/input/Input"
import { Button } from "@/shared/ui/button"
import { EmailInputs, emailSchema } from "../model/schemas/emailSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from "./VerificationFailedForm.module.scss"
import { useEmailResendMutation } from "../api/verificationFailedApi"
import { ErrorResponse } from "@/shared/types/types"

export const VerificationFailedForm = () => {
  const [emailResend, { isError, error }] = useEmailResendMutation()

  const messageError = isError ? (error as ErrorResponse).data?.errorsMessages[0].message : ""

  const {
    handleSubmit,
    watch,
    control,
    trigger,
    setError,
    formState: { errors, touchedFields, isValid },
  } = useForm<EmailInputs>({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(emailSchema),
  })

  const onSubmit: SubmitHandler<EmailInputs> = (data) => {
    emailResend({ email: data.email })
  }

  useEffect(() => {
    setError("email", {
      type: "manual",
      message: messageError,
    })
  }, [error])

  const { email } = watch()
  const isButtonDisabled = !email?.trim() || !isValid

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.boxBtnInput}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              label="Email"
              placeholder="enter email"
              errorText={errors.email?.message}
              onChange={(e) => {
                field.onChange(e)
                if (touchedFields.email) {
                  trigger("email")
                }
              }}
            />
          )}
        />
        <Button type="submit" disabled={isButtonDisabled} className={styles.buttonSend}>
          Resend verification link
        </Button>
      </div>
    </form>
  )
}
