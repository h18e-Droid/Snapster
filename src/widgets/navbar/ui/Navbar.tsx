"use client"
import React, { useEffect, useState } from "react"
import styles from "./Navbar.module.scss"
import { usePathname } from "next/navigation"
import { items } from "../model/navItems"
import { TypeItem } from "../lib/types"
import Link from "next/link"
import clsx from "clsx"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"
import { SignOutModal } from "@/features/auth/signOut"
import NewPublication from "@/widgets/newPublication/NewPublication"
import Overlay from "@/shared/ui/overlay/Overlay"

export const Navbar = () => {
  const currentBasePath = `/${usePathname().split("/")[1]}`
  const defaultActiveItem = items.find((item) => item.link === currentBasePath)
  const currentUserId = useAppSelector((state) => state.user.userId)
  console.log("useID: " + currentUserId)
  const [activeItem, setActiveItem] = useState<number[]>(defaultActiveItem ? [defaultActiveItem.id] : [])
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const onCLickHandler = (id: number) => {
    if(id === 2) {
      setShowCreateModal(true)
      return
    }
    setActiveItem([id])
  }

  const signOutHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowLogoutModal(true)
  }

  useEffect(() => {
    if (currentUserId) {
      items[2].link = currentUserId
    }
    if (`/${currentUserId}` === currentBasePath) {
      setActiveItem([items[2].id])
    }
  }, [currentBasePath, currentUserId])

  return (
    <>
    <nav className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <ul className={styles.listWrapper}>
          {items.map((item: TypeItem) => (
            <div
              key={item.id}
              className={item.id === 6 ? styles.itemStatistic : item.id === 7 ? styles.itemFavorite : styles.item}
            >
              <li className={styles.listItem} key={item.id}>
                <Link href={item.id === 3 && currentUserId ? `/${currentUserId}` : item.link}>
                  <div
                    className={clsx(styles.listItem, { [styles.active]: activeItem.includes(item.id) })}
                    onClick={item.id === 8 ? signOutHandler : () => onCLickHandler(item.id)}
                  >
                    <span style={{ pointerEvents: "none" }}>
                      {activeItem.includes(item.id) ? item.icon[0] : item.icon[1]}
                    </span>
                    <span className={styles.titleIcon}>{item.title}</span>
                  </div>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
      {showLogoutModal && <SignOutModal setShowSignOutModal={(isModalOpen) => setShowLogoutModal(isModalOpen)} />}


    </nav>
  {showCreateModal && (

    <div >
      <Overlay/>
      <NewPublication onClose={() => setShowCreateModal(false)}/>
      <div className="overlay-bg" onClick={() => setShowCreateModal(false)}></div>
    </div>
  )}
    </>
  )
}
