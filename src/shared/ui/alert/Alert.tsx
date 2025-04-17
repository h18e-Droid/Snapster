import styles from './Alert.module.css'
import { CSSProperties } from "react"
import { CloseIcon } from "@/shared/assets/icons/components/CloseIcon"

export type AlertProps = {
  size?: string;
  message: 'ErrorPhotoSize' | 'ErrorPhotoFormat' | 'ServerError' | 'SettingSaved'
}

export const Alert = ({ message, size}:AlertProps) => {
  const messages= {
    'SettingSaved':"Your settings are saved",
    'ServerError' :  "Error! Server is not available",
    'ErrorPhotoSize': "Error! Photo size must be less than 10 MB!",
    'ErrorPhotoFormat': 'Error! The format of the uploaded photo must be\nPNG and JPEG.'
}

  const isErrorMessage = message.toLowerCase().includes('error')

  const showCloseIcon = ['ServerError', 'SettingSaved'].includes(message);

  const alertStyle: CSSProperties = {
    width: size || '100%',
  }

  return (
    <div
      className={isErrorMessage? styles.error : styles.success}
      style={{ ...alertStyle }}
    >
        <span style={{ whiteSpace: 'pre-wrap' }}>{messages[message]}</span>
        {showCloseIcon && <CloseIcon/>}
    </div>
  )
}

