# 🔄 Workflow Git - Deux Repos

## ✅ Configuration Actuelle

Vous avez maintenant **deux remotes** configurés :

1. **`origin`** → Votre repo personnel : `https://github.com/ptieuguim/ugate-super-admin-frontend.git`
2. **`team`** → Repo de l'équipe : `https://github.com/projet-synthese-gi26/ugate-super-admin-frontend.git`

---

## 📋 Commandes Quotidiennes

### 1. Faire des Modifications

```bash
# Modifier vos fichiers normalement
# Puis ajouter les changements
git add .
git commit -m "Description des changements"
```

### 2. Pousser vers VOTRE Repo (origin)

```bash
git push origin main
```

**Résultat :** 
- ✅ Votre repo personnel est mis à jour
- ✅ Vercel déploiera automatiquement depuis votre repo

### 3. Pousser vers le Repo de l'ÉQUIPE (team)

```bash
git push team main
```

**Résultat :** 
- ✅ Le repo de l'équipe est mis à jour
- ✅ Toute l'équipe voit vos changements

### 4. Pousser vers LES DEUX en Même Temps

```bash
# Option 1: Deux commandes séparées
git push origin main
git push team main

# Option 2: Créer un alias (à faire une seule fois)
git config alias.pushall '!git push origin main && git push team main'

# Ensuite, utiliser simplement :
git pushall
```

---

## 🔄 Workflow Complet Recommandé

```bash
# 1. Vérifier l'état
git status

# 2. Ajouter les changements
git add .

# 3. Commit
git commit -m "feat: description de la fonctionnalité"

# 4. Pousser vers votre repo (pour Vercel)
git push origin main

# 5. Pousser vers le repo de l'équipe
git push team main
```

---

## 📥 Récupérer les Changements de l'Équipe

Si d'autres membres de l'équipe font des changements sur le repo `team`, vous pouvez les récupérer :

```bash
# Récupérer les changements du repo de l'équipe
git pull team main

# Ensuite, pousser vers votre repo personnel
git push origin main
```

---

## 🎯 Cas d'Usage Courants

### Scénario 1: Développement Personnel + Partage avec l'Équipe

```bash
# Travailler normalement
git add .
git commit -m "Update: nouvelle fonctionnalité"

# Pousser vers les deux repos
git push origin main  # Pour Vercel
git push team main    # Pour l'équipe
```

### Scénario 2: Tester sur Vercel Avant de Partager

```bash
# Pousser d'abord vers votre repo
git push origin main

# Tester sur Vercel
# Si tout fonctionne, partager avec l'équipe
git push team main
```

### Scénario 3: Synchroniser avec l'Équipe

```bash
# Récupérer les changements de l'équipe
git pull team main

# Résoudre les conflits si nécessaire
# Puis pousser vers votre repo
git push origin main
```

---

## 🚀 Déploiement Vercel

Vercel sera connecté à **votre repo personnel** (`origin`).

**Workflow de déploiement :**
1. Faire vos modifications
2. `git push origin main` → Déploiement automatique sur Vercel
3. Tester sur Vercel
4. Si OK : `git push team main` → Partager avec l'équipe

---

## 🔍 Commandes Utiles

### Voir les Remotes Configurés
```bash
git remote -v
```

**Résultat attendu :**
```
origin  https://github.com/ptieuguim/ugate-super-admin-frontend.git (fetch)
origin  https://github.com/ptieuguim/ugate-super-admin-frontend.git (push)
team    https://github.com/projet-synthese-gi26/ugate-super-admin-frontend.git (fetch)
team    https://github.com/projet-synthese-gi26/ugate-super-admin-frontend.git (push)
```

### Voir l'Historique des Commits
```bash
git log --oneline -10
```

### Voir les Différences Avant de Commit
```bash
git diff
```

### Annuler le Dernier Commit (Avant Push)
```bash
git reset --soft HEAD~1
```

---

## ⚠️ Bonnes Pratiques

### ✅ À FAIRE

1. **Toujours commit avant de pull**
   ```bash
   git add .
   git commit -m "WIP: travail en cours"
   git pull team main
   ```

2. **Messages de commit clairs**
   ```bash
   git commit -m "feat: ajout authentification admin"
   git commit -m "fix: correction erreur 500 sur produits"
   git commit -m "docs: mise à jour README"
   ```

3. **Pull régulièrement du repo team**
   ```bash
   # Chaque matin
   git pull team main
   ```

### ❌ À ÉVITER

1. **Ne pas forcer les push** (sauf urgence)
   ```bash
   # ÉVITER
   git push -f origin main
   git push -f team main
   ```

2. **Ne pas commit de fichiers sensibles**
   - `.env` (déjà dans .gitignore)
   - `node_modules/` (déjà dans .gitignore)
   - Tokens, mots de passe

---

## 🆘 Résolution de Problèmes

### Erreur: "Updates were rejected"

```bash
# Récupérer les changements distants
git pull team main

# Résoudre les conflits si nécessaire
# Puis pousser
git push team main
```

### Erreur: "Permission denied"

Vérifiez vos accès GitHub :
- Pour `origin` : Vous êtes propriétaire ✅
- Pour `team` : Vous devez avoir les droits d'écriture

Si vous n'avez pas les droits sur `team`, demandez à l'équipe de vous ajouter comme collaborateur.

### Conflits de Merge

```bash
# Voir les fichiers en conflit
git status

# Éditer les fichiers et résoudre les conflits
# Puis :
git add .
git commit -m "merge: résolution des conflits"
git push origin main
git push team main
```

---

## 📊 Résumé Visuel

```
Votre Machine Locale
        ↓
    git commit
        ↓
    ┌───────────────┐
    │  git push     │
    └───────────────┘
         ↓       ↓
    origin      team
    (Vous)    (Équipe)
       ↓
    Vercel
  (Déploiement)
```

---

## ✅ Checklist Quotidienne

- [ ] `git pull team main` (récupérer les changements de l'équipe)
- [ ] Faire vos modifications
- [ ] `git add .`
- [ ] `git commit -m "message"`
- [ ] `git push origin main` (votre repo + Vercel)
- [ ] `git push team main` (repo de l'équipe)

---

## 🎓 Commandes Mémo

```bash
# Workflow standard
git add .
git commit -m "message"
git push origin main    # Votre repo
git push team main      # Repo équipe

# Récupérer changements équipe
git pull team main

# Voir l'état
git status
git remote -v
git log --oneline -10
```
