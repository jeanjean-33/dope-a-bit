# Configuration de la vérification d'email

## Configuration EmailJS

Pour que la vérification d'email fonctionne, vous devez configurer EmailJS :

### 1. Créer un compte EmailJS

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit
3. Vérifiez votre email

### 2. Configurer un service email

1. Dans votre dashboard EmailJS, allez dans "Email Services"
2. Ajoutez un service (Gmail, Outlook, etc.)
3. Suivez les instructions pour connecter votre compte email

### 3. Créer un template d'email

1. Allez dans "Email Templates"
2. Cliquez sur "Create New Template"
3. Utilisez ce contenu pour le template :

**Subject:**
```
Vérifiez votre compte dope-a-bit
```

**HTML Content:** (copiez le contenu du fichier `src/utils/emailTemplates.js` - VERIFICATION_EMAIL_HTML)

**Variables utilisées :**
- `{{to_email}}` - Email du destinataire
- `{{verification_link}}` - Lien de vérification
- `{{app_name}}` - Nom de l'application

### 4. Récupérer les clés API

Dans votre dashboard EmailJS :
- **Service ID** : Trouvé dans "Email Services"
- **Template ID** : ID de votre template
- **Public Key** : Trouvé dans "Account" > "General"

### 5. Configurer dans le code

Modifiez le fichier `src/utils/emailService.js` :

```javascript
// Remplacez ces valeurs par vos vraies clés
const EMAILJS_SERVICE_ID = 'votre_service_id'
const EMAILJS_TEMPLATE_ID = 'votre_template_id'
const EMAILJS_PUBLIC_KEY = 'votre_public_key'
```

### 6. Tester

1. Lancez l'application : `npm run dev`
2. Essayez de vous inscrire avec une vraie adresse email
3. Vérifiez que vous recevez l'email de vérification
4. Cliquez sur le lien pour vérifier votre compte

## Sécurité

⚠️ **Important :**
- Les clés EmailJS sont publiques dans le frontend
- Pour la production, considérez un backend sécurisé
- Le hash de mot de passe actuel n'est pas sécurisé (utilisez bcrypt en production)

## Alternatives

Si EmailJS ne convient pas, vous pouvez utiliser :
- **SendGrid** (avec un backend)
- **Mailgun** (avec un backend)
- **AWS SES** (avec un backend)
- **Resend** (moderne et facile)

## Dépannage

### L'email ne s'envoie pas
- Vérifiez que vos clés EmailJS sont correctes
- Vérifiez que votre service email est configuré
- Vérifiez la console du navigateur pour les erreurs

### Le lien de vérification ne fonctionne pas
- Vérifiez que l'application tourne sur le bon port
- Le lien expire après 24 heures
- Utilisez "Renvoyer l'email" si nécessaire

### Erreur de token invalide
- Le token peut avoir expiré
- Essayez de vous réinscrire ou demandez un nouvel email