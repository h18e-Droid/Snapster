import styles from "./Alert.module.scss"
import { CSSProperties } from "react"
import { CloseIcon } from "@/shared/assets/icons/components/CloseIcon"
import { Button } from "../button/Button"

export type AlertProps = {
  size?: string
  message: "ErrorPhotoSize" | "ErrorPhotoFormat" | "ServerError" | "SettingSaved"
  classNameProps?: string
  onClickClose?: () => void
}

export const Alert = ({ message, size, classNameProps, onClickClose }: AlertProps) => {
  const messages = {
    SettingSaved: "Your settings are saved",
    ServerError: "Error! Server is not available",
    ErrorPhotoSize: "Error! Photo size must be less than 10 MB!",
    ErrorPhotoFormat: "Error! The format of the uploaded photo must be\nPNG and JPEG.",
  }

  const isErrorMessage = message.toLowerCase().includes("error")

  const showCloseIcon = ["ServerError", "SettingSaved"].includes(message)

  const alertStyle: CSSProperties = {
    width: size,
  }

  return (
    <div
      className={`${isErrorMessage ? styles.error : styles.success} ${classNameProps || ""}`}
      style={{ ...alertStyle }}
    >
      <span style={{ whiteSpace: "pre-wrap" }}>{messages[message]}</span>
      {showCloseIcon && (
        <Button type={"button"} onClick={onClickClose} className={styles.closeButton}>
          <CloseIcon />
        </Button>
      )}
    </div>
  )
}
