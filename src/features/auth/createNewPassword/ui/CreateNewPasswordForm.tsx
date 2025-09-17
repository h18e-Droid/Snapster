import React, { ChangeEvent, useEffect } from "react"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { appRoutes } from "@/shared/lib/routes"
import { z } from "zod"
import { CreateNewPasswordSchema } from "../model/schema"
import { useNewPasswordMutation } from "../api/createNewPasswordApi"
import styles from "./CreateNewPasswordForm.module.scss"

type FormData = z.infer<typeof CreateNewPasswordSchema>

export const CreateNewPasswordForm = ({ recoveryCode }: { recoveryCode: string }) => {
  const [newPassword, { isError, isSuccess }] = useNewPasswordMutation()
  const router = useRouter()

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

  const passwordValue = watch("password")
  const passwordConfirmValue = watch("passwordConfirm")

  const onSubmit = async (data: FormData) => {
    newPassword({ newPassword: data.password, recoveryCode: recoveryCode })
  }

  useEffect(() => {
    if (isSuccess) {
      router.push(appRoutes.public.signIn)
    } else if (isError) {
      router.push(appRoutes.public.passwordRecovery)
    }
  }, [isError, isSuccess])

  return (
    <>
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
    </>
  )
}
