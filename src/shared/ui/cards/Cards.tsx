import styles from "./Cards.module.scss"
import { ReactNode } from "react"

type Props = {
  title: string
  children: ReactNode
}

export const Cards = ({ title, children }: Props) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </div>
  )
}
