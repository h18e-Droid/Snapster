"use client"
import React from "react"
import styles from "./Header.module.scss"
import { HeaderButtons } from "@/entities/headerButtons"
import { LanguageSwitcher } from "@/features/langSwitcher"

type Props = {
  isAuth: boolean
}

export const Header = ({ isAuth }: Props) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>Snapster</h2>
      <nav className={styles.navigationWrapper}>
        <LanguageSwitcher />
        <HeaderButtons isAuth={isAuth} />
      </nav>

    </div>
  )
}
