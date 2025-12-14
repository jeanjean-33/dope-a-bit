import Dexie from 'dexie'

export class DopeABitDB extends Dexie {
  users
  dayData
  pillars
  
  constructor() {
    super('DopeABitDB')
    
    // Version 1 - Schéma initial
    this.version(1).stores({
      users: '++id, username, email, passwordHash, createdAt',
      dayData: '++id, userId, dateKey, data, createdAt',
      pillars: '++id, userId, pillarId, data, updatedAt'
    })
    
    // Version 2 - Ajout de l'index composé et updatedAt pour dayData
    this.version(2).stores({
      users: '++id, username, email, passwordHash, createdAt',
      // Index composé [userId+dateKey] pour les requêtes rapides
      dayData: '++id, userId, dateKey, [userId+dateKey], data, createdAt, updatedAt',
      pillars: '++id, userId, pillarId, data, updatedAt'
    }).upgrade(async tx => {
      // Migration : ajouter updatedAt aux enregistrements existants de dayData
      const dayDataRecords = await tx.table('dayData').toCollection().toArray()
      for (const record of dayDataRecords) {
        if (!record.updatedAt) {
          await tx.table('dayData').update(record.id, {
            updatedAt: record.createdAt || new Date()
          })
        }
      }
    })
    
    this.users = this.table('users')
    this.dayData = this.table('dayData')
    this.pillars = this.table('pillars')
  }
}

export const db = new DopeABitDB()

