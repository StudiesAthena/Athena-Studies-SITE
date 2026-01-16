
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Tag, Calendar as LucideCalendar, User, ArrowUpDown, Filter, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CTAButton } from '../components/CTAButton';
import { supabase } from '../lib/supabase';
import { Article } from '../types';
import { SPECIALIST_LINK } from '../constants';

export const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tudo');
  const [sortBy, setSortBy] = useState<'recent' | 'title'>('recent');
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro Supabase (Blog):', error.message);
        throw error;
      }
      
      if (data) {
        const formattedArticles: Article[] = data.map(item => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt,
          content: item.content,
          date: item.date || new Date(item.created_at).toLocaleDateString('pt-BR'),
          category: item.category,
          imageUrl: item.image_url || item.imageUrl
        }));
        setArticles(formattedArticles);
      }
    } catch (err: any) {
      console.error('Erro capturado no Blog:', err.message || err);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = useMemo(() => {
    const cats = ['Tudo', ...new Set(articles.map(a => a.category))];
    return cats;
  }, [articles]);

  const filteredArticles = useMemo(() => {
    let result = [...articles].filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Tudo' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      result.sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-')).getTime();
        const dateB = new Date(b.date.split('/').reverse().join('-')).getTime();
        return dateB - dateA;
      });
    }

    return result;
  }, [searchTerm, selectedCategory, sortBy, articles]);

  return (
    <div className="py-20 bg-slate-50 dark:bg-athena-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-athena-dark dark:text-white font-heading">Artigos da Athena</h1>
            <p className="text-slate-600 dark:text-slate-400 font-medium italic">Guias, textos e dicas práticas publicadas pela nossa equipe.</p>
          </div>
          <div className="relative w-full md:w-96 group">
            <input 
              type="text" 
              placeholder="Pesquise por temas ou matérias..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full py-4 px-12 focus:outline-none focus:ring-2 focus:ring-athena-blue shadow-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-athena-blue w-5 h-5 transition-colors" />
          </div>
        </header>

        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
            <Filter size={18} className="text-slate-400 hidden md:block" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                  ? 'bg-athena-blue text-white shadow-md' 
                  : 'bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800 hover:border-athena-blue'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <ArrowUpDown size={18} className="text-slate-400" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'title')}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 px-4 text-sm font-bold text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-athena-blue"
            >
              <option value="recent">Mais Recentes</option>
              <option value="title">Ordem Alfabética</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-athena-blue animate-spin mb-4" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Carregando conhecimento...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredArticles.map((article) => (
                    <article 
                      key={article.id} 
                      onClick={() => navigate(`/blog/${article.id}`)}
                      className="cursor-pointer bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col h-full border border-slate-100 dark:border-slate-800 group"
                    >
                      <div className="relative overflow-hidden aspect-video">
                        <img src={article.imageUrl} alt={article.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute top-4 left-4">
                          <span className="flex items-center space-x-2 text-[10px] font-black text-athena-blue bg-white/95 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                            <Tag className="w-3 h-3" />
                            <span>{article.category}</span>
                          </span>
                        </div>
                      </div>
                      <div className="p-8 flex-grow flex flex-col space-y-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-athena-blue transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="pt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-800">
                          <div className="flex items-center space-x-2 text-xs text-slate-400">
                            <LucideCalendar className="w-3 h-3" />
                            <span>{article.date}</span>
                          </div>
                          <button 
                            className="text-athena-pink text-sm font-black hover:translate-x-1 transition-transform uppercase tracking-widest"
                          >
                            LER ARTIGO →
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3.5rem] border border-dashed border-slate-200 dark:border-slate-800">
                  <Search size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500 font-bold">Ainda não temos artigos para esta busca.</p>
                  <button onClick={() => {setSearchTerm(''); setSelectedCategory('Tudo');}} className="mt-4 text-athena-blue font-black underline">Limpar filtros</button>
                </div>
              )}
            </div>

            <aside className="space-y-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-4">
                <div className="bg-athena-blue/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <User className="text-athena-blue w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white font-heading">Time Athena Studies</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-relaxed uppercase tracking-tighter">
                  EDUCADORES APAIXONADOS PELA MATEMÁTICA, COM FOCO NA TRANSFORMAÇÃO DO SEU FUTURO.
                </p>
              </div>

              <div className="bg-athena-blue p-8 rounded-[3rem] text-white shadow-xl text-center space-y-6">
                <h3 className="text-xl font-bold font-heading">Precisa de Ajuda?</h3>
                <p className="text-slate-200 text-sm font-medium">Nossos especialistas estão prontos para guiar sua jornada de estudos.</p>
                <CTAButton 
                  variant="secondary" 
                  className="w-full py-4 text-[10px]"
                  onClick={() => window.open(SPECIALIST_LINK, '_blank')}
                >
                  FALAR COM UM ESPECIALISTA
                </CTAButton>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};
