import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { getDaysOfWeek } from '../utils/dates'
import { calculateDayScore } from '../utils/calculations'
import { getAllDayData } from '../utils/dbStorage'

export function WeeklyChart() {
  const [data, setData] = useState({})
  const weekDays = getDaysOfWeek()
  
  useEffect(() => {
    getAllDayData().then(setData)
  }, [])
  
  const chartData = weekDays.map(day => {
    const dateKey = format(day, 'yyyy-MM-dd')
    const dayData = data[dateKey] || {}
    const score = calculateDayScore(dayData)
    
    return {
      day: format(day, 'EEE', { locale: fr }),
      score,
      fullDate: format(day, 'dd/MM')
    }
  })
  
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Bilan Hebdomadaire</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis 
            dataKey="day" 
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <YAxis 
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#e2e8f0'
            }}
            formatter={(value) => [`${value}%`, 'Score']}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return `${label} - ${payload[0].payload.fullDate}`
              }
              return label
            }}
          />
          <Bar 
            dataKey="score" 
            fill="#10b981"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

