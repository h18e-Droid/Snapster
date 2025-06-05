"use client"

import React, { useEffect, useState } from "react"
import { Cards } from "@/shared/ui/cards"
import { Input } from "shared/ui/input"
import { Button } from "@/shared/ui/button"
import Link from "next/link"
import { Recaptcha } from "@/shared/ui/recaptcha/Recaptcha"
import styles from "./ForgotPassword.module.scss"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EmailSentModal } from "@/shared/ui/emailSentModal/EmailSentModal"
import { appRoutes } from "@/shared/lib/routes"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import { useAppDispatch } from "@/shared/lib/state/useAppDispatch"
import { forgotPassword } from "@/features/auth/model/slice"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"

const ForgotPasswordSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email address").trim(),
  recaptcha: z.boolean().refine((val) => val, {
    message: "Please verify you are not a robot",
  }),
})

type FormData = z.infer<typeof ForgotPasswordSchema>

const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "", recaptcha: false },
  })
  const dispatch = useAppDispatch()
  const error = useAppSelector((state) => state.auth.error)
  const emailRegistered = useAppSelector((state) => state.auth.emailRegistered)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [isHuman, setIsHuman] = useState(false)

  const emailValue = watch("email")
  const [isShowModal, setIsShowModal] = useState<boolean>(false)

  const handleRecaptchaVerify = (token: string | null, verified: boolean) => {
    setRecaptchaToken(token)
    setIsHuman(verified)
    setValue("recaptcha", verified)
  }

  const onSubmit = (data: FormData) => {
    if (!isHuman || !recaptchaToken) {
      alert("Please complete the reCAPTCHA")
      return
    }

    dispatch(forgotPassword({ email: data.email, reCaptchaToken: recaptchaToken }))
  }

  useEffect(() => {
    if (emailRegistered === "registered") {
      setIsShowModal(true)
    }
  }, [emailRegistered])

  const handleCloseModal = () => {
    setIsShowModal(false)
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={"6Lf88RsrAAAAACaYiEXM1UKDa6Gc3lTaiOCSHZW7"}>
      <div className={styles.root}>
        <Cards title={"Forgot Password"}>
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
                  errorText={errors.email?.message || error}
                  onChange={(e) => {
                    field.onChange(e)
                    trigger("email")
                  }}
                />
              )}
            />
            <p className={styles.formHint}>Enter your email address and we will send you further instructions</p>
            <Button variant={"primary"} type={"submit"} disabled={!watch("recaptcha") || isSubmitting}>
              Send Link
            </Button>
          </form>
          <div className={styles.linksContainer}>
            <Link href={appRoutes.public.signIn}>Back to Sign In</Link>
            <Recaptcha onVerify={handleRecaptchaVerify} action={"forgot_password"} />
          </div>
        </Cards>
        <EmailSentModal isOpen={isShowModal} onClose={() => handleCloseModal()} email={emailValue} />
      </div>
    </GoogleReCaptchaProvider>
  )
}

export default ForgotPassword
