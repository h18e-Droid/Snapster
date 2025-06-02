import styles from "./FollowModal.module.scss"
import { Button } from "@/shared/ui/button"
import { CloseIcon } from "@/shared/assets/icons/components/CloseIcon"
import { Modal } from "@/shared/ui/modal"

type Props = {
  onClickButton: (id: string) => void
  onClose: () => void
  isOpen: boolean
  textFollowers: string
  title: string
  id: string
}

const FollowModal = ({title, textFollowers, onClickButton, onClose, isOpen, id}: Props) => {


  return (
    <Modal active={isOpen} setActive={onClose} className={styles.modalFollowers}>
      <div className={styles.containerModal}>
        <div className={styles.boxModalHead}>
          <h2>{title}</h2>
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
          <p>Do you really want to {textFollowers}</p>
          <div className={styles.boxModalButton}>
            <Button onClick={() => onClickButton(id)} variant={"outline"}>
              Yes
            </Button>
            <Button onClick={onClose} variant={"primary"}>
              No
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default FollowModal;