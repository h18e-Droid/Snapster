"use client"

import React, { ChangeEvent } from "react"
import { Cards } from "@/shared/ui/cards"
import { CustomInput } from "@/shared/ui/customInput"
import { Button } from "@/shared/ui/button"
import Link from "next/link"
import { Recaptcha } from "@/shared/ui/recaptcha/Recaptcha"
import styles from "./ForgotPassword.module.scss"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  recaptcha: z.boolean().refine((val) => val, {
    message: "Please verify you are not a robot",
  }),
})

type FormData = z.infer<typeof ForgotPasswordSchema>

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "", recaptcha: false },
  })

  const emailValue = watch("email")

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
  }

  return (
    <div className={styles.root}>
      <Cards title={"ForgotPassword"}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <CustomInput
            {...register("email")}
            placeholder={"Epam@epam.com"}
            type={"email"}
            label={"Email"}
            value={emailValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue("email", e.target.value)}
            errorText={errors.email?.message}
          />
          <p className={styles.formHint}>Enter your email address and we will send you further instructions</p>
          <Button variant={"primary"} type={"submit"} disabled={isSubmitting}>
            Send Link
          </Button>
        </form>
        <div className={styles.linksContainer}>
          <Link href="/singIn">Back to Sign In</Link>
          <Recaptcha onVerify={(isVerified) => setValue("recaptcha", isVerified)} />
        </div>
      </Cards>
    </div>
  )
}

export default ForgotPassword
