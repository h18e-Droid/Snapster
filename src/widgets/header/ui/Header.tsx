"use client"
import React from "react"
import LangSwitcher from "@/features/langSwitcher/ui/LangSwitcher"
import { Button } from "@/shared/ui/button"
import { BellIcon, MoreHorizontalIcon } from "@/shared/assets/icons"
import clsx from "clsx"
import Badge from "@/shared/ui/badge/Badge"
import { useMobile } from "@/shared/lib/media"
import styles from "./Header.module.scss"

export const Header = () => {
  const isMobile = useMobile(1000)
  const isAuth = false

  return (
    <div className={styles.header}>
      <h2 className={styles.title}>Snapster</h2>
      <nav
        className={clsx(styles.navigationGroup, {
          [styles.navigationGroupAuth]: isAuth,
          [styles.navigationGroupMobileAuth]: isMobile,
        })}
      >
        <LangSwitcher />

        {isAuth && !isMobile && (
          <Badge badgeContent={3} max={10}>
            <BellIcon />
          </Badge>
        )}

        {!isAuth && !isMobile && (
          <>
            <Button width={100} height={36} className={styles.textButton} title="Sign in" />
            <Button width={100} height={36} className={styles.containedButton} title="Sign out" />
          </>
        )}

        {isMobile && !isAuth && (
          <button className={styles.moreButton}>
            <MoreHorizontalIcon style={{ cursor: "pointer" }} />
          </button>
        )}
      </nav>
    </div>
  )
}
