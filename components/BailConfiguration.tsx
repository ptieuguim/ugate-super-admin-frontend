'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Plus,
  Edit2,
  Trash2,
  Save,
  AlertTriangle,
  Clock,
  Power,
  Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BailConfig } from '@/lib/types/superadmin';

export const BailConfiguration: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<BailConfig | null>(null);

  const [formData, setFormData] = useState({
    syndicatType: '',
    expiryDays: '',
    warningDays: '',
    autoDeactivate: true,
  });

  const mockConfigs: BailConfig[] = [
    {
      id: '1',
      syndicatType: 'Professionnel',
      expiryDays: 365,
      warningDays: 30,
      autoDeactivate: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-12-20',
    },
    {
      id: '2',
      syndicatType: 'Étudiant',
      expiryDays: 180,
      warningDays: 15,
      autoDeactivate: true,
      createdAt: '2024-02-10',
      updatedAt: '2024-11-15',
    },
    {
      id: '3',
      syndicatType: 'Associatif',
      expiryDays: 730,
      warningDays: 60,
      autoDeactivate: false,
      createdAt: '2024-03-05',
      updatedAt: '2024-10-20',
    },
  ];

  const handleCreateConfig = () => {
    console.log('Créer configuration:', formData);
    setShowCreateModal(false);
    resetForm();
  };

  const handleEditConfig = () => {
    console.log('Modifier configuration:', selectedConfig?.id, formData);
    setShowEditModal(false);
    setSelectedConfig(null);
    resetForm();
  };

  const handleDeleteConfig = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette configuration ?')) {
      console.log('Supprimer configuration:', id);
    }
  };

  const openEditModal = (config: BailConfig) => {
    setSelectedConfig(config);
    setFormData({
      syndicatType: config.syndicatType,
      expiryDays: config.expiryDays.toString(),
      warningDays: config.warningDays.toString(),
      autoDeactivate: config.autoDeactivate,
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      syndicatType: '',
      expiryDays: '',
      warningDays: '',
      autoDeactivate: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuration des Règles d&apos;Expiration</h1>
          <p className="text-gray-600 mt-1">Gérer les durées de validité et les règles de désactivation automatique</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowCreateModal(true)}
          leftIcon={Plus}
        >
          Nouvelle Règle
        </Button>
      </div>

      {/* Info Card */}
      <Card className="border-0 shadow-lg bg-blue-50 border-l-4 border-l-[#1877F2]">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#1877F2] rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">À propos des règles d&apos;expiration (Bail)</h3>
              <p className="text-sm text-gray-700">
                Les règles d&apos;expiration permettent de définir automatiquement la durée de validité des abonnements 
                en fonction du type de syndicat. Vous pouvez configurer des alertes avant expiration et activer 
                la désactivation automatique des syndicats expirés.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Règles Actives</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{mockConfigs.length}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Auto-Désactivation</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {mockConfigs.filter(c => c.autoDeactivate).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <Power className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Durée Moyenne</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {Math.round(mockConfigs.reduce((sum, c) => sum + c.expiryDays, 0) / mockConfigs.length)} jours
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#1877F2]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configurations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockConfigs.map((config) => (
          <Card key={config.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-[#1877F2] to-blue-600 text-white p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">{config.syndicatType}</CardTitle>
                <Badge variant={config.autoDeactivate ? 'error' : 'default'} className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                  {config.autoDeactivate ? 'Auto' : 'Manuel'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* Expiry Days */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#1877F2]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Durée de validité</p>
                    <p className="text-lg font-bold text-gray-900">{config.expiryDays} jours</p>
                  </div>
                </div>
              </div>

              {/* Warning Days */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Alerte avant expiration</p>
                    <p className="text-lg font-bold text-gray-900">{config.warningDays} jours</p>
                  </div>
                </div>
              </div>

              {/* Auto Deactivate */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    config.autoDeactivate ? 'bg-red-100' : 'bg-gray-200'
                  }`}>
                    <Power className={`w-5 h-5 ${config.autoDeactivate ? 'text-red-600' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Désactivation auto</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {config.autoDeactivate ? 'Activée' : 'Désactivée'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Créé: {new Date(config.createdAt).toLocaleDateString()}</span>
                  <span>MAJ: {new Date(config.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditModal(config)}
                  leftIcon={Edit2}
                  className="flex-1"
                >
                  Modifier
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteConfig(config.id)}
                  leftIcon={Trash2}
                  className="text-red-600 hover:bg-red-50"
                >
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {showCreateModal ? 'Créer une Règle' : 'Modifier la Règle'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  setSelectedConfig(null);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Syndicat Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de Syndicat *
                </label>
                <input
                  type="text"
                  value={formData.syndicatType}
                  onChange={(e) => setFormData({ ...formData, syndicatType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                  placeholder="Ex: Professionnel, Étudiant, Associatif..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Le type de syndicat auquel cette règle s&apos;applique
                </p>
              </div>

              {/* Expiry Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durée de Validité (jours) *
                </label>
                <input
                  type="number"
                  value={formData.expiryDays}
                  onChange={(e) => setFormData({ ...formData, expiryDays: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                  placeholder="365"
                  min="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Nombre de jours avant l&apos;expiration de l&apos;abonnement
                </p>
              </div>

              {/* Warning Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alerte Avant Expiration (jours) *
                </label>
                <input
                  type="number"
                  value={formData.warningDays}
                  onChange={(e) => setFormData({ ...formData, warningDays: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                  placeholder="30"
                  min="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Nombre de jours avant l&apos;expiration pour envoyer une alerte
                </p>
              </div>

              {/* Auto Deactivate */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.autoDeactivate}
                    onChange={(e) => setFormData({ ...formData, autoDeactivate: e.target.checked })}
                    className="w-5 h-5 text-[#1877F2] border-gray-300 rounded focus:ring-[#1877F2] mt-0.5"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900 block">
                      Désactivation Automatique
                    </span>
                    <span className="text-xs text-gray-600 block mt-1">
                      Le syndicat sera automatiquement désactivé à l&apos;expiration de son abonnement
                    </span>
                  </div>
                </label>
              </div>

              {/* Preview */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-blue-600" />
                  Aperçu de la Configuration
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• Les syndicats de type <strong>{formData.syndicatType || '...'}</strong> auront une validité de <strong>{formData.expiryDays || '...'} jours</strong></p>
                  <p>• Une alerte sera envoyée <strong>{formData.warningDays || '...'} jours</strong> avant l&apos;expiration</p>
                  <p>• Désactivation automatique: <strong>{formData.autoDeactivate ? 'OUI' : 'NON'}</strong></p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  variant="primary"
                  onClick={showCreateModal ? handleCreateConfig : handleEditConfig}
                  leftIcon={Save}
                  className="flex-1"
                >
                  {showCreateModal ? 'Créer la Règle' : 'Enregistrer les Modifications'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    setSelectedConfig(null);
                    resetForm();
                  }}
                  className="flex-1"
                >
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
