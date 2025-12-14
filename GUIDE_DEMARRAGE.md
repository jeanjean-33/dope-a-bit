# 🚀 Guide de Démarrage - dope-a-bit

## Étape 1 : Installer Node.js (OBLIGATOIRE)

L'application React nécessite Node.js pour fonctionner. Si vous ne l'avez pas encore installé :

1. **Télécharger Node.js** :
   - Allez sur : https://nodejs.org/
   - Téléchargez la version **LTS** (Long Term Support) - recommandée
   - Le fichier téléchargé sera quelque chose comme `node-v20.x.x-x64.msi`

2. **Installer Node.js** :
   - Double-cliquez sur le fichier `.msi` téléchargé
   - Suivez l'assistant d'installation (cliquez sur "Next" jusqu'à la fin)
   - ✅ **IMPORTANT** : Cochez l'option "Add to PATH" si elle est proposée
   - Cliquez sur "Install" puis "Finish"

3. **Vérifier l'installation** :
   - Fermez et rouvrez votre terminal/PowerShell
   - Tapez : `node --version`
   - Vous devriez voir quelque chose comme : `v20.x.x`
   - Tapez : `npm --version`
   - Vous devriez voir quelque chose comme : `10.x.x`

## Étape 2 : Installer les dépendances du projet

Une fois Node.js installé, ouvrez un terminal dans le dossier du projet et exécutez :

```bash
npm install
```

Cette commande va télécharger toutes les bibliothèques nécessaires (React, Tailwind, Recharts, etc.)

⏱️ **Cela peut prendre 1-2 minutes** la première fois.

## Étape 3 : Lancer l'application

Une fois l'installation terminée, lancez :

```bash
npm run dev
```

Vous verrez quelque chose comme :
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Étape 4 : Ouvrir dans le navigateur

1. Copiez l'URL affichée (généralement `http://localhost:5173`)
2. Collez-la dans votre navigateur (Chrome, Firefox, Edge, etc.)
3. L'application **dope-a-bit** devrait s'afficher ! 🎉

## Commandes utiles

- `npm run dev` - Lance le serveur de développement (pour travailler)
- `npm run build` - Crée une version optimisée pour la production
- `npm run preview` - Prévisualise la version de production

## ⚠️ Problèmes courants

### "npm n'est pas reconnu"
- **Solution** : Redémarrez votre terminal/PowerShell après l'installation de Node.js
- Si ça ne marche toujours pas, redémarrez votre ordinateur

### "Port 5173 déjà utilisé"
- **Solution** : Vite utilisera automatiquement un autre port (5174, 5175, etc.)
- Regardez le message dans le terminal pour voir le nouveau port

### L'application ne se charge pas
- Vérifiez que le terminal affiche "ready" et une URL
- Assurez-vous d'utiliser l'URL exacte affichée dans le terminal
- Vérifiez que vous avez bien exécuté `npm install` avant

## 📝 Note importante

- Les données sont sauvegardées dans le **localStorage** de votre navigateur
- Si vous supprimez les données du navigateur, vous perdrez votre historique
- L'application génère automatiquement 30 jours de données fictives au premier lancement

---

**Besoin d'aide ?** Vérifiez que vous avez bien suivi toutes les étapes ci-dessus.

