"use client"
import React from "react"
import styles from "./Header.module.scss"
import { HeaderButtons } from "./headersButtons/HeaderButtons"
import { LanguageSwitcher } from "@/features/langSwitcher"
import Link from "next/link"
import { appRoutes } from "@/shared/lib/routes"

type Props = {
  isAuth: boolean
}

export const Header = ({ isAuth }: Props) => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <Link href={appRoutes.home} passHref>
            Snapster
          </Link>
        </h2>
        <nav className={styles.navigationWrapper}>
          <LanguageSwitcher />
          <HeaderButtons isAuth={isAuth} />
        </nav>
      </div>
    </header>
  )
}
