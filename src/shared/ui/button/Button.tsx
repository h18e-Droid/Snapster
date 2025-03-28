"use client"

import React, { ComponentPropsWithoutRef, CSSProperties } from "react"

export type ButtonProps= ComponentPropsWithoutRef<'button'> & {
  onClick?: ()=> void,
  width: string | number,
  height: string | number,
}

export const Button = ({width, height,...props}: ButtonProps) => {


  if(props.onClick){
    props.onClick()
  }

  const buttonStyle: CSSProperties = {
    width: width,
    height: height,
  }

  return (
    <button type={props.type}
            className={props.className}
            style={{ ...buttonStyle} }
            {...props}
    >
      {props.title}
    </button>
  )
}

