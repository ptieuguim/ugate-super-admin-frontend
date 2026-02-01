# Documentation des Endpoints - Paramètres de Compte

## 📋 Résumé

Ce document décrit les endpoints utilisés par la section **Paramètres de Compte** et leur statut d'implémentation.

---

## ✅ Endpoints Disponibles (Vérifiés via Swagger)

### 1. **Mise à jour du Profil Utilisateur**

**Endpoint** : `POST /syndicates/user`  
**API** : UGate (`https://ugate.pynfi.com`)  
**Authentification** : Bearer Token requis  
**Statut** : ✅ **FONCTIONNEL**

#### Paramètres acceptés :
```json
{
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "nationality": "string",
  "gender": "string",
  "language": "string",
  "birthDate": "string",
  "image": "binary"
}
```

#### Implémentation Frontend :
- Fichier : `lib/services/superadmin.service.ts`
- Fonction : `updateProfile()`
- Utilise : `firstName`, `lastName`, `phoneNumber`

#### Test :
```bash
# Ouvrir la console du navigateur (F12)
# Modifier le profil dans l'interface
# Observer l'appel API POST /syndicates/user
```

---

## ⚠️ Endpoints À Vérifier/Implémenter

### 2. **Changement de Mot de Passe**

**Endpoint Supposé** : `/auth/change-password` ou sur l'API Auth  
**API** : Probablement Auth Service (`https://auth-service.pynfi.com`)  
**Statut** : ❌ **NON VÉRIFIÉ** (API Auth Swagger inaccessible)

#### Paramètres attendus :
```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

#### Action Requise :
- [ ] Vérifier avec l'équipe backend l'endpoint exact pour le changement de mot de passe
- [ ] Confirmer si c'est sur l'API Auth ou UGate
- [ ] Mettre à jour `changePassword()` dans `superadmin.service.ts`

#### Implémentation Actuelle :
- Fichier : `lib/services/superadmin.service.ts`
- Fonction : `changePassword()`
- Endpoint utilisé : `${API_BASE_URL}/auth/change-password` (à confirmer)

---

### 3. **Logs d'Activité**

**Endpoint Supposé** : `POST /super-admin/activity-logs`  
**API** : UGate  
**Statut** : ❌ **NON DISPONIBLE** (Absent de la documentation Swagger)

#### Paramètres attendus :
```json
{
  "userId": "uuid",
  "action": "string",
  "entityType": "string",
  "entityId": "string",
  "timestamp": "datetime",
  "ipAddress": "string",
  "userAgent": "string",
  "details": {}
}
```

#### Action Requise :
- [ ] Demander à l'équipe backend d'implémenter cet endpoint si les logs d'activité sont nécessaires
- [ ] Ou utiliser une solution alternative (logs frontend uniquement, ou service externe)

#### Implémentation Actuelle :
- Fichier : `lib/services/superadmin.service.ts`
- Fonction : `logActivity()`
- Statut : **Logs en console uniquement** (pas d'appel API réel)
- Code API commenté et prêt à être activé quand l'endpoint sera disponible

---

## 🔧 Configuration

### Variables d'Environnement

```env
NEXT_PUBLIC_UGATE_API_URL=https://ugate.pynfi.com
NEXT_PUBLIC_AUTH_API_URL=https://auth-service.pynfi.com/api/auth
```

### Authentification

Toutes les requêtes nécessitent un token Bearer stocké dans :
```javascript
localStorage.getItem('ugate_access_token')
```

---

## 📝 Notes pour l'Équipe Backend

### Endpoints à Créer/Vérifier

1. **Changement de Mot de Passe**
   - Endpoint recommandé : `POST /api/auth/change-password`
   - Sur l'API Auth Service
   - Paramètres : `currentPassword`, `newPassword`
   - Réponse : 200 OK ou 400/401 avec message d'erreur

2. **Logs d'Activité** (Optionnel)
   - Endpoint recommandé : `POST /super-admin/activity-logs`
   - Sur l'API UGate
   - Paramètres : voir structure ci-dessus
   - Réponse : 201 Created

---

## 🧪 Tests

### Test de Mise à Jour du Profil

1. Se connecter en tant que Super Admin
2. Aller dans **Paramètres de compte**
3. Modifier le prénom, nom ou téléphone
4. Cliquer sur **Enregistrer les Modifications**
5. Vérifier dans la console :
   - ✅ Appel `POST /syndicates/user`
   - ✅ Statut 200
   - ✅ Message de succès affiché

### Test de Changement de Mot de Passe

1. Cliquer sur **Changer le Mot de Passe**
2. Remplir les champs
3. Cliquer sur **Modifier le Mot de Passe**
4. Vérifier dans la console :
   - ⚠️ Appel API (peut échouer si endpoint non disponible)
   - Observer le message d'erreur si échec

---

## 📚 Références

- **Swagger UGate** : https://ugate.pynfi.com/webjars/swagger-ui/index.html
- **Swagger Auth** : https://auth-service.pynfi.com/swagger-ui/index.html
- **Code Frontend** : `components/superadmin/AccountSettings.tsx`
- **Services API** : `lib/services/superadmin.service.ts`

---

## 🔄 Historique des Modifications

| Date | Modification | Auteur |
|------|-------------|--------|
| 2026-02-01 | Création du document et vérification Swagger | Cascade |
| 2026-02-01 | Ajustement endpoint profil vers POST /syndicates/user | Cascade |
| 2026-02-01 | Documentation des endpoints manquants | Cascade |
