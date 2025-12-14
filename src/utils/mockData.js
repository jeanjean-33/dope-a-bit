import { subDays } from 'date-fns'
import { getPillarsList } from './pillarsStorage'
import { getDateKey } from './dates'
import { saveDayData } from './dbStorage'

export async function generateMockData(days = 30) {
  const today = new Date()
  const pillarsList = getPillarsList()
  
  for (let i = 0; i < days; i++) {
    const date = subDays(today, i)
    const dateKey = getDateKey(date)
    const dayData = {}
    
    pillarsList.forEach(pillar => {
      const pillarData = {}
      const taskCount = pillar.tasks.length
      
      // Générer des données aléatoires mais réalistes
      // Plus récent = généralement meilleur score
      const baseChance = Math.max(0.3, 1 - (i / days) * 0.5)
      
      pillar.tasks.forEach((task, index) => {
        const random = Math.random()
        // Pour les piliers positifs : cocher = succès
        // Pour les piliers detox : cocher = résistance (succès)
        pillarData[`task_${index}`] = random < baseChance
      })
      
      dayData[pillar.id] = pillarData
    })
    
    await saveDayData(dateKey, dayData)
  }
}

