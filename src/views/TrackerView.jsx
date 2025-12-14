import { useState, useEffect } from 'react'
import { PillarCard } from '../components/PillarCard'
import { getDateKey } from '../utils/dates'
import { getDayData, saveDayData, loadPillars } from '../utils/dbStorage'
import { calculateDayScore } from '../utils/calculations'

export function TrackerView() {
  const todayKey = getDateKey()
  const [dayData, setDayData] = useState({})
  const [pillarsList, setPillarsList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const data = await getDayData(todayKey)
      setDayData(data)
      const pillars = await loadPillars()
      const pillarsArray = Object.values(pillars)
      setPillarsList(pillarsArray)
      setLoading(false)
    }
    loadData()
  }, [todayKey])
  
  const handlePillarUpdate = async (pillarId, pillarData) => {
    const newDayData = {
      ...dayData,
      [pillarId]: pillarData
    }
    setDayData(newDayData)
    await saveDayData(todayKey, newDayData)
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Chargement...</p>
        </div>
      </div>
    )
  }
  
  const score = calculateDayScore(dayData)
  
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Aujourd'hui</h1>
          <p className="text-slate-400">
            Complétez vos piliers pour maintenir votre équilibre dopamine
          </p>
        </div>
        
        <div className="mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Score du jour</p>
                <p className="text-4xl font-bold text-emerald-400">{score}%</p>
              </div>
              <div className="w-24 h-24 relative">
                <svg className="transform -rotate-90" width="96" height="96">
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-slate-800"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={264}
                    strokeDashoffset={264 - (score / 100) * 264}
                    strokeLinecap="round"
                    className="text-emerald-500 transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-semibold text-slate-200">{score}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pillarsList.map(pillar => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              dayData={dayData}
              onUpdate={handlePillarUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

