import { Event, Product, Service, Admission } from './types';

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Assemblée Générale Annuelle 2024',
    description: 'La réunion annuelle obligatoire pour tous les membres afin de discuter de l\'orientation stratégique.',
    date: '2024-06-15T09:00:00',
    location: 'Centre de Conférences Grand Hôtel',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop',
    status: 'active',
    attendees: 142
  },
  {
    id: '2',
    title: 'Atelier: Négociation Moderne',
    description: 'Apprenez les tactiques clés pour une négociation collective réussie à l\'ère numérique.',
    date: '2024-07-02T14:00:00',
    location: 'Siège Social, Salle B',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
    status: 'active',
    attendees: 45
  },
  {
    id: '3',
    title: 'Soirée Networking d\'Été',
    description: 'Une soirée décontractée pour se connecter avec des pairs de différents secteurs.',
    date: '2024-08-10T18:00:00',
    location: 'Rooftop Lounge',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=450&fit=crop',
    status: 'pending',
    attendees: 0
  },
  {
    id: '4',
    title: 'Formation Leadership',
    description: 'Développez vos compétences en leadership et gestion d\'équipe.',
    date: '2024-09-20T10:00:00',
    location: 'Campus Formation',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=450&fit=crop',
    status: 'active',
    attendees: 67
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Manuel Officiel du Syndicat',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    status: 'in_stock',
    sku: 'BK-2024-001',
    category: 'Livres'
  },
  {
    id: '2',
    title: 'Sweat à Capuche Bleu Marine',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    status: 'in_stock',
    sku: 'AP-HOOD-NV',
    category: 'Vêtements'
  },
  {
    id: '3',
    title: 'Pack Protection Juridique',
    price: 150.00,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=400&fit=crop',
    status: 'out_of_stock',
    sku: 'SV-LEG-PK',
    category: 'Services'
  },
  {
    id: '4',
    title: 'Pin Membre Premium',
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop',
    status: 'in_stock',
    sku: 'AC-PIN-01',
    category: 'Accessoires'
  },
  {
    id: '5',
    title: 'T-Shirt Officiel',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    status: 'in_stock',
    sku: 'AP-TSH-01',
    category: 'Vêtements'
  },
  {
    id: '6',
    title: 'Sac à Dos Professionnel',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    status: 'in_stock',
    sku: 'AC-BAG-01',
    category: 'Accessoires'
  }
];

export const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Consultation Juridique',
    description: 'Accès direct à nos avocats spécialisés en droit du travail pour les griefs personnels.',
    price: '120 € / heure',
    images: ['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop'],
    features: ['Confidentiel', 'Conseil Expert', 'Révision Documents']
  },
  {
    id: '2',
    title: 'Coaching de Carrière',
    description: 'Sessions individuelles pour vous aider à naviguer votre parcours professionnel et négociations salariales.',
    price: 'À partir de 80 €',
    images: ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop'],
    features: ['Audit CV', 'Préparation Entretien', 'Stratégie']
  },
  {
    id: '3',
    title: 'Formation Continue',
    description: 'Programmes de formation professionnelle pour développer vos compétences et progresser dans votre carrière.',
    price: '250 € / session',
    images: ['https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop'],
    features: ['Certifié', 'Flexible', 'Support 24/7']
  }
];

export const MOCK_ADMISSIONS: Admission[] = [
  {
    id: '1',
    fullName: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+33 1 23 45 67 89',
    company: 'TechFlow Solutions',
    position: 'Développeuse Senior',
    submittedAt: '2024-05-20',
    status: 'pending',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    motivation: 'Je souhaite défendre de meilleures politiques de télétravail dans notre secteur.'
  },
  {
    id: '2',
    fullName: 'Michael Chen',
    email: 'm.chen@example.com',
    phone: '+33 1 98 76 54 32',
    company: 'Logistique Globale',
    position: 'Responsable Opérations',
    submittedAt: '2024-05-19',
    status: 'pending',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    motivation: 'Je recherche un soutien juridique concernant les négociations contractuelles.'
  },
  {
    id: '3',
    fullName: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    phone: '+33 1 45 67 89 01',
    company: 'Santé Municipale',
    position: 'Infirmière Praticienne',
    submittedAt: '2024-05-18',
    status: 'accepted',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    motivation: 'Pour rejoindre le comité de négociation collective.'
  },
  {
    id: '4',
    fullName: 'Thomas Dubois',
    email: 'thomas.d@example.com',
    phone: '+33 1 34 56 78 90',
    company: 'Industries Modernes',
    position: 'Ingénieur Qualité',
    submittedAt: '2024-05-17',
    status: 'pending',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    motivation: 'Améliorer les conditions de travail et la sécurité dans notre industrie.'
  }
];

export const CHART_DATA = [
  { name: 'Lun', active: 400, new: 240 },
  { name: 'Mar', active: 300, new: 139 },
  { name: 'Mer', active: 200, new: 980 },
  { name: 'Jeu', active: 278, new: 390 },
  { name: 'Ven', active: 189, new: 480 },
  { name: 'Sam', active: 239, new: 380 },
  { name: 'Dim', active: 349, new: 430 },
];
