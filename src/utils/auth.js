import { db } from '../db/database'

// Hash simple pour le mot de passe (en production, utilisez bcrypt ou similaire)
function simpleHash(password) {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString()
}

export async function registerUser(username, email, password) {
  if (!db) {
    throw new Error('Base de données non disponible')
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await db.users
      .where('username').equals(username)
      .or('email').equals(email)
      .first()
    
    if (existingUser) {
      throw new Error('Un utilisateur avec ce nom ou cet email existe déjà')
    }
    
    // Créer le nouvel utilisateur
    const userId = await db.users.add({
      username,
      email,
      passwordHash: simpleHash(password),
      createdAt: new Date()
    })
    
    return { success: true, userId }
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    throw error
  }
}

export async function loginUser(username, password) {
  if (!db) {
    throw new Error('Base de données non disponible')
  }

  try {
    const user = await db.users
      .where('username').equals(username)
      .first()
    
    if (!user) {
      throw new Error('Nom d\'utilisateur ou mot de passe incorrect')
    }
    
    const passwordHash = simpleHash(password)
    if (user.passwordHash !== passwordHash) {
      throw new Error('Nom d\'utilisateur ou mot de passe incorrect')
    }
    
    // Retourner les informations de l'utilisateur (sans le mot de passe)
    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
      }
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    throw error
  }
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem('currentUser')
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function setCurrentUser(user) {
  if (typeof window === 'undefined') return
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
  } else {
    localStorage.removeItem('currentUser')
  }
}

export function logout() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('currentUser')
}

