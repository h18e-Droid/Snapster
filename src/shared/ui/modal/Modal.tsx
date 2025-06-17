import styles from "./Modal.module.scss"
import { ReactNode } from "react"

type Props = {
  active: boolean
  setActive: (val: boolean) => void
  title?: string
  children?: ReactNode
  className?: string
  contentClassName?: string
}

export const Modal = ({ active, setActive, title, children, className = "", contentClassName }: Props) => {
  const StyleCards = active ? `${styles.modal} ${styles.active} ${className}` : styles.modal
  // const StyleContent = active ? `${styles.modalContent} ${styles.active}` : styles.modalContent
  const StyleContent = active
    ? `${styles.modalContent} ${styles.active} ${contentClassName || ""}`
    : `${styles.modalContent} ${contentClassName || ""}`
  return (
    <div className={StyleCards} onClick={() => setActive(false)}>
      <div className={StyleContent} onClick={(event) => event.stopPropagation()}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </div>
  )
}
