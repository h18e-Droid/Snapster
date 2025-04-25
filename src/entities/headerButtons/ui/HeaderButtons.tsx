import styles from "./HeaderButtons.module.scss"
import Badge from "@/shared/ui/badge/Badge"
import { BellIcon, MoreHorizontalIcon } from "@/shared/assets/icons"
import { Button } from "@/shared/ui/button"
import React from "react"
import Link from "next/link"

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
      <div className={styles.boxButtonLogIn}>
        <Button variant={"textButton"}>
          <Link href={"/signIn"}>Sign In</Link>
        </Button>
      </div>
      <div className={styles.boxButtonSingUp}>
        <Button variant={"primary"}>
          <Link href={"/signUp"}>Sign up</Link>
        </Button>
      </div>
    </div>
  )
}
