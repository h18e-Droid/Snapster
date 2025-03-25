import styles from "./CheckBoxGroup.module.css"
import {Checkbox} from "./Checkbox";


type Props = {
  values: number[];
  setValues: (values: number[]) => void;
  disabled: boolean;
  data: Array<{
    label?: string;
    value: number
  }>
};
export const CheckBoxGroup = ({ data, values, setValues, disabled }: Props) => {
  const handleChange = (value: number) => {
    if (values.includes(value)) {
      setValues(values.filter((val) => val !== value))
    } else {
      setValues([...values, value])
    }
  }

  return (
    <div className={styles['check-box-group']}>
      {data.map((el) => (
        <Checkbox
          key={el.value}
          label={el.label}
          checked={values.includes(el.value)}
          onChange={() => handleChange(el.value)}
          disabled={disabled}
        />
      ))}
    </div>
  )
}