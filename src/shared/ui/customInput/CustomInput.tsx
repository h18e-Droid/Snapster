"use client"

import styles from "./CustomInput.module.scss"
import React, { ChangeEvent, useEffect, useState } from "react"
import { EyeIcon } from "@/shared/assets/icons/components/EyeIcon"
import { EyeOffIcon } from "@/shared/assets/icons/components/EyeOffIcon"
import { SearchIcon } from "@/shared/assets/icons/components/SearchIcon"

type Props = {
  type: string
  placeholder: string
  value: string
  onChange: (e: string) => void
  disabled?: boolean
  label?: string
  width?: string
  errorText?: string
}

export const CustomInput = (props: Props) => {
  const { type, placeholder, value, onChange, disabled, label, width, errorText } = props

  const colorDisabled = "#4C4C4C"
  const colorSecondary = "#8D9094"

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState(value)
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value.trim()
    setInputValue(newValue)
    onChange(newValue)
  }

  const isValidEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailPattern.test(email)
  }

  useEffect(() => {
    if (!disabled && inputValue.length > 0 && type === "email") {
      const timer = setTimeout(() => {
        if (!isValidEmail(inputValue)) {
          setEmailError(errorText !== undefined ? errorText : null)
        } else {
          setEmailError(null)
        }
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      setEmailError(null)
    }
  }, [inputValue, type, disabled])

  return (
    <div className={styles.inputBox}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={`${styles.inputContainer} ${disabled ? styles.disabled : ""}`} style={{ width }}>
        {type === "search" && !isSearchVisible && !inputValue.length && (
          <div className={styles.placeholderContainer}>
            <SearchIcon color={disabled ? colorDisabled : colorSecondary} className={styles.icon} />
            <span className={`${styles.placeholderText} ${disabled ? styles.disabled : ""}`}>{placeholder}</span>
          </div>
        )}
        <input
          className={`${styles.input} ${disabled ? styles.disabled : ""} ${emailError && styles.errorInput}`}
          type={type === "password" && !isPasswordVisible ? "password" : "text"}
          placeholder={type === "search" ? "" : placeholder}
          value={inputValue}
          onChange={onChangeHandler}
          disabled={disabled}
          onMouseDown={() => {
            setIsSearchVisible(true)
          }}
          onBlur={() => {
            if (!inputValue) {
              setIsSearchVisible(false)
            }
          }}
        />
        {type === "password" && (
          <span className={`${styles.eyeIcon} ${disabled ? styles.disabled : ""}`} onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
          </span>
        )}
        {emailError && <div className={styles.error}>{emailError}</div>} {/* Отображение ошибки */}
      </div>
    </div>
  )
}
