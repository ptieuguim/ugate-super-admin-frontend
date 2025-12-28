'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Eye,
  Power,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  Calendar,
  Shield,
  FileText,
  Download,
  Filter
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { User, ComplianceDetails, SyndicatMember, Branch } from '@/lib/types/superadmin';

interface MembersManagementProps {
  syndicatId?: string;
}

export const MembersManagement: React.FC<MembersManagementProps> = ({ syndicatId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'verified' | 'pending'>('all');
  const [filterSyndicat, setFilterSyndicat] = useState<string>(syndicatId || 'all');
  const [filterRole, setFilterRole] = useState<'all' | 'ADMIN' | 'MEMBER' | 'MODERATOR'>('all');
  const [filterBranch, setFilterBranch] = useState<string>('all');
  const [filterApproval, setFilterApproval] = useState<'all' | 'approved' | 'pending'>('all');
  const [selectedMember, setSelectedMember] = useState<(User & { syndicatName: string; role: string; membership?: SyndicatMember }) | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const mockBranches: Branch[] = [
    { id: 'branch-1', name: 'Branche Paris', location: 'Paris', contact: 'paris@syndicat.fr', creationDate: '2024-01-01', lastUpdate: '2024-12-01', agencyId: 'agency-1', syndicatId: 'syn-1' },
    { id: 'branch-2', name: 'Branche Lyon', location: 'Lyon', contact: 'lyon@syndicat.fr', creationDate: '2024-02-01', lastUpdate: '2024-12-01', agencyId: 'agency-2', syndicatId: 'syn-2' },
    { id: 'branch-3', name: 'Branche Marseille', location: 'Marseille', contact: 'marseille@syndicat.fr', creationDate: '2024-03-01', lastUpdate: '2024-12-01', agencyId: 'agency-3', syndicatId: 'syn-3' },
  ];

  const mockMembers: (User & { syndicatName: string; role: string; membership: SyndicatMember })[] = [
    {
      id: '1',
      email: 'jean.dupont@email.com',
      firstName: 'Jean',
      lastName: 'Dupont',
      phone: '+33 6 12 34 56 78',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      createdAt: '2024-01-15',
      lastLogin: '2024-12-27',
      isActive: true,
      isEmailVerified: true,
      syndicatName: 'Syndicat des Enseignants',
      role: 'MEMBER',
      membership: {
        id: 'mem-1',
        userId: '1',
        userName: 'Jean Dupont',
        syndicatId: 'syn-1',
        branchId: 'branch-1',
        role: 'MEMBER',
        joinDate: '2024-01-15',
        isActive: true,
        isApproved: true,
      },
      complianceDetails: {
        userId: '1',
        idCardNumber: 'AB123456',
        idCardUrl: 'https://example.com/id1.pdf',
        proofOfAddressUrl: 'https://example.com/address1.pdf',
        isVerified: true,
        verifiedAt: '2024-01-20',
        verifiedBy: 'admin',
      },
    },
    {
      id: '2',
      email: 'marie.martin@email.com',
      firstName: 'Marie',
      lastName: 'Martin',
      phone: '+33 6 98 76 54 32',
      profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      createdAt: '2024-02-10',
      lastLogin: '2024-12-26',
      isActive: false,
      isEmailVerified: true,
      syndicatName: 'Syndicat des Médecins',
      role: 'ADMIN',
      membership: {
        id: 'mem-2',
        userId: '2',
        userName: 'Marie Martin',
        syndicatId: 'syn-2',
        branchId: 'branch-2',
        role: 'ADMIN',
        joinDate: '2024-02-10',
        isActive: false,
        isApproved: true,
      },
      complianceDetails: {
        userId: '2',
        idCardNumber: 'CD789012',
        idCardUrl: 'https://example.com/id2.pdf',
        proofOfAddressUrl: 'https://example.com/address2.pdf',
        isVerified: false,
        rejectionReason: 'Document expiré',
      },
    },
    {
      id: '3',
      email: 'pierre.bernard@email.com',
      firstName: 'Pierre',
      lastName: 'Bernard',
      phone: '+33 6 45 67 89 01',
      createdAt: '2024-03-05',
      lastLogin: '2024-12-25',
      isActive: true,
      isEmailVerified: false,
      syndicatName: 'Syndicat des Infirmiers',
      role: 'MODERATOR',
      membership: {
        id: 'mem-3',
        userId: '3',
        userName: 'Pierre Bernard',
        syndicatId: 'syn-3',
        branchId: 'branch-3',
        role: 'MODERATOR',
        joinDate: '2024-03-05',
        isActive: true,
        isApproved: false,
      },
      complianceDetails: {
        userId: '3',
        isVerified: false,
      },
    },
  ];

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSyndicat = filterSyndicat === 'all' || member.syndicatName === filterSyndicat;
    const matchesRole = filterRole === 'all' || member.membership.role === filterRole;
    const matchesBranch = filterBranch === 'all' || member.membership.branchId === filterBranch;
    const matchesApproval = filterApproval === 'all' || 
                           (filterApproval === 'approved' && member.membership.isApproved) ||
                           (filterApproval === 'pending' && !member.membership.isApproved);
    
    let matchesStatus = true;
    if (filterStatus === 'active') matchesStatus = member.membership.isActive;
    if (filterStatus === 'inactive') matchesStatus = !member.membership.isActive;
    if (filterStatus === 'verified') matchesStatus = member.complianceDetails?.isVerified || false;
    if (filterStatus === 'pending') matchesStatus = !member.complianceDetails?.isVerified;
    
    return matchesSearch && matchesSyndicat && matchesRole && matchesBranch && matchesApproval && matchesStatus;
  });

  const handleActivateMember = (id: string) => {
    console.log('Activer membre:', id);
  };

  const handleDeactivateMember = (id: string) => {
    console.log('Désactiver membre:', id);
  };

  const handleApproveMember = (id: string) => {
    console.log('Approuver membre:', id);
  };

  const handleViewProfile = (member: User & { syndicatName: string; role: string }) => {
    setSelectedMember(member);
    setShowProfileModal(true);
  };

  const syndicats = ['Syndicat des Enseignants', 'Syndicat des Médecins', 'Syndicat des Infirmiers'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Membres</h1>
          <p className="text-gray-600 mt-1">Consulter et gérer tous les membres de la plateforme</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="info" className="px-3 py-1">
            {filteredMembers.length} membres
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un membre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterSyndicat}
                  onChange={(e) => setFilterSyndicat(e.target.value)}
                  className="pl-11 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent appearance-none bg-white min-w-[200px]"
                >
                  <option value="all">Tous les syndicats</option>
                  {syndicats.map((syndicat) => (
                    <option key={syndicat} value={syndicat}>{syndicat}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value as typeof filterRole)}
                  className="pl-11 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent appearance-none bg-white min-w-[180px]"
                >
                  <option value="all">Tous les rôles</option>
                  <option value="ADMIN">Administrateur</option>
                  <option value="MEMBER">Membre</option>
                  <option value="MODERATOR">Modérateur</option>
                </select>
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterBranch}
                  onChange={(e) => setFilterBranch(e.target.value)}
                  className="pl-11 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent appearance-none bg-white min-w-[180px]"
                >
                  <option value="all">Toutes les branches</option>
                  {mockBranches.map((branch) => (
                    <option key={branch.id} value={branch.id}>{branch.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'all' ? 'bg-[#1877F2] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Actifs
              </button>
              <button
                onClick={() => setFilterStatus('inactive')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'inactive' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Inactifs
              </button>
              <button
                onClick={() => setFilterStatus('verified')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'verified' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Vérifiés
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'pending' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                En attente vérification
              </button>
              <button
                onClick={() => setFilterApproval('approved')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterApproval === 'approved' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Approuvés
              </button>
              <button
                onClick={() => setFilterApproval('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterApproval === 'pending' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                En attente approbation
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200">
                    {member.profilePicture ? (
                      <img src={member.profilePicture} alt={member.firstName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#1877F2]">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{member.firstName} {member.lastName}</h3>
                      <Badge variant={member.isActive ? 'success' : 'default'}>
                        {member.isActive ? 'Actif' : 'Inactif'}
                      </Badge>
                      <Badge variant={member.complianceDetails?.isVerified ? 'info' : 'warning'}>
                        {member.complianceDetails?.isVerified ? 'Vérifié' : 'Non vérifié'}
                      </Badge>
                      <Badge variant="outline">
                        {member.role}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{member.email}</span>
                      </div>
                      {member.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{member.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Shield className="w-4 h-4" />
                        <span>{member.syndicatName}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Inscrit le {new Date(member.createdAt).toLocaleDateString()}</span>
                      </div>
                      {member.lastLogin && (
                        <div className="flex items-center gap-1">
                          <span>Dernière connexion: {new Date(member.lastLogin).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewProfile(member)}
                    leftIcon={Eye}
                  >
                    Profil
                  </Button>
                  {!member.complianceDetails?.isVerified && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleApproveMember(member.id)}
                      leftIcon={CheckCircle}
                      className="text-emerald-600 hover:bg-emerald-50"
                    >
                      Approuver
                    </Button>
                  )}
                  {member.isActive ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeactivateMember(member.id)}
                      leftIcon={Power}
                      className="text-red-600 hover:bg-red-50"
                    >
                      Désactiver
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleActivateMember(member.id)}
                      leftIcon={Power}
                      className="text-green-600 hover:bg-green-50"
                    >
                      Activer
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile Modal */}
      {showProfileModal && selectedMember && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Profil du Membre</h2>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Profile Picture & Basic Info */}
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                  {selectedMember.profilePicture ? (
                    <img src={selectedMember.profilePicture} alt={selectedMember.firstName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#1877F2]">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedMember.firstName} {selectedMember.lastName}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant={selectedMember.isActive ? 'success' : 'default'}>
                      {selectedMember.isActive ? 'Actif' : 'Inactif'}
                    </Badge>
                    <Badge variant={selectedMember.complianceDetails?.isVerified ? 'info' : 'warning'}>
                      {selectedMember.complianceDetails?.isVerified ? 'Vérifié' : 'Non vérifié'}
                    </Badge>
                    <Badge variant={selectedMember.isEmailVerified ? 'success' : 'warning'}>
                      {selectedMember.isEmailVerified ? 'Email vérifié' : 'Email non vérifié'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{selectedMember.email}</span>
                    </div>
                    {selectedMember.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{selectedMember.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Account Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informations du Compte</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Date d&apos;inscription</label>
                    <p className="text-gray-900 font-semibold mt-1">
                      {new Date(selectedMember.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {selectedMember.lastLogin && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Dernière connexion</label>
                      <p className="text-gray-900 font-semibold mt-1">
                        {new Date(selectedMember.lastLogin).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-600">Syndicat</label>
                    <p className="text-gray-900 font-semibold mt-1">{(selectedMember as typeof selectedMember & { syndicatName: string }).syndicatName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Rôle</label>
                    <p className="text-gray-900 font-semibold mt-1">{(selectedMember as typeof selectedMember & { role: string }).role}</p>
                  </div>
                </div>
              </div>

              {/* Compliance Details */}
              {selectedMember.complianceDetails && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Détails de Conformité</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Statut de vérification</label>
                        <div className="flex items-center gap-2 mt-1">
                          {selectedMember.complianceDetails.isVerified ? (
                            <>
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                              <span className="text-emerald-600 font-semibold">Vérifié</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5 text-orange-600" />
                              <span className="text-orange-600 font-semibold">Non vérifié</span>
                            </>
                          )}
                        </div>
                      </div>
                      {selectedMember.complianceDetails.verifiedAt && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Date de vérification</label>
                          <p className="text-gray-900 font-semibold mt-1">
                            {new Date(selectedMember.complianceDetails.verifiedAt).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      {selectedMember.complianceDetails.idCardNumber && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Numéro de pièce d&apos;identité</label>
                          <p className="text-gray-900 font-semibold mt-1">{selectedMember.complianceDetails.idCardNumber}</p>
                        </div>
                      )}
                      {selectedMember.complianceDetails.verifiedBy && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Vérifié par</label>
                          <p className="text-gray-900 font-semibold mt-1">{selectedMember.complianceDetails.verifiedBy}</p>
                        </div>
                      )}
                    </div>

                    {selectedMember.complianceDetails.rejectionReason && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <label className="text-sm font-medium text-red-700">Raison du rejet</label>
                        <p className="text-red-900 mt-1">{selectedMember.complianceDetails.rejectionReason}</p>
                      </div>
                    )}

                    {/* Documents */}
                    {(selectedMember.complianceDetails.idCardUrl || selectedMember.complianceDetails.proofOfAddressUrl) && (
                      <div>
                        <label className="text-sm font-medium text-gray-600 block mb-2">Documents</label>
                        <div className="space-y-2">
                          {selectedMember.complianceDetails.idCardUrl && (
                            <a
                              href={selectedMember.complianceDetails.idCardUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <FileText className="w-5 h-5 text-[#1877F2]" />
                              <span className="font-medium text-gray-900">Pièce d&apos;identité</span>
                              <Download className="w-4 h-4 text-gray-400 ml-auto" />
                            </a>
                          )}
                          {selectedMember.complianceDetails.proofOfAddressUrl && (
                            <a
                              href={selectedMember.complianceDetails.proofOfAddressUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <FileText className="w-5 h-5 text-[#1877F2]" />
                              <span className="font-medium text-gray-900">Justificatif de domicile</span>
                              <Download className="w-4 h-4 text-gray-400 ml-auto" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {!selectedMember.complianceDetails?.isVerified && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleApproveMember(selectedMember.id);
                      setShowProfileModal(false);
                    }}
                    leftIcon={CheckCircle}
                  >
                    Approuver le Membre
                  </Button>
                )}
                {selectedMember.isActive ? (
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDeactivateMember(selectedMember.id);
                      setShowProfileModal(false);
                    }}
                    leftIcon={Power}
                  >
                    Désactiver le Membre
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleActivateMember(selectedMember.id);
                      setShowProfileModal(false);
                    }}
                    leftIcon={Power}
                  >
                    Activer le Membre
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
