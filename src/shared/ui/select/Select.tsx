"use client"

import styles from "./Select.module.scss"
import React, { useEffect, useRef, useState } from "react"
import { ArrowDownIcon } from "@/shared/assets/icons/components/ArrowDownIcon"
import clsx from "clsx"

type CustomSelectProps = {
  options: { id: string; title: string; iconSVG?: React.JSX.Element }[]
  onChange: (value: string) => void
  width?: string
  label?: string
  disabled?: boolean
  placeholderId?: string
  placeholderTitle?: string
  value?: string
}

export const Select = ({
  options,
  onChange,
  label,
  width,
  disabled = false,
  placeholderId = "placeholder",
  placeholderTitle,
  value,
}: CustomSelectProps) => {
  const hasPlaceholder = !!placeholderTitle
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string>(
    value ? value : hasPlaceholder ? placeholderId : options[0].id,
  )
  const selectRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const isPlaceholderSelected = selectedValue === placeholderId
  const currentOption = options.find((option) => option.id === selectedValue)
  const currentTitle = isPlaceholderSelected ? placeholderTitle : currentOption?.title
  const currentIcon = isPlaceholderSelected ? null : currentOption?.iconSVG

  const customSelectClassName = clsx(styles.customSelect, isOpen && styles.selectOpen, disabled && styles.disabled)

  const selectedValueClassName = clsx(
    styles.selectedValue,
    isOpen && styles.active,
    isHovered && styles.hovered,
    disabled && styles.disabled,
    isPlaceholderSelected && hasPlaceholder && styles.placeholder,
  )

  const handleSelectChange = (value: string) => {
    setSelectedValue(value)
    onChange(value)
    setIsOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value || (hasPlaceholder ? placeholderId : options[0]?.id))
    }
  }, [value, hasPlaceholder, options])

  return (
    <div className={styles.selectBox}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        style={{ width }}
        className={customSelectClassName}
        ref={selectRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={0}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <select value={selectedValue} onChange={(e) => handleSelectChange(e.target.value)} style={{ display: "none" }}>
          {hasPlaceholder && (
            <option value={placeholderId} disabled>
              {placeholderTitle}
            </option>
          )}
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
        <div
          className={selectedValueClassName}
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen)
              setIsHovered(false)
            }
          }}
        >
          <div className={styles.optionsBox}>
            {currentIcon && <div className={styles.iconFlag}>{currentIcon}</div>}
            {currentTitle}
          </div>
          <div className={styles.checkmark}>
            <ArrowDownIcon />
          </div>
        </div>

        {isOpen && (
          <div className={styles.options}>
            {options.map((option) => (
              <div key={option.id} className={styles.option} onClick={() => handleSelectChange(option.id)}>
                {option.iconSVG && <div className={styles.iconFlag}>{option.iconSVG}</div>}
                {option.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
