"use client"

import styles from "./CustomInput.module.scss"
import React, { useState } from "react"
import { EyeIcon } from "@/shared/assets/icons/components/EyeIcon"
import { EyeOffIcon } from "@/shared/assets/icons/components/EyeOffIcon"
import { SearchIcon } from "@/shared/assets/icons/components/SearchIcon"
import clsx from "clsx"

type Props = {
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  label?: string
  width?: string
  errorText?: string
}

const CustomInput = ({ type, placeholder, value, onChange, onBlur, disabled, label, width, errorText }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [active, setActive] = useState(false)

  const inputClassName = clsx(
    styles.input,
    disabled && styles.disabled,
    errorText && styles.errorInput,
    active && styles.activeInput,
  )

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setActive(false)
    if (!value) setIsSearchVisible(false)
    onBlur?.(e)
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  return (
    <div className={styles.inputBox}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={clsx(styles.inputContainer, disabled && styles.disabled)} style={{ width }}>
        {type === "search" && !isSearchVisible && !value && (
          <div className={styles.placeholderContainer}>
            <SearchIcon className={clsx(styles.icon, disabled && styles.iconDisabled)} />
            <span className={clsx(styles.placeholderText, disabled && styles.disabled)}>{placeholder}</span>
          </div>
        )}
        <input
          className={inputClassName}
          type={type === "password" && !isPasswordVisible ? "password" : "text"}
          placeholder={type === "search" ? "" : placeholder}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          disabled={disabled}
          onMouseDown={() => {
            setActive(true)
            setIsSearchVisible(true)
          }}
        />
        {type === "password" && (
          <span className={clsx(styles.eyeIcon, disabled && styles.disabled)} onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
          </span>
        )}
      </div>
      {errorText && <div className={styles.error}>{errorText}</div>}
    </div>
  )
}

export default React.memo(CustomInput)
