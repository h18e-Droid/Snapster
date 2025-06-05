"use client"
import styles from "./HeaderInfoUserModal.module.scss"
import { Modal } from "@/shared/ui/modal"
import { Button } from "@/shared/ui/button"
import { CloseIcon } from "@/shared/assets/icons/components/CloseIcon"
import { StaticImageData } from "next/image"
import Overlay from "@/shared/ui/overlay/Overlay"
import { ReactNode } from "react"
import { useParams, useRouter } from "next/navigation"

export type Follower = {
  id: string
  name: string
  follow: boolean
  img: StaticImageData
}
type Props = {
  title: string
  count: number
  children: ReactNode
}
const HeaderInfoUserModal = ({ children, title, count }: Props) => {
  const params = useParams()
  const router = useRouter()
  const closeModal = () => router.replace(`/${params.userId}`, { scroll: false })

  return (
    <>
      <Overlay />
      <Modal active={true} setActive={closeModal} className={styles.modalHeaderInfoUser}>
        <div className={styles.containerModal}>
          <div className={styles.boxModalHead}>
            <h2>
              {count} {title}
            </h2>
            <Button
              onClick={closeModal}
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
          <div className={styles.boxModalBody}>{children}</div>
        </div>
      </Modal>
    </>
  )
}

export default HeaderInfoUserModal
