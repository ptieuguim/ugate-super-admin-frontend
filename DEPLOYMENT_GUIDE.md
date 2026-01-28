# 🚀 Guide de Déploiement - UGate Super Admin Frontend

## 📝 Prérequis

- Compte GitHub
- Compte Vercel (gratuit)
- Node.js installé localement

---

## Étape 1: Créer un Nouveau Repo GitHub

1. Allez sur https://github.com/new
2. Remplissez :
   - **Repository name** : `ugate-super-admin-frontend`
   - **Description** : "Super Admin Frontend for UGate Platform"
   - **Visibility** : Public ou Private
   - ⚠️ NE PAS cocher "Add a README file"
3. Cliquez sur "Create repository"
4. **Copiez l'URL du repo** (ex: `https://github.com/VOTRE_USERNAME/ugate-super-admin-frontend.git`)

---

## Étape 2: Commandes à Exécuter

Après avoir créé le repo, exécutez ces commandes dans le terminal :

```bash
# 1. Supprimer l'ancien remote
git remote remove origin

# 2. Ajouter votre nouveau remote (REMPLACEZ par votre URL)
git remote add origin https://github.com/VOTRE_USERNAME/ugate-super-admin-frontend.git

# 3. Vérifier que le remote est correct
git remote -v

# 4. Créer une branche main si nécessaire
git branch -M main

# 5. Pousser le code vers votre repo
git push -u origin main
```

---

## Étape 3: Déployer sur Vercel

### Option A: Via le Dashboard Vercel (Recommandé)

1. Allez sur https://vercel.com
2. Cliquez sur "Add New" → "Project"
3. Importez votre repo GitHub `ugate-super-admin-frontend`
4. Configurez le projet :
   - **Framework Preset** : Next.js
   - **Root Directory** : `./` (laisser par défaut)
   - **Build Command** : `npm run build` (automatique)
   - **Output Directory** : `.next` (automatique)

5. **Variables d'environnement** (cliquez sur "Environment Variables") :
   ```
   NEXT_PUBLIC_API_URL=https://ugate.pynfi.com
   ```

6. Cliquez sur "Deploy"

### Option B: Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivre les instructions :
# - Set up and deploy? Yes
# - Which scope? Votre compte
# - Link to existing project? No
# - Project name? ugate-super-admin-frontend
# - Directory? ./
# - Override settings? No

# Pour déployer en production
vercel --prod
```

---

## Étape 4: Configuration Post-Déploiement

### Variables d'Environnement

Dans le dashboard Vercel, allez dans :
**Settings** → **Environment Variables**

Ajoutez :
```
NEXT_PUBLIC_API_URL=https://ugate.pynfi.com
```

### Domaine Personnalisé (Optionnel)

1. Allez dans **Settings** → **Domains**
2. Ajoutez votre domaine personnalisé
3. Suivez les instructions DNS

---

## 🔄 Déploiements Automatiques

Une fois configuré, chaque `git push` sur la branche `main` déclenchera automatiquement un déploiement sur Vercel.

```bash
# Faire des modifications
git add .
git commit -m "Update: description des changements"
git push origin main

# Vercel déploiera automatiquement
```

---

## 🐛 Résolution de Problèmes

### Erreur: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/VOTRE_USERNAME/ugate-super-admin-frontend.git
```

### Erreur de Build sur Vercel
- Vérifiez que `package.json` contient bien `"build": "next build"`
- Vérifiez que toutes les dépendances sont dans `package.json`
- Consultez les logs de build dans le dashboard Vercel

### Variables d'Environnement Non Reconnues
- Les variables doivent commencer par `NEXT_PUBLIC_` pour être accessibles côté client
- Redéployez après avoir ajouté des variables d'environnement

---

## 📊 URLs du Projet

- **Repo GitHub** : https://github.com/VOTRE_USERNAME/ugate-super-admin-frontend
- **Vercel Dashboard** : https://vercel.com/dashboard
- **URL de Production** : Sera fournie après le premier déploiement

---

## ✅ Checklist de Déploiement

- [ ] Repo GitHub créé
- [ ] Code poussé sur GitHub
- [ ] Projet importé sur Vercel
- [ ] Variables d'environnement configurées
- [ ] Premier déploiement réussi
- [ ] URL de production testée
- [ ] Déploiements automatiques activés

---

## 📞 Support

En cas de problème :
- Documentation Vercel : https://vercel.com/docs
- Documentation Next.js : https://nextjs.org/docs
