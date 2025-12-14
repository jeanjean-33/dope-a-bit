import { useState } from 'react'
import { LogIn, UserPlus, Mail, Lock, User } from 'lucide-react'
import { loginUser, registerUser } from '../utils/auth'
import { useAuth } from '../contexts/AuthContext'
import { cn } from '../utils/cn'

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      if (isLogin) {
        const result = await loginUser(username, password)
        if (result.success) {
          login(result.user)
        }
      } else {
        if (!email) {
          setError('L\'email est requis pour l\'inscription')
          setLoading(false)
          return
        }
        const result = await registerUser(username, email, password)
        if (result.success) {
          // Après inscription, connecter automatiquement
          const loginResult = await loginUser(username, password)
          if (loginResult.success) {
            login(loginResult.user)
          }
        }
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <div className="w-full max-w-md">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl">
          {/* Logo et titre */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">D</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-2">dope-a-bit</h1>
            <p className="text-slate-400">
              {isLogin ? 'Connectez-vous à votre compte' : 'Créez votre compte'}
            </p>
          </div>
          
          {/* Toggle Login/Register */}
          <div className="flex gap-2 mb-6 bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => {
                setIsLogin(true)
                setError('')
              }}
              className={cn(
                "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                isLogin
                  ? "bg-emerald-500 text-white"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              Connexion
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setError('')
              }}
              className={cn(
                "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                !isLogin
                  ? "bg-emerald-500 text-white"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              Inscription
            </button>
          </div>
          
          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">Nom d'utilisateur</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Votre nom d'utilisateur"
                />
              </div>
            </div>
            
            {!isLogin && (
              <div>
                <label className="block text-sm text-slate-400 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={4}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
                "bg-emerald-500 hover:bg-emerald-600 text-white",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isLogin ? 'Connexion...' : 'Inscription...'}
                </>
              ) : (
                <>
                  {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
                  {isLogin ? 'Se connecter' : 'Créer un compte'}
                </>
              )}
            </button>
          </form>
          
          {isLogin && (
            <p className="mt-6 text-center text-sm text-slate-500">
              Pas encore de compte ?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-emerald-400 hover:text-emerald-300"
              >
                Créez-en un
              </button>
            </p>
          )}
        </div>
        
        <p className="mt-6 text-center text-xs text-slate-600">
          Les données sont stockées localement dans votre navigateur
        </p>
      </div>
    </div>
  )
}

