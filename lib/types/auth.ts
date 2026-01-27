/**
 * Types pour l'authentification
 * Ces interfaces définissent la structure des données que nous recevons de l'API
 */

// Réponse de l'API lors du login
export interface LoginResponse {
  accessToken: string;      // Token principal pour les requêtes
  refreshToken: string;     // Token pour renouveler l'access token
  tokenType: string;        // Type de token (généralement "Bearer")
  expiresIn: number;        // Durée de validité en secondes
  user: UserInfo;           // Informations sur l'utilisateur connecté
}

// Informations de l'utilisateur
export interface UserInfo {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];          // Ex: ["SUPER_ADMIN"], ["ADMIN"], ["USER"]
  permissions?: string[];   // Permissions spécifiques
}

// Données pour la connexion
export interface LoginCredentials {
  identifier: string;  // Peut être email, username ou phone
  password: string;
}

// Réponse lors du refresh du token
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Structure du token JWT décodé
export interface DecodedToken {
  sub: string;              // Subject (généralement l'ID utilisateur)
  email: string;
  role: string;
  exp: number;              // Date d'expiration (timestamp)
  iat: number;              // Date de création (timestamp)
}

// Erreur d'authentification
export interface AuthError {
  message: string;
  code: string;
  status: number;
}
