
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
