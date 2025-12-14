import { cn } from '../utils/cn'

export function StatsCard({ title, value, subtitle, icon: Icon, className }) {
  return (
    <div className={cn(
      "bg-slate-900 border border-slate-800 rounded-xl p-6",
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-slate-400">{title}</p>
        {Icon && <Icon size={20} className="text-slate-600" />}
      </div>
      <p className="text-3xl font-bold text-slate-100 mb-1">{value}</p>
      {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
    </div>
  )
}

