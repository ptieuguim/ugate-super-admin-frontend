'use client';

import React, { useState } from 'react';
import { Search, Filter, Building2, Users, CheckCircle, XCircle, Eye, Power } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Syndicat } from '@/lib/types/superadmin';

export const SyndicatsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [selectedSyndicat, setSelectedSyndicat] = useState<Syndicat | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const mockSyndicats: Syndicat[] = [
    {
      id: '1',
      name: 'Syndicat des Enseignants',
      description: 'Syndicat représentant les enseignants du secteur public',
      domain: 'Éducation',
      type: 'Professionnel',
      isApproved: true,
      isActive: true,
      creationDate: '2024-01-15',
      lastUpdate: '2024-12-20',
      organizationId: 'org-1',
      memberCount: 245,
      subscriptionPlan: 'Premium',
      subscriptionExpiry: '2025-01-15',
      charteUrl: '/docs/charte.pdf',
      statusUrl: '/docs/status.pdf',
    },
    {
      id: '2',
      name: 'Syndicat de la Santé',
      description: 'Syndicat des professionnels de santé',
      domain: 'Santé',
      type: 'Professionnel',
      isApproved: false,
      isActive: false,
      creationDate: '2024-12-10',
      lastUpdate: '2024-12-22',
      organizationId: 'org-2',
      memberCount: 89,
      subscriptionPlan: 'Basic',
    },
  ];

  const filteredSyndicats = mockSyndicats.filter(syndicat => {
    const matchesSearch = syndicat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         syndicat.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ||
                         (statusFilter === 'approved' && syndicat.isApproved) ||
                         (statusFilter === 'pending' && !syndicat.isApproved);
    return matchesSearch && matchesStatus;
  });

  const handleViewProfile = (syndicat: Syndicat) => {
    setSelectedSyndicat(syndicat);
    setShowProfileModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Syndicats</h1>
        <p className="text-gray-600 mt-2">Gérer tous les syndicats de la plateforme</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un syndicat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === 'all' ? 'primary' : 'secondary'}
            onClick={() => setStatusFilter('all')}
          >
            Tous
          </Button>
          <Button
            variant={statusFilter === 'approved' ? 'primary' : 'secondary'}
            onClick={() => setStatusFilter('approved')}
          >
            Approuvés
          </Button>
          <Button
            variant={statusFilter === 'pending' ? 'primary' : 'secondary'}
            onClick={() => setStatusFilter('pending')}
          >
            En attente
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSyndicats.map((syndicat) => (
          <Card key={syndicat.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{syndicat.name}</h3>
                    <p className="text-sm text-gray-600">{syndicat.domain}</p>
                  </div>
                </div>
                <Badge variant={syndicat.isApproved ? 'success' : 'warning'}>
                  {syndicat.isApproved ? 'Approuvé' : 'En attente'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{syndicat.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Users className="w-4 h-4" />
                <span>{syndicat.memberCount} membres</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewProfile(syndicat)}
                  leftIcon={Eye}
                >
                  Voir
                </Button>
                {!syndicat.isApproved && (
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={CheckCircle}
                    className="text-emerald-600 hover:bg-emerald-50"
                  >
                    Approuver
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
                    <label className="text-sm font-medium text-gray-600">Membres</label>
                    <p className="text-gray-900 font-semibold mt-1">{selectedSyndicat.memberCount || 0}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">ID Organisation</label>
                    <p className="text-gray-900 font-mono text-sm mt-1">{selectedSyndicat.organizationId}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-600">Description</label>
                    <p className="text-gray-900 mt-1">{selectedSyndicat.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
