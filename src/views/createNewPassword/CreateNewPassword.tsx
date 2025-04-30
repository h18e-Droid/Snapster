"use client"
import React, { ChangeEvent } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from "./CreateNewPassword.module.scss"
import { Cards } from "@/shared/ui/cards"
import { Input } from "shared/ui/input"
import { Button } from "@/shared/ui/button"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { appRoutes } from "@/shared/lib/enums/routes"

const CreateNewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be no more than 20 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[!@#$%^&*()\-,.?":{}|<>]/, "Must contain at least one special character (!@#$ etc.)"),
    passwordConfirm: z
      .string()
      .min(6, "Password confirmation must be at least 6 characters")
      .max(20, "Password confirmation must be no more than 20 characters"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  })

type FormData = z.infer<typeof CreateNewPasswordSchema>

const CreateNewPassword = () => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(CreateNewPasswordSchema),
    defaultValues: { password: "", passwordConfirm: "" },
  })
  const router = useRouter()
  const passwordValue = watch("password")
  const passwordConfirmValue = watch("passwordConfirm")

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Form data:", data)
      // Перенаправление с push (добавляет в историю)
      router.push(appRoutes.signIn)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className={styles.root}>
      <Cards title={"Create New Password"}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <Input
            {...register("password")}
            placeholder={"New Password"}
            type={"password"}
            label={"New password"}
            value={passwordValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue("password", e.target.value)}
            errorText={errors.password?.message}
          />
          <Input
            {...register("passwordConfirm")}
            placeholder={"Password Confirmation"}
            type={"password"}
            label={"Password confirmation"}
            value={passwordConfirmValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue("passwordConfirm", e.target.value)}
            errorText={errors.passwordConfirm?.message}
          />
          <p className={styles.formHint}>
            Password must be 6-20 characters, contain: uppercase letter (A-Z), number (0-9), and special character
            (!@#$%^&* etc.)
          </p>
          <Button variant={"primary"} type={"submit"} disabled={isSubmitting}>
            Create new password
          </Button>
        </form>
      </Cards>
    </div>
  )
}

export default CreateNewPassword
