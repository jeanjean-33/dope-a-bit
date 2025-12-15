import emailjs from '@emailjs/browser'

// Configuration EmailJS - À remplacer par vos vraies clés
const EMAILJS_SERVICE_ID = 'your_service_id'
const EMAILJS_TEMPLATE_ID = 'your_template_id'
const EMAILJS_PUBLIC_KEY = 'your_public_key'

// Initialiser EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

export async function sendVerificationEmail(email, verificationToken) {
  try {
    const verificationLink = `${window.location.origin}/verify-email?token=${verificationToken}`

    const templateParams = {
      to_email: email,
      verification_link: verificationLink,
      app_name: 'dope-a-bit'
    }

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    )

    return { success: true, result }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de vérification:', error)
    throw new Error('Impossible d\'envoyer l\'email de vérification')
  }
}

// Fonction utilitaire pour générer un token de vérification
export function generateVerificationToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}