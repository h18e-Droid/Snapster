import React, { ComponentPropsWithoutRef, CSSProperties } from "react"
import styles from './Button.module.css'

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  onClick?: () => void,
  children?: React.ReactNode
  className?: string
  width?: string | number,
  variant: 'primary' | 'secondary' | 'outline' | 'textButton' | 'variantButton'
}

export const color: Record<string, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  outline: styles.outline,
  textButton: styles.textButton,
  variantButton: styles.variantButton,
}

export const Button = ({ width, variant, children, className, ...props }: ButtonProps) => {
  const variantName = variant ? color[variant] : styles.primary;

  const buttonStyle: CSSProperties = {
    width: width,
  }

  return (
    <button type={props.type}
            className={`${variantName} ${className ? className : ''}`}
            style={{ ...buttonStyle }}
            onClick={props.onClick}
            {...props}
    >
      {children}
    </button>
  )
}
