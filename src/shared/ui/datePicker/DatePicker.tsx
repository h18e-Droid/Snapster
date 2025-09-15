"use client"

import styles from "./DatePicker.module.scss"
import { useEffect, useRef, useState } from "react"
import { CalendarGrid } from "@/shared/ui/datePicker/calendarGrid/CalendarGrid"
import { CalendarIcon } from "@/shared/assets/icons/components/CalendarIcon"
import { CalendarOutlineIcon } from "@/shared/assets/icons/components/CalendarOutlineIcon"
import clsx from "clsx"
import { normalizeDate } from "@/shared/ui/datePicker/utils/dateUtils"

/**
 * Режимы работы DatePicker:
 * - "single" - выбор одной даты (по умолчанию)
 * - "range" - выбор диапазона дат
 */
type DatePickerMode = "single" | "range"

type Props = {
  /** Текстовая метка для поля ввода */
  label?: string
  /** Флаг неактивного состояния */
  isDisabled?: boolean
  /** Режим работы: выбор одной даты или диапазона */
  mode?: DatePickerMode
  /** ID для связи label и input (улучшает доступность) */
  id?: string
  value?: Date | null
  onChange?: (date: Date | null) => void
  error?: boolean
}

/**
 * Компонент DatePicker для выбора даты или диапазона дат.
 */
export const DatePicker = ({ label, isDisabled, mode = "single", id = "datepicker-input", value, onChange, error }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null
    end: Date | null
  }>({ start: null, end: null })
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  const today = normalizeDate(new Date())
  const actualDate = value ?? selectedDate

  const [isEditing, setIsEditing] = useState(false)
  const [manualInput, setManualInput] = useState("")

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setIsEditing(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  /**
   * Обработчик выбора даты
   * @param date - Выбранная дата
   */
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setIsEditing(false)
    if (mode === "single") {
      setSelectedRange({ start: null, end: null }) // Сбрасываем диапазон
      setIsOpen(false)
    }
    onChange?.(date)
    if (!onChange) {
      setSelectedDate(date)
    }
  }

  /**
   * Обработчик выбора диапазона дат
   * @param start - Начальная дата диапазона
   * @param end - Конечная дата диапазона
   */
  const handleRangeSelect = (start: Date, end: Date) => {
    if (mode === "range" && start.toDateString() !== end.toDateString()) {
      setSelectedRange({ start, end })
      setSelectedDate(null)
    }
  }
  const handleDoubleClick = () => {
    setIsEditing(true)
    setManualInput(actualDate ? actualDate.toLocaleDateString() : "")
  }
  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualInput(e.target.value)
  }
  const handleManualSubmit = () => {
    const parsedDate = new Date(manualInput)
    if (!isNaN(parsedDate.getTime())) {
      setSelectedDate(parsedDate)
      onChange?.(parsedDate)
      setIsEditing(false)
    }
  }

  const containerClass = clsx(styles.container, error && styles.error, isDisabled && styles.disabled)

  const customInputClass = clsx(styles.customInput, error && styles.error, isDisabled && styles.disabled)

  return (
    <div className={containerClass} ref={pickerRef} role="application" aria-label="Выбор даты">
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={customInputClass}>
        <input
          id={id}
          type="text"
          className={styles.input}
          disabled={isDisabled}
          value={isEditing ? manualInput : actualDate ? actualDate.toLocaleDateString() : ""}
          onClick={() => setIsOpen(!isOpen)}
          onDoubleClick={handleDoubleClick}
          onChange={handleManualChange}
          onBlur={handleManualSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleManualSubmit()
            }
          }}
          readOnly={!isEditing}
          placeholder={mode === "single" ? "Выберите дату" : "Выберите диапазон"}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-autocomplete="none"
        />
        {isOpen ? <CalendarIcon aria-hidden="true" /> : <CalendarOutlineIcon aria-hidden="true" />}
      </div>
      {isOpen && (
        <div className={styles.calendar} role="dialog" aria-modal="true" aria-label="Календарь">
          <CalendarGrid
            selectedDate={actualDate}
            onSelect={handleDateSelect}
            onSelectRange={mode === "range" ? handleRangeSelect : undefined}
          />
        </div>
      )}
    </div>
  )
}
