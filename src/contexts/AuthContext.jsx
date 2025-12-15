import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser, setCurrentUser, logout as authLogout } from '../utils/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Charger l'utilisateur au démarrage (seulement si nous sommes dans un navigateur)
    if (typeof window !== 'undefined') {
      const currentUser = getCurrentUser()
      setUser(currentUser)
    }
    setLoading(false)
  }, [])
  
  const login = (userData) => {
    setCurrentUser(userData)
    setUser(userData)
  }
  
  const logout = () => {
    authLogout()
    setUser(null)
    // Recharger la page pour réinitialiser toutes les données
    window.location.reload()
  }
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

