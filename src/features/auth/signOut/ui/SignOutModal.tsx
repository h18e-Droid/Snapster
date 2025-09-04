"use client"
import React from "react"
import { Button } from "@/shared/ui/button"
import { Modal } from "@/shared/ui/modal"
import { appRoutes } from "@/shared/lib/routes"
import { useRouter } from "next/navigation"
import { useSignOutMutation } from "../api/signOutApi"
import styles from "./SignOutModal.module.scss"

type Props = {
  setShowSignOutModal: (_isModalOpen: boolean) => void
}

export const SignOutModal = ({ setShowSignOutModal }: Props) => {
  const [signOut] = useSignOutMutation()
  const router = useRouter()

  const logOut = async () => {
    try {
      await signOut(undefined).unwrap()
    } finally {
      //For dev, because there is no refresh token in the cookie
      router.push(appRoutes.public.signIn)
      setShowSignOutModal(false)
    }
  }
  const closeModal = () => setShowSignOutModal(false)

  return (
    <Modal title={"Log Out"} setActive={setShowSignOutModal} active={true}>
      <hr className={styles.line} />
      <p className={styles.moduleText}>Are you really want to log out of your account ___ email name ___?</p>
      <div className={styles.buttonContainerModule}>
        <Button variant={"primary"} onClick={logOut}>
          Yes
        </Button>
        <Button variant={"primary"} onClick={closeModal}>
          No
        </Button>
      </div>
    </Modal>
  )
}
