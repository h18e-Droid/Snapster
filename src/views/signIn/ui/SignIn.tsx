"use client"
import { Cards } from "@/shared/ui/cards"
import { GoogleComIcon } from "@/shared/assets/icons/components/GoogleComIcon"
import { GitHubComIcon } from "@/shared/assets/icons/components/GitHubComIcon"
import styles from "./SignIn.module.scss"
import { useAppSelector } from "@/shared/lib/state/useAppSelector"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SignInForm } from "@/views/signIn/ui/signInForm/SignInForm"
import { Loader } from "@/shared/ui/loader"
import { appRoutes } from "@/shared/lib/enums/routes"

export const SignIn = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const status = useAppSelector((state) => state.auth.status)
  const router = useRouter()

  useEffect(() => {
    if (isAuth) {
      return router.push(appRoutes.home)
    }
  }, [isAuth])

  return (
    <div className={styles.signInWrapper}>
      {status === "loading" && <Loader />}
      <Cards title={"Sign In"} className={styles.card}>
        <div className={styles.contentWrapper}>
          <div className={styles.oAuth}>
            <span className={styles.oAuthIcon}>
              <GoogleComIcon size={36} />
            </span>
            <span className={styles.oAuthIcon}>
              <GitHubComIcon size={36} />
            </span>
          </div>
          <div className={styles.signInForm}>
            <SignInForm />
          </div>
        </div>
      </Cards>
    </div>
  )
}
