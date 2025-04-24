import React, { ReactNode } from "react"
import { Header } from "@/widgets/header"
import styles from "./ContainerLayout.module.scss"
import { Navbar } from "@/widgets/navbar"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"

type ContainerLayoutProps = {
  children: ReactNode
}

const ContainerLayout = ({ children }: ContainerLayoutProps) => {
  const isAuth = useAppSelector((state) => state.user.isAuth)
  return (
    <div className={styles.containerWrapper}>
      <header className={styles.headerWrapper}>
        <Header isAuth={isAuth} />
      </header>
      <div className={styles.container}>
        {isAuth && (
          <nav className={styles.navbarWrapper}>
            <Navbar />
          </nav>
        )}
        <section className={styles.contentWrapper}>{children}</section>
      </div>
    </div>
  )
}
export default ContainerLayout
