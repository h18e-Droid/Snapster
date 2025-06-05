"use client"

import styles from "./Followers.module.scss"
import Input from "@/shared/ui/input/Input"
import Image from "next/image"
import { Button } from "@/shared/ui/button"
import { useModal } from "@/features/auth/hooks/useModal"
import { ChangeEvent, useState } from "react"
import Overlay from "@/shared/ui/overlay/Overlay"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/store"
import { userActions } from "@/entities/user"
import { Follower } from "../headerInfoUserModal/HeaderInfoUserModal"
import FollowModal from "@/views/profile/ui/followModal/FollowModal"

const Followers = () => {
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal()
  const [typeModal, setTypeModal] = useState<"delete" | "follower">("delete")
  const [idPost, setIdPost] = useState<string>("")
  const [valueSearch, setValueSearch] = useState<string>("")

  const followersList = useSelector<RootState, Follower[]>((state) => state.user.followersList)
  const dispatch = useDispatch<AppDispatch>()

  const deleteFollower = (id: string) => {
    dispatch(userActions.deleteFollower(id))
    closeModal()
  }

  const isOpenModalConfirm = (type: "delete" | "follower", id: string) => {
    setTypeModal(type)
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
              {item.follow && (
                <Button variant={"primary"} onClick={() => isOpenModalConfirm("follower", item.id)}>
                  Follow
                </Button>
              )}
              <Button
                variant={"textButton"}
                style={{ color: "var(--color-light-100)" }}
                onClick={() => isOpenModalConfirm("delete", item.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        )
      })}
      {isModalOpen && (
        <>
          <Overlay />
          {typeModal === "delete" && (
            <FollowModal
              onClose={closeModal}
              isOpen={isModalOpen}
              id={idPost}
              onClickButton={deleteFollower}
              title={"Delete Following"}
              textFollowers={`delete a Following “${followersList.find((item) => item.id === idPost)?.name}”?`}
            />
          )}
          {typeModal === "follower" && (
            <FollowModal
              onClose={closeModal}
              isOpen={isModalOpen}
              id={idPost}
              onClickButton={toggleFollow}
              title={"Unfollow"}
              textFollowers={`Unfollow from this user “${followersList.find((item) => item.id === idPost)?.name}”?`}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Followers
