import React from "react"
import styles from "./styles.module.scss"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  console.log("public")
  return <div className={styles.wrapper}>{children}</div>
}
