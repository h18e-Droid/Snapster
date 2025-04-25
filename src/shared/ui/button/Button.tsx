
"use client"

import React, { ComponentPropsWithoutRef } from "react"
import styles from "./Button.module.scss"
import Link from "next/link"

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  href?: string
  onClick?: () => void
  children?: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline" | "textButton" | "variantButton"
}



export const Button = ({ href, variant, children, className, ...props }: ButtonProps) => {
  const classNames = [
    styles.button,
    variant ? styles[variant] : '',
    className,
  ].filter(Boolean).join(' ')


  if (href) {
    return (
      <Link href={href} className={classNames}>
        {children}
      </Link>
     )
  }

  return (
    <button
      type={props.type}
      className={classNames}
      onClick={props.onClick}
      {...props}
    >
      {props.title}
      {children}
    </button>
  )
}
