import { db } from '../db/database'
import { sendVerificationEmail, generateVerificationToken } from './emailService'

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
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await db.users
      .where('username').equals(username)
      .or('email').equals(email)
      .first()

    if (existingUser) {
      throw new Error('Un utilisateur avec ce nom ou cet email existe déjà')
    }

    // Générer un token de vérification
    const verificationToken = generateVerificationToken()
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 heures

    // Créer le nouvel utilisateur
    const userId = await db.users.add({
      username,
      email,
      passwordHash: simpleHash(password),
      createdAt: new Date(),
      emailVerified: false,
      verificationToken,
      verificationTokenExpires: tokenExpires
    })

    // Envoyer l'email de vérification
    try {
      await sendVerificationEmail(email, verificationToken)
    } catch (emailError) {
      console.warn('Erreur lors de l\'envoi de l\'email de vérification:', emailError)
      // Ne pas échouer l'inscription si l'email ne peut pas être envoyé
    }

    return { success: true, userId, requiresEmailVerification: true }
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    throw error
  }
}

export async function loginUser(username, password) {
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

    // Vérifier si l'email est validé
    if (!user.emailVerified) {
      throw new Error('Veuillez vérifier votre adresse email avant de vous connecter')
    }

    // Retourner les informations de l'utilisateur (sans le mot de passe)
    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt
      }
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    throw error
  }
}

export function getCurrentUser() {
  const userStr = localStorage.getItem('currentUser')
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function setCurrentUser(user) {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
  } else {
    localStorage.removeItem('currentUser')
  }
}

export async function verifyEmail(token) {
  try {
    const user = await db.users
      .where('verificationToken').equals(token)
      .first()

    if (!user) {
      throw new Error('Token de vérification invalide')
    }

    if (user.verificationTokenExpires < new Date()) {
      throw new Error('Le token de vérification a expiré')
    }

    // Marquer l'email comme vérifié
    await db.users.update(user.id, {
      emailVerified: true,
      verificationToken: null,
      verificationTokenExpires: null
    })

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        emailVerified: true,
        createdAt: user.createdAt
      }
    }
  } catch (error) {
    console.error('Erreur lors de la vérification d\'email:', error)
    throw error
  }
}

export async function resendVerificationEmail(username) {
  try {
    const user = await db.users
      .where('username').equals(username)
      .first()

    if (!user) {
      throw new Error('Utilisateur non trouvé')
    }

    if (user.emailVerified) {
      throw new Error('L\'email est déjà vérifié')
    }

    // Générer un nouveau token
    const verificationToken = generateVerificationToken()
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 heures

    // Mettre à jour le token
    await db.users.update(user.id, {
      verificationToken,
      verificationTokenExpires: tokenExpires
    })

    // Renvoyer l'email
    await sendVerificationEmail(user.email, verificationToken)

    return { success: true }
  } catch (error) {
    console.error('Erreur lors du renvoi de l\'email de vérification:', error)
    throw error
  }
}

export function logout() {
  localStorage.removeItem('currentUser')
}

