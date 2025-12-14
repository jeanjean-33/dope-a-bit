# 🚀 Guide de Déploiement sur GitHub Pages

Ce guide vous explique comment déployer votre application **dope-a-bit** sur GitHub Pages.

## 📋 Prérequis

1. Un compte GitHub
2. Git installé sur votre machine
3. Node.js installé (pour les builds locaux)

## 🔧 Étapes de Déploiement

### 1. Créer un dépôt GitHub

1. Allez sur [GitHub](https://github.com) et connectez-vous
2. Cliquez sur le bouton **"+"** en haut à droite → **"New repository"**
3. Remplissez les informations :
   - **Repository name** : `dope-a-bit` (ou le nom de votre choix)
   - **Description** : "Tracker d'habitudes basé sur la régulation de la dopamine"
   - **Visibilité** : Public (requis pour GitHub Pages gratuit) ou Private
   - ⚠️ **Ne cochez PAS** "Initialize this repository with a README"
4. Cliquez sur **"Create repository"**

### 2. Initialiser Git localement (si pas déjà fait)

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Faire le premier commit
git commit -m "Initial commit: dope-a-bit"

# Ajouter le remote GitHub (remplacez USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/USERNAME/dope-a-bit.git

# Renommer la branche en main (si nécessaire)
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

### 3. Configurer GitHub Pages

1. Allez sur votre dépôt GitHub
2. Cliquez sur **"Settings"** (en haut du dépôt)
3. Dans le menu de gauche, cliquez sur **"Pages"**
4. Sous **"Source"**, sélectionnez :
   - **Branch** : `main` (ou `master`)
   - **Folder** : `/ (root)`
5. Cliquez sur **"Save"**

### 4. Activer GitHub Actions

Le workflow de déploiement automatique est déjà configuré dans `.github/workflows/deploy.yml`.

**Important** : Si votre dépôt s'appelle autre chose que `dope-a-bit`, vous devez modifier le fichier `vite.config.js` :

```javascript
base: process.env.NODE_ENV === 'production' ? '/VOTRE-NOM-REPO/' : '/',
```

### 5. Déclencher le premier déploiement

Le déploiement se déclenche automatiquement quand vous poussez du code sur la branche `main`.

Pour forcer un déploiement manuel :
1. Allez dans l'onglet **"Actions"** de votre dépôt
2. Cliquez sur **"Deploy to GitHub Pages"**
3. Cliquez sur **"Run workflow"** → **"Run workflow"**

### 6. Accéder à votre application

Une fois le déploiement terminé (quelques minutes), votre application sera accessible à :

```
https://USERNAME.github.io/dope-a-bit/
```

(Remplacez `USERNAME` par votre nom d'utilisateur GitHub et `dope-a-bit` par le nom de votre dépôt)

## 🔄 Déploiements Automatiques

À chaque fois que vous poussez du code sur la branche `main`, GitHub Actions va :
1. Installer les dépendances
2. Builder l'application
3. Déployer automatiquement sur GitHub Pages

Vous pouvez voir le statut dans l'onglet **"Actions"** de votre dépôt.

## ⚙️ Configuration Alternative (Nom de dépôt personnalisé)

Si votre dépôt a un nom différent de `dope-a-bit`, modifiez `vite.config.js` :

```javascript
base: process.env.NODE_ENV === 'production' ? '/nom-de-votre-repo/' : '/',
```

## 🐛 Résolution de Problèmes

### L'application ne se charge pas

1. Vérifiez que le workflow GitHub Actions s'est exécuté avec succès
2. Vérifiez que le `base` dans `vite.config.js` correspond au nom de votre dépôt
3. Attendez quelques minutes après le déploiement (le cache peut prendre du temps)

### Erreur 404

- Vérifiez que le chemin `base` dans `vite.config.js` est correct
- Assurez-vous que GitHub Pages est activé dans les Settings

### Le workflow échoue

- Vérifiez les logs dans l'onglet "Actions"
- Assurez-vous que `package.json` contient bien le script `build`
- Vérifiez que toutes les dépendances sont listées dans `package.json`

## 📝 Notes Importantes

- ⚠️ **IndexedDB** : Les données sont stockées localement dans le navigateur de chaque utilisateur
- 🔒 **Sécurité** : Les mots de passe sont hashés localement (pas de serveur backend)
- 📱 **Responsive** : L'application fonctionne sur mobile et desktop
- 🔄 **Mises à jour** : Les utilisateurs devront rafraîchir la page pour voir les nouvelles versions

## 🎉 C'est tout !

Votre application est maintenant déployée et accessible publiquement sur GitHub Pages !

