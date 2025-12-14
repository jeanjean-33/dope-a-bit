import { useState, useEffect } from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts'
import { getPillarsList } from '../utils/pillarsStorage'
import { calculateMonthlyPillarAverages } from '../utils/calculations'
import { getAllDayData } from '../utils/dbStorage'

export function PillarRadarChart() {
  const [data, setData] = useState({})
  const pillarsList = getPillarsList()
  
  useEffect(() => {
    getAllDayData().then(setData)
  }, [])
  
  const averages = calculateMonthlyPillarAverages(data)
  
  const chartData = pillarsList.map(pillar => ({
    pillar: pillar.name,
    score: averages[pillar.id] || 0
  }))
  
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Équilibre Mensuel</h3>
      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={chartData}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis 
            dataKey="pillar" 
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]}
            tick={{ fill: '#64748b', fontSize: 10 }}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

