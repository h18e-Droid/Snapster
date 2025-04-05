"use client"

import React, { ComponentPropsWithoutRef, CSSProperties } from "react"
import styles from './Button.module.css'

export type ButtonProps= ComponentPropsWithoutRef<'button'> & {
  onClick?: ()=> void,
  width: string | number,
  variant?: 'primary' | 'secondary' | 'outline' | 'textButton' | 'variantButton'
}

const color: Record<string, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  outline: styles.outline,
  textButton: styles.textButton,
  variantButton:  styles.variantButton,
}


export const Button = ({width,variant, ...props}: ButtonProps) => {

  const variantName = variant? color[variant] : styles.primary;

  if(props.onClick){
    props.onClick()
  }

  const buttonStyle: CSSProperties = {
    width: width,
  }

  return (
    <button type={props.type}
            className={`${variantName}`}
            style={{ ...buttonStyle} }
            {...props}
    >
      {props.title}
    </button>
  )
}

