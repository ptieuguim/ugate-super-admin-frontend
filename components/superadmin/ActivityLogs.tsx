'use client';

import React from 'react';
import { Activity, User, FileText } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const ActivityLogs: React.FC = () => {
  const mockLogs = [
    { id: '1', action: 'Syndicat approuvé', user: 'admin@ugate.com', entity: 'Syndicat', timestamp: '2024-12-20 14:30', ip: '192.168.1.1' },
    { id: '2', action: 'Membre désactivé', user: 'admin@ugate.com', entity: 'User', timestamp: '2024-12-20 15:45', ip: '192.168.1.1' },
    { id: '3', action: 'Paiement validé', user: 'admin@ugate.com', entity: 'Payment', timestamp: '2024-12-21 09:15', ip: '192.168.1.1' },
    { id: '4', action: 'Profil mis à jour', user: 'admin@ugate.com', entity: 'Compte', timestamp: '2024-12-21 10:30', ip: '192.168.1.1' },
    { id: '5', action: 'Mot de passe modifié', user: 'admin@ugate.com', entity: 'Sécurité', timestamp: '2024-12-21 11:15', ip: '192.168.1.1' },
    { id: '6', action: 'Préférences de notification mises à jour', user: 'admin@ugate.com', entity: 'Compte', timestamp: '2024-12-21 12:00', ip: '192.168.1.1' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Logs d&apos;Activité</h1>
        <p className="text-gray-600 mt-2">Historique des actions administratives</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockLogs.map((log) => (
          <Card key={log.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{log.action}</h3>
                    <p className="text-sm text-gray-600">Par {log.user}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="info">{log.entity}</Badge>
                  <p className="text-sm text-gray-500 mt-1">{log.timestamp}</p>
                  <p className="text-xs text-gray-400">IP: {log.ip}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
