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
  console.log('savePillars called with:', pillars)
  const user = getCurrentUser()
  console.log('Current user:', user)
  if (!user) {
    console.warn('No user found, cannot save pillars')
    return
  }

  try {
    console.log('Deleting old pillars for user:', user.id)
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

    console.log('Pillars array to save:', pillarsArray)

    if (pillarsArray.length > 0) {
      await db.pillars.bulkAdd(pillarsArray)
      console.log('Pillars saved successfully')
    } else {
      console.warn('No pillars to save')
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des piliers:', error)
  }
}

export async function loadPillars() {
  console.log('loadPillars called')
  const user = getCurrentUser()
  console.log('Current user for loading:', user)
  if (!user) {
    console.log('No user, loading default pillars')
    // Retourner les piliers par défaut si pas d'utilisateur
    const { loadPillars: loadDefaultPillars } = await import('./pillarsStorage')
    return loadDefaultPillars()
  }

  try {
    console.log('Loading pillars from database for user:', user.id)
    const records = await db.pillars
      .where('userId')
      .equals(user.id)
      .toArray()

    console.log('Found records:', records.length)

    if (records.length === 0) {
      console.log('No records found, loading default pillars')
      // Charger les piliers par défaut
      const { loadPillars: loadDefaultPillars } = await import('./pillarsStorage')
      return loadDefaultPillars()
    }

    const pillars = {}
    records.forEach(record => {
      pillars[record.pillarId] = record.data
    })

    console.log('Loaded pillars:', pillars)
    return pillars
  } catch (error) {
    console.error('Erreur lors du chargement des piliers:', error)
    const { loadPillars: loadDefaultPillars } = await import('./pillarsStorage')
    return loadDefaultPillars()
  }
}

