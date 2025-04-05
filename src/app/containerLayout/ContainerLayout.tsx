import React, { ReactNode } from "react"
import { Header } from "@/widgets/header"
import styles from "./ContainerLayout.module.scss"
import { Navbar } from "@/widgets/navbar"
import {useSelector} from "react-redux";
import {selectLoggedIn} from "@/features/auth/model/authSelectors";

type ContainerLayoutProps = {
  children: ReactNode
}

const ContainerLayout = ({ children }: ContainerLayoutProps) => {
  const isAuth = useSelector(selectLoggedIn)

  return (
    <div className={styles.containerWrapper}>
      <header className={styles.headerWrapper}>
        <Header />
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
