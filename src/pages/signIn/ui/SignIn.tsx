"use client"
import { selectLoggedIn } from "@/features/auth/model/authSelectors"
import { useSelector } from "react-redux"
import { Cards } from "@/shared/ui/cards"
import { GoogleComIcon } from "@/shared/assets/icons/components/GoogleComIcon"
import { GitHubComIcon } from "@/shared/assets/icons/components/GitHubComIcon"
import styles from "./SignIn.module.scss"
import { SignInForm } from "@/features/auth/signIn"

export const SignIn = () => {
  const isAuth = useSelector(selectLoggedIn)
  console.log(isAuth)
  return (
    <div className={styles.signInWrapper}>
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
