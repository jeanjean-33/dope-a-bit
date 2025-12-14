# 📦 Guide Git pour dope-a-bit

## Installation de Git

Si Git n'est pas encore installé sur votre système :

1. **Téléchargez Git** : https://git-scm.com/download/win
2. **Installez Git** en suivant l'assistant d'installation
3. **Redémarrez votre terminal** après l'installation

## Initialisation du dépôt Git

Une fois Git installé, ouvrez un terminal dans le dossier du projet et exécutez :

```bash
# 1. Initialiser le dépôt Git
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Faire le premier commit
git commit -m "Initial commit: dope-a-bit tracker d'habitudes"

# 4. (Optionnel) Ajouter un remote (GitHub, GitLab, etc.)
git remote add origin <URL_DE_VOTRE_REPO>
git push -u origin main
```

## Commandes Git utiles

### Vérifier le statut
```bash
git status
```

### Ajouter des fichiers
```bash
# Ajouter tous les fichiers modifiés
git add .

# Ajouter un fichier spécifique
git add src/App.jsx

# Ajouter tous les fichiers d'un dossier
git add src/
```

### Faire un commit
```bash
git commit -m "Description de vos modifications"
```

### Voir l'historique
```bash
git log
```

### Créer une branche
```bash
git branch nom-de-la-branche
git checkout nom-de-la-branche
# Ou en une commande :
git checkout -b nom-de-la-branche
```

## Fichiers ignorés

Le fichier `.gitignore` est configuré pour ignorer :
- `node_modules/` - Dépendances npm
- `dist/` - Fichiers de build
- `.env` - Variables d'environnement
- Fichiers de cache et logs

## Workflow recommandé

1. **Modifier vos fichiers**
2. **Vérifier les changements** : `git status`
3. **Ajouter les fichiers** : `git add .`
4. **Faire un commit** : `git commit -m "Description"`
5. **Pousser vers le remote** : `git push` (si configuré)

---

**Note** : Si vous utilisez VS Code, vous pouvez utiliser l'interface graphique Git intégrée (panneau Source Control) au lieu de la ligne de commande.

