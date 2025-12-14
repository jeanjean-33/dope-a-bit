import { useState, useEffect } from 'react'
import { StatsCard } from '../components/StatsCard'
import { WeeklyChart } from '../components/WeeklyChart'
import { PillarRadarChart } from '../components/RadarChart'
import { ContributionGraph } from '../components/ContributionGraph'
import { MonthlyTrendChart } from '../components/MonthlyTrendChart'
import { PillarProgress } from '../components/PillarProgress'
import { AdditionalStats } from '../components/AdditionalStats'
import { Trophy, Flame, Calendar } from 'lucide-react'
import { getDateKey, getStreak } from '../utils/dates'
import { calculateDayScore } from '../utils/calculations'
import { getAllDayData } from '../utils/dbStorage'

export function DashboardView() {
  const [data, setData] = useState({})
  const todayKey = getDateKey()
  
  useEffect(() => {
    // Charger les données au démarrage
    getAllDayData().then(setData)
    
    // Rafraîchir les données périodiquement
    const interval = setInterval(() => {
      getAllDayData().then(setData)
    }, 5000) // Toutes les 5 secondes
    
    return () => clearInterval(interval)
  }, [])
  
  const todayScore = calculateDayScore(data[todayKey] || {})
  const streak = getStreak(data)
  
  // Compter les jours complétés (score > 0)
  const totalDaysCompleted = Object.values(data).filter(dayData => {
    const score = calculateDayScore(dayData)
    return score > 0
  }).length
  
  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Dashboard</h1>
          <p className="text-slate-400">
            Visualisez votre progression et votre constance
          </p>
        </div>
        
        {/* KPIs Principaux */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard
            title="Score du jour"
            value={`${todayScore}%`}
            subtitle="Performance actuelle"
            icon={Trophy}
            className="border-emerald-500/30"
          />
          <StatsCard
            title="Streak"
            value={streak}
            subtitle="jours consécutifs"
            icon={Flame}
            className="border-indigo-500/30"
          />
          <StatsCard
            title="Total jours"
            value={totalDaysCompleted}
            subtitle="complétés"
            icon={Calendar}
            className="border-slate-700"
          />
        </div>
        
        {/* Statistiques Additionnelles */}
        <div className="mb-6">
          <AdditionalStats />
        </div>
        
        {/* Graphiques Hebdomadaires et Mensuels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <WeeklyChart />
          <MonthlyTrendChart />
        </div>
        
        {/* Radar Chart et Performance par Pilier */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PillarRadarChart />
          <PillarProgress />
        </div>
        
        {/* Contribution Graph */}
        <div className="mb-6">
          <ContributionGraph />
        </div>
      </div>
    </div>
  )
}

