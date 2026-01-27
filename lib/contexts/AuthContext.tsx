/**
 * Contexte d'Authentification
 * 
 * Ce fichier crée un "contexte" React qui permet de :
 * - Partager l'état d'authentification dans toute l'application
 * - Éviter de passer les props à travers tous les composants
 * - Centraliser la logique d'authentification
 * 
 * Pensez-y comme un "état global" pour l'authentification
 */

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  login as apiLogin, 
  logout as apiLogout,
  getUserInfo,
  isAuthenticated as checkAuth,
  isSuperAdmin as checkSuperAdmin,
  refreshAccessToken
} from '@/lib/services/auth.service';
import { LoginCredentials, UserInfo } from '@/lib/types/auth';

/**
 * 📋 INTERFACE : État du Contexte
 * 
 * Définit toutes les données et fonctions disponibles dans le contexte
 */
interface AuthContextType {
  // État
  isAuthenticated: boolean;           // L'utilisateur est-il connecté ?
  isLoading: boolean;                 // Chargement en cours ?
  user: UserInfo | null;              // Informations de l'utilisateur
  error: string | null;               // Erreur éventuelle
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuthentication: () => void;
}

/**
 * 🏗️ CRÉATION DU CONTEXTE
 * 
 * Crée le contexte avec une valeur par défaut undefined
 * On utilisera un hook personnalisé pour y accéder
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 🎁 PROVIDER : Composant qui fournit le contexte
 * 
 * Ce composant enveloppe votre application et fournit
 * l'état d'authentification à tous les composants enfants
 * 
 * @param children - Les composants enfants
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 📊 ÉTATS LOCAUX
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * 🔍 FONCTION : Vérifier l'authentification
   * 
   * Vérifie si l'utilisateur est déjà connecté au chargement
   */
  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        console.log('❌ Aucun token trouvé');
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      console.log('🔍 Vérification de l\'authentification...');
      
      // Vérifier le token et récupérer les infos utilisateur
      const userInfo = await getUserInfo();
      
      // Vérifier que l'utilisateur a le rôle SUPER_ADMIN ou ADMIN
      if (!checkSuperAdmin()) {
        console.error('❌ Accès refusé : Rôle SUPER_ADMIN requis');
        await logout();
        return;
      }

      setUser(userInfo);
      setIsAuthenticated(true);
      console.log('✅ Authentification réussie:', userInfo);
      
    } catch (error) {
      console.error('❌ Erreur lors de la vérification:', error);
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 🔐 FONCTION : Connexion
   * 
   * Gère le processus de connexion
   * 
   * @param credentials - Email et mot de passe
   */
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('🔐 Tentative de connexion...');
      
      // Appeler l'API de login
      const response = await apiLogin(credentials);
      
      // Vérifier si c'est un super admin ou admin
      const hasAdminRole = response.user.roles?.includes('SUPER_ADMIN') || response.user.roles?.includes('ADMIN');
      if (!hasAdminRole) {
        apiLogout();
        throw new Error('Accès réservé aux super administrateurs uniquement');
      }
      
      // Mettre à jour l'état
      setIsAuthenticated(true);
      setUser(response.user);
      
      console.log('✅ Connexion réussie !');
      
    } catch (err) {
      console.error('❌ Erreur de connexion:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erreur de connexion';
      setError(errorMessage);
      setIsAuthenticated(false);
      setUser(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 🚪 FONCTION : Déconnexion
   * 
   * Gère le processus de déconnexion
   */
  const logout = () => {
    console.log('🚪 Déconnexion...');
    
    apiLogout();
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
    
    console.log('✅ Déconnexion réussie');
  };

  /**
   * ⚡ EFFET : Vérification initiale
   * 
   * S'exécute au montage du composant
   * Vérifie si l'utilisateur est déjà connecté
   */
  useEffect(() => {
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * ⏰ EFFET : Rafraîchissement automatique du token
   * 
   * Configure un timer pour rafraîchir le token avant expiration
   */
  useEffect(() => {
    if (!isAuthenticated) return;

    console.log('⏰ Configuration du rafraîchissement automatique du token');

    // Rafraîchir le token toutes les 10 minutes
    const refreshInterval = setInterval(async () => {
      try {
        console.log('🔄 Rafraîchissement automatique du token...');
        await refreshAccessToken();
        console.log('✅ Token rafraîchi automatiquement');
      } catch (error) {
        console.error('❌ Échec du rafraîchissement automatique:', error);
        logout();
      }
    }, 10 * 60 * 1000); // 10 minutes

    // Nettoyer l'intervalle lors du démontage
    return () => {
      console.log('🧹 Nettoyage du timer de rafraîchissement');
      clearInterval(refreshInterval);
    };
  }, [isAuthenticated]);

  /**
   * 📦 VALEUR DU CONTEXTE
   * 
   * Toutes les données et fonctions disponibles dans le contexte
   */
  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    error,
    login,
    logout,
    checkAuthentication,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * 🪝 HOOK PERSONNALISÉ : useAuth
 * 
 * Hook pour accéder facilement au contexte d'authentification
 * 
 * @returns Le contexte d'authentification
 * @throws Erreur si utilisé en dehors du AuthProvider
 * 
 * EXEMPLE D'UTILISATION :
 * 
 * function MonComposant() {
 *   const { isAuthenticated, user, login, logout } = useAuth();
 *   
 *   if (!isAuthenticated) {
 *     return <div>Non connecté</div>;
 *   }
 *   
 *   return <div>Bonjour {user?.firstName}</div>;
 * }
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  
  return context;
};

/**
 * 📚 EXPLICATION SIMPLE :
 * 
 * 1. Le AuthProvider enveloppe votre application (dans layout.tsx)
 * 2. Tous les composants enfants peuvent utiliser useAuth()
 * 3. useAuth() donne accès à l'état d'authentification partout
 * 4. Plus besoin de passer les props à travers tous les composants !
 * 
 * C'est comme avoir une "boîte magique" accessible partout dans votre app
 */
