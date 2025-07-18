"use client"
import React, { useEffect } from "react"
import styles from "@/widgets/navbar/ui/Navbar.module.scss"
import { Button } from "@/shared/ui/button"
import { Modal } from "@/shared/ui/modal"
import { appRoutes } from "@/shared/lib/routes"
import { useRouter } from "next/navigation"
import { useSignOutMutation } from "../api/signOutApi"

type Props = {
  setShowSignOutModal: (_isModalOpen: boolean) => void
}

export const SignOutModal = ({ setShowSignOutModal }: Props) => {
  const [signOut, { isSuccess }] = useSignOutMutation()
  const router = useRouter()

  const logOutModal = async () => {
    signOut({})
    setShowSignOutModal(false)
  }

  useEffect(() => {
    if (isSuccess) {
      router.push(appRoutes.public.signIn)
    }
  }, [isSuccess])

  const closeModal = () => setShowSignOutModal(false)

  return (
    <Modal title={"Log Out"} setActive={setShowSignOutModal} active={true}>
      <hr className={styles.line} />
      <p className={styles.moduleText}>Are you really want to log out of your account ___ email name ___?</p>
      <div className={styles.buttonContainerModule}>
        <Button variant={"primary"} onClick={logOutModal}>
          Yes
        </Button>
        <Button variant={"primary"} onClick={closeModal}>
          No
        </Button>
      </div>
    </Modal>
  )
}
