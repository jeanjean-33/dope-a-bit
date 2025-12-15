// Template HTML pour l'email de vérification
export const VERIFICATION_EMAIL_HTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vérification de votre compte dope-a-bit</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1e293b;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .container {
            background-color: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 32px;
        }
        .logo {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #10b981, #6366f1);
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            color: white;
            margin-bottom: 16px;
        }
        .title {
            font-size: 24px;
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 8px;
        }
        .subtitle {
            color: #64748b;
            font-size: 16px;
        }
        .content {
            margin-bottom: 32px;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #10b981, #6366f1);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            border-top: 1px solid #e2e8f0;
            padding-top: 24px;
            font-size: 14px;
            color: #64748b;
            text-align: center;
        }
        .warning {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 6px;
            padding: 12px;
            margin: 20px 0;
            font-size: 14px;
            color: #92400e;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">D</div>
            <h1 class="title">Bienvenue sur dope-a-bit !</h1>
            <p class="subtitle">Vérifiez votre adresse email pour commencer</p>
        </div>

        <div class="content">
            <p>Bonjour,</p>
            <p>Merci de vous être inscrit sur <strong>dope-a-bit</strong> ! Pour finaliser votre inscription et accéder à votre tableau de bord personnalisé de gestion de la dopamine, veuillez vérifier votre adresse email.</p>

            <div style="text-align: center;">
                <a href="{{verification_link}}" class="button">Vérifier mon email</a>
            </div>

            <div class="warning">
                <strong>Attention :</strong> Ce lien expire dans 24 heures. Si le lien ne fonctionne pas, copiez-collez l'URL complète dans votre navigateur.
            </div>

            <p>Si vous n'avez pas demandé cette inscription, vous pouvez ignorer cet email en toute sécurité.</p>
        </div>

        <div class="footer">
            <p><strong>dope-a-bit</strong> - Votre compagnon pour une dopamine saine</p>
            <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
        </div>
    </div>
</body>
</html>
`

// Template texte brut (fallback)
export const VERIFICATION_EMAIL_TEXT = `
Bienvenue sur dope-a-bit !

Pour vérifier votre adresse email et finaliser votre inscription, cliquez sur ce lien :
{{verification_link}}

Ce lien expire dans 24 heures.

Si vous n'avez pas demandé cette inscription, ignorez cet email.

---
dope-a-bit - Votre compagnon pour une dopamine saine
`