'use client';

import React, { useState } from 'react';
import { SuperAdminLayout } from './SuperAdminLayout';
import { SuperAdminDashboard } from './SuperAdminDashboard';
import { SyndicatsManagement } from './SyndicatsManagement';
import { MembersManagement } from './MembersManagement';
import { FlaggedContent } from './FlaggedContent';
import { PaymentsManagement } from './PaymentsManagement';
import { SubscriptionPlans } from './SubscriptionPlans';
import { ActivityLogs } from './ActivityLogs';
import { BailConfiguration } from './BailConfiguration';

interface SuperAdminMainProps {
  userEmail: string;
  onLogout: () => void;
}

export const SuperAdminMain: React.FC<SuperAdminMainProps> = ({ userEmail, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <SuperAdminDashboard onChangeView={setCurrentView} />;
      case 'syndicats':
        return <SyndicatsManagement />;
      case 'members':
        return <MembersManagement />;
      case 'flagged':
        return <FlaggedContent />;
      case 'payments':
        return <PaymentsManagement />;
      case 'plans':
        return <SubscriptionPlans />;
      case 'logs':
        return <ActivityLogs />;
      case 'bail':
        return <BailConfiguration />;
      default:
        return <SuperAdminDashboard onChangeView={setCurrentView} />;
    }
  };

  return (
    <SuperAdminLayout
      currentView={currentView}
      onChangeView={setCurrentView}
      userEmail={userEmail}
      onLogout={onLogout}
    >
      {renderView()}
    </SuperAdminLayout>
  );
};
