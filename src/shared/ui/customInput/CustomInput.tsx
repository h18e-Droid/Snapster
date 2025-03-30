"use client"

import styles from "./CustomInput.module.scss"
import React, { ChangeEvent, useEffect, useState } from "react"
import { EyeIcon } from "@/shared/assets/icons/components/EyeIcon"
import { EyeOffIcon } from "@/shared/assets/icons/components/EyeOffIcon"
import { SearchIcon } from "@/shared/assets/icons/components/SearchIcon"
import clsx from "clsx"

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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState(value)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [active, setActive] = useState(false)

  const inputClassName = clsx(
    styles.input,
    disabled ? styles.disabled : "",
    emailError && styles.errorInput,
    active && styles.activeInput,
  )
  const searchIconClassName = clsx(styles.icon, disabled && styles.iconDisabled)
  const inputContainerClassName = clsx(styles.inputContainer, disabled ? styles.disabled : "")
  const placeholderTextClassName = clsx(styles.placeholderText, disabled ? styles.disabled : "")
  const eyeIconPasswordClassName = clsx(styles.eyeIcon, disabled ? styles.disabled : "")

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
    if (inputValue.length > 0) {
      setActive(true)
    }
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
      <div className={inputContainerClassName} style={{ width }}>
        {type === "search" && !isSearchVisible && !inputValue.length && (
          <div className={styles.placeholderContainer}>
            <SearchIcon className={searchIconClassName} />
            <span className={placeholderTextClassName}>{placeholder}</span>
          </div>
        )}
        <input
          className={inputClassName}
          type={type === "password" && !isPasswordVisible ? "password" : "text"}
          placeholder={type === "search" ? "" : placeholder}
          value={inputValue}
          onChange={onChangeHandler}
          disabled={disabled}
          onMouseDown={() => {
            setActive(true)
            setIsSearchVisible(true)
          }}
          onBlur={() => {
            setActive(false)
            if (!inputValue) {
              setIsSearchVisible(false)
            }
          }}
        />
        {type === "password" && (
          <span className={eyeIconPasswordClassName} onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
          </span>
        )}
        {emailError && <div className={styles.error}>{emailError}</div>} {/* Отображение ошибки */}
      </div>
    </div>
  )
}
