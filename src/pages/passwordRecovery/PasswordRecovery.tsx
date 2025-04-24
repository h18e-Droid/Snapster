"use client"

import React, { useState } from "react"
import Image from "next/image"
import styles from "./PasswordRecovery.module.scss"
import Rafiki from "@/public/rafiki.svg"
import { Button } from "@/shared/ui/button"
import { EmailSentModal } from "@/shared/ui/emailSentModal/EmailSentModal"

const PasswordRecovery = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleResendLink = async () => {
    setIsLoading(true)

    try {
      // 1. Mock запроса (временная заглушка)
      const response = await new Promise<{ ok: boolean }>((resolve) => {
        setTimeout(() => resolve({ ok: true }), 1000)
      })

      if (!response.ok) {
        throw new Error("Failed to resend verification link")
      }

      // 2. Запуск таймера (60 сек)
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) clearInterval(timer)
          return prev - 1
        })
      }, 1000)
      setIsModalOpen(true)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <h1 className={styles.title}>Email verification link expired</h1>
        <p className={styles.description}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <Button variant={"primary"} onClick={handleResendLink} disabled={isLoading || countdown > 0}>
          {isLoading ? "Sending..." : countdown > 0 ? `Resend in ${countdown}s` : "Resend link"}
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
