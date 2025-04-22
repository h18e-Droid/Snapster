import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/shared/ui/button"
import styles from "./SignInForm.module.scss"
import { CustomInput } from "@/shared/ui/customInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"

type FormValues = {
  email: string
  password: string
}

const signInSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email address"),
  password: z.string().nonempty("Password is required"),
})

export const SignInForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  })

  //The email or password are incorrect. Try again please

  const onSubmit = (values: FormValues) => {
    console.log(values)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
      <Controller
        name={"email"}
        defaultValue={""}
        control={control}
        render={({ field }) => (
          <CustomInput
            {...field}
            errorText={errors?.email?.message}
            placeholder={"Your email"}
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
          <CustomInput
            {...field}
            errorText={errors?.password?.message}
            placeholder={"Your password"}
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
        <Button type="submit" variant={"primary"} className={styles.button}>
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
