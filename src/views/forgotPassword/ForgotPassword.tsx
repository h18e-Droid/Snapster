"use client"

import React, { useState } from "react"
import { Cards } from "@/shared/ui/cards"
import styles from "./ForgotPassword.module.scss"
import { EmailSentModal } from "@/shared/ui/emailSentModal/EmailSentModal"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import { ForgotPasswordForm } from "@/features/auth/forgotPassword"

const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState<string>("")
  const [isShowModal, setIsShowModal] = useState<boolean>(false)

  const handleCloseModal = () => {
    setIsShowModal(false)
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={"6LfFQfsrAAAAAIQDB9yk4q_7UTDDTeT8UEKKR-fM"}>
      <div className={styles.root}>
        <Cards title={"Forgot Password"}>
          <ForgotPasswordForm
            setEmailValue={(email: string) => setEmailValue(email)}
            setIsShowModal={(value: boolean) => setIsShowModal(value)}
          />
        </Cards>
        <EmailSentModal isOpen={isShowModal} onClose={() => handleCloseModal()} email={emailValue} />
      </div>
    </GoogleReCaptchaProvider>
  )
}

export default ForgotPassword
