"use client"
import React, { ReactNode, useEffect } from "react"
import { Header } from "@/widgets/header"
import styles from "./ContainerLayout.module.scss"
import { Navbar } from "@/widgets/navbar"
import { useAppDispatch } from "@/shared/lib/state/useAppDispatch"
import { authActions } from "@/features/auth"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"
import { usePathname } from "next/navigation"
import { appRoutes } from "@/shared/lib/enums/routes"

type ContainerLayoutProps = {
  children: ReactNode
  isServerAuth: boolean
}

const ContainerLayout = ({ children, isServerAuth }: ContainerLayoutProps) => {
  const dispatch = useAppDispatch()
  const isClientAuth = useAppSelector((state) => state.auth.isAuth)
  const isAuthenticated = isServerAuth || isClientAuth
  const pathname = usePathname()

  const isNotFoundPage = Object.values(appRoutes).includes(pathname as appRoutes)
  console.log(pathname, isNotFoundPage)

  useEffect(() => {
    dispatch(authActions.setIsAuth({ isAuth: isServerAuth }))
  }, [dispatch, isServerAuth])

  return (
    <div className={styles.containerWrapper}>
      <header className={styles.headerWrapper}>
        <Header isAuth={isAuthenticated} />
      </header>
      <div className={styles.container}>
        {isAuthenticated && isNotFoundPage && (
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
