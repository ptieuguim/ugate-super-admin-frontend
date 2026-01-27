'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  AlertTriangle, 
  DollarSign, 
  Activity,
  TrendingUp,
  Settings,
  Menu,
  Bell,
  Search,
  X,
  ChevronRight,
  LogOut,
  Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import Image from 'next/image';

interface SuperAdminLayoutProps {
  children: React.ReactNode;
  currentView: string;
  onChangeView: (view: string) => void;
  userEmail?: string;
  onLogout?: () => void;
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard Global', icon: LayoutDashboard },
  { id: 'syndicats', label: 'Syndicats', icon: Building2 },
  { id: 'flagged-content', label: 'Contenus Signalés', icon: AlertTriangle, count: 18 },
  { id: 'payments', label: 'Paiements', icon: DollarSign },
  { id: 'activity-logs', label: 'Logs d\'Activité', icon: Activity },
  { id: 'subscription-plans', label: 'Plans d\'Abonnement', icon: TrendingUp },
  { id: 'settings', label: 'Paramètres', icon: Settings },
];

export const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({ 
  children, 
  currentView, 
  onChangeView,
  userEmail = 'superadmin@ugate.com',
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Nouveau syndicat en attente', desc: 'Syndicat des Enseignants', time: '2h', unread: true },
    { id: 2, title: 'Contenu signalé', desc: 'Publication inappropriée', time: '4h', unread: true },
    { id: 3, title: 'Paiement reçu', desc: 'Syndicat des Médecins - €299', time: '6h', unread: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[280px] bg-white/80 backdrop-blur-xl border-r border-gray-200/50 transform transition-all duration-300 ease-out shadow-2xl
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="h-20 flex items-center px-6 border-b border-gray-200 bg-[#1877F2]">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <Shield className="w-6 h-6 text-[#1877F2]" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight block">
                Super Admin
              </span>
              <span className="text-xs text-blue-100">UGate Platform</span>
            </div>
            <button 
              className="ml-auto lg:hidden text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onChangeView(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                      ${isActive ? 'bg-[#1877F2] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'}
                    `}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                    <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                    {item.count && (
                      <Badge variant={isActive ? 'default' : 'error'} className="text-xs">
                        {item.count}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button 
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-all group"
              onClick={onLogout}
            >
              <div className="relative">
                <Image 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
                  alt="Admin"
                  width={40}
                  height={40}
                  className="rounded-xl object-cover border-2 border-gray-200"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></div>
              </div>
              <div className="ml-3 flex-1 text-left overflow-hidden">
                <p className="text-sm font-bold text-gray-900 truncate">Super Admin</p>
                <p className="text-xs text-gray-500 truncate">{userEmail}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:ml-[280px]">
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between px-4 lg:px-8 fixed top-0 right-0 left-0 lg:left-[280px] z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="hidden md:flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1877F2] rounded-xl flex items-center justify-center shadow-sm">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <nav className="text-xs font-medium text-gray-500 flex items-center">
                  <span className="hover:text-gray-900 cursor-pointer transition-colors">Super Admin</span>
                  <ChevronRight className="w-3 h-3 mx-1" />
                  <span className="text-gray-900 font-semibold">{NAV_ITEMS.find(n => n.id === currentView)?.label || 'Dashboard'}</span>
                </nav>
                <h2 className="text-sm font-bold text-gray-900">
                  {NAV_ITEMS.find(n => n.id === currentView)?.label || 'Dashboard'}
                </h2>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block relative group">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#1877F2] transition-colors" />
              <input 
                type="text" 
                placeholder="Recherche rapide... (Ctrl+K)" 
                className="pl-10 pr-4 py-2.5 w-80 bg-gray-100 border border-gray-200 rounded-lg text-sm transition-all outline-none focus:bg-white focus:border-[#1877F2] focus:ring-2 focus:ring-[#1877F2]/20 focus:w-96"
              />
            </div>
            
            <div className="h-8 w-px bg-gray-200 hidden md:block" />

            <button 
              className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
            </button>

            <div className="h-8 w-px bg-gray-200 hidden md:block" />

            <button 
              onClick={onLogout}
              className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {showNotifications && (
          <div className="absolute right-4 top-24 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 animate-in slide-in-from-top-4 duration-300">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Notifications</h3>
              <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notif) => (
                <div key={notif.id} className={`p-4 border-b border-gray-50 hover:bg-blue-50 transition-colors cursor-pointer ${notif.unread ? 'bg-blue-50/50' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${notif.unread ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{notif.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{notif.desc}</p>
                      <p className="text-xs text-gray-400 mt-2">Il y a {notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-100">
              <button className="w-full text-center text-sm font-semibold text-[#1877F2] hover:text-[#1465D6] py-2">
                Voir toutes les notifications
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth mt-20">
          <div className="max-w-[1800px] mx-auto">
            {children}
          </div>
        </main>

        <footer className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50 px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-6">
              <span>© 2024 UGate Platform. Tous droits réservés.</span>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-[#1877F2] transition-colors">Confidentialité</a>
                <a href="#" className="hover:text-[#1877F2] transition-colors">Conditions</a>
                <a href="#" className="hover:text-[#1877F2] transition-colors">Support</a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-emerald-600">Système opérationnel</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
