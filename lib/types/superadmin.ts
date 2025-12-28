export interface Syndicat {
  id: string;
  isApproved: boolean;
  isActive: boolean;
  name: string;
  description: string;
  domain: string;
  type: string;
  creationDate: string;
  lastUpdate: string;
  charteUrl?: string;
  statusUrl?: string;
  listMembersUrl?: string;
  certificatEngagementUrl?: string;
  organizationId: string;
  memberCount?: number;
  subscriptionPlan?: string;
  subscriptionExpiry?: string;
}

export interface SyndicatMember {
  id: string;
  userId: string;
  userName?: string;
  syndicatId: string;
  branchId?: string;
  role: 'ADMIN' | 'MEMBER' | 'MODERATOR';
  joinDate: string;
  isActive: boolean;
  isApproved: boolean;
  user?: User;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  contact: string;
  creationDate: string;
  lastUpdate: string;
  agencyId: string;
  syndicatId: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profilePicture?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  complianceDetails?: ComplianceDetails;
}

export interface ComplianceDetails {
  userId: string;
  idCardNumber?: string;
  idCardUrl?: string;
  proofOfAddressUrl?: string;
  isVerified: boolean;
  verifiedAt?: string;
  verifiedBy?: string;
  rejectionReason?: string;
}

export interface Publication {
  id: string;
  content: string;
  authorId: string;
  author?: User;
  creationDate: string;
  lastUpdate: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'FLAGGED';
  likeCount: number;
  branchId: string;
  flaggedReason?: string;
  flaggedBy?: string;
  flaggedAt?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  lieu: string;
  startDate: string;
  endDate: string;
  branchId: string;
  status?: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED' | 'FLAGGED';
  flaggedReason?: string;
  flaggedBy?: string;
  flaggedAt?: string;
}

export interface Payment {
  id: string;
  syndicatId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  paymentDate: string;
  paymentMethod: string;
  description: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, unknown>;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: number;
  features: string[];
  isActive: boolean;
}

export interface BailConfig {
  id: string;
  syndicatType: string;
  expiryDays: number;
  warningDays: number;
  autoDeactivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalSyndicats: number;
  activeSyndicats: number;
  pendingApproval: number;
  totalMembers: number;
  activeMembers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  flaggedContent: number;
  recentActivity: number;
}
