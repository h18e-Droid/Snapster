import styles from "./UserPhotoSection.module.scss"
import Image from "next/image"
import { ImageOutlineIcon } from "@/shared/assets/icons/components/ImageOutlineIcon"
import { Button } from "@/shared/ui/button"
import React from "react"
import { useModal } from "@/features/auth/hooks/useModal"
import Overlay from "@/shared/ui/overlay/Overlay"
import LoadingPhotoModal from "@/views/profile/ui/profileSettings/navbarProfileSettings/generalInformation/userPhotoSection/loadingPhotoModal/LoadingPhotoModal"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"
import { CloseIcon } from "@/shared/assets/icons/components/CloseIcon"
import DeletePhotoModal from "@/views/profile/ui/profileSettings/navbarProfileSettings/generalInformation/userPhotoSection/deletePhotoModal/DeletePhotoModal"
import { useGetProfileQuery } from "@/features/profile/api/profileApi"

const UserPhotoSection = () => {
  const { isOpen: isAddOpen, open: openAddModal, close: closeAddModal } = useModal()
  const { isOpen: isDeleteOpen, open: openDeleteModal, close: closeDeleteModal } = useModal()
  const currentUserId = useAppSelector((state) => state.user.userId)

  const { data: profile } = useGetProfileQuery(currentUserId!, {
    skip: !currentUserId,
  })


  return (
    <div className={styles.boxPhoto}>
      <div className={styles.avatarWrapper}>
        {profile?.avatarUrl ? (
          <div className={styles.avatarWrapper}>
            <button className={styles.buttonDelPhoto} type={"button"} onClick={openDeleteModal}>
              <CloseIcon className={styles.closeIcon} />
            </button>
            <Image src={profile.avatarUrl} alt={"User Avatar"} width={192} height={192} className={styles.avatar} />
          </div>
        ) : (
          <div className={styles.avatar} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ImageOutlineIcon size={48} />
          </div>
        )}
      </div>
      <Button type={"button"} variant={"outline"} className={styles.addPhotoButton} onClick={openAddModal}>
        Add a Profile Photo
      </Button>
      {isAddOpen && (
        <>
          <Overlay />
          <LoadingPhotoModal
            onClose={closeAddModal}
            isOpen={isAddOpen}
            id={""}
            onClickButton={() => {}}
            title={"Add a Profile Photo"}
          />
        </>
      )}
      {isDeleteOpen && (
        <>
          <Overlay />
          <DeletePhotoModal
            onClickButton={() => {}}
            onClose={closeDeleteModal}
            isOpen={isDeleteOpen}
            title={"Delete Photo"}
            id={""}
          />
        </>
      )}
    </div>
  )
}

export default React.memo(UserPhotoSection)
