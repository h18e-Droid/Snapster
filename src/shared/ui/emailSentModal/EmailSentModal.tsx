import { Modal } from "@/shared/ui/modal"
import { Button } from "@/shared/ui/button"
import styles from "./EmailSentModal.module.scss"
import { CloseIcon } from "@/shared/assets/icons/components/CloseIcon"

interface EmailSentModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

export const EmailSentModal = ({ isOpen, onClose, email }: EmailSentModalProps) => {
  return (
    <Modal active={isOpen} setActive={onClose} className={styles.modal}>
      <div className={styles.rootModal}>
        <div className={styles.titleContainer}>
          <h2>Email sent</h2>
          <Button className={styles.closeModal} onClick={onClose}>
            <CloseIcon />
          </Button>
        </div>
        <div>We have sent a link to confirm your email to {email}</div>
        <div className={styles.buttonBox}>
          <Button variant="primary" onClick={onClose}>
            OK
          </Button>
        </div>
      </div>
    </Modal>
  )
}
