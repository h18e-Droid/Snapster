"use client"

import styles from "./CustomSelect.module.scss"
import React, { useEffect, useRef, useState } from "react"
import { ArrowDownIcon } from "@/shared/assets/icons/components/ArrowDownIcon"
import clsx from "clsx"

type CustomSelectProps = {
  options: { id: string; title: string; iconSVG?: React.JSX.Element }[]
  onChange: (value: string) => void
  width: string
  label?: string
  disabled?: boolean
}

export const CustomSelect = ({ options, onChange, label, width, disabled }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string>(options[0].id)
  const selectRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const customSelectClassName = clsx(
    styles.customSelect,
    isOpen ? styles.selectOpen : "",
    disabled ? styles.disabled : "",
  )
  const selectedValueClassName = clsx(
    styles.selectedValue,
    isOpen ? styles.active : "",
    isHovered ? styles.hovered : "",
    disabled ? styles.disabled : "",
  )

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
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

  const selectedOption = options.find((option) => option.id === selectedValue)

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
        <select value={selectedValue} onChange={handleSelectChange} style={{ display: "none" }}>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
        <div
          className={selectedValueClassName}
          onClick={() => {
            setIsOpen(!isOpen)
            setIsHovered(false)
          }}
        >
          <div className={styles.optionsBox}>
            {selectedOption?.iconSVG && <div className={styles.iconFlag}>{selectedOption.iconSVG}</div>}
            {options.find((option) => option.id === selectedValue)?.title}
          </div>
          <div className={styles.checkmark}>{isOpen ? <ArrowDownIcon /> : <ArrowDownIcon />}</div>
        </div>
        {isOpen && (
          <div className={styles.options}>
            {options.map((option) => (
              <div
                key={option.id}
                className={styles.option}
                onClick={() =>
                  handleSelectChange({ target: { value: option.id } } as React.ChangeEvent<HTMLSelectElement>)
                }
              >
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
