"use client"
import React from "react"
import LangSwitcher from "@/features/langSwitcher/ui/LangSwitcher"
import styles from "./Header.module.scss"
import { HeaderButtons } from "@/entities/headerButtons"

type Props = {
  isAuth: boolean
}

export const Header = ({ isAuth }: Props) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>Snapster</h2>
      <nav className={styles.navigationWrapper}>
        <LangSwitcher />
        <HeaderButtons isAuth={isAuth} />
      </nav>
    </div>
  )
}
