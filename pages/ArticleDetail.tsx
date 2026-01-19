
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Article } from '../types';
import { Loader2, Calendar, User, Clock, ArrowLeft, BookOpen, Tag } from 'lucide-react';
import { CTAButton } from '../components/CTAButton';
import { SPECIALIST_LINK } from '../constants';

export const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      fetchArticle(id);
    }
  }, [id]);

  const fetchArticle = async (articleId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', articleId)
        .single();

      if (error) throw error;

      if (data) {
        setArticle({
          id: data.id,
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          date: data.date || new Date(data.created_at).toLocaleDateString('pt-BR'),
          category: data.category,
          imageUrl: data.image_url || data.imageUrl
        });
      }
    } catch (err: any) {
      console.error('Erro ao buscar artigo:', err.message);
      navigate('/blog');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-athena-dark">
        <Loader2 className="w-12 h-12 text-athena-blue animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Preparando sua leitura...</p>
      </div>
    );
  }

  if (!article) return null;

  // Função para processar conteúdo se não for HTML puro (preservar quebras de linha básicas)
  const formatContent = (content: string) => {
    if (content.includes('<') && content.includes('>')) return content;
    return content.split('\n').map(line => line.trim() ? `<p>${line}</p>` : '').join('');
  };

  const handleTagClick = (tag: string) => {
    navigate('/blog', { state: { category: tag.trim() } });
  };

  return (
    <div className="bg-white dark:bg-athena-dark min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative w-full aspect-[21/9] md:aspect-[21/7] overflow-hidden">
        <img src={article.imageUrl} className="w-full h-full object-cover" alt={article.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-athena-dark via-athena-dark/40 to-transparent"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
            <div className="space-y-6 max-w-4xl">
              <button 
                onClick={() => navigate('/blog')}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors mb-4"
              >
                <ArrowLeft size={18} /> Voltar para o Blog
              </button>
              <div className="flex flex-wrap items-center gap-3">
                {article.category.split(',').map((cat, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleTagClick(cat)}
                    className="bg-athena-blue text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-white hover:text-athena-blue transition-all"
                  >
                    {cat.trim()}
                  </button>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white font-heading leading-[1.1]">
                {article.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Article */}
          <article className="lg:col-span-8 space-y-12">
            <div className="flex flex-wrap items-center gap-8 text-slate-400 font-bold text-sm border-b border-slate-100 dark:border-slate-800 pb-8">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-athena-blue" /> 
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} /> 
                <span>8 min de leitura</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} /> 
                <span>Equipe Athena</span>
              </div>
            </div>

            <div className="prose prose-xl dark:prose-invert max-w-none">
              <p className="text-2xl font-semibold text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-8 border-athena-pink pl-8 mb-12">
                {article.excerpt}
              </p>
              
              <div 
                className="text-slate-700 dark:text-slate-400 leading-relaxed space-y-8 text-xl font-medium article-content"
                dangerouslySetInnerHTML={{ __html: formatContent(article.content || '') }}
              />
            </div>

            {/* Post Footer CTA */}
            <div className="bg-athena-light dark:bg-slate-900/40 p-12 rounded-[3.5rem] border-2 border-slate-100 dark:border-slate-800 text-center space-y-8 mt-16 shadow-lg">
              <div className="bg-white dark:bg-slate-800 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-sm text-athena-blue">
                <BookOpen size={40} />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold font-heading text-athena-dark dark:text-white">Gostou deste conteúdo?</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto">
                  A Athena Studies oferece ferramentas personalizadas para que você nunca mais se sinta perdido nos estudos.
                </p>
              </div>
              <CTAButton variant="primary" onClick={() => navigate('/servicos')}>
                CONHECER NOSSAS SOLUÇÕES
              </CTAButton>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-10 sticky top-28 self-start">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-6">
              <div className="bg-athena-blue/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto text-athena-blue">
                <User size={36} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">Time Athena Studies</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-relaxed uppercase tracking-widest px-4">
                  EDUCADORES APAIXONADOS PELA MATEMÁTICA, COM FOCO NA TRANSFORMAÇÃO DO SEU FUTURO.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-50 dark:border-slate-800">
                <CTAButton 
                  variant="outline" 
                  className="w-full text-[10px] py-4"
                  onClick={() => window.open(SPECIALIST_LINK, '_blank')}
                >
                  FALAR COM UM ESPECIALISTA
                </CTAButton>
              </div>
            </div>

            <div className="bg-athena-pink p-10 rounded-[3rem] text-white shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <Tag size={20} />
                <h3 className="text-xl font-bold font-heading">Tags do Artigo</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.category.split(',').map((cat, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleTagClick(cat)}
                    className="bg-white/20 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-athena-pink transition-all"
                  >
                    {cat.trim()}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
