import { Modal } from "@/shared/ui/modal"
import styles from "./LoadingPhotoModal.module.scss"
import { Button } from "@/shared/ui/button"
import { CloseIcon } from "@/shared/assets/icons/components/CloseIcon"
import React, { ChangeEvent, useRef, useState } from "react"
import Image from "next/image"
import { ImageOutlineIcon } from "@/shared/assets/icons/components/ImageOutlineIcon"
import { Alert } from "@/shared/ui/alert"
import { useAppDispatch } from "@/shared/lib/state/useAppDispatch"
import { profileActions } from "@/features/profile/model/profileReducer"

type Props = {
  onClickButton: (id: string) => void
  onClose: () => void
  isOpen: boolean
  title: string
  id: string
}

const LoadingPhotoModal = ({ title, onClose, isOpen }: Props) => {
  const [error, setError] = useState<"ErrorPhotoSize" | "ErrorPhotoFormat" | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const dispatch = useAppDispatch()

  const handleClick = () => {
    fileInputRef.current?.click()
  }
  const savePhoto = () => {
    if (image) {
      dispatch(profileActions.setPhotoUser(image))
      onClose()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null

    if (!file) return

    const validTypes = ["image/jpeg", "image/png"]
    if (!validTypes.includes(file.type)) {
      setError("ErrorPhotoFormat")
      return
    }

    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      setError("ErrorPhotoSize")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setImage(event.target.result)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <Modal active={isOpen} setActive={onClose} className={styles.modalLoadingPhoto}>
        <div className={styles.containerModal}>
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
          {image ? (
            <div className={styles.boxModalBodyImage}>
              <div className={styles.boxImage}>
                <Image src={image} alt={"photo user"} width={332} height={340} />
                <div className={styles.overlay}></div>
              </div>
              <div className={styles.boxModalButtonSave}>
                <Button onClick={savePhoto} variant={"primary"}>
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className={styles.boxModalBodyLoading}>
              {error && <Alert message={error} size={"445px"} classNameProps={styles.alertMessage} />}
              <div className={styles.containerLabelButton}>
                <label className={styles.uploadBox}>
                  <div
                    className={styles.avatar}
                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                  >
                    <ImageOutlineIcon size={48} />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </label>
                <div className={styles.boxModalButtonLoading}>
                  <Button onClick={handleClick} variant={"primary"}>
                    Select from Computer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default LoadingPhotoModal
