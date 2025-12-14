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
  if (!user) {
    console.warn('Aucun utilisateur connecté, impossible de sauvegarder les données')
    return
  }
  
  try {
    const existing = await db.dayData
      .where('[userId+dateKey]')
      .equals([user.id, dateKey])
      .first()
    
    if (existing) {
      const updated = await db.dayData.update(existing.id, {
        data: dayData,
        updatedAt: new Date()
      })
      if (updated === 0) {
        console.warn('Aucun enregistrement mis à jour pour', dateKey)
      }
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
    // Relancer l'erreur pour permettre à l'appelant de la gérer si nécessaire
    throw error
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
    // Récupérer les piliers existants pour les mettre à jour ou en ajouter de nouveaux
    const existingRecords = await db.pillars
      .where('userId')
      .equals(user.id)
      .toArray()
    
    // Créer un map des piliers existants par pillarId
    const existingMap = new Map(existingRecords.map(r => [r.pillarId, r]))
    
    // Préparer les données à sauvegarder
    const pillarsArray = Object.entries(pillars).map(([pillarId, data]) => ({
      id: existingMap.get(pillarId)?.id, // Conserver l'id si existe
      userId: user.id,
      pillarId,
      data,
      updatedAt: new Date()
    }))
    
    // Utiliser bulkPut pour mettre à jour ou ajouter
    if (pillarsArray.length > 0) {
      await db.pillars.bulkPut(pillarsArray)
    }
    
    // Supprimer les piliers qui n'existent plus
    const currentPillarIds = new Set(Object.keys(pillars))
    const toDelete = existingRecords.filter(r => !currentPillarIds.has(r.pillarId))
    if (toDelete.length > 0) {
      await db.pillars.bulkDelete(toDelete.map(r => r.id))
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des piliers:', error)
    throw error
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

