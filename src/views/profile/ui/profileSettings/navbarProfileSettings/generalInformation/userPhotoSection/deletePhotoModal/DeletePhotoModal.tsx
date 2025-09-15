import { Modal } from "@/shared/ui/modal"
import styles from "./DeletePhotoModal.module.scss"
import { Button } from "@/shared/ui/button"
import { CloseIcon } from "@/shared/assets/icons/components/CloseIcon"
import React from "react"
import { profileActions } from "@/features/profile/model/profileReducer"
import { useAppDispatch } from "@/shared/lib/state/useAppDispatch"

type Props = {
  onClickButton: (id: string) => void
  onClose: () => void
  isOpen: boolean
  title: string
  id: string
}

const DeletePhotoModal = ({ title, onClose, isOpen }: Props) => {
  const dispatch = useAppDispatch()

  const deletePhoto = () => {
    dispatch(profileActions.delPhotoUser())
    onClose()
  }

  return (
    <Modal active={isOpen} setActive={onClose} className={styles.modalDeletePhoto}>
      <div className={styles.boxModalHead}>
        <h1>{title}</h1>
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
      <div className={styles.boxModalBody}>
        <p>Are you sure you want to delete the photo?</p>
        <div className={styles.boxModalButton}>
          <Button onClick={deletePhoto} variant={"outline"}>
            Yes
          </Button>
          <Button onClick={onClose} variant={"primary"}>
            No
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeletePhotoModal
