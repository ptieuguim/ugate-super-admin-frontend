'use client';

import React, { useState } from 'react';
import { Shield, Mail, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/contexts/AuthContext';

/**
 * Composant Login
 * 
 * Ce composant gère l'interface de connexion et utilise :
 * - Le contexte d'authentification (useAuth) pour la logique
 * - Le service d'authentification pour les appels API
 * - La validation locale des champs
 */

interface LoginProps {
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onForgotPassword, onRegister }) => {
  // 🪝 Utiliser le contexte d'authentification
  const { login, error: authError, isLoading: authLoading } = useAuth();
  
  // 📊 États locaux pour le formulaire
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  /**
   * 📝 FONCTION : Gérer la soumission du formulaire
   * 
   * @param e - Événement du formulaire
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    
    // VALIDATION 1 : Vérifier que les champs sont remplis
    if (!identifier || !password) {
      setLocalError('Veuillez remplir tous les champs');
      return;
    }

    // VALIDATION 2 : Vérifier la longueur du mot de passe
    if (password.length < 6) {
      setLocalError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    try {
      // 🔐 Appeler la fonction login du contexte
      // Cette fonction va :
      // 1. Appeler l'API d'authentification
      // 2. Sauvegarder les tokens
      // 3. Mettre à jour l'état global
      await login({ identifier, password });
      
      // ✅ Si on arrive ici, la connexion a réussi !
      // Le contexte va automatiquement mettre à jour isAuthenticated
      // Et app/page.tsx va afficher le dashboard
      
    } catch (err) {
      // ❌ En cas d'erreur, elle sera affichée via authError
      console.error('Erreur lors de la connexion:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1877F2] via-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="w-full max-w-md relative">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#1877F2] to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin</h1>
            <p className="text-gray-600">Tableau de bord d&apos;administration</p>
          </div>

          {/* Error Message */}
          {(localError || authError) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{localError || authError}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email, Username ou Téléphone
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all"
                  placeholder="superadmin@ugate.com"
                  disabled={authLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all"
                  placeholder="••••••••"
                  disabled={authLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={authLoading}
            >
              {authLoading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>

          {/* Liens */}
          {(onForgotPassword || onRegister) && (
            <div className="mt-6 flex items-center justify-between text-sm">
              {onForgotPassword && (
                <button
                  onClick={onForgotPassword}
                  className="text-[#1877F2] hover:underline"
                >
                  Mot de passe oublié ?
                </button>
              )}
              {onRegister && (
                <button
                  onClick={onRegister}
                  className="text-[#1877F2] hover:underline"
                >
                  Créer un compte
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-white/80 text-sm mt-6">
          © 2024 UGate Platform. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};
