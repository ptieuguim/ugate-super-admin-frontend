'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  MessageSquare,
  FileText
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Publication, Event } from '@/lib/types/superadmin';

export const FlaggedContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'publications' | 'events'>('all');
  const [selectedContent, setSelectedContent] = useState<Publication | Event | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const mockFlaggedPublications: Publication[] = [
    {
      id: '1',
      content: 'Contenu inapproprié qui viole les règles de la communauté...',
      authorId: 'user-1',
      author: {
        id: 'user-1',
        email: 'jean.dupont@email.com',
        firstName: 'Jean',
        lastName: 'Dupont',
        createdAt: '2024-01-15',
        isActive: true,
        isEmailVerified: true,
      },
      creationDate: '2024-12-20',
      lastUpdate: '2024-12-20',
      status: 'FLAGGED',
      likeCount: 5,
      branchId: 'branch-1',
      flaggedReason: 'Contenu offensant',
      flaggedBy: 'user-5',
      flaggedAt: '2024-12-21',
    },
    {
      id: '2',
      content: 'Spam promotionnel répété plusieurs fois...',
      authorId: 'user-2',
      author: {
        id: 'user-2',
        email: 'marie.martin@email.com',
        firstName: 'Marie',
        lastName: 'Martin',
        createdAt: '2024-02-10',
        isActive: true,
        isEmailVerified: true,
      },
      creationDate: '2024-12-19',
      lastUpdate: '2024-12-19',
      status: 'FLAGGED',
      likeCount: 2,
      branchId: 'branch-2',
      flaggedReason: 'Spam',
      flaggedBy: 'user-6',
      flaggedAt: '2024-12-20',
    },
  ];

  const mockFlaggedEvents: Event[] = [
    {
      id: '1',
      title: 'Événement suspect',
      description: 'Description d\'un événement qui semble frauduleux',
      lieu: 'Paris',
      startDate: '2025-01-15',
      endDate: '2025-01-16',
      branchId: 'branch-1',
      status: 'FLAGGED',
      flaggedReason: 'Informations trompeuses',
      flaggedBy: 'user-7',
      flaggedAt: '2024-12-22',
    },
    {
      id: '2',
      title: 'Rassemblement non autorisé',
      description: 'Événement organisé sans autorisation',
      lieu: 'Lyon',
      startDate: '2025-01-20',
      endDate: '2025-01-20',
      branchId: 'branch-3',
      status: 'FLAGGED',
      flaggedReason: 'Non conforme aux règles',
      flaggedBy: 'user-8',
      flaggedAt: '2024-12-23',
    },
  ];

  const allFlaggedContent = [
    ...mockFlaggedPublications.map(p => ({ ...p, type: 'publication' as const })),
    ...mockFlaggedEvents.map(e => ({ ...e, type: 'event' as const })),
  ];

  const filteredContent = allFlaggedContent.filter(content => {
    const matchesType = filterType === 'all' || 
                       (filterType === 'publications' && content.type === 'publication') ||
                       (filterType === 'events' && content.type === 'event');
    
    if (content.type === 'publication') {
      const pub = content as Publication & { type: 'publication' };
      return matchesType && (
        pub.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.flaggedReason?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      const evt = content as Event & { type: 'event' };
      return matchesType && (
        evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evt.flaggedReason?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  const handleApproveContent = (id: string, type: string) => {
    console.log('Approuver contenu:', id, type);
  };

  const handleDeleteContent = (id: string, type: string) => {
    console.log('Supprimer contenu:', id, type);
  };

  const handleViewDetail = (content: Publication | Event) => {
    setSelectedContent(content);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contenus Signalés</h1>
          <p className="text-gray-600 mt-1">Modérer les publications et événements signalés</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="error" className="px-3 py-1">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {filteredContent.length} signalements
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un contenu signalé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterType === 'all' ? 'bg-[#1877F2] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setFilterType('publications')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterType === 'publications' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Publications
              </button>
              <button
                onClick={() => setFilterType('events')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterType === 'events' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Événements
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredContent.map((content) => (
          <Card key={`${content.type}-${content.id}`} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                    content.type === 'publication' ? 'bg-purple-600' : 'bg-orange-600'
                  }`}>
                    {content.type === 'publication' ? (
                      <MessageSquare className="w-6 h-6 text-white" />
                    ) : (
                      <Calendar className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {content.type === 'publication' 
                          ? 'Publication signalée' 
                          : (content as Event).title}
                      </h3>
                      <Badge variant="error">
                        {content.type === 'publication' ? 'Publication' : 'Événement'}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {content.type === 'publication' 
                        ? (content as Publication).content 
                        : (content as Event).description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      {content.type === 'publication' && (content as Publication).author && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          <span>
                            {(content as Publication).author?.firstName} {(content as Publication).author?.lastName}
                          </span>
                        </div>
                      )}
                      {content.type === 'event' && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date((content as Event).startDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="font-medium text-red-600">{content.flaggedReason}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Signalé le {content.flaggedAt ? new Date(content.flaggedAt).toLocaleDateString() : 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewDetail(content)}
                    leftIcon={Eye}
                  >
                    Détails
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleApproveContent(content.id, content.type)}
                    leftIcon={CheckCircle}
                    className="text-emerald-600 hover:bg-emerald-50"
                  >
                    Approuver
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteContent(content.id, content.type)}
                    leftIcon={Trash2}
                    className="text-red-600 hover:bg-red-50"
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedContent && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Détails du {(selectedContent as Publication & Event & { type: string }).type === 'publication' ? 'Signalement' : 'Événement Signalé'}
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {(selectedContent as Publication & Event & { type: string }).type === 'publication' ? (
                <>
                  {/* Publication Details */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Contenu de la Publication</h3>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-900">{(selectedContent as Publication).content}</p>
                    </div>
                  </div>

                  {(selectedContent as Publication).author && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Auteur</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Nom</label>
                          <p className="text-gray-900 font-semibold mt-1">
                            {(selectedContent as Publication).author?.firstName} {(selectedContent as Publication).author?.lastName}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Email</label>
                          <p className="text-gray-900 font-semibold mt-1">{(selectedContent as Publication).author?.email}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Statistiques</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Likes</label>
                        <p className="text-gray-900 font-semibold mt-1">{(selectedContent as Publication).likeCount}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Date de création</label>
                        <p className="text-gray-900 font-semibold mt-1">
                          {new Date((selectedContent as Publication).creationDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Event Details */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Informations de l&apos;Événement</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Titre</label>
                        <p className="text-gray-900 font-semibold mt-1">{(selectedContent as Event).title}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Lieu</label>
                        <p className="text-gray-900 font-semibold mt-1">{(selectedContent as Event).lieu}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Date de début</label>
                        <p className="text-gray-900 font-semibold mt-1">
                          {new Date((selectedContent as Event).startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Date de fin</label>
                        <p className="text-gray-900 font-semibold mt-1">
                          {new Date((selectedContent as Event).endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm font-medium text-gray-600">Description</label>
                        <p className="text-gray-900 mt-1">{(selectedContent as Event).description}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Flagged Info */}
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-lg font-bold text-red-900 mb-3">Informations du Signalement</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-red-700">Raison</label>
                    <p className="text-red-900 font-semibold mt-1">{selectedContent.flaggedReason}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-red-700">Date du signalement</label>
                    <p className="text-red-900 font-semibold mt-1">
                      {selectedContent.flaggedAt ? new Date(selectedContent.flaggedAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  variant="primary"
                  onClick={() => {
                    handleApproveContent(selectedContent.id, (selectedContent as Publication & Event & { type: string }).type);
                    setShowDetailModal(false);
                  }}
                  leftIcon={CheckCircle}
                >
                  Approuver et Réactiver
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleDeleteContent(selectedContent.id, (selectedContent as Publication & Event & { type: string }).type);
                    setShowDetailModal(false);
                  }}
                  leftIcon={Trash2}
                >
                  Supprimer Définitivement
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
