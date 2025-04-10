"use client"

import styles from "./DatePicker.module.scss"
import { useEffect, useRef, useState } from "react"
import { CalendarGrid } from "@/shared/ui/datePicker/calendarGrid/CalendarGrid"
import { CalendarIcon } from "@/shared/assets/icons/components/CalendarIcon"
import { CalendarOutlineIcon } from "@/shared/assets/icons/components/CalendarOutlineIcon"
import clsx from "clsx"

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
}

/**
 * Компонент DatePicker для выбора даты или диапазона дат.
 */
export const DatePicker = ({ label, isDisabled, mode = "single", id = "datepicker-input" }: Props) => {
  // Состояние выбранной даты (для режима "single")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Состояние выбранного диапазона (для режима "range")
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null
    end: Date | null
  }>({ start: null, end: null })

  // Флаг открытия/закрытия календаря
  const [isOpen, setIsOpen] = useState(false)

  // Ссылка на DOM-элемент для обработки кликов вне компонента
  const pickerRef = useRef<HTMLDivElement>(null)

  // Состояние ошибки (можно вынести в пропсы при необходимости)
  const error = false
  const errorMessage = "Error"

  // Обработчик клика вне компонента (закрытие календаря)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
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
    if (mode === "single") {
      setSelectedRange({ start: null, end: null }) // Сбрасываем диапазон
      setIsOpen(false)
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

  // Динамические классы для стилизации
  const containerClass = clsx(styles.container, error && styles.error, isDisabled && styles.disabled)

  const customInputClass = clsx(styles.customInput, error && styles.error, isDisabled && styles.disabled)

  return (
    <div
      className={containerClass}
      ref={pickerRef}
      role="application"
      aria-label="Выбор даты"
    >
      {/* Лейбл с явной связью через htmlFor */}
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      {/* Обертка для поля ввода */}
      <div className={customInputClass}>
        <input
          id={id}
          type="text"
          className={styles.input}
          disabled={isDisabled}
          value={
            mode === "single"
              ? selectedDate?.toLocaleDateString() || ""
              : selectedRange.start && selectedRange.end
                ? `${selectedRange.start.toLocaleDateString()} - ${selectedRange.end.toLocaleDateString()}`
                : ""
          }
          onClick={() => setIsOpen(!isOpen)}
          readOnly
          placeholder={mode === "single" ? "Выберите дату" : "Выберите диапазон"}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-autocomplete="none"
        />
        {isOpen ? <CalendarIcon aria-hidden="true" /> : <CalendarOutlineIcon aria-hidden="true" />}
      </div>

      {/* Всплывающий календарь */}
      {isOpen && (
        <div
          className={styles.calendar}
          role="dialog"
          aria-modal="true"
          aria-label="Календарь"
        >
          <CalendarGrid
            selectedDate={selectedDate}
            onSelect={handleDateSelect}
            onSelectRange={mode === "range" ? handleRangeSelect : undefined}
          />
        </div>
      )}

      {/* Блок для отображения ошибок */}
      <div
        className={styles.errorContainer}
        role="alert"
        aria-live="assertive"
      >
        {error && <span className={styles.errorMessage}>{errorMessage}</span>}
      </div>
    </div>
  )
}
