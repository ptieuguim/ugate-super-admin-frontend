/**
 * Service d'Authentification
 * 
 * Ce fichier contient toutes les fonctions pour :
 * - Se connecter à l'API
 * - Gérer les tokens (stockage, récupération, suppression)
 * - Rafraîchir automatiquement les tokens
 * - Décoder et valider les tokens JWT
 */

import { 
  LoginCredentials, 
  LoginResponse, 
  RefreshTokenResponse, 
  DecodedToken,
  UserInfo 
} from '@/lib/types/auth';

// URL de base de l'API d'authentification
const AUTH_API_URL = 'https://auth-service.pynfi.com/api/auth';

// Clés pour le stockage local
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'ugate_access_token',
  REFRESH_TOKEN: 'ugate_refresh_token',
  USER_INFO: 'ugate_user_info',
  TOKEN_EXPIRY: 'ugate_token_expiry',
};

/**
 * 🔐 FONCTION 1 : LOGIN
 * 
 * Cette fonction envoie les identifiants à l'API et reçoit les tokens
 * 
 * @param credentials - Email et mot de passe
 * @returns Promesse contenant la réponse de login
 */
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    console.log('🔄 Tentative de connexion pour:', credentials.identifier);
    
    // Appel à l'API de login
    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    // Vérifier si la requête a réussi
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Réponse API:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      throw new Error(errorData.message || errorData.error || 'Échec de la connexion');
    }

    // Récupérer les données de la réponse
    const data: LoginResponse = await response.json();
    
    console.log('✅ Connexion réussie !');
    
    // Sauvegarder les tokens et les infos utilisateur
    saveAuthData(data);
    
    return data;
  } catch (error) {
    console.error('❌ Erreur lors de la connexion:', error);
    throw error;
  }
};

/**
 * 💾 FONCTION 2 : SAUVEGARDER LES DONNÉES D'AUTHENTIFICATION
 * 
 * Stocke les tokens et les infos utilisateur dans le localStorage
 * 
 * @param data - Données reçues de l'API (tokens + user info)
 */
export const saveAuthData = (data: LoginResponse): void => {
  console.log('💾 Sauvegarde des données d\'authentification...');
  
  // Sauvegarder l'access token
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
  
  // Sauvegarder le refresh token
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
  
  // Sauvegarder les infos utilisateur
  localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(data.user));
  
  // Calculer et sauvegarder la date d'expiration
  // expiresIn est en secondes, on le convertit en millisecondes
  // Si expiresIn n'est pas fourni, on utilise 1 heure par défaut (3600 secondes)
  const expiresInSeconds = data.expiresIn || 3600;
  const expiryTime = Date.now() + (expiresInSeconds * 1000);
  localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiryTime.toString());
  
  console.log('✅ Données sauvegardées avec succès');
  console.log('⏰ Token expire dans:', expiresInSeconds, 'secondes');
};

/**
 * 🔑 FONCTION 3 : RÉCUPÉRER L'ACCESS TOKEN
 * 
 * Récupère le token d'accès depuis le localStorage
 * 
 * @returns Le token ou null s'il n'existe pas
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

/**
 * 🔄 FONCTION 4 : RÉCUPÉRER LE REFRESH TOKEN
 * 
 * Récupère le refresh token depuis le localStorage
 * 
 * @returns Le refresh token ou null s'il n'existe pas
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

/**
 * 👤 FONCTION 5 : RÉCUPÉRER LES INFOS UTILISATEUR
 * 
 * Récupère les informations de l'utilisateur connecté
 * 
 * @returns Les infos utilisateur ou null
 */
export const getUserInfo = (): UserInfo | null => {
  const userInfoStr = localStorage.getItem(STORAGE_KEYS.USER_INFO);
  if (!userInfoStr) return null;
  
  try {
    return JSON.parse(userInfoStr);
  } catch (error) {
    console.error('❌ Erreur lors du parsing des infos utilisateur:', error);
    return null;
  }
};

/**
 * ⏰ FONCTION 6 : VÉRIFIER SI LE TOKEN EST EXPIRÉ
 * 
 * Compare la date actuelle avec la date d'expiration du token
 * 
 * @returns true si le token est expiré, false sinon
 */
export const isTokenExpired = (): boolean => {
  const expiryTimeStr = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
  if (!expiryTimeStr) return true;
  
  const expiryTime = parseInt(expiryTimeStr, 10);
  const now = Date.now();
  
  // On considère le token expiré 1 minute avant l'expiration réelle
  // pour éviter les problèmes de timing
  const isExpired = now >= (expiryTime - 60000);
  
  if (isExpired) {
    console.log('⚠️ Token expiré ou sur le point d\'expirer');
  }
  
  return isExpired;
};

/**
 * 🔄 FONCTION 7 : RAFRAÎCHIR LE TOKEN
 * 
 * Utilise le refresh token pour obtenir un nouveau access token
 * 
 * @returns Promesse contenant les nouveaux tokens
 */
export const refreshAccessToken = async (): Promise<RefreshTokenResponse> => {
  try {
    console.log('🔄 Rafraîchissement du token...');
    
    const refreshToken = getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('Aucun refresh token disponible');
    }

    // Appel à l'API de refresh
    const response = await fetch(`${AUTH_API_URL}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      // Si le refresh échoue, on déconnecte l'utilisateur
      console.error('❌ Échec du refresh token');
      logout();
      throw new Error('Session expirée, veuillez vous reconnecter');
    }

    const data: RefreshTokenResponse = await response.json();
    
    console.log('✅ Token rafraîchi avec succès !');
    
    // Mettre à jour les tokens
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
    
    // Mettre à jour la date d'expiration
    const expiryTime = Date.now() + (data.expiresIn * 1000);
    localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiryTime.toString());
    
    return data;
  } catch (error) {
    console.error('❌ Erreur lors du refresh:', error);
    throw error;
  }
};

/**
 * 🚪 FONCTION 8 : DÉCONNEXION
 * 
 * Supprime tous les tokens et infos utilisateur du localStorage
 */
export const logout = (): void => {
  console.log('🚪 Déconnexion en cours...');
  
  // Supprimer tous les éléments du localStorage
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRY);
  
  console.log('✅ Déconnexion réussie');
};

/**
 * ✅ FONCTION 9 : VÉRIFIER SI L'UTILISATEUR EST AUTHENTIFIÉ
 * 
 * Vérifie si un token valide existe
 * 
 * @returns true si authentifié, false sinon
 */
export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  return token !== null && !isTokenExpired();
};

/**
 * 🔓 FONCTION 10 : DÉCODER LE TOKEN JWT
 * 
 * Décode un token JWT pour extraire les informations qu'il contient
 * Un JWT est composé de 3 parties séparées par des points : header.payload.signature
 * 
 * @param token - Le token JWT à décoder
 * @returns Les données décodées ou null
 */
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    // Un JWT a 3 parties : header.payload.signature
    // Nous voulons la partie "payload" (la 2ème)
    const parts = token.split('.');
    
    if (parts.length !== 3) {
      throw new Error('Format de token invalide');
    }
    
    // Décoder la partie payload (base64)
    const payload = parts[1];
    const decodedPayload = atob(payload);
    
    // Parser le JSON
    const decoded: DecodedToken = JSON.parse(decodedPayload);
    
    return decoded;
  } catch (error) {
    console.error('❌ Erreur lors du décodage du token:', error);
    return null;
  }
};

/**
 * 🛡️ FONCTION 11 : VÉRIFIER LE RÔLE DE L'UTILISATEUR
 * 
 * Vérifie si l'utilisateur a un rôle spécifique
 * 
 * @param requiredRole - Le rôle requis
 * @returns true si l'utilisateur a le rôle, false sinon
 */
export const hasRole = (requiredRole: string): boolean => {
  const userInfo = getUserInfo();
  return userInfo?.roles?.includes(requiredRole) || false;
};

/**
 * 🔐 FONCTION 12 : VÉRIFIER SI C'EST UN SUPER ADMIN
 * 
 * Vérifie si l'utilisateur connecté est un super administrateur
 * Accepte les rôles SUPER_ADMIN et ADMIN
 * 
 * @returns true si super admin ou admin, false sinon
 */
export const isSuperAdmin = (): boolean => {
  return hasRole('SUPER_ADMIN') || hasRole('ADMIN');
};
