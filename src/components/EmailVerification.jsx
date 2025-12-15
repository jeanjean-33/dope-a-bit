import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, Mail, RefreshCw } from 'lucide-react'
import { verifyEmail, resendVerificationEmail } from '../utils/auth'
import { cn } from '../utils/cn'

export function EmailVerification() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('verifying') // verifying, success, error, expired
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')

  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      handleVerification(token)
    } else {
      setStatus('error')
      setMessage('Token de vérification manquant')
    }
  }, [token])

  const handleVerification = async (verificationToken) => {
    try {
      const result = await verifyEmail(verificationToken)
      if (result.success) {
        setStatus('success')
        setMessage('Votre adresse email a été vérifiée avec succès !')
        // Rediriger vers la connexion après 3 secondes
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
    } catch (error) {
      if (error.message.includes('expiré')) {
        setStatus('expired')
        setMessage('Le lien de vérification a expiré. Veuillez demander un nouveau lien.')
      } else {
        setStatus('error')
        setMessage(error.message || 'Erreur lors de la vérification')
      }
    }
  }

  const handleResendVerification = async () => {
    if (!username.trim()) {
      setMessage('Veuillez entrer votre nom d\'utilisateur')
      return
    }

    setLoading(true)
    try {
      await resendVerificationEmail(username)
      setMessage('Un nouvel email de vérification a été envoyé')
      setStatus('resent')
    } catch (error) {
      setMessage(error.message || 'Erreur lors de l\'envoi de l\'email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <div className="w-full max-w-md">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl text-center">

          {/* Logo */}
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">D</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-100 mb-4">Vérification Email</h1>

          {/* Status Icons */}
          <div className="mb-6">
            {status === 'verifying' && (
              <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            )}

            {status === 'success' && (
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            )}

            {status === 'error' && (
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            )}

            {status === 'expired' && (
              <Mail className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            )}

            {status === 'resent' && (
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            )}
          </div>

          {/* Message */}
          <p className="text-slate-300 mb-6">{message}</p>

          {/* Actions */}
          {status === 'expired' && (
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Votre nom d'utilisateur"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                onClick={handleResendVerification}
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
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <RefreshCw size={18} />
                    Renvoyer l'email de vérification
                  </>
                )}
              </button>
            </div>
          )}

          {/* Bouton retour à la connexion */}
          {(status === 'success' || status === 'error' || status === 'resent') && (
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 rounded-lg font-medium transition-all bg-slate-700 hover:bg-slate-600 text-slate-200"
            >
              Retour à la connexion
            </button>
          )}
        </div>
      </div>
    </div>
  )
}