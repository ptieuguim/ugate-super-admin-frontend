'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp, 
  Activity,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getDashboardStats, StatsResponse } from '@/lib/services/superadmin.service';

interface SuperAdminDashboardProps {
  onNavigate: (view: string) => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onNavigate }) => {
  const [statsData, setStatsData] = useState<StatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les statistiques au montage du composant
  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);
        const data = await getDashboardStats();
        setStatsData(data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des stats:', err);
        setError('Impossible de charger les statistiques');
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const stats = [
    {
      title: 'Total Syndicats',
      value: isLoading ? '...' : statsData?.totalSyndicats.toString() || '0',
      change: '+12%',
      trend: 'up' as const,
      icon: Building2,
      color: 'text-[#1877F2]',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Syndicats Actifs',
      value: isLoading ? '...' : statsData?.activeSyndicats.toString() || '0',
      change: '+8%',
      trend: 'up' as const,
      icon: Building2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Membres Actifs',
      value: isLoading ? '...' : statsData?.activeMembers.toLocaleString() || '0',
      change: '+8%',
      trend: 'up' as const,
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Revenus Total',
      value: isLoading ? '...' : `XAF${statsData?.totalRevenue.toLocaleString() || '0'}`,
      change: '+23%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  const pendingActions = [
    { id: 1, type: 'Syndicat en attente', name: 'Syndicat des Enseignants', action: 'Approbation requise', time: '2h', priority: 'high' },
    { id: 2, type: 'Membre signalé', name: 'Jean Dupont', action: 'Vérification requise', time: '4h', priority: 'medium' },
    { id: 3, type: 'Publication signalée', name: 'Contenu inapproprié', action: 'Modération requise', time: '6h', priority: 'high' },
    { id: 4, type: 'Paiement en attente', name: 'Syndicat des Médecins', action: 'Vérification paiement', time: '1j', priority: 'low' },
  ];

  const recentActivity = [
    { id: 1, action: 'Syndicat approuvé', entity: 'Syndicat des Infirmiers', user: 'Super Admin', time: '5 min' },
    { id: 2, action: 'Membre désactivé', entity: 'Marie Martin', user: 'Super Admin', time: '15 min' },
    { id: 3, action: 'Publication supprimée', entity: 'Post #12345', user: 'Super Admin', time: '1h' },
    { id: 4, action: 'Plan modifié', entity: 'Plan Premium', user: 'Super Admin', time: '2h' },
  ];

  const quickActions = [
    { label: 'Gérer Syndicats', icon: Building2, view: 'syndicats', color: 'bg-[#1877F2]' },
    { label: 'Contenus Signalés', icon: AlertTriangle, view: 'flagged-content', color: 'bg-red-600' },
    { label: 'Paiements', icon: DollarSign, view: 'payments', color: 'bg-green-600' },
    { label: 'Logs d&apos;Activité', icon: Activity, view: 'activity-logs', color: 'bg-purple-600' },
    { label: 'Plans d\'Abonnement', icon: TrendingUp, view: 'subscription-plans', color: 'bg-orange-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Super Admin</h1>
          <p className="text-gray-600 mt-1">Vue d&apos;ensemble de la plateforme</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success" className="px-3 py-1">
            <Activity className="w-3 h-3 mr-1" />
            Système opérationnel
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-gray-100">
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(action.view)}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">{action.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#1877F2]" />
                Actions en Attente
              </CardTitle>
              <Badge variant="error">{pendingActions.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {pendingActions.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all cursor-pointer border border-gray-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <Badge 
                        variant={item.priority === 'high' ? 'error' : item.priority === 'medium' ? 'warning' : 'default'}
                        className="text-xs"
                      >
                        {item.priority === 'high' ? 'Urgent' : item.priority === 'medium' ? 'Moyen' : 'Faible'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.type}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Il y a {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#1877F2]" />
                Activité Récente
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('activity-logs')}>
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-[#1877F2] mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-600 mt-1">{item.entity}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-xs text-gray-500">Par {item.user}</p>
                      <span className="text-gray-300">•</span>
                      <p className="text-xs text-gray-500">Il y a {item.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
