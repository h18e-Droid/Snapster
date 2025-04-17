"use client"

import React, { useEffect, useState } from "react"
import styles from "./Recaptcha.module.scss"
import { RecaptchaLogoIcon } from "@/shared/assets/icons/components/RecaptchaLogoIcon"
import { CheckmarkOutlineIcon } from "@/shared/assets/icons/components/CheckmarkOutlineIcon"
import clsx from "clsx"
import Link from "next/link";

const RECAPTCHA_EXPIRATION_TIME = 3200

type RecaptchaStatus = "idle" | "verifying" | "success" | "expired" | "error"

export const Recaptcha = () => {
  const [status, setStatus] = useState<RecaptchaStatus>("idle")
  const [error, setError] = useState("")

  const containerClass = clsx(styles.container, status === "error" && styles.error)

  useEffect(() => {
    // весь код который здесь написан только для теста его можно смело удалить
    // как и сам коммент после подключения RTK
    let timer: NodeJS.Timeout
    if (status === "verifying") {
      timer = setTimeout(() => {
        setStatus("success")
        setError("Verification expired. Check the checkbox again.")
      }, RECAPTCHA_EXPIRATION_TIME)
    }
    return () => clearTimeout(timer)
  }, [status])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked

    if (isChecked) {
      setStatus("verifying")
      setError("")
    } else {
      setStatus("idle")
    }
  }

  const isVerifying = status === "verifying"
  const isSuccess = status === "success"
  const isExpired = status === "expired"
  const isError = status === "error"

  return (
    <div className={containerClass} aria-live="polite">
      <div className={styles.captchaBox}>
        <div className={styles.checkboxSection}>
          <span className={styles.expired}>{error}</span>
          <label className={styles.labelBox}>
            {status === "idle" && (
              <input
                type="checkbox"
                className={styles.checkbox}
                onChange={handleCheckboxChange}
                checked={status !== "idle"}
                aria-description="recaptcha-description"
              />
            )}
            {isSuccess ? (
              <CheckmarkOutlineIcon size={24} color={"#19983BE6"} />
            ) : (
              isVerifying && <div className={styles.preloader} aria-hidden="true"></div>
            )}
            I&#39;m not a robot
          </label>
        </div>
        <div className={styles.recaptchaSection}>
          <RecaptchaLogoIcon size={50} />
          <span id="recaptcha-description" className={styles.recaptchaDescription}>
            <Link href="/privacyPolicy">Privacy</Link> - <Link href="/termsOfService">Terms</Link>
          </span>
        </div>
      </div>
      <div className={styles.errorBox}>{isError && !isExpired && <span className={styles.errorText}>{error}</span>}</div>
    </div>
  )
}
