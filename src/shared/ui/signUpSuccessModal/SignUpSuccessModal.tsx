import styles from "@/shared/ui/signUpSuccessModal/SignUpSuccessModal.module.scss"
import { Button } from "@/shared/ui/button"
import { CloseIcon } from "@/shared/assets/icons/components/CloseIcon"
import { Modal } from "@/shared/ui/modal"

type Props = {
  isOpen: boolean
  onClose: () => void
  email: string
}

export const SignUpSuccessModal = ({
  isOpen,
  onClose,
  email,
}: Props) => {
  return (
    <Modal active={isOpen} setActive={onClose} className={styles.modalSignUp}>
      <div className={styles.containerModal}>
        <div className={styles.boxModalHead}>
          <h1>Email sent</h1>
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
          <p>We have sent a link to confirm your email to {email}</p>
          <div className={styles.boxModalButton}>
            <Button onClick={onClose} variant={"primary"} className={styles.buttonOK}>
              OK
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
