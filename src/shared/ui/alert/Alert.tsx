import styles from "./Alert.module.css"
import { useEffect, useRef, useState } from "react"
import { CloseIcon } from "@/shared/assets/icons/components/CloseIcon"

export type AlertProps = {
  status: "success" | "error"
  duration?: number
  message: string | null
}

export const Alert = ({ message, duration = 17000, status }: AlertProps) => {
  const [visible, setVisible] = useState(!!message)
  const [hiding, setHiding] = useState(false)
  const alertRef = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    setHiding(true)
    setTimeout(() => {
      setVisible(false)
    }, 400)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth < 768 && alertRef.current && !alertRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!visible) return null

  return (
    <div
      ref={alertRef}
      className={`${status === "error" ? styles.error : styles.success} ${hiding ? styles.hide : ""}`}
    >
      <span style={{ whiteSpace: "pre-wrap" }}>{message}</span>
      <button className={styles.btn} onClick={() => handleClose()}>
        <CloseIcon />
      </button>
    </div>
  )
}
