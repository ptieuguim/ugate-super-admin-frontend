/**
 * 🔧 SERVICE : SuperAdmin API
 * 
 * Ce service gère toutes les interactions avec l'API UGate pour le Super Admin
 * - Analytics : Statistiques globales de la plateforme
 * - Management : Gestion des syndicats (approuver, désactiver, etc.)
 */

const API_BASE_URL = 'https://ugate.pynfi.com';

// Mode développement : utiliser des données mockées
// IMPORTANT : Désactivé pour tester avec les vraies données
const USE_MOCK_DATA = false;

// Types pour les mises à jour de profil
export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface LogActivityRequest {
  action: string;
  entityType: string;
  entityId: string;
  details?: Record<string, unknown>;
}

// Types pour les réponses API
export interface StatsResponse {
  totalSyndicats: number;
  activeSyndicats: number;
  pendingSyndicats: number;
  totalMembers: number;
  activeMembers: number;
  totalRevenue: number;
}

// Données mockées pour le développement
const MOCK_STATS: StatsResponse = {
  totalSyndicats: 248,
  activeSyndicats: 186,
  pendingSyndicats: 12,
  totalMembers: 12543,
  activeMembers: 9876,
  totalRevenue: 452300,
};

const MOCK_SYNDICATES: SyndicateResponse[] = [
  {
    id: '1',
    name: 'Syndicat des Enseignants',
    description: 'Syndicat regroupant les enseignants du secondaire',
    domain: 'Éducation',
    isApproved: false,
    isActive: true,
    logoUrl: '',
    statusUrl: '',
    creatorId: 'user-1',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Syndicat des Médecins',
    description: 'Syndicat des professionnels de santé',
    domain: 'Santé',
    isApproved: true,
    isActive: true,
    logoUrl: '',
    statusUrl: '',
    creatorId: 'user-2',
    createdAt: '2023-06-10T10:00:00Z',
  },
  {
    id: '3',
    name: 'Syndicat des Infirmiers',
    description: 'Syndicat du personnel infirmier',
    domain: 'Santé',
    isApproved: true,
    isActive: false,
    logoUrl: '',
    statusUrl: '',
    creatorId: 'user-3',
    createdAt: '2023-09-20T10:00:00Z',
  },
  {
    id: '4',
    name: 'Syndicat des Chauffeurs',
    description: 'Syndicat des chauffeurs de taxi',
    domain: 'Transport',
    isApproved: true,
    isActive: true,
    logoUrl: '',
    statusUrl: '',
    creatorId: 'user-4',
    createdAt: '2024-02-01T10:00:00Z',
  },
  {
    id: '5',
    name: 'Syndicat des Commerçants',
    description: 'Syndicat des commerçants du marché central',
    domain: 'Commerce',
    isApproved: false,
    isActive: true,
    logoUrl: '',
    statusUrl: '',
    creatorId: 'user-5',
    createdAt: '2024-03-15T10:00:00Z',
  },
];

export interface SyndicateResponse {
  id: string;
  name: string;
  description: string;
  domain: string;
  isApproved: boolean;
  logoUrl: string;
  statusUrl: string;
  creatorId: string;
  createdAt: string;
  isActive: boolean;
  // Champs optionnels qui peuvent être présents
  type?: string;
  memberCount?: number;
  organizationId?: string;
  subscriptionPlan?: string;
  subscriptionExpiry?: string;
  charteUrl?: string;
  certificatEngagementUrl?: string;
  listMembersUrl?: string;
  creationDate?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

/**
 * 📊 ANALYTICS : Obtenir les KPIs globaux
 */
export const getDashboardStats = async (): Promise<StatsResponse> => {
  // Mode développement : retourner les données mockées
  if (USE_MOCK_DATA) {
    console.log('🔧 Mode développement : Utilisation des données mockées');
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_STATS), 500);
    });
  }

  try {
    const token = localStorage.getItem('ugate_access_token');
    const response = await fetch(`${API_BASE_URL}/super-admin/analytics/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || ''}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des stats:', error);
    throw error;
  }
};

/**
 * 📊 MANAGEMENT : Obtenir les statistiques globales
 */
export const getGlobalStats = async (): Promise<StatsResponse> => {
  try {
    const token = localStorage.getItem('ugate_access_token');
    const response = await fetch(`${API_BASE_URL}/super-admin/syndicates/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || ''}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des stats globales:', error);
    throw error;
  }
};

/**
 * 📋 SYNDICATS : Lister tous les syndicats avec pagination
 */
export const getAllSyndicates = async (
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<SyndicateResponse>> => {
  // Mode développement : retourner les données mockées
  if (USE_MOCK_DATA) {
    console.log('🔧 Mode développement : Utilisation des données mockées');
    const start = page * size;
    const end = start + size;
    const paginatedData = MOCK_SYNDICATES.slice(start, end);
    
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        content: paginatedData,
        page,
        size,
        totalElements: MOCK_SYNDICATES.length,
        totalPages: Math.ceil(MOCK_SYNDICATES.length / size),
      }), 500);
    });
  }

  try {
    const token = localStorage.getItem('ugate_access_token');
    console.log('🔑 Token récupéré:', token ? `${token.substring(0, 20)}...` : 'AUCUN TOKEN');
    console.log('📡 Appel API:', `${API_BASE_URL}/syndicates?page=${page}&size=${size}`);
    
    const response = await fetch(
      `${API_BASE_URL}/syndicates?page=${page}&size=${size}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`,
        },
      }
    );

    console.log('📊 Réponse API:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erreur API:', errorText);
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Données reçues:', data);
    return data;
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des syndicats:', error);
    throw error;
  }
};

/**
 * ✅ APPROUVER : Approuver un syndicat
 */
export const approveSyndicate = async (id: string): Promise<SyndicateResponse> => {
  // Mode développement : simuler l'action
  if (USE_MOCK_DATA) {
    console.log('🔧 Mode développement : Simulation de l\'approbation du syndicat', id);
    const syndicat = MOCK_SYNDICATES.find(s => s.id === id);
    if (syndicat) {
      syndicat.isApproved = true;
      return new Promise((resolve) => {
        setTimeout(() => resolve(syndicat), 300);
      });
    }
    throw new Error('Syndicat non trouvé');
  }

  try {
    const token = localStorage.getItem('ugate_access_token');
    const response = await fetch(`${API_BASE_URL}/super-admin/syndicates/${id}/approve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || ''}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Erreur lors de l\'approbation du syndicat:', error);
    throw error;
  }
};

/**
 * ❌ DÉSAPPROUVER : Désapprouver un syndicat
 */
export const disapproveSyndicate = async (id: string): Promise<SyndicateResponse> => {
  if (USE_MOCK_DATA) {
    console.log('🔧 Mode développement : Simulation de la désapprobation du syndicat', id);
    const syndicat = MOCK_SYNDICATES.find(s => s.id === id);
    if (syndicat) {
      syndicat.isApproved = false;
      return new Promise((resolve) => setTimeout(() => resolve(syndicat), 300));
    }
    throw new Error('Syndicat non trouvé');
  }

  try {
    const token = localStorage.getItem('ugate_access_token');
    const response = await fetch(`${API_BASE_URL}/super-admin/syndicates/${id}/disapprove`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || ''}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Erreur lors de la désapprobation du syndicat:', error);
    throw error;
  }
};

/**
 * 🟢 ACTIVER : Activer un syndicat
 */
export const activateSyndicate = async (id: string): Promise<SyndicateResponse> => {
  if (USE_MOCK_DATA) {
    console.log('🔧 Mode développement : Simulation de l\'activation du syndicat', id);
    const syndicat = MOCK_SYNDICATES.find(s => s.id === id);
    if (syndicat) {
      syndicat.isActive = true;
      return new Promise((resolve) => setTimeout(() => resolve(syndicat), 300));
    }
    throw new Error('Syndicat non trouvé');
  }

  try {
    const token = localStorage.getItem('ugate_access_token');
    const response = await fetch(`${API_BASE_URL}/super-admin/syndicates/${id}/activate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || ''}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Erreur lors de l\'activation du syndicat:', error);
    throw error;
  }
};

/**
 * 🔴 DÉSACTIVER : Désactiver un syndicat
 */
export const deactivateSyndicate = async (id: string): Promise<SyndicateResponse> => {
  if (USE_MOCK_DATA) {
    console.log('🔧 Mode développement : Simulation de la désactivation du syndicat', id);
    const syndicat = MOCK_SYNDICATES.find(s => s.id === id);
    if (syndicat) {
      syndicat.isActive = false;
      return new Promise((resolve) => setTimeout(() => resolve(syndicat), 300));
    }
    throw new Error('Syndicat non trouvé');
  }

  try {
    const token = localStorage.getItem('ugate_access_token');
    const response = await fetch(`${API_BASE_URL}/super-admin/syndicates/${id}/deactivate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || ''}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Erreur lors de la désactivation du syndicat:', error);
    throw error;
  }
};

/**
 * 👤 PROFIL : Mettre à jour le profil utilisateur
 */
export const updateProfile = async (data: UpdateProfileRequest): Promise<void> => {
  if (USE_MOCK_DATA) {
    console.log('🔧 Mode développement : Simulation de la mise à jour du profil', data);
    return new Promise((resolve) => setTimeout(() => resolve(), 300));
  }

  try {
    const token = localStorage.getItem('ugate_access_token');
    const response = await fetch(`${API_BASE_URL}/super-admin/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || ''}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    console.log('✅ Profil mis à jour avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour du profil:', error);
    throw error;
  }
};

/**
 * 🔒 SÉCURITÉ : Changer le mot de passe
 */
export const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
  if (USE_MOCK_DATA) {
    console.log('🔧 Mode développement : Simulation du changement de mot de passe');
    return new Promise((resolve) => setTimeout(() => resolve(), 300));
  }

  try {
    const token = localStorage.getItem('ugate_access_token');
    const response = await fetch(`${API_BASE_URL}/super-admin/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || ''}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    console.log('✅ Mot de passe modifié avec succès');
  } catch (error) {
    console.error('❌ Erreur lors du changement de mot de passe:', error);
    throw error;
  }
};

/**
 * 📝 LOGS : Enregistrer une activité
 */
export const logActivity = async (data: LogActivityRequest): Promise<void> => {
  if (USE_MOCK_DATA) {
    console.log('🔧 Mode développement : Log d\'activité', data);
    return new Promise((resolve) => setTimeout(() => resolve(), 100));
  }

  try {
    const token = localStorage.getItem('ugate_access_token');
    const userId = localStorage.getItem('ugate_user_id') || 'unknown';
    
    const logData = {
      userId,
      action: data.action,
      entityType: data.entityType,
      entityId: data.entityId,
      timestamp: new Date().toISOString(),
      ipAddress: 'client-ip', // Sera récupéré par le backend
      userAgent: navigator.userAgent,
      details: data.details || {},
    };

    const response = await fetch(`${API_BASE_URL}/super-admin/activity-logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || ''}`,
      },
      body: JSON.stringify(logData),
    });

    if (!response.ok) {
      // Ne pas bloquer l'opération si le log échoue
      console.warn('⚠️ Erreur lors de l\'enregistrement du log d\'activité');
    } else {
      console.log('✅ Activité enregistrée:', data.action);
    }
  } catch (error) {
    // Ne pas bloquer l'opération si le log échoue
    console.warn('⚠️ Erreur lors de l\'enregistrement du log:', error);
  }
};
