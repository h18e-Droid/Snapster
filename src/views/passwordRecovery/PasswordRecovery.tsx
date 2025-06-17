"use client"

import React, { useState } from "react"
import Image from "next/image"
import styles from "./PasswordRecovery.module.scss"
import Rafiki from "@/public/rafiki.svg"
import { Button } from "@/shared/ui/button"
import { EmailSentModal } from "@/shared/ui/emailSentModal/EmailSentModal"
import { appRoutes } from "@/shared/lib/routes"
import { useRouter } from "next/navigation"


const PasswordRecovery = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleResendLink = () => {
    router.push(appRoutes.public.forgotPassword)
  }

  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <h1 className={styles.title}>Email verification link expired</h1>
        <p className={styles.description}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <Button variant={"primary"} onClick={handleResendLink}>
          {"Resend link"}
        </Button>
      </div>
      <div className={styles.imageContainer}>
        <Image src={Rafiki} alt="Password recovery illustration" width={473} height={353} />
      </div>
      <EmailSentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} email={"epam@epam.com"} />
    </div>
  )
}

export default PasswordRecovery
