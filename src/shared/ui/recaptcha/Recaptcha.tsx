"use client"
import React, { useEffect, useState } from "react"
import styles from "./Recaptcha.module.scss"
import { RecaptchaLogoIcon } from "@/shared/assets/icons/components/RecaptchaLogoIcon"
import { CheckmarkOutlineIcon } from "@/shared/assets/icons/components/CheckmarkOutlineIcon"
import clsx from "clsx"
import Link from "next/link"
import { appRoutes } from "@/shared/lib/enums/routes"

export type RecaptchaStatus = "idle" | "verifying" | "success" | "expired" | "error"

interface RecaptchaProps {
  onVerify?: (isVerified: boolean) => void
}

export const Recaptcha = ({ onVerify }: RecaptchaProps) => {
  const [status, setStatus] = useState<RecaptchaStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const STATUS_TIMEOUTS = {
    verifying: 3200,
    success: 5000,
  }

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    if (status === "verifying") {
      timers.push(
        setTimeout(() => {
          setStatus("success")
          setErrorMessage("Verification expired. Please try again.")
          onVerify?.(true)
        }, STATUS_TIMEOUTS.verifying),
      )
    } else if (status === "success") {
      timers.push(
        setTimeout(() => {
          setStatus("idle")
          setErrorMessage("")
        }, STATUS_TIMEOUTS.success),
      )
    }

    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [status])

  const handleCheckboxChange = () => {
    if (status === "idle" || status === "expired" || status === "error") {
      setStatus("verifying")
      setErrorMessage("")
    }
  }

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
            <Link href={appRoutes.privacyPolicy}>FPrivacy</Link> - <Link href={appRoutes.termsOfService}>Terms</Link>
          </span>
        </div>
      </div>
      <div role="alert" className={styles.errorBox}>
        {status === "error" && <span className={styles.errorText}>{errorMessage}</span>}
      </div>
    </div>
  )
}
