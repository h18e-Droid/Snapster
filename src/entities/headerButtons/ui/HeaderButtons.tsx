import styles from "@/widgets/header/ui/Header.module.scss"
import Badge from "@/shared/ui/badge/Badge"
import { BellIcon, MoreHorizontalIcon } from "@/shared/assets/icons"
import { Button } from "@/shared/ui/button"
import React from "react"

type Props = {
  isAuth: boolean
}

export const HeaderButtons = ({ isAuth }: Props) => {
  if (isAuth) {
    return (
      <>
        <div className={styles.badge}>
          <Badge badgeContent={3} max={10}>
            <BellIcon />
          </Badge>
        </div>
        <button className={styles.moreButton}>
          <MoreHorizontalIcon style={{ cursor: "pointer", display: "flex" }} />
        </button>
      </>
    )
  }

  return (
    <div className={styles.buttonsWrapper}>
      <Button variant={"textButton"}>Log In</Button>
      <Button variant={"primary"}>Sign up</Button>
    </div>
  )
}
