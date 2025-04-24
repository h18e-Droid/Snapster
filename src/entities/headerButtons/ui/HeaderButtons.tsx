import styles from "./HeaderButtons.module.scss"
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
          <Badge badgeContent={10} max={10}>
            <BellIcon />
          </Badge>
        </div>
        <button className={styles.moreButton}>
          <MoreHorizontalIcon style={{ cursor: "pointer", display: "flex" }} />
        </button>
      </>
    )
  }
  //TODO: buttons width 100px
  return (
    <div className={styles.buttonsWrapper}>
      <Button variant={"textButton"}>Sign In</Button>
      <Button variant={"primary"}>Sign up</Button>
    </div>
  )
}
