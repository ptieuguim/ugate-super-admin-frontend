'use client';

import React, { useState, useEffect } from 'react';
import { Login } from '@/components/Login';
import { Register } from '@/components/Register';
import { ForgotPassword } from '@/components/ForgotPassword';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';

/**
 * Page Principale
 * 
 * Cette page :
 * - Utilise le contexte d'authentification pour vérifier si l'utilisateur est connecté
 * - Affiche le Login si non connecté
 * - Redirige vers /dashboard si connecté
 */
export default function Home() {
  // 🪝 Utiliser le contexte d'authentification
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  // 📊 États locaux pour la navigation
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // 🔄 Rediriger vers /dashboard si authentifié
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // 🔄 Afficher un loader pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1877F2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // 🔐 Si non authentifié, afficher le formulaire de login, register ou forgot password
  if (!isAuthenticated) {
    if (showForgotPassword) {
      return (
        <ForgotPassword 
          onBack={() => setShowForgotPassword(false)} 
        />
      );
    }
    
    if (showRegister) {
      return (
        <Register 
          onSuccess={() => setShowRegister(false)} 
          onCancel={() => setShowRegister(false)} 
        />
      );
    }
    
    return (
      <Login 
        onForgotPassword={() => setShowForgotPassword(true)}
        onRegister={() => setShowRegister(true)}
      />
    );
  }

  // ✅ Si authentifié, afficher un loader pendant la redirection
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1877F2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Redirection...</p>
        </div>
      </div>
    );
  }

  // Cette partie ne devrait jamais s'afficher
  return null;
}
