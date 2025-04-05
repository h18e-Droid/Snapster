import { useState } from "react"
import styles from "./CalendarGrid.module.scss"
import { ArrowForwardIcon } from "@/shared/assets/icons/components/ArrowForwardIcon"
import { ArrowBackIcon } from "@/shared/assets/icons/components/ArrowBackIcon"

export const CalendarGrid = ({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date | null
  onSelect: (date: Date) => void
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const renderDays = () => {
    const days = []
    const totalDays = daysInMonth(currentMonth)
    const firstDay = firstDayOfMonth(currentMonth)

    // Пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>)
    }

    // Ячейки текущего месяца
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)

      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()

      days.push(
        <div
          key={`day-${day}`}
          className={`${styles.day} ${isSelected ? styles.selected : ""}`}
          onClick={() => onSelect(date)}
        >
          {day}
        </div>,
      )
    }

    return days
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  return (
    <div className={styles.calendarGrid}>
      <div className={styles.header}>
        <h3>
          {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
        </h3>
        <button onClick={prevMonth}>
          <ArrowBackIcon />
        </button>
        <button onClick={nextMonth}>
          <ArrowForwardIcon />
        </button>
      </div>

      <div className={styles.weekdays}>
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.days}>{renderDays()}</div>
    </div>
  )
}
