import styles from "./AlertLoadingPhoto.module.scss"
import { CSSProperties } from "react"

export type AlertProps = {
  size?: string
  message: "ErrorPhotoSize" | "ErrorPhotoFormat"
  classNameProps?: string
  onClickClose?: () => void
}

const AlertLoadingPhoto = ({ message, size, classNameProps }: AlertProps) => {
  const messages = {
    ErrorPhotoSize: "Error! Photo size must be less than 10 MB!",
    ErrorPhotoFormat: "Error! The format of the uploaded photo must be\nPNG and JPEG.",
  }

  const isErrorMessage = message.toLowerCase().includes("error")

  const alertStyle: CSSProperties = {
    width: size,
  }

  return (
    <div
      className={`${isErrorMessage ? styles.error : styles.success} ${classNameProps || ""}`}
      style={{ ...alertStyle }}
    >
      <span style={{ whiteSpace: "pre-wrap" }}>{messages[message]}</span>
    </div>
  )
}

export default AlertLoadingPhoto
