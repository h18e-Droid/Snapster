import styles from "./RadioButton.module.css"
import { useId } from "react"

type Props = {
  label?: string
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export const RadioButton = ({ label, checked, onChange, disabled }: Props) => {
  const id = useId()

  return (
    <label className={styles["radio-group"]}>
      <div
        className={`${styles["radio-group-container"]} ${disabled ? styles.disabled : ""}`}
        tabIndex={0}
        // костыль
      >
        <input
          id={id}
          type={"radio"}
          className={styles["radio-input"]}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
      </div>

      <span className={`${styles.label} ${disabled ? styles.disabled : ""}`}>{label}</span>
    </label>
  )
}
