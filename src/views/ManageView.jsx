import { useState, useEffect } from 'react'
import { PillarEditor } from '../components/PillarEditor'
import { Plus, RotateCcw, Save } from 'lucide-react'
import { loadPillars, savePillars, resetPillarsToDefault, getPillarsList } from '../utils/pillarsStorage'
import { loadPillars as loadDBPillars, savePillars as saveDBPillars } from '../utils/dbStorage'
import { cn } from '../utils/cn'

export function ManageView() {
  const [pillars, setPillars] = useState({})
  const [hasChanges, setHasChanges] = useState(false)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function loadData() {
      const loadedPillars = await loadDBPillars()
      setPillars(loadedPillars)
      setLoading(false)
    }
    loadData()
  }, [])
  
  useEffect(() => {
    // Vérifier s'il y a des changements
    async function checkChanges() {
      const savedPillars = await loadDBPillars()
      const currentPillars = JSON.stringify(pillars)
      const savedPillarsStr = JSON.stringify(savedPillars)
      setHasChanges(currentPillars !== savedPillarsStr)
    }
    if (!loading) {
      checkChanges()
    }
  }, [pillars, loading])
  
  const handleSavePillar = async (updatedPillar) => {
    const newPillars = {
      ...pillars,
      [updatedPillar.id]: updatedPillar
    }
    setPillars(newPillars)
    await saveDBPillars(newPillars)
  }
  
  const handleDeletePillar = async (pillarId) => {
    const newPillars = { ...pillars }
    delete newPillars[pillarId]
    setPillars(newPillars)
    await saveDBPillars(newPillars)
  }
  
  const handleAddPillar = async () => {
    const newId = `pillar_${Date.now()}`
    const newPillar = {
      id: newId,
      name: 'Nouveau Pilier',
      type: 'positive',
      icon: 'Moon',
      tasks: ['Nouvelle tâche']
    }
    
    const newPillars = {
      ...pillars,
      [newId]: newPillar
    }
    setPillars(newPillars)
    await saveDBPillars(newPillars)
  }
  
  const handleReset = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser tous les piliers aux valeurs par défaut ? Cette action est irréversible.')) {
      const defaultPillars = resetPillarsToDefault()
      setPillars(defaultPillars)
      await saveDBPillars(defaultPillars)
      setHasChanges(false)
    }
  }
  
  const handleSaveAll = async () => {
    await saveDBPillars(pillars)
    setHasChanges(false)
  }
  
  const pillarsList = Object.values(pillars)
  
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
  
  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-100 mb-2">Gérer les Habitudes</h1>
              <p className="text-slate-400">
                Personnalisez vos piliers et leurs tâches selon vos besoins
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                  "text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
                )}
                title="Réinitialiser aux valeurs par défaut"
              >
                <RotateCcw size={18} />
                <span className="hidden sm:inline">Réinitialiser</span>
              </button>
              {hasChanges && (
                <button
                  onClick={handleSaveAll}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                    "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                  )}
                >
                  <Save size={18} />
                  <span className="hidden sm:inline">Sauvegarder</span>
                </button>
              )}
            </div>
          </div>
          
          {hasChanges && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-sm text-yellow-400">
              ⚠️ Vous avez des modifications non sauvegardées
            </div>
          )}
        </div>
        
        {/* Liste des piliers */}
        <div className="space-y-4 mb-6">
          {pillarsList.map(pillar => (
            <PillarEditor
              key={pillar.id}
              pillar={pillar}
              onSave={handleSavePillar}
              onDelete={handleDeletePillar}
            />
          ))}
        </div>
        
        {/* Bouton ajouter un pilier */}
        <button
          onClick={handleAddPillar}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl",
            "bg-slate-900 border-2 border-dashed border-slate-700",
            "text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50",
            "transition-all"
          )}
        >
          <Plus size={20} />
          <span className="font-medium">Ajouter un nouveau pilier</span>
        </button>
        
        {/* Note informative */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-slate-200 mb-2">💡 Conseils</h3>
          <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
            <li>Cliquez sur l'icône ✏️ pour modifier un pilier</li>
            <li>Les modifications sont sauvegardées automatiquement</li>
            <li>Vous pouvez ajouter, modifier ou supprimer des tâches</li>
            <li>Les piliers "Investissement" sont à faire, les "Abstinence" sont à éviter</li>
            <li>Un rafraîchissement de la page peut être nécessaire pour voir les changements dans le Tracker</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

