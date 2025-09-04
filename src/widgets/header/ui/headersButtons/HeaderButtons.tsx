import styles from "./HeaderButtons.module.scss"
import Badge from "@/shared/ui/badge/Badge"
import { BellIcon, MoreHorizontalIcon } from "@/shared/assets/icons"
import { Button } from "@/shared/ui/button"
import React from "react"
import { appRoutes } from "@/shared/lib/routes"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"

export const HeaderButtons = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)

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
      <Button href={appRoutes.public.signIn} variant={"textButton"} className={styles.boxButtonLogIn}>
        Sign In
      </Button>
      <Button href={appRoutes.public.signUp} variant={"primary"} className={styles.boxButtonSignUp}>
        Sign up
      </Button>
    </div>
  )
}
