import React, { ComponentPropsWithoutRef, CSSProperties } from "react"
import s from "@/components/ui/TextArea/TextArea.module.css"

type TextAreaProps = ComponentPropsWithoutRef<"textarea"> & {
  width: string | number,
  height: string | number,
  error?: boolean | string
}


export const TextArea = ({ width, height, error, ...props }: TextAreaProps) => {


  const buttonStyle: CSSProperties = {
    width: width || 284,
    height: height || 84
  }

  return (
    <div className={s.container}>
    <textarea
      className={props.className}
      style={{ ...buttonStyle }}
      value={props.value}
    >{props.defaultValue}</textarea>
      {error &&
        <label className={s.labelError}>{error}</label>
      }
    </div>

  )
}

