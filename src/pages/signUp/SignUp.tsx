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
import { CloseIcon } from "@/shared/assets/icons/components/CloseIcon"
import Input from "@/shared/ui/input/Input"
import { Inputs } from "@/shared/lib/Schemas/loginSchema"
import { AuthIconButton } from "@/shared/ui/authIconButton/AuthIconButton"
import { useSignUpForm } from "@/features/auth/hooks/useSignUpForm"
import { Modal } from "@/shared/ui/modal"

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isModalOpen])

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    trigger,
    watch,
    setError,
    clearErrors,
    watchedFields,
    checkUsernameExists,
    isButtonDisabled,
  } = useSignUpForm()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    setIsModalOpen(true)
    reset()
  }

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <>
      {isModalOpen && (
        <Modal active={isModalOpen} setActive={setIsModalOpen} className={styles.modalSignUp}>
          <div className={styles.containerModal}>
            <div className={styles.boxModalHead}>
              <h1>Email sent</h1>
              <Button
                onClick={handleCloseModal}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  marginRight: "24px",
                  cursor: "pointer",
                  width: 0,
                }}
              >
                <CloseIcon />
              </Button>
            </div>
            <div className={styles.boxModalBody}>
              <p>We have sent a link to confirm your email to {watchedFields[1]}</p>
              <div className={styles.boxModalButton}>
                <Button onClick={handleCloseModal}>
                  OK
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div className={styles.singUpBox}>
        <Cards title={"Sign Up"}>
          <div className={styles.containerIcon}>
            <AuthIconButton icon={<GoogleComIcon size={36} />} />
            <AuthIconButton icon={<GitHubComIcon size={36} />} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.container}>
              <Controller
                name="text"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="User name"
                    placeholder="enter user name"
                    width="330px"
                    errorText={errors.text?.message}
                    onChange={(e) => {
                      field.onChange(e)
                      clearErrors("text")
                    }}
                    onBlur={async () => {
                      const value = field.value

                      const zodValid = await trigger("text")
                      if (!zodValid) return

                      const isTaken = await checkUsernameExists(value)
                      if (isTaken) {
                        setError("text", {
                          type: "manual",
                          message: "User with this username is already registered",
                        })
                      }
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
                    width="330px"
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
                    width="330px"
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
                    type="password"
                    label="Password confirmation"
                    placeholder="Enter password again"
                    width="330px"
                    errorText={errors.confirmPassword?.message}
                    onChange={(e) => {
                      field.onChange(e)
                    }}
                    onKeyDown={(e) => e.key === " " && e.preventDefault()}
                    onBlur={async () => {
                      const isValid = await trigger("confirmPassword")
                      if (!isValid) return
                      const passwordValue = watch("password")
                      const confirmPasswordValue = field.value
                      if (passwordValue !== confirmPasswordValue) {
                        setError("confirmPassword", {
                          type: "manual",
                          message: "The passwords must match",
                        })
                      }
                    }}
                  />
                )}
              />
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
                        <Link href="/termsOfService" className={styles.linkInfo}>
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacyPolicy" className={styles.linkInfo}>
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
              <span className={styles.spanTextAboutAccount}>Do you have an account?</span>
              <Link href="/signIn" className={styles.linkLarge}>
                Sign In
              </Link>
            </div>
          </form>
        </Cards>
      </div>
    </>
  )
}

export default SignUp
