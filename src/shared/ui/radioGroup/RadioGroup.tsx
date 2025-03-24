import styles from "./RadioGroup.module.css"
import { RadioButton } from "@/shared/ui/radioGroup/RadioButton"

type Props = {
  value: number
  setValue: (value: number) => void
  disabled: boolean
  data: Array<{
    label: string
    value: number
  }>
}

export const RadioGroup = ({ data, value, setValue, disabled }: Props) => {
  return (
    <div className={styles["radio-group"]}>
      {data.map((el) => (
        <RadioButton
          key={el.value}
          label={el.label}
          checked={el.value === value}
          onChange={() => setValue(el.value)}
          disabled={disabled}
        />
      ))}
    </div>
  )
}
