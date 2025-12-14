import Dexie from 'dexie'

export class DopeABitDB extends Dexie {
  users
  dayData
  pillars
  
  constructor() {
    super('DopeABitDB')
    
    this.version(1).stores({
      users: '++id, username, email, passwordHash, createdAt',
      dayData: '++id, userId, dateKey, data, createdAt',
      pillars: '++id, userId, pillarId, data, updatedAt'
    })
    
    this.users = this.table('users')
    this.dayData = this.table('dayData')
    this.pillars = this.table('pillars')
  }
}

export const db = new DopeABitDB()

