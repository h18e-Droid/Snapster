import React, { ComponentPropsWithoutRef, CSSProperties } from "react"
import styles from "./TextArea.module.scss"

type TextAreaProps = ComponentPropsWithoutRef<"textarea"> & {
  width?: string | number,
  height?: string | number,
  error?: boolean,
  title?:string
}


 export const TextArea = ({ title,width, height, error, ...props }: TextAreaProps) => {


  const textAreaStyle: CSSProperties = {
    width: width || 284,
    height: height || 200
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
    <textarea
      className={error? styles.error :`${styles.default} ${props.className}`}
      style={{ ...textAreaStyle }}
      value={props.value}
    >{props.defaultValue}</textarea>
      {error &&
        <label className={styles.labelError}>Error text</label>

      }
    </div>

  )
}

