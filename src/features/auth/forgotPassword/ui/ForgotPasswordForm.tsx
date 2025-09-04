import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { appRoutes } from "@/shared/lib/routes"
import { Recaptcha } from "@/shared/ui/recaptcha/Recaptcha"
import { z } from "zod"
import { usePasswordRecoveryMutation } from "../api/forgotPasswordApi"
import { ErrorResponse } from "@/shared/types/types"
import { ForgotPasswordSchema } from "../model/schema"
import styles from "./ForgotPasswordForm.module.scss"

type FormData = z.infer<typeof ForgotPasswordSchema>

type Props = {
  setEmailValue: (email: string) => void
  setIsShowModal: (value: boolean) => void
}

export const ForgotPasswordForm = ({ setEmailValue, setIsShowModal }: Props) => {
  const [passwordRecovery, { isError, error, isSuccess }] = usePasswordRecoveryMutation()
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "", recaptcha: false },
  })

  const handleRecaptchaVerify = (token: string | null, verified: boolean) => {
    setRecaptchaToken(token)
    setValue("recaptcha", verified)
  }

  const emailValue = watch("email")

  const onSubmit = (data: FormData) => {
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA")
      return
    }
    passwordRecovery({ email: data.email, reCaptchaToken: recaptchaToken })
  }

  useEffect(() => {
    if (isSuccess) {
      setIsShowModal(true)
      setEmailValue(emailValue)
    }
  }, [isSuccess])

  const errorField = isError ? (error as ErrorResponse).data?.errorsMessages[0] : null

  useEffect(() => {
    if (isError && errorField) {
      setError("email", {
        type: "manual",
        message: errorField.message,
      })
    }
  }, [error])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={"Epam@epam.com"}
              type={"email"}
              label={"Email"}
              value={emailValue}
              errorText={errors.email?.message}
              onChange={(e) => {
                field.onChange(e)
                trigger("email")
              }}
            />
          )}
        />
        <p className={styles.formHint}>Enter your email address and we will send you further instructions</p>
        <Button
          variant={"primary"}
          type={"submit"}
          disabled={!watch("recaptcha") || !!errors.email || !watch("email") || isSubmitting}
        >
          Send Link
        </Button>
      </form>
      <div className={styles.linksContainer}>
        <Link href={appRoutes.public.signIn}>Back to Sign In</Link>
        <Recaptcha onVerify={handleRecaptchaVerify} action={"forgot_password"} />
      </div>
    </>
  )
}
