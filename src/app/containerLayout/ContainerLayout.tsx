import React, { ReactNode, useEffect } from "react"
import { Header } from "@/widgets/header"
import styles from "./ContainerLayout.module.scss"
import { Navbar } from "@/widgets/navbar"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"
import { useAppDispatch } from "@/shared/lib/state/useAppDispatch"
import { authActions } from "@/features/auth"

type ContainerLayoutProps = {
  children: ReactNode
}

const ContainerLayout = ({ children }: ContainerLayoutProps) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      dispatch(authActions.setIsAuth({ isAuth: true }))
    }
  }, [])

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
