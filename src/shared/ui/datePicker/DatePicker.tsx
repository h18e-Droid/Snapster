"use client"

import styles from "./DatePicker.module.scss"
import { useEffect, useRef, useState } from "react"
import { CalendarGrid } from "@/shared/ui/datePicker/calendarGrid/CalendarGrid"

export const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  // Закрытие календаря при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setIsOpen(false)
  }

  return (
    <div className={styles.container} ref={pickerRef}>
      <input
        type="text"
        className={styles.input}
        value={selectedDate?.toLocaleDateString() || ""}
        onClick={() => setIsOpen(!isOpen)}
        readOnly
        placeholder="Выберите дату"
      />

      {isOpen && (
        <div className={styles.calendar}>
          <CalendarGrid selectedDate={selectedDate} onSelect={handleDateSelect} />
        </div>
      )}
    </div>
  )
}
