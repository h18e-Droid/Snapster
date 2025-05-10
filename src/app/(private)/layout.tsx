import React from "react"
import styles from "./styles.module.scss"
import { Navbar } from "@/widgets/navbar"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <section className={styles.content}>{children}</section>
    </div>
  )
}
