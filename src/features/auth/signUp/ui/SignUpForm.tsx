import React, { useCallback, useEffect } from "react"
import { Controller, SubmitHandler } from "react-hook-form"
import Link from "next/link"
import { appRoutes } from "@/shared/lib/routes"
import Input from "@/shared/ui/input/Input"
import { Checkbox } from "@/shared/ui/сheckBoxGroup"
import { Button } from "@/shared/ui/button"
import { useSignUpForm } from "../lib/useSignUpForm"
import { Inputs } from "@/features/auth/signUp/model/schemas/loginSchema"
import { useSignUpMutation } from "../api/signUpApi"
import { ErrorResponse } from "../lib/types"
import styles from "./SignUpForm.module.scss"

type props = {
  openModal: () => void
  setEmail: (email: string) => void
}

export const SignUpForm = ({ openModal, setEmail }: props) => {
  const [signUp, { isSuccess, error, isError }] = useSignUpMutation()
  const fieldErrors = isError ? (error as ErrorResponse).data.errorsMessages : []

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    trigger,
    clearErrors,
    isButtonDisabled,
  } = useSignUpForm(fieldErrors)

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
      const user = {
        userName: data.userName,
        email: data.email,
        password: data.password,
      }
      signUp(user)
      setEmail(user.email)
    },
    [signUp],
  )

  useEffect(() => {
    if (isSuccess) {
      openModal()
      clearErrors()
      reset()
    }
  }, [isSuccess])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>
          <div className={styles.boxInputs}>
            <Controller
              name="userName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Username"
                  placeholder="enter user name"
                  className={styles.input}
                  errorText={errors.userName?.message}
                  onChange={(e) => {
                    field.onChange(e)
                    clearErrors("userName")
                  }}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  label="Email"
                  placeholder="enter email"
                  className={styles.input}
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
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  label="Password"
                  placeholder="enter password"
                  className={styles.input}
                  errorText={errors.password?.message}
                  onKeyDown={(e) => e.key === " " && e.preventDefault()}
                  onChange={(e) => {
                    field.onChange(e)
                    if (touchedFields.password) {
                      trigger("password")
                    }
                  }}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className={styles.input}
                  type="password"
                  label="Password confirmation"
                  placeholder="enter password again"
                  errorText={errors.confirmPassword?.message}
                  onChange={(e) => {
                    field.onChange(e)
                    if (touchedFields.password) {
                      trigger("confirmPassword")
                    }
                  }}
                  onKeyDown={(e) => e.key === " " && e.preventDefault()}
                />
              )}
            />
          </div>
          <div className={styles.submissionBlock}>
            <div className={styles.signUpFooter}>
              <Controller
                name="agree"
                control={control}
                rules={{ required: "You must agree to continue" }}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.currentTarget.checked)}
                    label={
                      <span className={styles.spanInfo}>
                        I agree to the{" "}
                        <Link href={appRoutes.public.termsOfService} className={styles.linkInfo}>
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href={appRoutes.public.privacyPolicy} className={styles.linkInfo}>
                          Privacy Policy
                        </Link>
                      </span>
                    }
                  />
                )}
              />
              {errors.agree && <span className={styles.spanError}>{errors.agree.message}</span>}
              <Button type="submit" disabled={isButtonDisabled} className={styles.buttonSingUp}>
                Sign Up
              </Button>
            </div>
            <div className={styles.authSwitch}>
              <span className={styles.spanTextAboutAccount}>Do you have an account?</span>
              <Link href={appRoutes.public.signIn} className={styles.linkLarge}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
