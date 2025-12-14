import { useState, useEffect } from 'react'
import { TrendingUp, Target, Award, Calendar } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
import { calculateDayScore } from '../utils/calculations'
import { getAllDayData } from '../utils/dbStorage'
import { StatsCard } from './StatsCard'

export function AdditionalStats() {
  const [data, setData] = useState({})
  
  useEffect(() => {
    getAllDayData().then(setData)
  }, [])
  const today = new Date()
  const monthStart = startOfMonth(today)
  const monthEnd = endOfMonth(today)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  // Calculer les statistiques du mois
  const monthScores = days.map(day => {
    const dateKey = format(day, 'yyyy-MM-dd')
    const dayData = data[dateKey] || {}
    return calculateDayScore(dayData)
  }).filter(score => score > 0)
  
  const monthlyAverage = monthScores.length > 0
    ? Math.round(monthScores.reduce((sum, s) => sum + s, 0) / monthScores.length)
    : 0
  
  const bestDay = monthScores.length > 0 ? Math.max(...monthScores) : 0
  
  const completionRate = Math.round((monthScores.length / days.length) * 100)
  
  // Calculer la progression (comparer avec le mois précédent)
  const lastMonthStart = new Date(monthStart)
  lastMonthStart.setMonth(lastMonthStart.getMonth() - 1)
  const lastMonthEnd = new Date(monthStart)
  lastMonthEnd.setDate(lastMonthEnd.getDate() - 1)
  
  const lastMonthDays = eachDayOfInterval({ start: lastMonthStart, end: lastMonthEnd })
  const lastMonthScores = lastMonthDays.map(day => {
    const dateKey = format(day, 'yyyy-MM-dd')
    const dayData = data[dateKey] || {}
    return calculateDayScore(dayData)
  }).filter(score => score > 0)
  
  const lastMonthAverage = lastMonthScores.length > 0
    ? Math.round(lastMonthScores.reduce((sum, s) => sum + s, 0) / lastMonthScores.length)
    : 0
  
  const progression = lastMonthAverage > 0
    ? Math.round(((monthlyAverage - lastMonthAverage) / lastMonthAverage) * 100)
    : 0
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Moyenne Mensuelle"
        value={`${monthlyAverage}%`}
        subtitle={`${monthScores.length} jours actifs`}
        icon={TrendingUp}
        className="border-emerald-500/30"
      />
      <StatsCard
        title="Meilleur Jour"
        value={`${bestDay}%`}
        subtitle="Ce mois"
        icon={Award}
        className="border-yellow-500/30"
      />
      <StatsCard
        title="Taux de Complétion"
        value={`${completionRate}%`}
        subtitle="Jours complétés"
        icon={Target}
        className="border-indigo-500/30"
      />
      <StatsCard
        title="Progression"
        value={progression >= 0 ? `+${progression}%` : `${progression}%`}
        subtitle="vs mois précédent"
        icon={Calendar}
        className={progression >= 0 ? "border-emerald-500/30" : "border-red-500/30"}
      />
    </div>
  )
}

