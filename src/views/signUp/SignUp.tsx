"use client"

import styles from "./SignUp.module.scss"
import { Cards } from "@/shared/ui/cards/Cards"
import { GitHubComIcon } from "@/shared/assets/icons/components/GitHubComIcon"
import { GoogleComIcon } from "@/shared/assets/icons/components/GoogleComIcon"
import { Checkbox } from "@/shared/ui/сheckBoxGroup"
import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Controller, SubmitHandler } from "react-hook-form"
import { useCallback, useEffect, useState } from "react"
import Input from "@/shared/ui/input/Input"
import { Inputs } from "@/shared/lib/Schemas/loginSchema"
import { AuthIconButton } from "@/shared/ui/authIconButton/AuthIconButton"
import { useSignUpForm } from "@/features/auth/hooks/useSignUpForm"
import { appRoutes } from "@/shared/lib/routes"
import { setFieldErrors, signUp } from "@/features/auth/model/slice"
import { AppDispatch, RootState } from "@/app/store"
import { useDispatch, useSelector } from "react-redux"
import { SignUpSuccessModal } from "@/shared/ui/signUpSuccessModal/SignUpSuccessModal"
import { useModal } from "@/features/auth/hooks/useModal"

const SignUp = () => {
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal()
  const [email, setEmail] = useState<string>("")

  const status = useSelector<RootState, string>((state) => state.auth.status)
  const dispatch = useDispatch<AppDispatch>()

  const colorIcon = "var(--color-light-100)"

  console.log("render")

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    trigger,
    clearErrors,
    isButtonDisabled,
  } = useSignUpForm()

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
      const user = {
        userName: data.userName,
        email: data.email,
        password: data.password,
      }
      setEmail(data.email)
      dispatch(setFieldErrors([]))
      dispatch(signUp(user))
    },
    [dispatch],
  )

  useEffect(() => {
    if (status === "success") {
      openModal()
      reset()
    }
  }, [status, reset, openModal])

  return (
    <>
      <SignUpSuccessModal isOpen={isModalOpen} onClose={closeModal} email={email} />
      <div className={styles.singUpBox}>
        <Cards title={"Sign Up"}>
          <div className={styles.containerIcon}>
            <AuthIconButton icon={<GoogleComIcon size={36} />} />
            <AuthIconButton icon={<GitHubComIcon size={36} color={colorIcon} />} />
          </div>
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
        </Cards>
      </div>
    </>
  )
}

export default SignUp
