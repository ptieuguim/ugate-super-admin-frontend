/**
 * Client API avec Intercepteur
 * 
 * Ce fichier crée un client HTTP personnalisé qui :
 * - Ajoute automatiquement le token d'authentification à chaque requête
 * - Rafraîchit automatiquement le token s'il est expiré
 * - Gère les erreurs d'authentification
 * 
 * C'est comme un "garde du corps" pour vos requêtes HTTP !
 */

import { 
  getAccessToken, 
  isTokenExpired, 
  refreshAccessToken, 
  logout 
} from './auth.service';

/**
 * 🌐 FONCTION PRINCIPALE : API CLIENT
 * 
 * Cette fonction remplace le fetch() standard de JavaScript
 * Elle fait la même chose, mais avec la gestion automatique des tokens
 * 
 * @param url - L'URL de l'API à appeler
 * @param options - Options de la requête (method, body, headers, etc.)
 * @returns Promesse contenant la réponse
 */
export const apiClient = async (
  url: string, 
  options: RequestInit = {}
): Promise<Response> => {
  
  console.log('🌐 Appel API vers:', url);
  
  // ÉTAPE 1 : Vérifier si le token est expiré
  if (isTokenExpired()) {
    console.log('⚠️ Token expiré, tentative de rafraîchissement...');
    
    try {
      // Essayer de rafraîchir le token
      await refreshAccessToken();
      console.log('✅ Token rafraîchi avec succès');
    } catch (error) {
      console.error('❌ Impossible de rafraîchir le token');
      // Si le refresh échoue, déconnecter l'utilisateur
      logout();
      // Rediriger vers la page de login
      window.location.href = '/';
      throw new Error('Session expirée, veuillez vous reconnecter');
    }
  }
  
  // ÉTAPE 2 : Récupérer le token actuel
  const token = getAccessToken();
  
  // ÉTAPE 3 : Préparer les headers de la requête
  const headers = new Headers(options.headers || {});
  
  // Ajouter le token d'authentification si disponible
  if (token) {
    // Format standard : "Bearer <token>"
    headers.set('Authorization', `Bearer ${token}`);
    console.log('🔑 Token ajouté à la requête');
  }
  
  // Ajouter le Content-Type si ce n'est pas déjà fait
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  
  // ÉTAPE 4 : Faire la requête avec les headers modifiés
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    // ÉTAPE 5 : Gérer les erreurs d'authentification
    if (response.status === 401) {
      console.error('❌ Erreur 401 : Non autorisé');
      
      // Essayer de rafraîchir le token une fois
      try {
        await refreshAccessToken();
        console.log('✅ Token rafraîchi, nouvelle tentative...');
        
        // Refaire la requête avec le nouveau token
        const newToken = getAccessToken();
        if (newToken) {
          headers.set('Authorization', `Bearer ${newToken}`);
        }
        
        return await fetch(url, {
          ...options,
          headers,
        });
      } catch (refreshError) {
        console.error('❌ Échec du refresh après 401');
        logout();
        window.location.href = '/';
        throw new Error('Session expirée');
      }
    }
    
    // ÉTAPE 6 : Gérer les autres erreurs HTTP
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Erreur API:', response.status, errorData);
      throw new Error(errorData.message || `Erreur ${response.status}`);
    }
    
    console.log('✅ Requête réussie');
    return response;
    
  } catch (error) {
    console.error('❌ Erreur lors de la requête:', error);
    throw error;
  }
};

/**
 * 📥 FONCTION HELPER : GET
 * 
 * Simplifie les requêtes GET
 * 
 * @param url - L'URL à appeler
 * @returns Promesse contenant les données JSON
 */
export const apiGet = async <T>(url: string): Promise<T> => {
  const response = await apiClient(url, {
    method: 'GET',
  });
  return response.json();
};

/**
 * 📤 FONCTION HELPER : POST
 * 
 * Simplifie les requêtes POST
 * 
 * @param url - L'URL à appeler
 * @param data - Les données à envoyer
 * @returns Promesse contenant les données JSON
 */
export const apiPost = async <T>(url: string, data: unknown): Promise<T> => {
  const response = await apiClient(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
};

/**
 * 🔄 FONCTION HELPER : PUT
 * 
 * Simplifie les requêtes PUT
 * 
 * @param url - L'URL à appeler
 * @param data - Les données à envoyer
 * @returns Promesse contenant les données JSON
 */
export const apiPut = async <T>(url: string, data: unknown): Promise<T> => {
  const response = await apiClient(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return response.json();
};

/**
 * 🔧 FONCTION HELPER : PATCH
 * 
 * Simplifie les requêtes PATCH
 * 
 * @param url - L'URL à appeler
 * @param data - Les données à envoyer
 * @returns Promesse contenant les données JSON
 */
export const apiPatch = async <T>(url: string, data: unknown): Promise<T> => {
  const response = await apiClient(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  return response.json();
};

/**
 * 🗑️ FONCTION HELPER : DELETE
 * 
 * Simplifie les requêtes DELETE
 * 
 * @param url - L'URL à appeler
 * @returns Promesse contenant les données JSON
 */
export const apiDelete = async <T>(url: string): Promise<T> => {
  const response = await apiClient(url, {
    method: 'DELETE',
  });
  return response.json();
};

/**
 * 📋 EXEMPLE D'UTILISATION :
 * 
 * // Au lieu de faire :
 * const response = await fetch('/api/users', {
 *   headers: {
 *     'Authorization': `Bearer ${token}`,
 *     'Content-Type': 'application/json'
 *   }
 * });
 * 
 * // Vous faites simplement :
 * const users = await apiGet<User[]>('/api/users');
 * 
 * // Le token est ajouté automatiquement !
 * // Et si le token expire, il est rafraîchi automatiquement !
 */
