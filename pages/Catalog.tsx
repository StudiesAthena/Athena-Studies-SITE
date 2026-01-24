
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CATALOG_PRODUCTS } from '../constants';
import { CTAButton } from '../components/CTAButton';
import { ArrowLeft, BookOpen, FileText, ShoppingCart, Sparkles, ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import { Product } from '../types';

const ProductCard: React.FC<{ product: Product; isAvailable: boolean }> = ({ product, isAvailable }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const isPlanner = product.category === 'planner';

  return (
    <div className={`group bg-slate-50 dark:bg-slate-900/50 rounded-[3.5rem] overflow-hidden border-[3px] border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all h-full flex flex-col ${!isAvailable ? 'opacity-70 grayscale-[0.5]' : ''}`}>
      {/* Image Gallery */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={product.images[currentImageIndex]} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        
        {/* Navigation Arrows for Gallery */}
        {isAvailable && product.images.length > 1 && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={prevImage}
              className="bg-white/80 dark:bg-slate-800/80 p-2 rounded-full hover:bg-white dark:hover:bg-slate-700 text-athena-blue transition-colors shadow-md"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextImage}
              className="bg-white/80 dark:bg-slate-800/80 p-2 rounded-full hover:bg-white dark:hover:bg-slate-700 text-athena-blue transition-colors shadow-md"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Gallery Dots */}
        {isAvailable && product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
            {product.images.map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all ${currentImageIndex === i ? 'bg-white w-3' : 'bg-white/50'}`} 
              />
            ))}
          </div>
        )}

        {/* PRIMEIRA SEMANA GRATUITA Badge */}
        {isAvailable && isPlanner && (
          <div className="absolute top-6 left-6 bg-emerald-500 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
            <Gift size={14} /> PRIMEIRA SEMANA GRATUITA
          </div>
        )}
      </div>

      <div className="p-10 space-y-6 flex-grow flex flex-col">
        <div className="flex flex-col gap-2">
          {/* Preço movido para fora da imagem */}
          {isAvailable && (
            <div className="text-athena-blue dark:text-blue-400 font-black text-2xl font-heading">
              R$ {product.price}
            </div>
          )}
          <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white leading-tight">
            {product.title}
          </h3>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed flex-grow text-sm">
          {product.description}
        </p>
        
        <div className="space-y-3">
          {/* New PRIMEIRA SEMANA Button for Planners */}
          {isAvailable && isPlanner && (
            <CTAButton 
              variant="outline"
              className="w-full py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
              onClick={() => window.open('https://forms.gle/g8xymNJ423T7dxe88', '_blank')}
            >
              PRIMEIRA SEMANA
            </CTAButton>
          )}

          <CTAButton 
            variant={isAvailable ? (product.category === 'ebook' ? "secondary" : "primary") : "outline"} 
            className={`w-full py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 ${!isAvailable ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={() => isAvailable && window.open(product.buyLink, '_blank')}
          >
            {isAvailable ? <><ShoppingCart size={16} /> {product.category === 'ebook' ? 'ADQUIRIR E-BOOK' : 'COMPRAR AGORA'}</> : 'LANÇAMENTO EM BREVE'}
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export const Catalog: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Se veio de um link específico, dar scroll suave até a seção
    if (location.state && (location.state as any).section) {
      const section = (location.state as any).section;
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location]);

  const planners = CATALOG_PRODUCTS.filter(p => p.category === 'planner');
  const ebooks = CATALOG_PRODUCTS.filter(p => p.category === 'ebook');

  return (
    <div className="bg-white dark:bg-athena-dark min-h-screen">
      {/* 1. HERO COMPACTO */}
      <header className="pt-24 pb-12 md:pt-32 md:pb-20 bg-athena-light dark:bg-slate-900/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={() => navigate('/servicos')}
            className="inline-flex items-center gap-2 text-athena-blue font-black text-xs uppercase tracking-widest mb-8 hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft size={16} /> Voltar para Serviços
          </button>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white font-heading leading-tight">
              Biblioteca <span className="text-athena-pink">Athena</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl font-medium">
              Aqui você encontra Planners e E-Books que vão ajudar você a conquistar o seus objetivos.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-athena-blue/5 to-transparent -z-0"></div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        
        {/* SEÇÃO 1: PLANNERS */}
        <section id="planners" className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-athena-blue/10 p-3 rounded-2xl text-athena-blue">
              <FileText size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-heading">Study Planners Essenciais</h2>
              <p className="text-slate-500 font-medium">Ferramentas de organização para aplicação imediata.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {planners.map((product) => (
              <ProductCard key={product.id} product={product} isAvailable={product.title !== 'Em Breve'} />
            ))}
          </div>
        </section>

        {/* SEÇÃO 2: E-BOOKS */}
        <section id="ebooks" className="scroll-mt-32 pb-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-athena-pink/10 p-3 rounded-2xl text-athena-pink">
              <BookOpen size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-heading">E-Books</h2>
              <p className="text-slate-500 font-medium">Conhecimento direto ao ponto para sua evolução.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {ebooks.map((product) => (
              <ProductCard key={product.id} product={product} isAvailable={product.title !== 'Em Breve'} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
