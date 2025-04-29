"use client"

import styles from "./Button.module.scss"
import React, { ComponentPropsWithoutRef } from "react"
import Link from "next/link"
import clsx from "clsx"

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  href?: string
  onClick?: () => void
  children?: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline" | "textButton" | "variantButton"
}



export const Button = ({ href, variant, children, className, ...props }: ButtonProps) => {

  const classNames = clsx(
    styles.button,
    variant && styles[variant],
    className,
  );

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
