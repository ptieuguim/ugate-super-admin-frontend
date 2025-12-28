'use client';

import React from 'react';
import { Package, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const SubscriptionPlans: React.FC = () => {
  const mockPlans = [
    { id: '1', name: 'Basic', price: 99, duration: 30, features: ['50 membres max', '2 branches', '10 publications/mois'], isActive: true },
    { id: '2', name: 'Premium', price: 299, duration: 30, features: ['200 membres max', '10 branches', 'Publications illimitées', 'Support prioritaire'], isActive: true },
    { id: '3', name: 'Enterprise', price: 599, duration: 30, features: ['Membres illimités', 'Branches illimitées', 'Tout illimité', 'Support dédié'], isActive: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Plans d&apos;Abonnement</h1>
        <p className="text-gray-600 mt-2">Gérer les plans et tarifs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPlans.map((plan) => (
          <Card key={plan.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                <Badge variant={plan.isActive ? 'success' : 'default'}>
                  {plan.isActive ? 'Actif' : 'Inactif'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">€{plan.price}</span>
                <span className="text-gray-600">/mois</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="w-full">Modifier</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
