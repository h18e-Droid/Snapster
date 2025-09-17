import styles from "./VerificationSuccess.module.scss"
import { Button } from "@/shared/ui/button"
import { CongratulationsIcon } from "@/shared/assets/icons/components/CongratulationsIcon"

export const VerificationSuccess = () => {
  return (
    <div className={styles.container}>
      <div className={styles.boxText}>
        <h1>Congratulations!</h1>
        <p>Your email has been confirmed</p>
      </div>
      <div className={styles.boxBtnIcon}>
        <Button href={"signIn"} className={styles.buttonSignIn}>
          Sign in
        </Button>
        <CongratulationsIcon size={432} />
      </div>
    </div>
  )
}
