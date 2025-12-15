import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Navigation } from './components/Navigation'
import { LoginForm } from './components/LoginForm'
import { EmailVerification } from './components/EmailVerification'
import { TrackerView } from './views/TrackerView'
import { DashboardView } from './views/DashboardView'
import { ManageView } from './views/ManageView'
import { generateMockData } from './utils/mockData'
import { getAllDayData } from './utils/dbStorage'

function AppContent() {
  const { user, loading } = useAuth()

  useEffect(() => {
    // Initialiser avec des données fictives si aucune donnée n'existe pour l'utilisateur
    if (user) {
      getAllDayData().then(data => {
        if (Object.keys(data).length === 0) {
          // Générer des données fictives pour le nouvel utilisateur
          generateMockData(30)
        }
      })
    }
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/verify-email" element={<EmailVerification />} />
      <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/" replace />} />
      <Route path="/" element={user ? (
        <div className="min-h-screen bg-slate-950">
          <Navigation />
          <Routes>
            <Route path="/" element={<TrackerView />} />
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/manage" element={<ManageView />} />
          </Routes>
        </div>
      ) : <Navigate to="/login" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App

