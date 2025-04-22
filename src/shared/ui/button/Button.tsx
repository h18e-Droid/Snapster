import React, { ComponentPropsWithoutRef } from "react"
import styles from './Button.module.scss'

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  onClick?: () => void,
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'textButton' | 'variantButton'
}



export const Button = ({ variant, children, className, ...props }: ButtonProps) => {
  const classNames = [
    styles.button,
    variant ? styles[variant] : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  )
}
