"use client"

import styles from "./SignUp.module.scss"
import { Cards } from "@/shared/ui/cards/Cards"
import { GitHubComIcon } from "@/shared/assets/icons/components/GitHubComIcon"
import { GoogleComIcon } from "@/shared/assets/icons/components/GoogleComIcon"
import { Checkbox } from "@/shared/ui/сheckBoxGroup"
import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Modal } from "@/shared/ui/cards/Modal"
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react"
import { CloseIcon } from "@/shared/assets/icons/components/CloseIcon"
import CustomInput from "@/shared/ui/customInput/CustomInput"

type Inputs = {
  text: string
  email: string
  password: string
  confirmPassword: string
  agree: boolean
}

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    handleSubmit,
    control,
    watch,
    reset,
    trigger,
    formState: { errors, isValid, touchedFields },
  } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: {
      text: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  })
  const watchedFields = watch(["text", "email", "password", "confirmPassword", "agree"])

  const isFormFilled = useMemo(() => {
    return watchedFields.every((field) => (typeof field === "string" ? field.trim() : field))
  }, [watchedFields])

  const isButtonDisabled = !isValid || !isFormFilled

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    setIsModalOpen(true)
    reset()
  }

  const checkUsernameExists = useCallback(async (username: string) => {
    const existingUsers = ["admin", "test", "user123"]
    return existingUsers.includes(username)
  }, [])

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

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <>
      {isModalOpen && (
        <Modal active={isModalOpen} setActive={setIsModalOpen}>
          <div className={styles.containerModal}>
            <div className={styles.boxModalHead}>
              <h1>Email sent</h1>
              <Button
                width={"0px"}
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
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button width="96px" onClick={handleCloseModal}>
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
            <Button
              width={"0px"}
              onClick={() => {}}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                marginRight: "24px",
                cursor: "pointer",
                width: 0,
              }}
            >
              <GoogleComIcon size={36} />
            </Button>
            <Button
              width={"0px"}
              onClick={() => {}}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                marginRight: "24px",
                cursor: "pointer",
                width: 0,
              }}
            >
              <GitHubComIcon size={36} />
            </Button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.container}>
              <Controller
                name="text"
                control={control}
                rules={{
                  required: "Username is required",
                  maxLength: {
                    value: 30,
                    message: "Maximum number of characters is 30",
                  },
                  minLength: {
                    value: 6,
                    message: "Minimum number of characters is 6",
                  },
                  validate: async (value) => {
                    const isTaken = await checkUsernameExists(value)
                    return isTaken ? "User with this username is already registered" : true
                  },
                }}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    type="text"
                    label="User name"
                    placeholder="enter user name"
                    width="330px"
                    errorText={errors.text?.message}
                    onChange={(e) => {
                      field.onChange(e)
                      if (touchedFields.text) {
                        trigger("text")
                      }
                    }}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "The email must match the format example@example.com",
                  },
                }}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    type="email"
                    label="Email"
                    placeholder="enter email"
                    width="330px"
                    errorText={errors.email?.message}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      field.onChange(e.target.value)
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
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum number of characters is 6",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).+$/,
                    message:
                      "Password must contain a-z, A-Z,  ! \" # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~",
                  },
                }}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    type="password"
                    label="Password"
                    placeholder="enter password"
                    width="330px"
                    errorText={errors.password?.message}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      field.onChange(e.target.value)
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
                rules={{
                  required: "The passwords must match",
                  validate: (value) => value === watch("password") || "The passwords must match",
                }}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    type="password"
                    label="Password confirmation"
                    placeholder="enter password again"
                    width="330px"
                    errorText={errors.confirmPassword?.message}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      field.onChange(e.target.value)
                      if (touchedFields.confirmPassword) {
                        trigger("confirmPassword")
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
                      <span style={{ fontSize: "12px", lineHeight: "16px" }}>
                        I agree to the{" "}
                        <Link href="/termsOfService" style={{ color: "#1a73e8", textDecoration: "underline" }}>
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacyPolicy" style={{ color: "#1a73e8", textDecoration: "underline" }}>
                          Privacy Policy
                        </Link>
                      </span>
                    }
                  />
                )}
              />
              {errors.agree && <span style={{ color: "red", fontSize: "12px" }}>{errors.agree.message}</span>}

              <Button type="submit" width="330px" style={{ fontSize: "16px" }} disabled={isButtonDisabled}>
                Sign Up
              </Button>
              <span>Do you have an account?</span>
              <Link href="singIn" style={{ color: "#1a73e8", fontSize: "16px" }}>
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
