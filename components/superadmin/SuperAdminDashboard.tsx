'use client';

import React from 'react';
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface SuperAdminDashboardProps {
  onChangeView?: (view: string) => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onChangeView }) => {
  const stats = [
    {
      title: 'Syndicats Totaux',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: Building2,
      color: 'blue',
      subtitle: '23 en attente'
    },
    {
      title: 'Membres Actifs',
      value: '12,847',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'green',
      subtitle: '1,234 ce mois'
    },
    {
      title: 'Revenus Mensuels',
      value: '€45,230',
      change: '+23%',
      trend: 'up',
      icon: DollarSign,
      color: 'emerald',
      subtitle: 'Objectif: €50,000'
    },
    {
      title: 'Contenus Signalés',
      value: '12',
      change: '-15%',
      trend: 'down',
      icon: AlertCircle,
      color: 'red',
      subtitle: 'À traiter'
    },
  ];

  const recentActivity = [
    { id: 1, action: 'Nouveau syndicat approuvé', syndicat: 'Syndicat des Enseignants', time: 'Il y a 5 min', status: 'success' },
    { id: 2, action: 'Contenu signalé', syndicat: 'Syndicat de la Santé', time: 'Il y a 15 min', status: 'warning' },
    { id: 3, action: 'Paiement reçu', syndicat: 'Syndicat du Transport', time: 'Il y a 1h', status: 'success' },
    { id: 4, action: 'Demande d\'approbation', syndicat: 'Syndicat de l\'Agriculture', time: 'Il y a 2h', status: 'pending' },
    { id: 5, action: 'Membre désactivé', syndicat: 'Syndicat du Commerce', time: 'Il y a 3h', status: 'error' },
  ];

  const pendingSyndicats = [
    { id: 1, name: 'Syndicat des Artisans', domain: 'Artisanat', members: 45, date: '2024-12-20' },
    { id: 2, name: 'Syndicat de la Construction', domain: 'BTP', members: 128, date: '2024-12-21' },
    { id: 3, name: 'Syndicat des Journalistes', domain: 'Médias', members: 67, date: '2024-12-22' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord Super Admin</h1>
        <p className="text-gray-600 mt-2">Vue d'ensemble de la plateforme UGate</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <Badge variant={stat.trend === 'up' ? 'success' : 'default'}>
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
                <p className="text-xs text-gray-500 mt-2">{stat.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.syndicat}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Syndicats en Attente</CardTitle>
              <button
                onClick={() => onChangeView?.('syndicats')}
                className="text-sm text-[#1877F2] hover:underline"
              >
                Voir tout
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingSyndicats.map((syndicat) => (
                <div key={syndicat.id} className="p-4 border border-gray-200 rounded-lg hover:border-[#1877F2] transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{syndicat.name}</h4>
                      <p className="text-sm text-gray-600">{syndicat.domain}</p>
                    </div>
                    <Badge variant="warning">En attente</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {syndicat.members} membres
                    </span>
                    <span>{syndicat.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => onChangeView?.('syndicats')}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#1877F2] hover:bg-blue-50 transition-all text-center"
            >
              <Building2 className="w-8 h-8 mx-auto mb-2 text-gray-600" />
              <p className="text-sm font-medium text-gray-900">Gérer Syndicats</p>
            </button>
            <button
              onClick={() => onChangeView?.('members')}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#1877F2] hover:bg-blue-50 transition-all text-center"
            >
              <Users className="w-8 h-8 mx-auto mb-2 text-gray-600" />
              <p className="text-sm font-medium text-gray-900">Gérer Membres</p>
            </button>
            <button
              onClick={() => onChangeView?.('flagged')}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#1877F2] hover:bg-blue-50 transition-all text-center"
            >
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-600" />
              <p className="text-sm font-medium text-gray-900">Contenus Signalés</p>
            </button>
            <button
              onClick={() => onChangeView?.('payments')}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#1877F2] hover:bg-blue-50 transition-all text-center"
            >
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-gray-600" />
              <p className="text-sm font-medium text-gray-900">Paiements</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
