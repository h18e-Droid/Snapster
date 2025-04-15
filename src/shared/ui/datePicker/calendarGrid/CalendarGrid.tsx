import { useState } from "react"
import styles from "./CalendarGrid.module.scss"
import { ArrowForwardIcon } from "@/shared/assets/icons/components/ArrowForwardIcon"
import { ArrowBackIcon } from "@/shared/assets/icons/components/ArrowBackIcon"
import { daysInMonth, firstDayOfMonth, getPrevMonthDays } from "../utils/dateUtils"
import { useCalendarHandlers } from "@/shared/ui/datePicker/hooks/calendarHandlers"

/**
 * Пропсы компонента CalendarGrid
 * @param selectedDate - Выбранная дата (может быть null)
 * @param onSelect - Колбэк при выборе даты
 * @param onSelectRange - Опциональный колбэк при выборе диапазона дат
 */
interface CalendarGridProps {
  selectedDate: Date | null
  onSelect: (date: Date) => void
  onSelectRange?: (start: Date, end: Date) => void
}

/**
 * Компонент отображает календарную сетку с возможностью:
 * - Выбора одной даты
 * - Выбора диапазона дат (если передан onSelectRange)
 * - Навигации между месяцами
 * - Подсветки текущей даты, выходных и выбранного диапазона
 */
export const CalendarGrid = ({ selectedDate, onSelect, onSelectRange }: CalendarGridProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Кастомные обработчики для работы с датами
  const {
    handlePrevMonthDayClick,
    handleNextMonthDayClick,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    getDayProps,
  } = useCalendarHandlers(currentMonth, selectedDate, onSelect, onSelectRange)

  /**
   * Генерирует массив JSX-элементов дней для отображения в календаре
   * Включает:
   * - Дни предыдущего месяца (если месяц начинается не с понедельника)
   * - Дни текущего месяца
   * - Дни следующего месяца (чтобы заполнить последнюю неделю)
   * @returns Массив JSX-элементов дней календаря
   */
  const renderDays = () => {
    const days = []
    const totalDays = daysInMonth(currentMonth)
    const firstDay = firstDayOfMonth(currentMonth)
    const prevMonthDays = getPrevMonthDays(currentMonth)

    // Дни предыдущего месяца (серые)
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i
      days.push(
        <div
          key={`prev-${day}`}
          className={`${styles.day} ${styles.otherMonth}`}
          onClick={() => handlePrevMonthDayClick(day)}
          role="gridcell"
          aria-disabled="true"
          aria-label={`${day} предыдущего месяца`}
        >
          <span className={styles.dayContent}>{day}</span>
        </div>,
      )
    }

    // Дни текущего месяца
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(Date.UTC(currentMonth.getUTCFullYear(), currentMonth.getUTCMonth(), day))
      const { isSelected, isWeekend, isToday, inRange, rangePosition } = getDayProps(date)

      days.push(
        <div
          key={`day-${day}`}
          className={`${styles.day}
           ${isSelected ? styles.selected : ""}
           ${isWeekend ? styles.weekend : ""} 
           ${isToday ? styles.today : ""} 
           ${inRange ? styles.selectedRange : ""}
           ${rangePosition ? styles[rangePosition] : ""}`}
          {...(onSelectRange && {
            onMouseDown: () => handleMouseDown(date),
            onMouseEnter: () => handleMouseEnter(date),
          })}
          onClick={() => onSelect(date)}
          role="gridcell"
          aria-selected={isSelected}
          aria-current={isToday ? "date" : undefined}
          aria-label={date.toLocaleDateString("ru-RU", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        >
          <span className={styles.dayContent}>{day}</span>
        </div>,
      )
    }

    // Дни следующего месяца (серые)
    const remainingDays = 42 - (firstDay + totalDays) // Всегда 6 недель (42 дня)
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(Date.UTC(currentMonth.getUTCFullYear(), currentMonth.getUTCMonth() + 1, day))
      const { inRange, rangePosition } = getDayProps(date)
      days.push(
        <div
          key={`next-${day}`}
          className={`${styles.day} ${styles.otherMonth} ${
            inRange ? styles.selectedRange : ""
          } ${rangePosition ? styles[rangePosition] : ""}`}
          onClick={() => handleNextMonthDayClick(day)}
          onMouseEnter={() => onSelectRange && handleMouseEnter(date)}
          role="gridcell"
          aria-disabled="true"
          aria-label={`${day} следующего месяца`}
        >
          <span className={styles.dayContent}>{day}</span>
        </div>,
      )
    }
    return days
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(Date.UTC(currentMonth.getUTCFullYear(), currentMonth.getUTCMonth() - 1, 1)))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(Date.UTC(currentMonth.getUTCFullYear(), currentMonth.getUTCMonth() + 1, 1)))
  }

  return (
    <div className={styles.calendarGrid} onMouseUp={handleMouseUp} role="grid" aria-label="Календарь">
      {/* Шапка календаря с навигацией */}
      <div className={styles.header}>
        <h2 aria-live="polite">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className={styles.buttonGroup}>
          <button onClick={prevMonth} aria-label="Предыдущий месяц">
            <ArrowBackIcon size={20} aria-hidden="true" />
          </button>
          <button onClick={nextMonth} aria-label="Следующий месяц">
            <ArrowForwardIcon size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Дни недели */}
      <div className={styles.weekdays} role="row">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
          <div key={day} className={styles.weekday} role="columnheader" aria-label={day}>
            {day}
          </div>
        ))}
      </div>

      {/* Сетка дней */}
      <div className={styles.days} role="rowgroup">
        {renderDays()}
      </div>
    </div>
  )
}
