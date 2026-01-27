'use client';

import React from 'react';
import { SuperAdminLayout } from '@/components/SuperAdminLayout';
import { useAuth } from '@/lib/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Extraire la vue actuelle du pathname
  const getCurrentView = () => {
    if (pathname === '/dashboard' || pathname === '/') return 'dashboard';
    if (pathname.startsWith('/syndicats')) return 'syndicats';
    if (pathname.startsWith('/flagged-content')) return 'flagged-content';
    if (pathname.startsWith('/payments')) return 'payments';
    if (pathname.startsWith('/activity-logs')) return 'activity-logs';
    if (pathname.startsWith('/subscription-plans')) return 'subscription-plans';
    if (pathname.startsWith('/settings')) return 'settings';
    return 'dashboard';
  };

  // Gérer le changement de vue
  const handleChangeView = (view: string) => {
    router.push(`/${view}`);
  };

  return (
    <SuperAdminLayout
      currentView={getCurrentView()}
      onChangeView={handleChangeView}
      userEmail={user?.email || 'dev@ugate.com'}
      onLogout={logout}
    >
      {children}
    </SuperAdminLayout>
  );
}
