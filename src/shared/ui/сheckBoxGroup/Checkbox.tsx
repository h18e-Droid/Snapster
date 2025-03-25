import styles from "./Checkbox.module.css"
import { useId } from "react"

type Props = {
  label?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};

export const Checkbox = ({ label, checked, onChange, disabled }: Props) => {
const id=useId()

  return (
    <label className={styles.checkbox}>
      <div className={`${styles["checkbox-container"]} ${disabled ? styles.disabled : ""}`}
           tabIndex={disabled ? -1 : 0}
      >
        <input
          id={id}
          type="checkbox"
          className={styles["checkbox-input"]}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <div className={styles["checkmark-container"]}>
          <div className={styles.checkmark}></div>
        </div>
      </div>
      <span
        className={styles.label}
        style={{
          color: disabled ? "#8D9094" : "#FFFEFE"
        }}
      >
        {label}
      </span>
    </label>
  )
}
