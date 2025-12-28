'use client';

import React from 'react';
import { Settings, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const BailConfiguration: React.FC = () => {
  const mockConfigs = [
    { id: '1', syndicatType: 'Professionnel', expiryDays: 365, warningDays: 30, autoDeactivate: true },
    { id: '2', syndicatType: 'Étudiant', expiryDays: 180, warningDays: 15, autoDeactivate: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuration des Règles d&apos;Expiration</h1>
        <p className="text-gray-600 mt-2">Gérer les règles de validité des abonnements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockConfigs.map((config) => (
          <Card key={config.id}>
            <CardHeader>
              <CardTitle>{config.syndicatType}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Durée de validité</span>
                  </div>
                  <span className="font-semibold text-gray-900">{config.expiryDays} jours</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <span className="text-sm text-gray-600">Alerte avant expiration</span>
                  </div>
                  <span className="font-semibold text-gray-900">{config.warningDays} jours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Désactivation automatique</span>
                  <Badge variant={config.autoDeactivate ? 'success' : 'default'}>
                    {config.autoDeactivate ? 'Activée' : 'Désactivée'}
                  </Badge>
                </div>
                <Button variant="secondary" className="w-full mt-4">Modifier</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
