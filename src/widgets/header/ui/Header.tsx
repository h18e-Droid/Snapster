import React from "react"
import styles from "./Header.module.scss"
import LangSwitcher from "@/features/langSwitcher/ui/LangSwitcher"
import { Button } from "@/shared/ui/button"

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Snapster</h2>
        <nav className={styles.navigationGroup}>
          <LangSwitcher />
          <Button width={100} height={36} className={styles.textButton} title={"Sign in"} />
          <Button width={100} height={36} className={styles.containedButton} title={"Sign out"} />
        </nav>
      </div>
    </header>
  )
}
