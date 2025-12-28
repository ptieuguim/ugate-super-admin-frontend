'use client';

import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Filter,
  Download,
  Eye,
  User,
  Calendar,
  Globe,
  Monitor,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ActivityLog } from '@/lib/types/superadmin';

export const ActivityLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterEntity, setFilterEntity] = useState<string>('all');
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const mockLogs: (ActivityLog & { userName: string; entityName: string })[] = [
    {
      id: '1',
      userId: 'superadmin-1',
      userName: 'Super Admin',
      action: 'APPROVE_SYNDICAT',
      entityType: 'SYNDICAT',
      entityId: 'syn-1',
      entityName: 'Syndicat des Enseignants',
      timestamp: '2024-12-27T10:30:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: {
        previousStatus: 'pending',
        newStatus: 'approved',
      },
    },
    {
      id: '2',
      userId: 'superadmin-1',
      userName: 'Super Admin',
      action: 'DEACTIVATE_MEMBER',
      entityType: 'MEMBER',
      entityId: 'member-5',
      entityName: 'Marie Martin',
      timestamp: '2024-12-27T09:15:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: {
        reason: 'Violation des règles de la communauté',
      },
    },
    {
      id: '3',
      userId: 'superadmin-1',
      userName: 'Super Admin',
      action: 'DELETE_PUBLICATION',
      entityType: 'PUBLICATION',
      entityId: 'pub-123',
      entityName: 'Publication #123',
      timestamp: '2024-12-27T08:45:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: {
        flaggedReason: 'Contenu inapproprié',
        reportCount: 5,
      },
    },
    {
      id: '4',
      userId: 'superadmin-1',
      userName: 'Super Admin',
      action: 'CREATE_PLAN',
      entityType: 'SUBSCRIPTION_PLAN',
      entityId: 'plan-4',
      entityName: 'Plan Premium Plus',
      timestamp: '2024-12-26T16:20:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: {
        price: 199,
        currency: 'EUR',
        duration: 30,
      },
    },
    {
      id: '5',
      userId: 'superadmin-1',
      userName: 'Super Admin',
      action: 'UPDATE_PLAN',
      entityType: 'SUBSCRIPTION_PLAN',
      entityId: 'plan-2',
      entityName: 'Plan Professional',
      timestamp: '2024-12-26T14:10:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: {
        field: 'price',
        oldValue: 149,
        newValue: 159,
      },
    },
    {
      id: '6',
      userId: 'superadmin-1',
      userName: 'Super Admin',
      action: 'APPROVE_MEMBER',
      entityType: 'MEMBER',
      entityId: 'member-8',
      entityName: 'Jean Dupont',
      timestamp: '2024-12-26T11:30:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: {
        documentsVerified: true,
      },
    },
    {
      id: '7',
      userId: 'superadmin-1',
      userName: 'Super Admin',
      action: 'DISAPPROVE_SYNDICAT',
      entityType: 'SYNDICAT',
      entityId: 'syn-5',
      entityName: 'Syndicat Test',
      timestamp: '2024-12-25T15:45:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: {
        reason: 'Documents incomplets',
      },
    },
  ];

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesEntity = filterEntity === 'all' || log.entityType === filterEntity;
    
    return matchesSearch && matchesAction && matchesEntity;
  });

  const actionTypes = Array.from(new Set(mockLogs.map(log => log.action)));
  const entityTypes = Array.from(new Set(mockLogs.map(log => log.entityType)));

  const handleViewDetail = (log: ActivityLog & { userName: string; entityName: string }) => {
    setSelectedLog(log);
    setShowDetailModal(true);
  };

  const handleExport = () => {
    console.log('Exporter les logs');
  };

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      'APPROVE_SYNDICAT': 'Syndicat approuvé',
      'DISAPPROVE_SYNDICAT': 'Syndicat désapprouvé',
      'DEACTIVATE_MEMBER': 'Membre désactivé',
      'ACTIVATE_MEMBER': 'Membre activé',
      'APPROVE_MEMBER': 'Membre approuvé',
      'DELETE_PUBLICATION': 'Publication supprimée',
      'DELETE_EVENT': 'Événement supprimé',
      'CREATE_PLAN': 'Plan créé',
      'UPDATE_PLAN': 'Plan modifié',
      'DELETE_PLAN': 'Plan supprimé',
    };
    return labels[action] || action;
  };

  const getActionColor = (action: string) => {
    if (action.includes('APPROVE')) return 'success';
    if (action.includes('DELETE') || action.includes('DEACTIVATE') || action.includes('DISAPPROVE')) return 'error';
    if (action.includes('CREATE')) return 'info';
    if (action.includes('UPDATE') || action.includes('ACTIVATE')) return 'warning';
    return 'default';
  };

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case 'SYNDICAT': return '🏢';
      case 'MEMBER': return '👤';
      case 'PUBLICATION': return '📝';
      case 'EVENT': return '📅';
      case 'SUBSCRIPTION_PLAN': return '💳';
      default: return '📋';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Logs d&apos;Activité</h1>
          <p className="text-gray-600 mt-1">Suivre toutes les actions effectuées sur la plateforme</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => window.location.reload()}
            leftIcon={RefreshCw}
          >
            Actualiser
          </Button>
          <Button
            variant="primary"
            onClick={handleExport}
            leftIcon={Download}
          >
            Exporter
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Actions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{mockLogs.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#1877F2]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aujourd&apos;hui</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {mockLogs.filter(log => new Date(log.timestamp).toDateString() === new Date().toDateString()).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Utilisateurs Actifs</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {Array.from(new Set(mockLogs.map(log => log.userId))).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Types d&apos;Actions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{actionTypes.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Monitor className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterAction}
                  onChange={(e) => setFilterAction(e.target.value)}
                  className="w-full pl-11 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">Toutes les actions</option>
                  {actionTypes.map(action => (
                    <option key={action} value={action}>{getActionLabel(action)}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterEntity}
                  onChange={(e) => setFilterEntity(e.target.value)}
                  className="w-full pl-11 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">Toutes les entités</option>
                  {entityTypes.map(entity => (
                    <option key={entity} value={entity}>{entity}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterPeriod('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterPeriod === 'all' ? 'bg-[#1877F2] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Toutes les périodes
              </button>
              <button
                onClick={() => setFilterPeriod('today')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterPeriod === 'today' ? 'bg-[#1877F2] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Aujourd&apos;hui
              </button>
              <button
                onClick={() => setFilterPeriod('week')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterPeriod === 'week' ? 'bg-[#1877F2] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cette semaine
              </button>
              <button
                onClick={() => setFilterPeriod('month')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterPeriod === 'month' ? 'bg-[#1877F2] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Ce mois
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      <div className="space-y-3">
        {filteredLogs.map((log) => (
          <Card key={log.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="text-3xl">{getEntityIcon(log.entityType)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant={getActionColor(log.action) as 'success' | 'error' | 'info' | 'warning' | 'default'}>
                        {getActionLabel(log.action)}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-900 font-semibold mb-1">
                      {log.userName} → {log.entityName}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{log.userName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <span>{log.ipAddress}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400">ID: {log.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewDetail(log)}
                  leftIcon={Eye}
                >
                  Détails
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedLog && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Détails du Log</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Eye className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Action Badge */}
              <div className="flex justify-center">
                <Badge 
                  variant={getActionColor(selectedLog.action) as 'success' | 'error' | 'info' | 'warning' | 'default'}
                  className="text-lg px-6 py-2"
                >
                  {getActionLabel(selectedLog.action)}
                </Badge>
              </div>

              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informations Générales</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">ID Log</label>
                    <p className="text-gray-900 font-semibold mt-1">{selectedLog.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Date & Heure</label>
                    <p className="text-gray-900 font-semibold mt-1">
                      {new Date(selectedLog.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Utilisateur</label>
                    <p className="text-gray-900 font-semibold mt-1">{(selectedLog as typeof selectedLog & { userName: string }).userName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Type d&apos;Entité</label>
                    <p className="text-gray-900 font-semibold mt-1">{selectedLog.entityType}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-600">Entité Concernée</label>
                    <p className="text-gray-900 font-semibold mt-1">
                      {(selectedLog as typeof selectedLog & { entityName: string }).entityName} (ID: {selectedLog.entityId})
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informations Techniques</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="text-sm font-medium text-gray-600">Adresse IP</label>
                    <p className="text-gray-900 font-mono text-sm mt-1">{selectedLog.ipAddress}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="text-sm font-medium text-gray-600">User Agent</label>
                    <p className="text-gray-900 font-mono text-xs mt-1 break-all">{selectedLog.userAgent}</p>
                  </div>
                </div>
              </div>

              {/* Details */}
              {selectedLog.details && Object.keys(selectedLog.details).length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Détails Supplémentaires</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <pre className="text-sm text-gray-900 whitespace-pre-wrap">
                      {JSON.stringify(selectedLog.details, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
