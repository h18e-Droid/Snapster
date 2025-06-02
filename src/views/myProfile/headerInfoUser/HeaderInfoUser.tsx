"use client"

import styles from "./HeaderInfoUser.module.scss"
import { Button } from "@/shared/ui/button"
import { DoneAllIcon } from "@/shared/assets/icons/components/DoneAllIcon"
import { useState } from "react"
import HeaderInfoUserModal from "@/views/myProfile/headerInfoUserModal/HeaderInfoUserModal"
import { useModal } from "@/features/auth/hooks/useModal"

type Props = {
  data: {
    userName: string
    following: number
    followers: number
    publications: number
  }
  auth: boolean
  verified: boolean

}

type ArrayButtonData = { nameButton: string; data: number }[]

type ModalType = string | null

const HeaderInfoUser = (props: Props) => {
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal()
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const arrayButtonData: ArrayButtonData = [
    { nameButton: "Following", data: props.data.following },
    { nameButton: "Followers", data: props.data.followers },
    { nameButton: "Publications", data: props.data.publications },
  ]

  const dataButton = arrayButtonData.find((el) => el.nameButton === activeModal)
  if (!props.auth) {
    return (
      <div className={styles.headerBox}>
        <span>{props.data.userName}</span>
      </div>
    )
  }
  return (
    <>
      <div className={styles.headerInfoUser}>
        <div className={styles.headerInfoUserSettings}>
          <div className={styles.nameUsersBox}>
            <span>URLProfile</span>
            {props.verified && <DoneAllIcon />}
          </div>
          <Button>Profile Settings</Button>
        </div>
        <div className={styles.headerInfoUserButtons}>
          {arrayButtonData.map((item, index) => {
            const onClickHandler = () => {
              if (item.nameButton === "Publications") {
                return
              }
              setActiveModal(item.nameButton)
              openModal()
            }
            return (
              <Button
                className={styles.headerInfoUserButton}
                style={{ padding: 0 }}
                key={index}
                onClick={onClickHandler}
              >
                <span>{item.data}</span>
                <span>{item.nameButton}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {activeModal && dataButton && (
        <HeaderInfoUserModal type={activeModal} dataButton={dataButton} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </>
  )
}

export default HeaderInfoUser
