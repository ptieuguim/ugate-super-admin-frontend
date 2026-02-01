'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Save,
  Eye,
  EyeOff,
  Shield,
  Bell,
  Globe,
  Camera,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { updateProfile, changePassword, logActivity } from '@/lib/services/superadmin.service';

export const AccountSettings: React.FC = () => {
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Récupérer les infos utilisateur depuis le localStorage
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'SUPER_ADMIN',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    syndicatApproval: true,
    paymentAlerts: true,
    systemUpdates: false,
  });

  useEffect(() => {
    // Charger les données utilisateur depuis le localStorage ou l'API
    const userEmail = localStorage.getItem('ugate_user_email') || '';
    const userName = localStorage.getItem('ugate_user_name') || '';
    
    // Séparer le nom complet en prénom et nom
    const nameParts = userName.split(' ');
    
    setProfileData({
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      email: userEmail,
      phone: '',
      role: 'SUPER_ADMIN',
    });
  }, []);

  const handleProfileUpdate = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      // Validation
      if (!profileData.firstName || !profileData.lastName || !profileData.email) {
        setErrorMessage('Veuillez remplir tous les champs obligatoires');
        return;
      }

      // Appel API pour mettre à jour le profil
      await updateProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
      });

      // Mettre à jour le localStorage
      localStorage.setItem('ugate_user_name', `${profileData.firstName} ${profileData.lastName}`);
      localStorage.setItem('ugate_user_email', profileData.email);

      // Logger l'activité
      await logActivity({
        action: 'UPDATE_PROFILE',
        entityType: 'USER_ACCOUNT',
        entityId: 'current-user',
        details: {
          fields: ['firstName', 'lastName', 'email', 'phone'],
          timestamp: new Date().toISOString(),
        },
      });

      setSuccessMessage('Profil mis à jour avec succès');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      setErrorMessage('Erreur lors de la mise à jour du profil');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      // Validation
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        setErrorMessage('Veuillez remplir tous les champs du mot de passe');
        return;
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setErrorMessage('Les nouveaux mots de passe ne correspondent pas');
        return;
      }

      if (passwordData.newPassword.length < 8) {
        setErrorMessage('Le nouveau mot de passe doit contenir au moins 8 caractères');
        return;
      }

      // Appel API pour changer le mot de passe
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      // Logger l'activité
      await logActivity({
        action: 'CHANGE_PASSWORD',
        entityType: 'USER_ACCOUNT',
        entityId: 'current-user',
        details: {
          timestamp: new Date().toISOString(),
        },
      });

      setSuccessMessage('Mot de passe modifié avec succès');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setShowPasswordFields(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe:', error);
      setErrorMessage('Erreur lors du changement de mot de passe. Vérifiez votre mot de passe actuel.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationUpdate = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      // Logger l'activité
      await logActivity({
        action: 'UPDATE_NOTIFICATION_SETTINGS',
        entityType: 'USER_ACCOUNT',
        entityId: 'current-user',
        details: {
          settings: notificationSettings,
          timestamp: new Date().toISOString(),
        },
      });

      setSuccessMessage('Préférences de notification mises à jour');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des notifications:', error);
      setErrorMessage('Erreur lors de la mise à jour des notifications');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres du Compte</h1>
        <p className="text-gray-600 mt-1">Gérer vos informations personnelles et préférences</p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800 font-medium">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <Shield className="w-5 h-5 text-red-600" />
          <p className="text-red-800 font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Profile Information */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1877F2] rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-900">Informations du Profil</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Mettez à jour vos informations personnelles</p>
              </div>
            </div>
            <Badge variant="info">Super Admin</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-[#1877F2] to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{profileData.firstName} {profileData.lastName}</h3>
              <p className="text-sm text-gray-600">{profileData.email}</p>
              <Badge variant="success" className="mt-2">Compte Actif</Badge>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                value={profileData.firstName}
                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                placeholder="Votre prénom"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom *
              </label>
              <input
                type="text"
                value={profileData.lastName}
                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                  placeholder="votre.email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                placeholder="+237 6XX XXX XXX"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button
              variant="primary"
              onClick={handleProfileUpdate}
              leftIcon={Save}
              disabled={isLoading}
            >
              {isLoading ? 'Enregistrement...' : 'Enregistrer les Modifications'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Sécurité</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Gérer votre mot de passe et paramètres de sécurité</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {!showPasswordFields ? (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900">Mot de passe</h4>
                <p className="text-sm text-gray-600 mt-1">Dernière modification il y a 30 jours</p>
              </div>
              <Button
                variant="secondary"
                onClick={() => setShowPasswordFields(true)}
                leftIcon={Lock}
              >
                Changer le Mot de Passe
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe actuel *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                    placeholder="Votre mot de passe actuel"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau mot de passe *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                    placeholder="Minimum 8 caractères"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le nouveau mot de passe *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                    placeholder="Confirmez le nouveau mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="primary"
                  onClick={handlePasswordChange}
                  leftIcon={Save}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Modification...' : 'Modifier le Mot de Passe'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowPasswordFields(false);
                    setPasswordData({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: '',
                    });
                  }}
                  className="flex-1"
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Notifications</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Gérer vos préférences de notification</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <span className="font-medium text-gray-900 block">Notifications par Email</span>
                <span className="text-sm text-gray-600">Recevoir des notifications par email</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notificationSettings.emailNotifications}
              onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
              className="w-5 h-5 text-[#1877F2] border-gray-300 rounded focus:ring-[#1877F2]"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <div>
                <span className="font-medium text-gray-900 block">Approbations de Syndicats</span>
                <span className="text-sm text-gray-600">Notifications pour les nouveaux syndicats à approuver</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notificationSettings.syndicatApproval}
              onChange={(e) => setNotificationSettings({ ...notificationSettings, syndicatApproval: e.target.checked })}
              className="w-5 h-5 text-[#1877F2] border-gray-300 rounded focus:ring-[#1877F2]"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-600" />
              <div>
                <span className="font-medium text-gray-900 block">Alertes de Paiement</span>
                <span className="text-sm text-gray-600">Notifications pour les transactions et paiements</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notificationSettings.paymentAlerts}
              onChange={(e) => setNotificationSettings({ ...notificationSettings, paymentAlerts: e.target.checked })}
              className="w-5 h-5 text-[#1877F2] border-gray-300 rounded focus:ring-[#1877F2]"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <span className="font-medium text-gray-900 block">Mises à Jour Système</span>
                <span className="text-sm text-gray-600">Notifications pour les mises à jour et maintenances</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notificationSettings.systemUpdates}
              onChange={(e) => setNotificationSettings({ ...notificationSettings, systemUpdates: e.target.checked })}
              className="w-5 h-5 text-[#1877F2] border-gray-300 rounded focus:ring-[#1877F2]"
            />
          </label>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button
              variant="primary"
              onClick={handleNotificationUpdate}
              leftIcon={Save}
              disabled={isLoading}
            >
              {isLoading ? 'Enregistrement...' : 'Enregistrer les Préférences'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
