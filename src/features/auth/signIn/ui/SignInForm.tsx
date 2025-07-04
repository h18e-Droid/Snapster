"use client"
import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/shared/ui/button"
import styles from "./SignInForm.module.scss"
import Link from "next/link"
import { useFormConfig } from "@/views/signIn/model/schema"
import { Input } from "@/shared/ui/input"
import { appRoutes } from "@/shared/lib/routes"
import { useRouter, useSearchParams } from "next/navigation"
import { FormValues } from "@/views/signIn/lib/types"
import { useSignInMutation } from "../api/signInApi"
import { errorResponse } from "@/shared/types/types"

export const SignInForm = () => {
  const form = useForm<FormValues>(useFormConfig)
  const [signIn, { isSuccess, isError, error }] = useSignInMutation()
  const router = useRouter()
  const params = useSearchParams()

  const onSubmit = (values: FormValues) => {
    signIn(values)
  }

  const clearError = (field: "password" | "email") => {
    if (form.formState.errors[`${field}`]) {
      form.clearErrors(field)
    }
  }

  useEffect(() => {
    const err = error as errorResponse
    if (err?.status === 401) {
      form.setError("password", {
        type: "manual",
        message: err?.data?.errorsMessages[0].message,
      })
    }
  }, [isError])

  useEffect(() => {
    if (isSuccess) {
      const callbackUrl = params.get("callbackUrl") || appRoutes.home
      router.replace(callbackUrl)
      router.refresh()
      return
    }
  }, [isSuccess])

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.formWrapper}>
        <Controller
          name={"email"}
          defaultValue={""}
          control={form.control}
          render={({ field }) => (
            <Input
              {...field}
              onChange={(e) => {
                clearError("email")
                field.onChange(e)
              }}
              errorText={form.formState.errors?.email?.message}
              placeholder={"example@example.com"}
              type={"email"}
              label={"email"}
            />
          )}
        />
        <Controller
          name={"password"}
          control={form.control}
          defaultValue={""}
          render={({ field }) => (
            <Input
              {...field}
              onChange={(e) => {
                clearError("password")
                field.onChange(e)
              }}
              errorText={form.formState.errors?.password?.message}
              placeholder={"Password"}
              type={"password"}
              label={"password"}
            />
          )}
        />
        <div className={styles.forgotPassword}>
          <Link href={appRoutes.public.forgotPassword} passHref>
            <span>Forgot Password</span>
          </Link>
        </div>

        <div className={styles.buttonsWrapper}>
          <Button
            type="submit"
            variant={"primary"}
            disabled={!!form.formState.errors.email?.message || !!form.formState.errors.password?.message}
            className={styles.button}
          >
            Sign In
          </Button>
          <span>Don’t have an account?</span>
          <Button href={appRoutes.public.signUp} variant={"textButton"} className={styles.button}>
            Sign Up
          </Button>
        </div>
      </form>
    </>
  )
}
