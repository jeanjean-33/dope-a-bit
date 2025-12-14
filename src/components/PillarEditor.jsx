import { useState, useEffect } from 'react'
import { Moon, Activity, BookOpen, Sun, ShoppingCart, Flame, Smartphone, Plus, X, Trash2, Edit2, Save } from 'lucide-react'
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

const iconOptions = [
  { value: 'Moon', label: 'Lune', icon: Moon },
  { value: 'Activity', label: 'Activité', icon: Activity },
  { value: 'BookOpen', label: 'Livre', icon: BookOpen },
  { value: 'Sun', label: 'Soleil', icon: Sun },
  { value: 'ShoppingCart', label: 'Panier', icon: ShoppingCart },
  { value: 'Flame', label: 'Flamme', icon: Flame },
  { value: 'Smartphone', label: 'Smartphone', icon: Smartphone }
]

export function PillarEditor({ pillar, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedPillar, setEditedPillar] = useState(pillar)
  const [newTask, setNewTask] = useState('')

  // Synchroniser editedPillar avec pillar quand les props changent
  useEffect(() => {
    setEditedPillar(pillar)
  }, [pillar])

  const Icon = iconMap[editedPillar.icon] || Moon
  
  const handleSave = () => {
    console.log('PillarEditor: Sauvegarde du pilier:', editedPillar)
    onSave(editedPillar)
    setIsEditing(false)
  }
  
  const handleCancel = () => {
    setEditedPillar(pillar)
    setIsEditing(false)
    setNewTask('')
  }
  
  const handleAddTask = () => {
    if (newTask.trim()) {
      setEditedPillar({
        ...editedPillar,
        tasks: [...editedPillar.tasks, newTask.trim()]
      })
      setNewTask('')
    }
  }
  
  const handleRemoveTask = (index) => {
    setEditedPillar({
      ...editedPillar,
      tasks: editedPillar.tasks.filter((_, i) => i !== index)
    })
  }
  
  const handleUpdateTask = (index, value) => {
    const newTasks = [...editedPillar.tasks]
    newTasks[index] = value
    setEditedPillar({
      ...editedPillar,
      tasks: newTasks
    })
  }
  
  if (!isEditing) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
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
                {pillar.type === 'positive' ? 'Investissement' : 'Abstinence'} • {pillar.tasks.length} tâche{pillar.tasks.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Edit2 size={18} />
          </button>
        </div>
        
        <div className="space-y-2">
          {pillar.tasks.map((task, index) => (
            <div key={index} className="text-sm text-slate-300 bg-slate-800/50 rounded-lg p-2">
              {task}
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-slate-900 border-2 border-emerald-500/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            editedPillar.type === 'positive' ? "bg-emerald-500/20 text-emerald-400" : "bg-indigo-500/20 text-indigo-400"
          )}>
            <Icon size={20} />
          </div>
          <input
            type="text"
            value={editedPillar.name}
            onChange={(e) => setEditedPillar({ ...editedPillar, name: e.target.value })}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Nom du pilier"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors"
            title="Sauvegarder"
          >
            <Save size={18} />
          </button>
          <button
            onClick={handleCancel}
            className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Annuler"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Type du pilier */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">Type</label>
          <div className="flex gap-2">
            <button
              onClick={() => setEditedPillar({ ...editedPillar, type: 'positive' })}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                editedPillar.type === 'positive'
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              )}
            >
              Investissement
            </button>
            <button
              onClick={() => setEditedPillar({ ...editedPillar, type: 'detox' })}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                editedPillar.type === 'detox'
                  ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              )}
            >
              Abstinence
            </button>
          </div>
        </div>
        
        {/* Icône */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">Icône</label>
          <div className="flex flex-wrap gap-2">
            {iconOptions.map(({ value, label, icon: IconOption }) => (
              <button
                key={value}
                onClick={() => setEditedPillar({ ...editedPillar, icon: value })}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  editedPillar.icon === value
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                )}
                title={label}
              >
                <IconOption size={20} />
              </button>
            ))}
          </div>
        </div>
        
        {/* Tâches existantes */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">Tâches ({editedPillar.tasks.length})</label>
          <div className="space-y-2">
            {editedPillar.tasks.map((task, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={task}
                  onChange={(e) => handleUpdateTask(index, e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Nom de la tâche"
                />
                <button
                  onClick={() => handleRemoveTask(index)}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Ajouter une nouvelle tâche */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">Ajouter une tâche</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Nouvelle tâche..."
            />
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30 transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
        
        {/* Bouton supprimer le pilier */}
        {onDelete && (
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                if (window.confirm(`Êtes-vous sûr de vouloir supprimer le pilier "${pillar.name}" ?`)) {
                  onDelete(pillar.id)
                  handleCancel()
                }
              }}
              className="w-full px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              Supprimer ce pilier
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

