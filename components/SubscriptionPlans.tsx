'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  Plus,
  Edit2,
  Trash2,
  Power,
  Check,
  X,
  DollarSign,
  Calendar,
  Users,
  Zap,
  Crown,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SubscriptionPlan } from '@/lib/types/superadmin';

export const SubscriptionPlans: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'EUR',
    duration: '30',
    maxMembers: '',
    maxBranches: '',
    maxPublications: '',
    maxEvents: '',
    maxProducts: '',
    maxServices: '',
    features: [] as string[],
    isActive: true,
  });

  const [newFeature, setNewFeature] = useState('');

  const mockPlans: SubscriptionPlan[] = [
    {
      id: '1',
      name: 'Starter',
      description: 'Parfait pour les petits syndicats qui démarrent',
      price: 49,
      currency: 'EUR',
      duration: 30,
      features: [
        'Jusqu\'à 50 membres',
        '1 branche',
        '20 publications/mois',
        '5 événements/mois',
        'Support par email',
        'Tableau de bord basique',
      ],
      isActive: true,
    },
    {
      id: '2',
      name: 'Professional',
      description: 'Pour les syndicats en croissance avec des besoins avancés',
      price: 149,
      currency: 'EUR',
      duration: 30,
      features: [
        'Jusqu\'à 200 membres',
        '3 branches',
        'Publications illimitées',
        '20 événements/mois',
        'Support prioritaire',
        'Tableau de bord avancé',
        'Statistiques détaillées',
        'Export de données',
      ],
      isActive: true,
    },
    {
      id: '3',
      name: 'Enterprise',
      description: 'Solution complète pour les grandes organisations',
      price: 399,
      currency: 'EUR',
      duration: 30,
      features: [
        'Membres illimités',
        'Branches illimitées',
        'Publications illimitées',
        'Événements illimités',
        'Support 24/7',
        'Tableau de bord personnalisé',
        'API dédiée',
        'Formation personnalisée',
        'Gestionnaire de compte dédié',
        'Intégrations personnalisées',
      ],
      isActive: true,
    },
    {
      id: '4',
      name: 'Basic (Ancien)',
      description: 'Plan de base - Désactivé',
      price: 29,
      currency: 'EUR',
      duration: 30,
      features: [
        'Jusqu\'à 25 membres',
        '1 branche',
        '10 publications/mois',
        '3 événements/mois',
      ],
      isActive: false,
    },
  ];

  const filteredPlans = mockPlans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePlan = () => {
    console.log('Créer plan:', formData);
    setShowCreateModal(false);
    resetForm();
  };

  const handleEditPlan = () => {
    console.log('Modifier plan:', selectedPlan?.id, formData);
    setShowEditModal(false);
    setSelectedPlan(null);
    resetForm();
  };

  const handleDeletePlan = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce plan ?')) {
      console.log('Supprimer plan:', id);
    }
  };

  const handleToggleActive = (id: string) => {
    console.log('Basculer activation plan:', id);
  };

  const openEditModal = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description,
      price: plan.price.toString(),
      currency: plan.currency,
      duration: plan.duration.toString(),
      maxMembers: '',
      maxBranches: '',
      maxPublications: '',
      maxEvents: '',
      maxProducts: '',
      maxServices: '',
      features: [...plan.features],
      isActive: plan.isActive,
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      currency: 'EUR',
      duration: '30',
      maxMembers: '',
      maxBranches: '',
      maxPublications: '',
      maxEvents: '',
      maxProducts: '',
      maxServices: '',
      features: [],
      isActive: true,
    });
    setNewFeature('');
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const getPlanIcon = (planName: string) => {
    if (planName.toLowerCase().includes('enterprise')) return Crown;
    if (planName.toLowerCase().includes('professional') || planName.toLowerCase().includes('pro')) return Star;
    if (planName.toLowerCase().includes('starter')) return Zap;
    return TrendingUp;
  };

  const getPlanColor = (planName: string) => {
    if (planName.toLowerCase().includes('enterprise')) return 'from-purple-500 to-purple-600';
    if (planName.toLowerCase().includes('professional') || planName.toLowerCase().includes('pro')) return 'from-blue-500 to-blue-600';
    if (planName.toLowerCase().includes('starter')) return 'from-emerald-500 to-emerald-600';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Plans d&apos;Abonnement</h1>
          <p className="text-gray-600 mt-1">Gérer les offres et tarifs de la plateforme</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowCreateModal(true)}
          leftIcon={Plus}
        >
          Créer un Plan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Plans Actifs</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {mockPlans.filter(p => p.isActive).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Plans</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{mockPlans.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#1877F2]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Abonnés</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">248</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenus/Mois</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">XAF45,230</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un plan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
            />
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => {
          const PlanIcon = getPlanIcon(plan.name);
          const colorClass = getPlanColor(plan.name);
          
          return (
            <Card key={plan.id} className={`border-0 shadow-lg hover:shadow-xl transition-all ${!plan.isActive ? 'opacity-60' : ''}`}>
              <CardContent className="p-0">
                {/* Header avec gradient */}
                <div className={`bg-gradient-to-r ${colorClass} p-6 rounded-t-xl`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <PlanIcon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant={plan.isActive ? 'success' : 'default'} className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                      {plan.isActive ? 'Actif' : 'Inactif'}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/90 text-sm">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.currency}</span>
                    <span className="text-gray-500 text-sm">/ {plan.duration} jours</span>
                  </div>
                </div>

                {/* Features */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Fonctionnalités
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="p-6 pt-0 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditModal(plan)}
                    leftIcon={Edit2}
                    className="flex-1"
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleActive(plan.id)}
                    leftIcon={Power}
                    className={`flex-1 ${plan.isActive ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                  >
                    {plan.isActive ? 'Désactiver' : 'Activer'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeletePlan(plan.id)}
                    leftIcon={Trash2}
                    className="text-red-600 hover:bg-red-50"
                  >
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {showCreateModal ? 'Créer un Plan' : 'Modifier le Plan'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  setSelectedPlan(null);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informations de Base</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du Plan *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="Ex: Professional"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="Description du plan..."
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tarification</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="149"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Devise
                    </label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                    >
                      <option value="EUR">EUR (XAF)</option>
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="XAF">XAF (XAF)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durée (jours) *
                    </label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="30"
                    />
                  </div>
                </div>
              </div>

              {/* Limits */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Limites & Quotas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Membres Max
                    </label>
                    <input
                      type="number"
                      value={formData.maxMembers}
                      onChange={(e) => setFormData({ ...formData, maxMembers: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="Illimité si vide"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Branches Max
                    </label>
                    <input
                      type="number"
                      value={formData.maxBranches}
                      onChange={(e) => setFormData({ ...formData, maxBranches: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="Illimité si vide"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Publications/Mois
                    </label>
                    <input
                      type="number"
                      value={formData.maxPublications}
                      onChange={(e) => setFormData({ ...formData, maxPublications: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="Illimité si vide"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Événements/Mois
                    </label>
                    <input
                      type="number"
                      value={formData.maxEvents}
                      onChange={(e) => setFormData({ ...formData, maxEvents: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="Illimité si vide"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Produits Max
                    </label>
                    <input
                      type="number"
                      value={formData.maxProducts}
                      onChange={(e) => setFormData({ ...formData, maxProducts: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="Illimité si vide"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Services Max
                    </label>
                    <input
                      type="number"
                      value={formData.maxServices}
                      onChange={(e) => setFormData({ ...formData, maxServices: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="Illimité si vide"
                    />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Fonctionnalités Incluses</h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="Ajouter une fonctionnalité..."
                    />
                    <Button variant="primary" onClick={addFeature} leftIcon={Plus}>
                      Ajouter
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {formData.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="flex-1 text-sm text-gray-900">{feature}</span>
                        <button
                          onClick={() => removeFeature(idx)}
                          className="p-1 hover:bg-red-100 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 text-[#1877F2] border-gray-300 rounded focus:ring-[#1877F2]"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Activer ce plan immédiatement
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  variant="primary"
                  onClick={showCreateModal ? handleCreatePlan : handleEditPlan}
                  className="flex-1"
                >
                  {showCreateModal ? 'Créer le Plan' : 'Enregistrer les Modifications'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    setSelectedPlan(null);
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
