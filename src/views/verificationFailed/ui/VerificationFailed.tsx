"use client"
import { VerificationLinkIcon } from "@/shared/assets/icons/components/VerificationLinkIcon"
import styles from "./VerificationFailed.module.scss"
import { VerificationFailedForm } from "@/features/auth/verificationFailed"

export const VerificationFailed = () => {
  return (
    <div className={styles.container}>
      <div className={styles.boxText}>
        <h1>Email verification link expired</h1>
        <p>Looks like the verification link has expired. Not to worry, we can send the link again</p>
      </div>
      <VerificationFailedForm />
      <div className={styles.boxIcon}>
        <VerificationLinkIcon size={473} />
      </div>
    </div>
  )
}
