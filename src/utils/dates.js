import { format, startOfDay, isToday, isSameDay, eachDayOfInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, differenceInDays } from 'date-fns'
import { fr } from 'date-fns/locale'
import { calculateDayScore } from './calculations'

export function getDateKey(date = new Date()) {
  return format(startOfDay(date), 'yyyy-MM-dd')
}

export function formatDate(date, formatStr = 'dd/MM/yyyy') {
  return format(date, formatStr, { locale: fr })
}

export function isTodayDate(date) {
  return isToday(date)
}

export function isSameDayDate(date1, date2) {
  return isSameDay(date1, date2)
}

export function getDaysOfWeek(date = new Date()) {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 })
  return eachDayOfInterval({ start: weekStart, end: weekEnd })
}

export function getDaysOfMonth(date = new Date()) {
  const monthStart = startOfMonth(date)
  const monthEnd = endOfMonth(date)
  return eachDayOfInterval({ start: monthStart, end: monthEnd })
}

export function getDaysOfYear(date = new Date()) {
  const yearStart = startOfYear(date)
  const yearEnd = endOfYear(date)
  return eachDayOfInterval({ start: yearStart, end: yearEnd })
}

export function getDaysInRange(startDate, endDate) {
  return eachDayOfInterval({ start: startDate, end: endDate })
}

export function getStreak(data) {
  const today = new Date()
  let streak = 0
  let currentDate = new Date(today)
  
  while (true) {
    const dateKey = getDateKey(currentDate)
    const dayData = data[dateKey]
    
    if (!dayData || Object.keys(dayData).length === 0) {
      break
    }
    
    const score = calculateDayScore(dayData)
    if (score === 0) {
      break
    }
    
    streak++
    currentDate.setDate(currentDate.getDate() - 1)
  }
  
  return streak
}

