'use client';

import React, { useState } from 'react';
import { Login } from '@/components/Login';
import { SuperAdminLayout } from '@/components/SuperAdminLayout';
import { SuperAdminDashboard } from '@/components/SuperAdminDashboard';
import { SyndicatsManagement } from '@/components/SyndicatsManagement';
import { MembersManagement } from '@/components/MembersManagement';
import { FlaggedContent } from '@/components/FlaggedContent';
import { SubscriptionPlans } from '@/components/SubscriptionPlans';
import { PaymentsManagement } from '@/components/PaymentsManagement';
import { ActivityLogs } from '@/components/ActivityLogs';
import { BailConfiguration } from '@/components/BailConfiguration';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');
  const [viewData, setViewData] = useState<unknown>(null);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setCurrentView('dashboard');
    setViewData(null);
  };

  const handleNavigate = (view: string, data?: unknown) => {
    setCurrentView(view);
    setViewData(data);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <SuperAdminDashboard onNavigate={handleNavigate} />;
      case 'syndicats':
        return <SyndicatsManagement onNavigate={handleNavigate} />;
      case 'members':
        return <MembersManagement syndicatId={(viewData as { syndicatId?: string })?.syndicatId} />;
      case 'flagged-content':
        return <FlaggedContent />;
      case 'payments':
        return <PaymentsManagement />;
      case 'activity-logs':
        return <ActivityLogs />;
      case 'subscription-plans':
        return <SubscriptionPlans />;
      case 'settings':
        return <BailConfiguration />;
      default:
        return <SuperAdminDashboard onNavigate={handleNavigate} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <SuperAdminLayout 
      currentView={currentView} 
      onChangeView={setCurrentView}
      userEmail={userEmail}
      onLogout={handleLogout}
    >
      {renderView()}
    </SuperAdminLayout>
  );
}
