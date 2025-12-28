'use client';

import React, { useState } from 'react';
import { 
  DollarSign, 
  Search, 
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Calendar,
  CreditCard,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Payment } from '@/lib/types/superadmin';

export const PaymentsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed' | 'refunded'>('all');
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'today' | 'week' | 'month' | 'year'>('all');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const mockPayments: (Payment & { syndicatName: string })[] = [
    {
      id: '1',
      syndicatId: 'syn-1',
      syndicatName: 'Syndicat des Enseignants',
      amount: 149,
      currency: 'EUR',
      status: 'COMPLETED',
      paymentDate: '2024-12-27T10:30:00',
      paymentMethod: 'Carte bancaire',
      description: 'Abonnement Professional - Janvier 2025',
    },
    {
      id: '2',
      syndicatId: 'syn-2',
      syndicatName: 'Syndicat des Médecins',
      amount: 399,
      currency: 'EUR',
      status: 'COMPLETED',
      paymentDate: '2024-12-26T14:20:00',
      paymentMethod: 'Virement bancaire',
      description: 'Abonnement Enterprise - Janvier 2025',
    },
    {
      id: '3',
      syndicatId: 'syn-3',
      syndicatName: 'Syndicat des Infirmiers',
      amount: 49,
      currency: 'EUR',
      status: 'PENDING',
      paymentDate: '2024-12-27T16:45:00',
      paymentMethod: 'Carte bancaire',
      description: 'Abonnement Starter - Janvier 2025',
    },
    {
      id: '4',
      syndicatId: 'syn-4',
      syndicatName: 'Syndicat des Avocats',
      amount: 149,
      currency: 'EUR',
      status: 'FAILED',
      paymentDate: '2024-12-25T09:15:00',
      paymentMethod: 'Carte bancaire',
      description: 'Abonnement Professional - Janvier 2025',
    },
    {
      id: '5',
      syndicatId: 'syn-5',
      syndicatName: 'Syndicat des Architectes',
      amount: 149,
      currency: 'EUR',
      status: 'REFUNDED',
      paymentDate: '2024-12-20T11:00:00',
      paymentMethod: 'Carte bancaire',
      description: 'Abonnement Professional - Décembre 2024 (Remboursé)',
    },
  ];

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.syndicatName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus.toUpperCase();
    
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = mockPayments
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = mockPayments
    .filter(p => p.status === 'PENDING')
    .reduce((sum, p) => sum + p.amount, 0);

  const failedCount = mockPayments.filter(p => p.status === 'FAILED').length;

  const handleViewDetail = (payment: Payment & { syndicatName: string }) => {
    setSelectedPayment(payment);
    setShowDetailModal(true);
  };

  const handleExport = () => {
    console.log('Exporter les paiements');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'PENDING': return 'warning';
      case 'FAILED': return 'error';
      case 'REFUNDED': return 'info';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'Complété';
      case 'PENDING': return 'En attente';
      case 'FAILED': return 'Échoué';
      case 'REFUNDED': return 'Remboursé';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return CheckCircle;
      case 'PENDING': return Clock;
      case 'FAILED': return XCircle;
      case 'REFUNDED': return RefreshCw;
      default: return DollarSign;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Paiements</h1>
          <p className="text-gray-600 mt-1">Suivre et gérer tous les paiements de la plateforme</p>
        </div>
        <Button
          variant="primary"
          onClick={handleExport}
          leftIcon={Download}
        >
          Exporter
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenus Totaux</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">€{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Attente</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">€{pendingAmount}</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paiements Échoués</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{failedCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{mockPayments.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#1877F2]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un paiement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value as typeof filterPeriod)}
                  className="pl-11 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent appearance-none bg-white min-w-[180px]"
                >
                  <option value="all">Toutes les périodes</option>
                  <option value="today">Aujourd&apos;hui</option>
                  <option value="week">Cette semaine</option>
                  <option value="month">Ce mois</option>
                  <option value="year">Cette année</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'all' ? 'bg-[#1877F2] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Complétés
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
                onClick={() => setFilterStatus('failed')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'failed' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Échoués
              </button>
              <button
                onClick={() => setFilterStatus('refunded')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'refunded' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Remboursés
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPayments.map((payment) => {
          const StatusIcon = getStatusIcon(payment.status);
          
          return (
            <Card key={payment.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                      payment.status === 'COMPLETED' ? 'bg-green-50' :
                      payment.status === 'PENDING' ? 'bg-orange-50' :
                      payment.status === 'FAILED' ? 'bg-red-50' :
                      'bg-blue-50'
                    }`}>
                      <StatusIcon className={`w-6 h-6 ${
                        payment.status === 'COMPLETED' ? 'text-green-600' :
                        payment.status === 'PENDING' ? 'text-orange-600' :
                        payment.status === 'FAILED' ? 'text-red-600' :
                        'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{payment.syndicatName}</h3>
                        <Badge variant={getStatusColor(payment.status) as 'success' | 'warning' | 'error' | 'info'}>
                          {getStatusLabel(payment.status)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{payment.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-semibold text-gray-900">
                            {payment.amount} {payment.currency}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CreditCard className="w-4 h-4" />
                          <span>{payment.paymentMethod}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(payment.paymentDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>ID: {payment.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetail(payment)}
                      leftIcon={Eye}
                    >
                      Détails
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedPayment && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Détails du Paiement</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex justify-center">
                <Badge 
                  variant={getStatusColor(selectedPayment.status) as 'success' | 'warning' | 'error' | 'info'}
                  className="text-lg px-6 py-2"
                >
                  {getStatusLabel(selectedPayment.status)}
                </Badge>
              </div>

              {/* Payment Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informations du Paiement</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">ID Transaction</label>
                    <p className="text-gray-900 font-semibold mt-1">{selectedPayment.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Montant</label>
                    <p className="text-gray-900 font-semibold mt-1">
                      {selectedPayment.amount} {selectedPayment.currency}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Date</label>
                    <p className="text-gray-900 font-semibold mt-1">
                      {new Date(selectedPayment.paymentDate).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Méthode</label>
                    <p className="text-gray-900 font-semibold mt-1">{selectedPayment.paymentMethod}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-600">Description</label>
                    <p className="text-gray-900 mt-1">{selectedPayment.description}</p>
                  </div>
                </div>
              </div>

              {/* Syndicat Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Syndicat</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-900">{(selectedPayment as typeof selectedPayment & { syndicatName: string }).syndicatName}</p>
                  <p className="text-sm text-gray-600 mt-1">ID: {selectedPayment.syndicatId}</p>
                </div>
              </div>

              {/* Actions */}
              {selectedPayment.status === 'PENDING' && (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button variant="primary" className="flex-1">
                    Valider le Paiement
                  </Button>
                  <Button variant="danger" className="flex-1">
                    Annuler
                  </Button>
                </div>
              )}
              {selectedPayment.status === 'COMPLETED' && (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button variant="secondary" className="flex-1" leftIcon={Download}>
                    Télécharger Reçu
                  </Button>
                  <Button variant="danger" className="flex-1" leftIcon={RefreshCw}>
                    Rembourser
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
