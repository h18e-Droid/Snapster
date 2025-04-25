import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/shared/ui/button"
import styles from "./SignInForm.module.scss"
import Link from "next/link"
import { useAppDispatch } from "@/shared/lib/state/useAppDispatch"
import { authActions, authThunks } from "@/features/auth"
import { useFormConfig } from "@/views/signIn/model/schema"
import { Input } from "@/shared/ui/input"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"

type FormValues = {
  email: string
  password: string
}

export const SignInForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    resetField,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>(useFormConfig)
  const dispatch = useAppDispatch()
  const error = useAppSelector((state) => state.auth.error)
  const status = useAppSelector((state) => state.auth.status)

  const onSubmit = (values: FormValues) => {
    dispatch(authThunks.signIn(values))
    resetField("password")
  }

  const resetError = () => {
    if (error.trim() !== "") {
      dispatch(authActions.setError({ error: "" }))
    }
  }

  useEffect(() => {
    if (status === "success") {
      reset()
    }
  }, [status])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
      <Controller
        name={"email"}
        defaultValue={""}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            onChange={(e) => {
              clearErrors("email")
              field.onChange(e)
            }}
            errorText={errors?.email?.message}
            placeholder={"example@example.com"}
            type={"email"}
            label={"email"}
          />
        )}
      />
      <Controller
        name={"password"}
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <Input
            {...field}
            onChange={(e) => {
              clearErrors("password")
              field.onChange(e)
              resetError()
            }}
            errorText={error ? error : errors?.password?.message}
            placeholder={"Password"}
            type={"password"}
            label={"password"}
          />
        )}
      />
      <div className={styles.forgotPassword}>
        <Link href={"/forgotPassword"} passHref>
          <span>Forgot Password</span>
        </Link>
      </div>

      <div className={styles.buttonsWrapper}>
        <Button
          type="submit"
          variant={"primary"}
          disabled={!!errors.email?.message || !!errors.password?.message}
          className={styles.button}
        >
          Sign In
        </Button>
        <span>Don’t have an account?</span>
        <Link href={"/signUp"} passHref>
          <Button variant={"textButton"} className={styles.button}>
            Sign Up
          </Button>
        </Link>
      </div>
    </form>
  )
}
