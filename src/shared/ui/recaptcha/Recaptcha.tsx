"use client"
import React, { useEffect, useState } from "react"
import styles from "./Recaptcha.module.scss"
import { RecaptchaLogoIcon } from "@/shared/assets/icons/components/RecaptchaLogoIcon"
import { CheckmarkOutlineIcon } from "@/shared/assets/icons/components/CheckmarkOutlineIcon"
import clsx from "clsx"
import Link from "next/link"
import { appRoutes } from "@/shared/lib/routes"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

export type RecaptchaStatus = "idle" | "verifying" | "success" | "expired" | "error"

interface RecaptchaProps {
  onVerify: (token: string | null, isHuman: boolean) => void
  action?: string
}

export const Recaptcha = ({ onVerify, action = "form_submit" }: RecaptchaProps) => {
  const [status, setStatus] = useState<RecaptchaStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleVerify = async () => {
    if (!executeRecaptcha) {
      setStatus("error")
      setErrorMessage("Recaptcha not loaded")
      onVerify(null, false)
      return
    }
    setStatus("verifying")
    setErrorMessage("")

    try {
      const token = await executeRecaptcha(action)
      setStatus("success")
      onVerify(token, true)
    } catch (error) {
      setStatus("error")
      setErrorMessage("Verification failed. Please try again")
      onVerify(null, false)
      console.log(error)
    }
  }

  const resetRecaptcha = () => {
    setStatus("idle")
    setErrorMessage("")
  }

  const handleCheckboxChange = () => {
    if (status === "idle" || status === "expired" || status === "error") {
      handleVerify()
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      resetRecaptcha()
    }, 10000)

    return () => {
      clearTimeout(timer)
    }
  }, [status])

  const shouldShowCheckbox = status === "idle" || status === "expired" || status === "error"
  const isVerifying = status === "verifying"
  const isSuccess = status === "success"

  return (
    <div
      className={clsx(styles.container, {
        [styles.error]: status === "error",
        [styles.verifying]: isVerifying,
        [styles.success]: isSuccess,
      })}
      aria-live="polite"
    >
      <div className={styles.captchaBox}>
        <div className={styles.checkboxSection}>
          {status === "expired" && <span className={styles.expired}>{errorMessage}</span>}

          <label className={styles.labelBox}>
            {shouldShowCheckbox ? (
              <input
                type="checkbox"
                className={styles.checkbox}
                onChange={handleCheckboxChange}
                checked={!shouldShowCheckbox}
                aria-describedby="recaptcha-description"
                aria-invalid={status === "error"}
              />
            ) : isSuccess ? (
              <CheckmarkOutlineIcon size={24} color="#19983BE6" aria-label="Verified" />
            ) : (
              <div className={styles.preloader} aria-hidden="true" role="progressbar" data-testid="preloader" />
            )}
            I&#39;m not a robot
          </label>
        </div>

        <div className={styles.recaptchaSection}>
          <RecaptchaLogoIcon size={50} aria-hidden="true" />
          <span id="recaptcha-description" className={styles.recaptchaDescription}>
            <Link href={appRoutes.public.privacyPolicy}>Privacy</Link> -{" "}
            <Link href={appRoutes.public.termsOfService}>Terms</Link>
          </span>
        </div>
      </div>
      <div role="alert" className={styles.errorBox}>
        {status === "error" && <span className={styles.errorText}>{errorMessage}</span>}
      </div>
    </div>
  )
}
