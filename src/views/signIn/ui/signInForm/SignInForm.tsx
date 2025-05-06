"use client"
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
import { appRoutes } from "@/shared/lib/enums/routes"
import { useRouter } from "next/navigation"
import { FormValues } from "@/views/signIn/lib/types"

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
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const router = useRouter()

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
    if (isAuth) {
      reset()
      router.replace(appRoutes.home)
      return
    }
  }, [isAuth])

  return (
    <>
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
          <Link href={appRoutes.forgotPassword} passHref>
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
          <Button href={appRoutes.signUp} variant={"textButton"} className={styles.button}>
            Sign Up
          </Button>
        </div>
      </form>
    </>
  )
}
