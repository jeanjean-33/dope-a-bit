import Dexie from 'dexie'

export class DopeABitDB extends Dexie {
  users
  dayData
  pillars

  constructor() {
    super('DopeABitDB')

    // Version haute pour couvrir toutes les migrations précédentes
    this.version(300).stores({
      users: '++id, username, email, passwordHash, createdAt',
      dayData: '++id, userId, dateKey, [userId+dateKey], data, createdAt, updatedAt',
      pillars: '++id, userId, pillarId, data, updatedAt'
    })

    this.users = this.table('users')
    this.dayData = this.table('dayData')
    this.pillars = this.table('pillars')
  }
}

// Initialiser la base de données seulement si nous sommes dans un environnement de navigateur
export const db = typeof window !== 'undefined' ? new DopeABitDB() : null

