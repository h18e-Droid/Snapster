"use client"

import styles from "./Following.module.scss"
import Input from "@/shared/ui/input/Input"
import Image from "next/image"
import { Button } from "@/shared/ui/button"
import { userActions } from "@/entities/user"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/store"
import { useModal } from "@/features/auth/hooks/useModal"
import Overlay from "@/shared/ui/overlay/Overlay"
import { ChangeEvent, useState } from "react"
import { Follower } from "../headerInfoUserModal/HeaderInfoUserModal"
import FollowModal from "@/views/profile/ui/followModal/FollowModal"

const Following = () => {
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal()
  const [idPost, setIdPost] = useState<string>("")
  const [valueSearch, setValueSearch] = useState<string>("")

  const followersList = useSelector<RootState, Follower[]>((state) => state.user.followersList)
  const dispatch = useDispatch<AppDispatch>()

  const isOpenModalConfirm = (id: string) => {
    setIdPost(id)
    openModal()
  }

  const toggleFollow = (id: string) => {
    const userFollower = followersList.find((item) => item.id === id)
    if (userFollower) {
      dispatch(userActions.toggleFollow({ id, follow: !userFollower.follow }))
    }
    closeModal()
  }

  const inChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.currentTarget.value)
  }

  const filteredFollowers = followersList.filter((user) => user.name.toLowerCase().includes(valueSearch.toLowerCase()))

  return (
    <div className={styles.profileBox}>
      <Input
        type={"search"}
        placeholder={"search"}
        onChange={inChangeSearch}
        value={valueSearch}
        className={styles.inputSearch}
      />
      {(valueSearch.length > 0 ? filteredFollowers : followersList).map((item) => {
        return (
          <div className={styles.profileActionBox} key={item.id}>
            <div className={styles.userInfo}>
              <Image src={item.img} alt={"photo user"} width={36} height={36} className={styles.img} />
              <span>{item.name}</span>
            </div>
            <div className={styles.actionButtons}>
              <Button
                variant={item.follow ? "primary" : "outline"}
                onClick={() => {
                  isOpenModalConfirm(item.id)
                }}
              >
                {item.follow ? "Follow" : "Unfollow"}
              </Button>
            </div>
          </div>
        )
      })}
      {isModalOpen && (
        <>
          <Overlay />
          <FollowModal
            onClose={closeModal}
            isOpen={isModalOpen}
            id={idPost}
            onClickButton={toggleFollow}
            title={"Unfollow"}
            textFollowers={`Unfollow from this user “${followersList.find((item) => item.id === idPost)?.name}”?`}
          />
        </>
      )}
    </div>
  )
}

export default Following
