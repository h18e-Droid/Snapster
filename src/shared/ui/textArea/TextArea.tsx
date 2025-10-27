import React, { ChangeEvent, ComponentPropsWithoutRef, CSSProperties } from "react"
import styles from "./TextArea.module.scss"

type TextAreaProps = ComponentPropsWithoutRef<"textarea"> & {
  width?: string | number,
  height?: string | number,
  error?: boolean,
  title?:string,
  placeholder?: string,
  onChangeText?: (value: string) => void,
}


export const TextArea = ({ title, width, height, error, placeholder, onChangeText, ...props }: TextAreaProps) => {
const [valueText, setValueText] = React.useState<string>("")


  const textAreaStyle: CSSProperties = {
    width: width || 284,
    height: height || 200
  }

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value
  setValueText(newValue)
    if(onChangeText) onChangeText(newValue)
}

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
    <textarea
      onChange={onChangeHandler}
      className={error? styles.error :`${styles.default} ${props.className}`}
      style={{ ...textAreaStyle }}
      value={props.value || valueText}
      placeholder={placeholder}
      {...props}
    />
      {error &&
        <label className={styles.labelError}>Error text</label>
      }
    </div>

  )
}

