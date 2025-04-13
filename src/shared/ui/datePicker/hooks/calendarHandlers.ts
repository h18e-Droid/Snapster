import { isDateInRange, isSameDay, isToday, isWeekend, normalizeDate } from "../utils/dateUtils"
import { useCallback, useEffect, useState } from "react"

/**
 * Кастомный хук для обработки взаимодействий с календарем
 * @param currentMonth Текущий отображаемый месяц
 * @param selectedDate Выбранная дата (может быть null)
 * @param onSelect Колбэк при выборе даты
 * @param onSelectRange Опциональный колбэк при выборе диапазона дат
 * @returns Объект с обработчиками и методами для работы с календарем
 */
export const useCalendarHandlers = (
  currentMonth: Date,
  selectedDate: Date | null,
  onSelect: (date: Date) => void,
  onSelectRange?: (start: Date, end: Date) => void,
) => {
  // Состояния для выделения диапазона
  const [selectionStart, setSelectionStart] = useState<Date | null>(null) // Начало выделения
  const [selectionEnd, setSelectionEnd] = useState<Date | null>(null) // Конец выделения
  const [isSelecting, setIsSelecting] = useState(false) // Флаг процесса выделения

  /**
   * Обработчик клика по дню предыдущего месяца
   * @param day Число дня из предыдущего месяца
   */
  const handlePrevMonthDayClick = (day: number) => {
    const prevMonthDate = new Date(currentMonth.getUTCFullYear(), currentMonth.getUTCMonth() - 1, day)
    onSelect(prevMonthDate)
  }

  /**
   * Обработчик клика по дню следующего месяца
   * @param day Число дня из следующего месяца
   */
  const handleNextMonthDayClick = (day: number) => {
    const nextMonthDate = new Date(currentMonth.getUTCFullYear(), currentMonth.getUTCMonth() + 1, day)
    onSelect(nextMonthDate)
  }

  /**
   * Обработчик начала выделения (нажатие мыши)
   * @param date Дата, с которой начинается выделение
   */
  const handleMouseDown = useCallback((date: Date) => {
    setIsSelecting(true)
    setSelectionStart(date)
    setSelectionEnd(null) // Сбрасываем предыдущее выделение
  }, [])

  /**
   * Обработчик перемещения мыши при выделении
   * @param date Дата, над которой находится курсор
   */
  const handleMouseEnter = (date: Date) => {
    if (isSelecting) {
      setSelectionEnd(date)
    }
  }

  /**
   * Обработчик завершения выделения (отпускание мыши)
   * Определяет окончательный диапазон и вызывает соответствующий колбэк
   */
  const handleMouseUp = useCallback(() => {
    if (isSelecting && selectionStart && onSelectRange) {
      if (!selectionEnd) {
        // Если выделена только одна дата
        onSelect?.(selectionStart)
      } else {
        // Упорядочиваем даты, если выделение было в обратном порядке
        if (selectionStart > selectionEnd) {
          onSelectRange?.(selectionEnd, selectionStart)
        } else {
          onSelectRange?.(selectionStart, selectionEnd)
        }
      }
      setIsSelecting(false)
    }
  }, [isSelecting, selectionStart, selectionEnd, onSelect, onSelectRange])

  // Глобальный обработчик отпускания мыши (на случай, если отпустили вне компонента)
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isSelecting) {
        setIsSelecting(false)
      }
    }

    window.addEventListener("mouseup", handleGlobalMouseUp)
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp)
  }, [isSelecting])

  /**
   * Определяет позицию даты в выделенном диапазоне
   * @param date Проверяемая дата
   * @returns "start" | "end" | "middle" | null
   */
  const getRangePosition = (date: Date) => {
    if (!selectionStart || !selectionEnd) return null

    const normalizedDate = normalizeDate(date)
    const normStart = normalizeDate(selectionStart)
    const normEnd = normalizeDate(selectionEnd)

    // Упорядочиваем даты по возрастанию
    const [start, end] = normStart < normEnd ? [normStart, normEnd] : [normEnd, normStart]

    if (isSameDay(normalizedDate, start)) return "start"
    if (isSameDay(normalizedDate, end)) return "end"
    if (normalizedDate > start && normalizedDate < end) return "middle"
    return null
  }

  /**
   * Возвращает свойства дня для отображения в календаре
   * @param date Дата, для которой получаем свойства
   * @returns Объект с флагами состояния дня:
   *   - isSelected: является ли выбранной датой
   *   - isWeekend: выходной ли день
   *   - isToday: сегодняшняя дата
   *   - inRange: входит ли в выделенный диапазон
   *   - rangePosition: позиция в диапазоне (start/middle/end)
   */
  const getDayProps = (date: Date) => {
    const isInRange = isDateInRange(date, selectionStart, selectionEnd)
    const rangePosition = getRangePosition(date)

    return {
      isSelected: isSameDay(date, selectedDate),
      isWeekend: isWeekend(date),
      isToday: isToday(date),
      inRange: isInRange,
      rangePosition,
    }
  }

  return {
    handlePrevMonthDayClick,
    handleNextMonthDayClick,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    getDayProps,
    isSelecting,
  }
}
