import React from 'react';

export type Status = 'active' | 'inactive' | 'pending' | 'archived';
export type AdmissionStatus = 'pending' | 'accepted' | 'rejected';
export type StockStatus = 'in_stock' | 'out_of_stock';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'editor';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  status: Status;
  attendees: number;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  status: StockStatus;
  sku: string;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string[];
  features: string[];
}

export interface Admission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  submittedAt: string;
  status: AdmissionStatus;
  avatar: string;
  motivation: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  count?: number;
}
