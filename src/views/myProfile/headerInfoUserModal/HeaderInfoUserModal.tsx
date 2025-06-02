"use client"

import styles from "./HeaderInfoUserModal.module.scss"
import { Modal } from "@/shared/ui/modal"
import { Button } from "@/shared/ui/button"
import { CloseIcon } from "@/shared/assets/icons/components/CloseIcon"
import { StaticImageData } from "next/image"
import Overlay from "@/shared/ui/overlay/Overlay"
import Following from "@/views/myProfile/following/Following"
import Followers from "@/views/myProfile/followers/Followers"

export type Follower = {
  id: string
  name: string
  follow: boolean
  img: StaticImageData
}
type Props = {
  type: string
  onClose: () => void
  isOpen: boolean
  dataButton: { nameButton: string; data: number }
}
const HeaderInfoUserModal = ({ type, onClose, isOpen, dataButton }: Props) => {
  const renderContent = () => {
    switch (type) {
      case "Following":
        return <Following />
      case "Followers":
        return <Followers />
      default:
        return null
    }
  }

  return (
    <>
      {isOpen && <Overlay />}
      <Modal active={isOpen} setActive={onClose} className={styles.modalHeaderInfoUser}>
        <div className={styles.containerModal}>
          <div className={styles.boxModalHead}>
            <h2>
              {dataButton.data} {dataButton.nameButton}
            </h2>
            <Button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                marginRight: "24px",
                cursor: "pointer",
                width: 0,
                color: "var(--color-light-100)",
              }}
            >
              <CloseIcon />
            </Button>
          </div>
          <div className={styles.boxModalBody}>{renderContent()}</div>
        </div>
      </Modal>
    </>
  )
}

export default HeaderInfoUserModal
