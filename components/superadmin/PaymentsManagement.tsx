'use client';

import React from 'react';
import { DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const PaymentsManagement: React.FC = () => {
  const mockPayments = [
    { id: '1', syndicat: 'Syndicat des Enseignants', amount: 299, status: 'COMPLETED', date: '2024-12-20', method: 'Carte bancaire' },
    { id: '2', syndicat: 'Syndicat de la Santé', amount: 199, status: 'PENDING', date: '2024-12-22', method: 'Virement' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Paiements</h1>
        <p className="text-gray-600 mt-2">Gérer les transactions et abonnements</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockPayments.map((payment) => (
          <Card key={payment.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{payment.syndicat}</h3>
                    <p className="text-sm text-gray-600">{payment.method} - {payment.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">XAF{payment.amount}</p>
                    <Badge variant={payment.status === 'COMPLETED' ? 'success' : 'warning'}>
                      {payment.status}
                    </Badge>
                  </div>
                  {payment.status === 'PENDING' && (
                    <Button variant="ghost" size="sm" leftIcon={CheckCircle} className="text-green-600">
                      Valider
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
