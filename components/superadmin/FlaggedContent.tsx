'use client';

import React from 'react';
import { AlertCircle, CheckCircle, Trash2 } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const FlaggedContent: React.FC = () => {
  const mockFlagged = [
    { id: '1', type: 'Publication', content: 'Contenu inapproprié...', reason: 'Langage offensant', reportedBy: 'Jean Dupont', date: '2024-12-20' },
    { id: '2', type: 'Event', content: 'Événement suspect...', reason: 'Informations trompeuses', reportedBy: 'Marie Martin', date: '2024-12-21' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contenus Signalés</h1>
        <p className="text-gray-600 mt-2">Gérer les contenus signalés par les utilisateurs</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockFlagged.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="error">{item.type}</Badge>
                    <span className="text-sm text-gray-500">Signalé par {item.reportedBy}</span>
                  </div>
                  <p className="text-gray-900 mb-2">{item.content}</p>
                  <p className="text-sm text-red-600">Raison: {item.reason}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" leftIcon={CheckCircle} className="text-green-600">
                    Approuver
                  </Button>
                  <Button variant="ghost" size="sm" leftIcon={Trash2} className="text-red-600">
                    Supprimer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
