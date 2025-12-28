# UGate Super Admin Frontend

Application Next.js pour le tableau de bord Super Administrateur de la plateforme UGate.

## 🚀 Démarrage

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3001](http://localhost:3001)

### Build Production

```bash
npm run build
npm start
```

## 📁 Structure du Projet

```
ugate-super-admin-frontend/
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil (Login/Dashboard)
│   └── globals.css        # Styles globaux
├── components/            # Composants React
│   ├── ui/               # Composants UI réutilisables
│   ├── Login.tsx         # Composant de connexion
│   ├── SuperAdminLayout.tsx
│   ├── SuperAdminDashboard.tsx
│   ├── SyndicatsManagement.tsx
│   ├── MembersManagement.tsx
│   ├── FlaggedContent.tsx
│   ├── PaymentsManagement.tsx
│   ├── ActivityLogs.tsx
│   ├── SubscriptionPlans.tsx
│   └── BailConfiguration.tsx
├── lib/                   # Utilitaires et types
│   └── types/
│       └── superadmin.ts # Types TypeScript
└── public/               # Assets statiques

```

## 🔐 Authentification

Pour accéder au dashboard super admin, utilisez :
- **Email**: `superadmin@ugate.com`
- **Mot de passe**: Tout mot de passe (mode démo)

## 🎨 Technologies

- **Next.js 16** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icônes
- **React 19** - Bibliothèque UI

## 📊 Fonctionnalités

- ✅ Dashboard global avec statistiques
- ✅ Gestion des syndicats (approbation, activation/désactivation)
- ✅ Gestion des membres (vérification, activation)
- ✅ Modération des contenus signalés
- ✅ Gestion des paiements et abonnements
- ✅ Logs d'activité détaillés
- ✅ Configuration des plans d'abonnement
- ✅ Configuration des règles d'expiration (Bail)

## 🔗 Liens Utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
