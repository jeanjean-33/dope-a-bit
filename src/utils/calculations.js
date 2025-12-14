import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns'
import { getPillarsList } from './pillarsStorage'

export function calculatePillarProgress(pillar, dayData) {
  const pillarData = dayData[pillar.id] || {}
  const tasks = pillar.tasks || []
  
  if (tasks.length === 0) return 0
  
  let completed = 0
  tasks.forEach((task, index) => {
    if (pillarData[`task_${index}`]) {
      completed++
    }
  })
  
  return Math.round((completed / tasks.length) * 100)
}

export function calculateDayScore(dayData) {
  if (!dayData || Object.keys(dayData).length === 0) return 0
  
  const pillarsList = getPillarsList()
  let totalProgress = 0
  let pillarCount = 0
  
  pillarsList.forEach(pillar => {
    const progress = calculatePillarProgress(pillar, dayData)
    totalProgress += progress
    pillarCount++
  })
  
  return pillarCount > 0 ? Math.round(totalProgress / pillarCount) : 0
}

export function calculateMonthlyPillarAverages(data, monthDate = new Date()) {
  const monthStart = startOfMonth(monthDate)
  const monthEnd = endOfMonth(monthDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  const pillarsList = getPillarsList()
  const averages = {}
  
  pillarsList.forEach(pillar => {
    let totalProgress = 0
    let dayCount = 0
    
    days.forEach(day => {
      const dateKey = format(day, 'yyyy-MM-dd')
      const dayData = data[dateKey]
      
      if (dayData) {
        const progress = calculatePillarProgress(pillar, dayData)
        totalProgress += progress
        dayCount++
      }
    })
    
    averages[pillar.id] = dayCount > 0 ? Math.round(totalProgress / dayCount) : 0
  })
  
  return averages
}

