"use client"
import React, { useEffect, useState } from "react"
import styles from "./Navbar.module.scss"
import { appRoutes } from "@/shared/lib/routes"
import { Modal } from "@/shared/ui/modal"
import { Button } from "@/shared/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { items } from "../model/navItems"
import { TypeItem } from "../lib/types"
import Link from "next/link"
import clsx from "clsx"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"

export const Navbar = () => {
  const currentBasePath = `/${usePathname().split("/")[1]}`
  const currentUserId = useAppSelector((state) => state.user.userId)
  const defaultActiveItem = items.find((item) => item.link === currentBasePath)
  const [activeItem, setActiveItem] = useState<number[]>(defaultActiveItem ? [defaultActiveItem.id] : [])
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const router = useRouter()

  const onCLickHandler = (id: number) => {
    setActiveItem([id])
  }

  const logOutHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowLogoutModal(true)
  }

  const closeModal = () => setShowLogoutModal(false)

  const logOutModal = () => {
    setShowLogoutModal(false)
    router.push(appRoutes.public.signIn)
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
    <nav className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <ul className={styles.listWrapper}>
          {items.map((item: TypeItem) => (
            <div
              key={item.id}
              className={item.id === 6 ? styles.itemStatistic : item.id === 7 ? styles.itemFavorite : styles.item}
            >
              <li className={styles.listItem} key={item.id}>
                <Link
                  href={item.id === 3 && currentUserId ? currentUserId : item.link}
                  className={clsx(styles.listItem, { [styles.active]: activeItem.includes(item.id) })}
                  onClick={item.id === 8 ? logOutHandler : () => onCLickHandler(item.id)}
                >
                  {activeItem.includes(item.id) ? <span>{item.icon[0]}</span> : <span>{item.icon[1]}</span>}
                  <span className={styles.titleIcon}>{item.title}</span>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
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
    </nav>
  )
}
