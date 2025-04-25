import styles from "./Cards.module.scss"
import { ReactNode } from "react"
import clsx from "clsx"

type Props = {
  title: string
  children: ReactNode
  className?: string
}

export const Cards = ({ title, children, className }: Props) => {
  return (
    <div className={clsx(className, styles.cardContainer)}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </div>
  )
}
