"use client"

import styles from "@/pages/signUp/verificationLink/VerificationLink.module.scss"
import { Button } from "@/shared/ui/button"
import { VerificationLinkIcon } from "@/shared/assets/icons/components/VerificationLinkIcon"
import CustomInput from "@/shared/ui/customInput/CustomInput"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

type Input = {
  email: string
}

export const VerificationLink = () => {
  const {
    handleSubmit,
    watch,
    control,
    trigger,
    formState: { errors, touchedFields },
  } = useForm<Input>({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  })
  const onSubmit: SubmitHandler<Input> = (data) => {
    console.log(data)
  }

  const { email } = watch()

  const isFormFilled = email?.trim()

  const isButtonDisabled = !isFormFilled

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
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "The email must match the format example@example.com",
              },
            }}
            render={({ field }) => (
              <CustomInput
                {...field}
                type="email"
                label="Email"
                placeholder="enter email"
                width="229px"
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
          <Button type="submit" width={"229px"} onClick={() => {}} disabled={isButtonDisabled}>
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
