import React, { ComponentPropsWithoutRef, CSSProperties } from "react"
import styles from "./TextArea.module.css"

type TextAreaProps = ComponentPropsWithoutRef<"textarea"> & {
  width?: string | number,
  height?: string | number,
  error?: boolean,
}


 export const TextArea = ({ width, height, error, ...props }: TextAreaProps) => {


  const textAreaStyle: CSSProperties = {
    width: width || 284,
    height: height || 200
  }

  return (
    <div className={styles.container}>
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

