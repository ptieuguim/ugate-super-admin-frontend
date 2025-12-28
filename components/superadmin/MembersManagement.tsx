'use client';

import React, { useState } from 'react';
import { Search, Users, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const MembersManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockMembers = [
    { id: '1', firstName: 'Jean', lastName: 'Dupont', email: 'jean.dupont@email.com', syndicat: 'Syndicat des Enseignants', role: 'ADMIN', isActive: true, isApproved: true },
    { id: '2', firstName: 'Marie', lastName: 'Martin', email: 'marie.martin@email.com', syndicat: 'Syndicat de la Santé', role: 'MEMBER', isActive: true, isApproved: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Membres</h1>
        <p className="text-gray-600 mt-2">Gérer tous les membres de la plateforme</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un membre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.firstName} {member.lastName}</h3>
                    <p className="text-sm text-gray-600">{member.email}</p>
                    <p className="text-sm text-gray-500">{member.syndicat}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={member.role === 'ADMIN' ? 'info' : 'default'}>{member.role}</Badge>
                  <Badge variant={member.isApproved ? 'success' : 'warning'}>
                    {member.isApproved ? 'Approuvé' : 'En attente'}
                  </Badge>
                  <Button variant="ghost" size="sm" leftIcon={Eye}>Voir</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
