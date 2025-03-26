"use client"
import React from "react"
import styles from "./Header.module.scss"
import LangSwitcher from "@/features/langSwitcher/ui/LangSwitcher"
import { Button } from "@/shared/ui/button"
import { BellIcon } from "@/shared/assets/icons"
import clsx from "clsx"
import Badge from "@/shared/ui/badge/Badge"

//import { useMobile } from "@/shared/lib/media"

export const Header = () => {
  /*  const isMobile = useMobile()*/
  const isAuth = true

  return (
    <header className={styles.headerContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Snapster</h2>
        <nav className={clsx(styles.navigationGroup, { [styles.navigationGroupAuth]: isAuth })}>
          <LangSwitcher />
          {isAuth ? (
            <>
              <Badge badgeContent={3} max={10}>
                <BellIcon />
              </Badge>
            </>
          ) : (
            <>
              <Button width={100} height={36} className={styles.textButton} title={"Sign in"} />
              <Button width={100} height={36} className={styles.containedButton} title={"Sign out"} />
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
