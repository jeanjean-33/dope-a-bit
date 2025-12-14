import { useState, useEffect } from 'react'
import { Moon, Activity, BookOpen, Sun, ShoppingCart, Flame, Smartphone } from 'lucide-react'
import { getPillarsList } from '../utils/pillarsStorage'
import { calculateMonthlyPillarAverages } from '../utils/calculations'
import { getAllDayData } from '../utils/dbStorage'
import { cn } from '../utils/cn'

const iconMap = {
  Moon,
  Activity,
  BookOpen,
  Sun,
  ShoppingCart,
  Flame,
  Smartphone
}

export function PillarProgress() {
  const [data, setData] = useState({})
  const pillarsList = getPillarsList()
  
  useEffect(() => {
    getAllDayData().then(setData)
  }, [])
  
  const averages = calculateMonthlyPillarAverages(data)
  
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Performance par Pilier (Mois)</h3>
      <div className="space-y-4">
        {pillarsList.map(pillar => {
          const score = averages[pillar.id] || 0
          const Icon = iconMap[pillar.icon]
          const isPositive = pillar.type === 'positive'
          
          return (
            <div key={pillar.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    isPositive ? "bg-emerald-500/20 text-emerald-400" : "bg-indigo-500/20 text-indigo-400"
                  )}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{pillar.name}</p>
                    <p className="text-xs text-slate-500">
                      {isPositive ? 'Investissement' : 'Abstinence'}
                    </p>
                  </div>
                </div>
                <span className={cn(
                  "text-lg font-bold",
                  score >= 80 ? "text-emerald-400" : score >= 60 ? "text-emerald-500" : score >= 40 ? "text-yellow-500" : "text-slate-500"
                )}>
                  {score}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div
                  className={cn(
                    "h-2 rounded-full transition-all duration-500",
                    score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-emerald-600" : score >= 40 ? "bg-yellow-500" : "bg-slate-600"
                  )}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

