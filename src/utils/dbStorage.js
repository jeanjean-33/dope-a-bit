import { db } from '../db/database'
import { getCurrentUser } from './auth'

export async function getDayData(dateKey) {
  const user = getCurrentUser()
  if (!user) return {}
  
  try {
    const record = await db.dayData
      .where('[userId+dateKey]')
      .equals([user.id, dateKey])
      .first()
    
    return record ? record.data : {}
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
    return {}
  }
}

export async function saveDayData(dateKey, dayData) {
  const user = getCurrentUser()
  if (!user) return
  
  try {
    const existing = await db.dayData
      .where('[userId+dateKey]')
      .equals([user.id, dateKey])
      .first()
    
    if (existing) {
      await db.dayData.update(existing.id, {
        data: dayData,
        updatedAt: new Date()
      })
    } else {
      await db.dayData.add({
        userId: user.id,
        dateKey,
        data: dayData,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données:', error)
  }
}

export async function getAllDayData() {
  const user = getCurrentUser()
  if (!user) return {}
  
  try {
    const records = await db.dayData
      .where('userId')
      .equals(user.id)
      .toArray()
    
    const data = {}
    records.forEach(record => {
      data[record.dateKey] = record.data
    })
    
    return data
  } catch (error) {
    console.error('Erreur lors de la récupération de toutes les données:', error)
    return {}
  }
}

export async function savePillars(pillars) {
  const user = getCurrentUser()
  if (!user) return

  try {
    // Supprimer les anciens piliers de l'utilisateur
    await db.pillars
      .where('userId')
      .equals(user.id)
      .delete()

    // Ajouter les nouveaux piliers
    const pillarsArray = Object.entries(pillars).map(([pillarId, data]) => ({
      userId: user.id,
      pillarId,
      data,
      updatedAt: new Date()
    }))

    if (pillarsArray.length > 0) {
      await db.pillars.bulkAdd(pillarsArray)
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des piliers:', error)
  }
}

export async function loadPillars() {
  const user = getCurrentUser()
  if (!user) {
    // Retourner les piliers par défaut si pas d'utilisateur
    const { loadPillars: loadDefaultPillars } = await import('./pillarsStorage')
    return loadDefaultPillars()
  }

  try {
    const records = await db.pillars
      .where('userId')
      .equals(user.id)
      .toArray()

    if (records.length === 0) {
      // Charger les piliers par défaut
      const { loadPillars: loadDefaultPillars } = await import('./pillarsStorage')
      return loadDefaultPillars()
    }

    const pillars = {}
    records.forEach(record => {
      pillars[record.pillarId] = record.data
    })

    return pillars
  } catch (error) {
    console.error('Erreur lors du chargement des piliers:', error)
    const { loadPillars: loadDefaultPillars } = await import('./pillarsStorage')
    return loadDefaultPillars()
  }
}

