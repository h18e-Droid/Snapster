"use client"
import { Cards } from "@/shared/ui/cards/Cards"
import { GitHubComIcon } from "@/shared/assets/icons/components/GitHubComIcon"
import { GoogleComIcon } from "@/shared/assets/icons/components/GoogleComIcon"
import { useState } from "react"
import { AuthIconButton } from "@/shared/ui/authIconButton/AuthIconButton"
import { SignUpSuccessModal } from "@/shared/ui/signUpSuccessModal/SignUpSuccessModal"
import { useModal } from "@/features/auth/hooks/useModal"
import { SignUpForm } from "@/features/auth/signUp"
import styles from "./SignUp.module.scss"

export const SignUp = () => {
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal()
  const [email, setEmail] = useState<string>("")

  const colorIcon = "var(--color-light-100)"

  return (
    <>
      <SignUpSuccessModal isOpen={isModalOpen} onClose={closeModal} email={email} />
      <div className={styles.singUpBox}>
        <Cards title={"Sign Up"}>
          <div className={styles.containerIcon}>
            <AuthIconButton icon={<GoogleComIcon size={36} />} />
            <AuthIconButton icon={<GitHubComIcon size={36} color={colorIcon} />} />
          </div>
          <SignUpForm openModal={openModal} setEmail={(email: string) => setEmail(email)} />
        </Cards>
      </div>
    </>
  )
}
