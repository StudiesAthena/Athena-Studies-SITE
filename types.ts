
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'consultoria' | 'produto' | 'aula';
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string[];
  category: 'planner' | 'ebook';
  buyLink: string;
}
