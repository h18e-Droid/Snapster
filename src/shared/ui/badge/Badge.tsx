import React, { ReactNode } from "react"
import styles from "./Badge.module.scss"
import clsx from "clsx"

type BadgeProps = {
  children: ReactNode
  badgeContent?: number
  max?: number
  className?: string
}

const Badge = ({ children, badgeContent, max, className }: BadgeProps) => {
  let badgeMax
  if (badgeContent && max) {
    badgeMax = badgeContent > max ? `${max}+` : badgeContent
  }

  return (
    <button
      className={styles.badgeWrapper}
      onMouseDown={(e) => {
        e.preventDefault()
      }}
    >
      <span style={{ cursor: "pointer" }}>{children}</span>
      {badgeContent && <span className={clsx(styles.badge, className)}>{badgeMax}</span>}
    </button>
  )
}

export default Badge
