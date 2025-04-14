"use client"

import React, { ComponentPropsWithoutRef, CSSProperties } from "react"
import styles from "./Button.module.css"
import Link from "next/link"

export type ButtonProps= ComponentPropsWithoutRef<'button'> & {
  href?: string
  onClick?: ()=> void
  children?: React.ReactNode
  className?: string
  width: string | number
  variant?: 'primary' | 'secondary' | 'outline' | 'textButton' | 'variantButton'
}

const color: Record<string, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  outline: styles.outline,
  textButton: styles.textButton,
  variantButton:  styles.variantButton,

}


export const Button = ({href, width,variant,children, className, ...props}: ButtonProps) => {

  const variantName = variant? color[variant] : styles.primary;
  const buttonStyle: CSSProperties = {
    width: width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  }
  // if(props.onClick){
  //   props.onClick()
  // }
  if (href) {
    return (
      <Link
        href={href}
        className={`${variantName}` || className}
        style={{ ...buttonStyle} }

      >
        {children}
      </Link>
    )
  }


  return (
    <button type={props.type}
            className={`${variantName}` || className}
            style={{ ...buttonStyle} }
            {...props}
    >
      {props.title}
      {children}
    </button>
  )
}

