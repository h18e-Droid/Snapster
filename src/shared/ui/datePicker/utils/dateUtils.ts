/**
 * Утилиты для работы с датами в календаре
 * Все функции работают с UTC датами для избежания проблем с часовыми поясами
 */

/**
 * Возвращает количество дней в указанном месяце
 * @param date Дата, для которой нужно определить количество дней в месяце
 * @returns Число дней в месяце (28-31)
 */
export const daysInMonth = (date: Date) => {
  return new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0).getUTCDate()
}

/**
 * Определяет день недели для первого дня указанного месяца
 * @param date Дата, для которой определяется первый день месяца
 * @returns День недели (0 - воскресенье, 1 - понедельник, ..., 6 - суббота)
 */
export const firstDayOfMonth = (date: Date) => {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), 1).getUTCDay()
}

/**
 * Возвращает количество дней в предыдущем месяце
 * @param date Дата, для которой определяется предыдущий месяц
 * @returns Число дней в предыдущем месяце
 */
export const getPrevMonthDays = (date: Date) => {
  const prevMonth = new Date(date.getUTCFullYear(), date.getUTCMonth() - 1, 1)
  return new Date(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth() + 1, 0).getUTCDate()
}

/**
 * Проверяет, являются ли две даты одним и тем же днем (без учета времени)
 * @param date Первая дата для сравнения (может быть null)
 * @param selectedDate Вторая дата для сравнения (может быть null)
 * @returns true, если даты представляют один и тот же день
 */
export const isSameDay = (date: Date | null, selectedDate: Date | null) => {
  if (!date || !selectedDate) return false
  return date.toDateString() === selectedDate.toDateString()
}

/**
 * Нормализует дату, обнуляя часы, минуты, секунды и миллисекунды
 * @param date Дата для нормализации
 * @returns Новая дата с обнуленным временем
 */
export const normalizeDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/**
 * Проверяет, находится ли дата в указанном диапазоне (включительно)
 * @param date Проверяемая дата
 * @param start Начало диапазона (может быть null)
 * @param end Конец диапазона (может быть null)
 * @returns true, если дата находится между start и end (включительно)
 */
export const isDateInRange = (date: Date, start: Date | null, end: Date | null) => {
  if (!start || !end) return false

  const current = normalizeDate(date)
  const normStart = normalizeDate(start)
  const normEnd = normalizeDate(end)

  return (
    current >= new Date(Math.min(normStart.getTime(), normEnd.getTime())) &&
    current <= new Date(Math.max(normStart.getTime(), normEnd.getTime()))
  )
}

/**
 * Проверяет, является ли указанная дата сегодняшним днем (по UTC)
 * @param date Дата для проверки
 * @returns true, если дата совпадает с текущей UTC датой
 */
export const isToday = (date: Date) => {
  const today = new Date()
  return (
    date.getUTCDate() === today.getUTCDate() &&
    date.getUTCMonth() === today.getUTCMonth() &&
    date.getUTCFullYear() === today.getUTCFullYear()
  )
}

/**
 * Проверяет, является ли указанная дата выходным днем (суббота или воскресенье)
 * @param date Дата для проверки
 * @returns true, если день недели - суббота (6) или воскресенье (0)
 */
export const isWeekend = (date: Date) => {
  return date.getUTCDay() === 0 || date.getUTCDay() === 6
}
