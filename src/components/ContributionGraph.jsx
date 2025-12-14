import { useState, useEffect } from 'react'
import { format, startOfYear, endOfYear, startOfWeek, eachDayOfInterval } from 'date-fns'
import { calculateDayScore } from '../utils/calculations'
import { getAllDayData } from '../utils/dbStorage'
import { getDateKey } from '../utils/dates'
import { cn } from '../utils/cn'

export function ContributionGraph() {
  const [data, setData] = useState({})
  
  useEffect(() => {
    getAllDayData().then(setData)
  }, [])
  const yearStart = startOfYear(new Date())
  const yearEnd = endOfYear(new Date())
  const days = eachDayOfInterval({ start: yearStart, end: yearEnd })
  
  // Organiser les jours par semaine (comme GitHub contributions)
  // Chaque colonne = une semaine, chaque ligne = un jour de la semaine
  const firstWeekStart = startOfWeek(yearStart, { weekStartsOn: 1 })
  const lastWeekStart = startOfWeek(yearEnd, { weekStartsOn: 1 })
  const weeks = []
  
  // Créer un tableau de 7 lignes (jours de la semaine) x N colonnes (semaines)
  const weekCount = Math.ceil((lastWeekStart.getTime() - firstWeekStart.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1
  
  for (let weekIndex = 0; weekIndex < weekCount; weekIndex++) {
    const weekStart = new Date(firstWeekStart)
    weekStart.setDate(weekStart.getDate() + weekIndex * 7)
    weeks.push(weekStart)
  }
  
  const getIntensity = (score) => {
    if (score === 0) return 0
    if (score < 30) return 1
    if (score < 60) return 2
    if (score < 80) return 3
    return 4
  }
  
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Constance Annuelle</h3>
      <div className="overflow-x-auto">
        <div className="inline-flex gap-1">
          {weeks.map((weekStart, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {[0, 1, 2, 3, 4, 5, 6].map((dayOffset) => {
                const day = new Date(weekStart)
                day.setDate(day.getDate() + dayOffset)
                
                // Vérifier si le jour est dans l'année
                if (day < yearStart || day > yearEnd) {
                  return <div key={dayOffset} className="w-3 h-3" />
                }
                
                const dateKey = getDateKey(day)
                const dayData = data[dateKey] || {}
                const score = calculateDayScore(dayData)
                const intensity = getIntensity(score)
                
                const colors = [
                  'bg-slate-800',      // 0%
                  'bg-emerald-900',    // 1-29%
                  'bg-emerald-700',    // 30-59%
                  'bg-emerald-500',    // 60-79%
                  'bg-emerald-400'     // 80-100%
                ]
                
                return (
                  <div
                    key={dayOffset}
                    className={cn(
                      "w-3 h-3 rounded-sm",
                      colors[intensity],
                      "hover:ring-2 hover:ring-emerald-400 hover:ring-offset-2 hover:ring-offset-slate-900 transition-all cursor-pointer"
                    )}
                    title={`${format(day, 'dd/MM/yyyy')}: ${score}%`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
        <span>Moins</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-slate-800" />
          <div className="w-3 h-3 rounded-sm bg-emerald-900" />
          <div className="w-3 h-3 rounded-sm bg-emerald-700" />
          <div className="w-3 h-3 rounded-sm bg-emerald-500" />
          <div className="w-3 h-3 rounded-sm bg-emerald-400" />
        </div>
        <span>Plus</span>
      </div>
    </div>
  )
}

