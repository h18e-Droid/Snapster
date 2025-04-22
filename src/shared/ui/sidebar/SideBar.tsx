"use client"
import React, { useState } from "react"
import styles from "./SideBar.module.scss"
import { HomeIcon } from "@/shared/assets/icons/components/HomeIcon"
import { PlusSquareOutlineIcon } from "@/shared/assets/icons/components/PlusSquareOutlineIcon"
import { PersonIcon } from "@/shared/assets/icons/components/PersonIcon"
import { MessageOutlineIcon } from "@/shared/assets/icons/components/MessageOutlineIcon"
import { SearchIcon } from "@/shared/assets/icons/components/SearchIcon"
import { TrendingUpIcon } from "@/shared/assets/icons/components/TrendingUpIcon"
import { BookmarkOutlineIcon } from "@/shared/assets/icons/components/BookmarkOutlineIcon"
import { LogoutIcon } from "@/shared/assets/icons/components/LogoutIcon"
import { HomeOutlineIcon } from "@/shared/assets/icons/components/HomeOutlineIcon"
import { PlusSquareIcon } from "@/shared/assets/icons/components/PlusSquareIcon"
import { PersonOutlineIcon } from "@/shared/assets/icons/components/PersonOutlineIcon"
import { MessageIcon } from "@/shared/assets/icons/components/MessageIcon"
import { BookmarkIcon } from "@/shared/assets/icons/components/BookmarkIcon"
import { Button } from "@/shared/ui/button"

import { useRouter } from "next/navigation"
import { Modal } from "@/shared/ui/modal"

type TypeItem = {
  id: number | string
  title: string
  icon: React.ReactNode[]
  link: string
}

const SideBar = () => {
  const items = [
    { id: 1, title: "Home", icon: [<HomeIcon key="home-filled" />, <HomeOutlineIcon key="home-outline" />], link: "" },
    {
      id: 2,
      title: "Create",
      icon: [<PlusSquareIcon key="create-filled" />, <PlusSquareOutlineIcon key="create-outline" />],
      link: "",
    },
    {
      id: 3,
      title: "My Profile",
      icon: [<PersonIcon key="profile-filled" />, <PersonOutlineIcon key="profile-outline" />],
      link: "",
    },
    {
      id: 4,
      title: "Messenger",
      icon: [<MessageIcon key="message-filled" />, <MessageOutlineIcon key="message-outline" />],
      link: "",
    },
    {
      id: 5,
      title: "Search",
      icon: [<SearchIcon key="search-filled" />, <SearchIcon key="search-outline" />],
      link: "",
    },
    {
      id: 6,
      title: "Statistics",
      icon: [<TrendingUpIcon key="stats-filled" />, <TrendingUpIcon key="stats-outline" />],
      link: "",
    },
    {
      id: 7,
      title: "Favorites",
      icon: [<BookmarkIcon key="fav-filled" />, <BookmarkOutlineIcon key="fav-outline" />],
      link: "",
    },
    {
      id: 8,
      title: "Log Out",
      icon: [<LogoutIcon key="logout-filled" />, <LogoutIcon key="logout-outline" />],
      link: "",
    },
  ]

  const [isActive, setIsActive] = useState<Record<string | number, boolean>>({})
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const router = useRouter()

  const handleMouseDown = (id: number | string) => {
    setIsActive((prev) => ({ ...prev, [id]: true }))
  }

  const logOutHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowLogoutModal(true)
  }
  const handleMouseUp = (id: number | string) => {
    setIsActive((prev) => ({ ...prev, [id]: false }))
  }

  const closeModal = () => setShowLogoutModal(false)

  const logOutModal = () => {
    setShowLogoutModal(false)
    router.push("/signIn")
  }

  return (
    <>
      <nav className={styles.wrapper}>
        <ul className={styles.listContainer}>
          {items.map((item: TypeItem) => (
            <div
              key={item.id}
              className={item.id === 6 ? styles.itemStatistic : item.id === 7 ? styles.itemFavorite : styles.item}
            >
              <li className={styles.listItem}>
                <a
                  href={item.link}
                  className={styles.listItem}
                  onMouseDown={() => handleMouseDown(item.id)}
                  onMouseUp={() => handleMouseUp(item.id)}
                  onClick={item.id === 8 ? logOutHandler : undefined}
                >
                  {isActive[item.id] ? (
                    <span className={styles.itemIcon}>{item.icon[0]}</span>
                  ) : (
                    <span className={styles.itemIcon}>{item.icon[1]}</span>
                  )}
                  <span className={styles.titleIcon}>{item.title}</span>
                </a>
              </li>
            </div>
          ))}
        </ul>
      </nav>
      {showLogoutModal && (
        <Modal title={"Log Out"} setActive={setShowLogoutModal} active={showLogoutModal}>
          <hr className={styles.line} />
          <p className={styles.moduleText}>Are you really want to log out of your account ___ email name ___?</p>
          <div className={styles.buttonContainerModule}>
            <Button variant={"primary"} onClick={logOutModal}>
              Yes
            </Button>
            <Button variant={"primary"} onClick={closeModal}>
              No
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default SideBar
