import { useState, useEffect } from 'react'
import { PillarCard } from '../components/PillarCard'
import { RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { getDateKey, formatDate, formatRelativeDate } from '../utils/dates'
import { getDayData, saveDayData, loadPillars } from '../utils/dbStorage'
import { calculateDayScore } from '../utils/calculations'
import { cn } from '../utils/cn'

export function TrackerView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const currentDateKey = getDateKey(currentDate)
  const [dayData, setDayData] = useState({})
  const [pillarsList, setPillarsList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const data = await getDayData(currentDateKey)
      setDayData(data)
      const pillars = await loadPillars()
      setPillarsList(Object.values(pillars))
      setLoading(false)
    }
    loadData()
  }, [currentDateKey])
  
  const handlePillarUpdate = async (pillarId, pillarData) => {
    const newDayData = {
      ...dayData,
      [pillarId]: pillarData
    }
    setDayData(newDayData)
    await saveDayData(currentDateKey, newDayData)
  }

  const navigateToPreviousDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 1)
    setCurrentDate(newDate)
  }

  const navigateToNextDay = () => {
    const today = new Date()
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)

    // Ne pas permettre d'aller au-delà d'aujourd'hui
    if (newDate <= today) {
      setCurrentDate(newDate)
    }
  }

  const canGoForward = () => {
    const today = new Date()
    const tomorrow = new Date(currentDate)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow <= today
  }

  const handleRefreshData = async () => {
    setLoading(true)
    const data = await getDayData(currentDateKey)
    setDayData(data)
    const pillars = await loadPillars()
    setPillarsList(Object.values(pillars))
    setLoading(false)
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
        <div className="mb-8 text-center">
          {/* Navigation temporelle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={navigateToPreviousDay}
              className="p-3 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-all"
              title="Jour précédent"
            >
              <ChevronLeft size={24} />
            </button>

            <h1 className="text-2xl font-bold text-slate-100 min-w-[200px]">
              {formatRelativeDate(currentDate)}
            </h1>

            <button
              onClick={navigateToNextDay}
              disabled={!canGoForward()}
              className={cn(
                "p-3 rounded-lg transition-all",
                canGoForward()
                  ? "text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
                  : "text-slate-600 cursor-not-allowed"
              )}
              title="Jour suivant"
            >
              <ChevronRight size={24} />
            </button>

            <button
              onClick={handleRefreshData}
              className={cn(
                "p-3 rounded-lg transition-all",
                "text-slate-400 hover:text-emerald-400 hover:bg-slate-800",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              disabled={loading}
              title="Actualiser les données"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          {/* Score central */}
          <div className="mb-6">
            <p className="text-sm text-slate-400 mb-4">Score du jour</p>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 relative mb-4">
                <svg className="transform -rotate-90" width="128" height="128">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-slate-800"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={352}
                    strokeDashoffset={352 - (score / 100) * 352}
                    strokeLinecap="round"
                    className="text-emerald-500 transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-100">{score}%</span>
                </div>
              </div>
              <p className="text-lg text-emerald-400 font-semibold">{score}%</p>
            </div>
          </div>

          <p className="text-slate-400">
            Complétez vos piliers pour maintenir votre équilibre dopamine
          </p>
        </div>

        {/* Dopamine Saine (À maintenir) */}
        <h2 className="text-xl font-bold text-white mb-6 text-center" style={{ lineHeight: '31px' }}>Dopamine Saine <span className="text-sm text-gray-400">(À maintenir)</span></h2>
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pillarsList
              .filter(pillar => pillar.type === 'positive')
              .map(pillar => (
                <PillarCard
                  key={pillar.id}
                  pillar={pillar}
                  dayData={dayData}
                  onUpdate={handlePillarUpdate}
                />
              ))}
          </div>
        </div>

        {/* Dopamine Detox (Abstinence = Succès) */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-6 text-center" style={{ lineHeight: '31px' }}>Dopamine Detox <span className="text-sm text-gray-400">(Abstinence = Succès)</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pillarsList
              .filter(pillar => pillar.type === 'detox')
              .map(pillar => (
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
    </div>
  )
}

