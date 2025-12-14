# ⚡ Déploiement Rapide sur GitHub Pages

## 🚀 En 5 minutes

### Étape 1 : Créer le dépôt GitHub

1. Allez sur https://github.com/new
2. **Repository name** : `dope-a-bit`
3. **Visibilité** : Public (nécessaire pour GitHub Pages gratuit)
4. ⚠️ **Ne cochez PAS** "Add a README file"
5. Cliquez sur **"Create repository"**

### Étape 2 : Initialiser Git localement

**Option A : Script automatique (Windows)**
```bash
# Double-cliquez sur init-git.bat
# Ou exécutez dans PowerShell :
.\init-git.bat
```

**Option B : Commandes manuelles**
```bash
git init
git add .
git commit -m "Initial commit: dope-a-bit"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/dope-a-bit.git
git push -u origin main
```

⚠️ **Remplacez `VOTRE-USERNAME`** par votre nom d'utilisateur GitHub !

### Étape 3 : Configurer GitHub Pages

1. Allez sur votre dépôt : `https://github.com/VOTRE-USERNAME/dope-a-bit`
2. Cliquez sur **"Settings"** (en haut)
3. Dans le menu gauche, cliquez sur **"Pages"**
4. Sous **"Source"** :
   - **Branch** : `main`
   - **Folder** : `/ (root)`
5. Cliquez sur **"Save"**

### Étape 4 : Attendre le déploiement

1. Allez dans l'onglet **"Actions"** de votre dépôt
2. Vous verrez le workflow "Deploy to GitHub Pages" en cours
3. Attendez 2-3 minutes que le build se termine (✅ vert = succès)

### Étape 5 : Accéder à votre app

Votre application sera accessible à :
```
https://VOTRE-USERNAME.github.io/dope-a-bit/
```

## ⚙️ Si votre dépôt a un nom différent

Si votre dépôt ne s'appelle pas `dope-a-bit`, modifiez `vite.config.js` :

```javascript
const REPO_NAME = 'votre-nom-de-repo'  // Changez cette ligne
```

## 🔄 Déploiements futurs

À chaque fois que vous faites :
```bash
git add .
git commit -m "Vos modifications"
git push
```

GitHub Actions déploiera automatiquement votre application ! 🎉

## ❓ Problèmes ?

Consultez le fichier `DEPLOIEMENT.md` pour plus de détails et de solutions.

