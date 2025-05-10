"use client"

import styles from "@/views/signUp/verificationLink/VerificationLink.module.scss"
import { Button } from "@/shared/ui/button"
import { VerificationLinkIcon } from "@/shared/assets/icons/components/VerificationLinkIcon"
import Input from "@/shared/ui/input/Input"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EmailInputs, emailSchema } from "@/shared/lib/Schemas/emailSchema"
import { authActions, verificationEmail } from "@/features/auth/model/slice"
import { AppDispatch, RootState } from "@/app/store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

const VerificationLink = () => {
  const dispatch = useDispatch<AppDispatch>()
  const messageError = useSelector<RootState, string>((state) => state.auth.error)
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
    dispatch(verificationEmail({ email: data.email }))
    dispatch(authActions.setError({ error: "" }))
  }

  useEffect(() => {
    setError("email", {
      type: "manual",
      message: messageError,
    })
  }, [messageError, dispatch])

  const { email } = watch()
  const isButtonDisabled = !email?.trim() || !isValid

  return (
    <div className={styles.container}>
      <div className={styles.boxText}>
        <h1>Email verification link expired</h1>
        <p>Looks like the verification link has expired. Not to worry, we can send the link again</p>
      </div>
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
      <div className={styles.boxIcon}>
        <VerificationLinkIcon size={473} />
      </div>
    </div>
  )
}
export default VerificationLink
