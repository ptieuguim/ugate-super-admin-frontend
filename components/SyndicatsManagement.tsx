'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Eye,
  MoreVertical,
  Users,
  Calendar,
  MapPin,
  FileText,
  Power,
  UserCheck,
  UserX,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Syndicat } from '@/lib/types/superadmin';

interface SyndicatsManagementProps {
  onNavigate?: (view: string, data?: unknown) => void;
}

export const SyndicatsManagement: React.FC<SyndicatsManagementProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'active' | 'inactive'>('all');
  const [selectedSyndicat, setSelectedSyndicat] = useState<Syndicat | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const mockSyndicats: Syndicat[] = [
    {
      id: '1',
      name: 'Syndicat des Enseignants',
      description: 'Syndicat regroupant les enseignants du secondaire',
      domain: 'Éducation',
      type: 'Professionnel',
      isApproved: false,
      isActive: true,
      creationDate: '2024-01-15',
      lastUpdate: '2024-12-20',
      organizationId: 'org-1',
      memberCount: 245,
      subscriptionPlan: 'Premium',
      subscriptionExpiry: '2025-01-15',
    },
    {
      id: '2',
      name: 'Syndicat des Médecins',
      description: 'Syndicat des professionnels de santé',
      domain: 'Santé',
      type: 'Professionnel',
      isApproved: true,
      isActive: true,
      creationDate: '2023-06-10',
      lastUpdate: '2024-12-15',
      organizationId: 'org-2',
      memberCount: 892,
      subscriptionPlan: 'Enterprise',
      subscriptionExpiry: '2025-06-10',
      charteUrl: 'https://example.com/charte.pdf',
      statusUrl: 'https://example.com/status.pdf',
    },
    {
      id: '3',
      name: 'Syndicat des Infirmiers',
      description: 'Syndicat du personnel infirmier',
      domain: 'Santé',
      type: 'Professionnel',
      isApproved: true,
      isActive: false,
      creationDate: '2023-09-20',
      lastUpdate: '2024-11-30',
      organizationId: 'org-3',
      memberCount: 567,
      subscriptionPlan: 'Standard',
      subscriptionExpiry: '2024-09-20',
    },
  ];

  const filteredSyndicats = mockSyndicats.filter(syndicat => {
    const matchesSearch = syndicat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         syndicat.domain.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'approved') return matchesSearch && syndicat.isApproved;
    if (filterStatus === 'pending') return matchesSearch && !syndicat.isApproved;
    if (filterStatus === 'active') return matchesSearch && syndicat.isActive;
    if (filterStatus === 'inactive') return matchesSearch && !syndicat.isActive;
    
    return matchesSearch;
  });

  const handleApproveSyndicat = (id: string) => {
    console.log('Approuver syndicat:', id);
  };

  const handleDisapproveSyndicat = (id: string) => {
    console.log('Désapprouver syndicat:', id);
  };

  const handleActivateSyndicat = (id: string) => {
    console.log('Activer syndicat:', id);
  };

  const handleDeactivateSyndicat = (id: string) => {
    console.log('Désactiver syndicat:', id);
  };

  const handleViewProfile = (syndicat: Syndicat) => {
    setSelectedSyndicat(syndicat);
    setShowProfileModal(true);
  };

  const handleViewMembers = (syndicatId: string) => {
    if (onNavigate) {
      onNavigate('members', { syndicatId });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Syndicats</h1>
          <p className="text-gray-600 mt-1">Consulter, approuver et gérer les syndicats</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="info" className="px-3 py-1">
            {filteredSyndicats.length} syndicats
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un syndicat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'all' ? 'bg-[#1877F2] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setFilterStatus('approved')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'approved' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Approuvés
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'pending' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                En attente
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Actifs
              </button>
              <button
                onClick={() => setFilterStatus('inactive')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'inactive' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Inactifs
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Syndicats List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredSyndicats.map((syndicat) => (
          <Card key={syndicat.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 bg-[#1877F2] rounded-xl flex items-center justify-center shadow-sm">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{syndicat.name}</h3>
                      <Badge variant={syndicat.isApproved ? 'success' : 'warning'}>
                        {syndicat.isApproved ? 'Approuvé' : 'En attente'}
                      </Badge>
                      <Badge variant={syndicat.isActive ? 'info' : 'default'}>
                        {syndicat.isActive ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{syndicat.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{syndicat.domain}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{syndicat.memberCount} membres</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Créé le {new Date(syndicat.creationDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>{syndicat.subscriptionPlan}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewProfile(syndicat)}
                    leftIcon={Eye}
                  >
                    Profil
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewMembers(syndicat.id)}
                    leftIcon={Users}
                  >
                    Membres
                  </Button>
                  {!syndicat.isApproved && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleApproveSyndicat(syndicat.id)}
                      leftIcon={UserCheck}
                      className="text-emerald-600 hover:bg-emerald-50"
                    >
                      Approuver
                    </Button>
                  )}
                  {syndicat.isApproved && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDisapproveSyndicat(syndicat.id)}
                      leftIcon={UserX}
                      className="text-orange-600 hover:bg-orange-50"
                    >
                      Désapprouver
                    </Button>
                  )}
                  {syndicat.isActive ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeactivateSyndicat(syndicat.id)}
                      leftIcon={Power}
                      className="text-red-600 hover:bg-red-50"
                    >
                      Désactiver
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleActivateSyndicat(syndicat.id)}
                      leftIcon={Power}
                      className="text-green-600 hover:bg-green-50"
                    >
                      Activer
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile Modal */}
      {showProfileModal && selectedSyndicat && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Profil du Syndicat</h2>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informations Générales</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Nom</label>
                    <p className="text-gray-900 font-semibold mt-1">{selectedSyndicat.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Domaine</label>
                    <p className="text-gray-900 font-semibold mt-1">{selectedSyndicat.domain}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Type</label>
                    <p className="text-gray-900 font-semibold mt-1">{selectedSyndicat.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Nombre de membres</label>
                    <p className="text-gray-900 font-semibold mt-1">{selectedSyndicat.memberCount || 0}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">ID Organisation</label>
                    <p className="text-gray-900 font-mono text-sm mt-1">{selectedSyndicat.organizationId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Date de création</label>
                    <p className="text-gray-900 font-semibold mt-1">
                      {new Date(selectedSyndicat.creationDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Dernière mise à jour</label>
                    <p className="text-gray-900 font-semibold mt-1">
                      {new Date(selectedSyndicat.lastUpdate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-600">Description</label>
                    <p className="text-gray-900 mt-1">{selectedSyndicat.description}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Statut</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${selectedSyndicat.isApproved ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                    <div>
                      <p className="text-sm text-gray-600">Approbation</p>
                      <p className="font-semibold text-gray-900">{selectedSyndicat.isApproved ? 'Approuvé' : 'En attente'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${selectedSyndicat.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="text-sm text-gray-600">Activation</p>
                      <p className="font-semibold text-gray-900">{selectedSyndicat.isActive ? 'Actif' : 'Inactif'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscription */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Abonnement</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Plan</label>
                    <p className="text-gray-900 font-semibold mt-1">{selectedSyndicat.subscriptionPlan}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Expiration</label>
                    <p className="text-gray-900 font-semibold mt-1">
                      {selectedSyndicat.subscriptionExpiry ? new Date(selectedSyndicat.subscriptionExpiry).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              {(selectedSyndicat.charteUrl || selectedSyndicat.statusUrl || selectedSyndicat.certificatEngagementUrl || selectedSyndicat.listMembersUrl) && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Documents</h3>
                  <div className="space-y-2">
                    {selectedSyndicat.charteUrl && (
                      <a
                        href={selectedSyndicat.charteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Download className="w-5 h-5 text-[#1877F2]" />
                        <span className="font-medium text-gray-900">Charte</span>
                      </a>
                    )}
                    {selectedSyndicat.statusUrl && (
                      <a
                        href={selectedSyndicat.statusUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Download className="w-5 h-5 text-[#1877F2]" />
                        <span className="font-medium text-gray-900">Statuts</span>
                      </a>
                    )}
                    {selectedSyndicat.certificatEngagementUrl && (
                      <a
                        href={selectedSyndicat.certificatEngagementUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Download className="w-5 h-5 text-[#1877F2]" />
                        <span className="font-medium text-gray-900">Certificat d&apos;Engagement</span>
                      </a>
                    )}
                    {selectedSyndicat.listMembersUrl && (
                      <a
                        href={selectedSyndicat.listMembersUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Download className="w-5 h-5 text-[#1877F2]" />
                        <span className="font-medium text-gray-900">Liste des Membres</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {!selectedSyndicat.isApproved && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleApproveSyndicat(selectedSyndicat.id);
                      setShowProfileModal(false);
                    }}
                    leftIcon={CheckCircle}
                  >
                    Approuver le Syndicat
                  </Button>
                )}
                {selectedSyndicat.isApproved && (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleDisapproveSyndicat(selectedSyndicat.id);
                      setShowProfileModal(false);
                    }}
                    leftIcon={XCircle}
                  >
                    Désapprouver le Syndicat
                  </Button>
                )}
                {selectedSyndicat.isActive ? (
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDeactivateSyndicat(selectedSyndicat.id);
                      setShowProfileModal(false);
                    }}
                    leftIcon={Power}
                  >
                    Désactiver
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleActivateSyndicat(selectedSyndicat.id);
                      setShowProfileModal(false);
                    }}
                    leftIcon={Power}
                  >
                    Activer
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
