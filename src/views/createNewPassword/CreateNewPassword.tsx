"use client"
import React from "react"
import styles from "./CreateNewPassword.module.scss"
import { Cards } from "@/shared/ui/cards"
import { CreateNewPasswordForm } from "@/features/auth/createNewPassword"

const CreateNewPassword = ({ recoveryCode }: { recoveryCode: string }) => {
  return (
    <div className={styles.root}>
      <Cards title={"Create New Password"}>
        <CreateNewPasswordForm recoveryCode={recoveryCode} />
      </Cards>
    </div>
  )
}

export default CreateNewPassword
