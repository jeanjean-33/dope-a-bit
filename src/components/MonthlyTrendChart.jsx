import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
import { fr } from 'date-fns/locale'
import { calculateDayScore } from '../utils/calculations'
import { getAllDayData } from '../utils/dbStorage'

export function MonthlyTrendChart() {
  const [data, setData] = useState({})
  
  useEffect(() => {
    getAllDayData().then(setData)
  }, [])
  const today = new Date()
  const monthStart = startOfMonth(today)
  const monthEnd = endOfMonth(today)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  const chartData = days.map(day => {
    const dateKey = format(day, 'yyyy-MM-dd')
    const dayData = data[dateKey] || {}
    const score = calculateDayScore(dayData)
    
    return {
      date: format(day, 'dd/MM', { locale: fr }),
      score,
      fullDate: format(day, 'dd MMMM', { locale: fr })
    }
  })
  
  // Calculer la moyenne du mois
  const average = chartData.length > 0
    ? Math.round(chartData.reduce((sum, d) => sum + d.score, 0) / chartData.length)
    : 0
  
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-200">Tendance Mensuelle</h3>
        <div className="text-right">
          <p className="text-xs text-slate-400">Moyenne</p>
          <p className="text-2xl font-bold text-emerald-400">{average}%</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis 
            dataKey="date" 
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            interval="preserveStartEnd"
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
                return payload[0].payload.fullDate
              }
              return label
            }}
          />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

