import { useState } from 'react'
import { Moon, Activity, BookOpen, Sun, ShoppingCart, Flame, Smartphone } from 'lucide-react'
import { CircularProgress } from './CircularProgress'
import { calculatePillarProgress } from '../utils/calculations'
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

export function PillarCard({ pillar, dayData, onUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const progress = calculatePillarProgress(pillar, dayData)
  const Icon = iconMap[pillar.icon]
  const pillarData = dayData[pillar.id] || {}
  
  const handleTaskToggle = (taskIndex) => {
    const newPillarData = { ...pillarData }
    newPillarData[`task_${taskIndex}`] = !newPillarData[`task_${taskIndex}`]
    
    onUpdate(pillar.id, newPillarData)
  }
  
  return (
    <div
      className={cn(
        "bg-slate-900 border border-slate-800 rounded-xl p-6 cursor-pointer transition-all duration-200",
        "hover:border-slate-700 hover:shadow-lg hover:shadow-emerald-500/10",
        isExpanded && "col-span-full"
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            pillar.type === 'positive' ? "bg-emerald-500/20 text-emerald-400" : "bg-indigo-500/20 text-indigo-400"
          )}>
            <Icon size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-200">{pillar.name}</h3>
            <p className="text-xs text-slate-500">
              {pillar.type === 'positive' ? 'Investissement' : 'Abstinence'}
            </p>
          </div>
        </div>
        <CircularProgress progress={progress} size={64} />
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-3 pt-4 border-t border-slate-800">
          {pillar.tasks.map((task, index) => {
            const isChecked = pillarData[`task_${index}`] || false
            return (
              <label
                key={index}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all",
                  isChecked
                    ? "bg-emerald-500/10 border border-emerald-500/30"
                    : "bg-slate-800/50 border border-slate-700/50 hover:border-slate-600"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleTaskToggle(index)}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
                />
                <span className={cn(
                  "text-sm flex-1",
                  isChecked ? "text-emerald-300 line-through" : "text-slate-300"
                )}>
                  {task}
                </span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}

