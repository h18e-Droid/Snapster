import React, { ReactNode } from "react"
import { Header } from "@/widgets/header"
import styles from "./ContainerLayout.module.scss"
import { Navbar } from "@/widgets/navbar"

type ContainerLayoutProps = {
  children: ReactNode
}

const ContainerLayout = ({ children }: ContainerLayoutProps) => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Navbar />
        <section className={styles.selection}>{children}</section>
      </div>
    </>
  )
}
export default ContainerLayout
