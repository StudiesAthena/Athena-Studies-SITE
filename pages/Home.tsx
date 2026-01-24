
import React, { useState, useEffect } from 'react';
/* Added CheckCircle2 to the imports from lucide-react */
import { ArrowRight, Calendar as LucideCalendar, Loader2, Hash, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CTAButton } from '../components/CTAButton';
import { SERVICES, PILARES } from '../constants';
import { supabase } from '../lib/supabase';
import { Article } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    fetchLatestArticles();
  }, []);

  const fetchLatestArticles = async () => {
    try {
      setLoadingArticles(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Erro Supabase (Home):', error.message || error);
        throw error;
      }
      
      if (data) {
        setLatestArticles(data.map(item => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt,
          content: item.content,
          date: item.date || new Date(item.created_at).toLocaleDateString('pt-BR'),
          category: item.category,
          imageUrl: item.image_url || item.imageUrl
        })));
      }
    } catch (err: any) {
      console.error('Erro detalhado capturado na Home:', err.message || err);
    } finally {
      setLoadingArticles(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      
      {/* 1. SECTION: INÍCIO (Hero 50/50) */}
      <section id="inicio" className="relative pt-24 pb-24 lg:pt-36 lg:pb-48 bg-athena-light dark:bg-slate-900/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-10 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-athena-dark dark:text-white leading-[1.1] font-heading tracking-tight">
              Tornando dificuldades em <span className="text-athena-blue">soluções</span> para seus <span className="text-athena-pink">estudos</span>.
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Organize seus estudos e ganhe autonomia com um método estratégico desenhado para transformar sua rotina acadêmica.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <CTAButton 
                variant="secondary" 
                className="text-lg px-12 py-5 shadow-2xl shadow-athena-pink/30"
                onClick={() => scrollToSection('servicos')}
              >
                Comece Agora
              </CTAButton>
              <CTAButton 
                variant="primary" 
                className="text-lg px-12 py-5 shadow-2xl shadow-athena-blue/30"
                onClick={() => scrollToSection('sobre')}
              >
                Nossos Pilares
              </CTAButton>
            </div>
          </div>
          <div className="relative group">
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-[5px] border-white dark:border-slate-700 transition-all duration-500 group-hover:scale-[1.01]">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-auto object-cover aspect-[4/5] lg:h-[620px]" 
                alt="Athena Studies Hero" 
              />
            </div>
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-athena-blue/20 rounded-full blur-[110px] -z-10 animate-pulse"></div>
            <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-athena-pink/20 rounded-full blur-[110px] -z-10 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: BLOG (Artigos do Banco) */}
      <section id="blog" className="py-28 bg-white dark:bg-athena-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-5">
            <h2 className="text-4xl md:text-5xl font-bold text-athena-dark dark:text-white font-heading">Artigos da Athena</h2>
            <p className="text-xl text-slate-700 dark:text-slate-300 font-medium opacity-90 max-w-2xl mx-auto">Guias, textos e dicas práticas publicadas pela nossa equipe.</p>
          </div>

          {loadingArticles ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-athena-blue" size={40} /></div>
          ) : latestArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {latestArticles.map((article) => (
                <article key={article.id} onClick={() => navigate(`/blog/${article.id}`)} className="cursor-pointer group flex flex-col bg-slate-50 dark:bg-slate-900/50 rounded-[3.5rem] border-[2.5px] border-slate-100 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full">
                  <div className="aspect-[16/10] overflow-hidden relative flex-shrink-0">
                    <img src={article.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={article.title} />
                    <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                      {article.category.split(',').map((cat, i) => (
                        <button 
                          key={i} 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/blog', { state: { category: cat.trim() } });
                          }}
                          className="bg-white/95 text-athena-blue px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-athena-blue hover:text-white transition-colors"
                        >
                          <Hash size={10} className="inline mr-1"/>{cat.trim()}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-10 space-y-5 flex-grow flex flex-col">
                    <div className="flex items-center gap-5 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                      <div className="flex items-center gap-2"><LucideCalendar size={16} className="text-athena-blue"/> {article.date}</div>
                    </div>
                    <h3 className="text-2xl font-bold font-heading leading-tight group-hover:text-athena-blue transition-colors min-h-[4rem] flex items-center">
                      {article.title}
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 text-base font-medium line-clamp-2 leading-relaxed opacity-90">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-athena-blue text-white flex items-center justify-center font-black text-[11px]">A</div>
                        <span className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter">Equipe Athena</span>
                      </div>
                      <ArrowRight size={22} className="text-athena-pink transition-all group-hover:translate-x-2" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[3.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 font-bold">Nenhum artigo publicado ainda. Fique atento!</p>
            </div>
          )}
          
          <div className="mt-16 text-center">
            <CTAButton variant="outline" onClick={() => navigate('/blog')}>
              VER TODOS OS ARTIGOS
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 3. SECTION: SOBRE (Pilares Coloridos) */}
      <section id="sobre" className="py-28 bg-athena-light dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-5">
            <h2 className="text-4xl md:text-5xl font-bold text-athena-dark dark:text-white font-heading">Nossos Pilares</h2>
            <p className="text-xl text-slate-700 dark:text-slate-300 font-medium max-w-2xl mx-auto">
              Como ajudamos você a organizar seus estudos e ganhar autonomia real.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {PILARES.map((pilar, idx) => (
              <div key={idx} className={`p-12 rounded-[4rem] border-[3px] transition-all hover:-translate-y-3 shadow-lg hover:shadow-2xl flex flex-col ${pilar.bg} ${pilar.border}`}>
                <div className={`${pilar.color} mb-8 transform scale-125 origin-left flex-shrink-0`}>
                  {pilar.icon}
                </div>
                <h3 className="text-2xl font-bold mb-5 font-heading text-slate-900 dark:text-white leading-tight min-h-[4.5rem] flex items-center">
                  {pilar.title}
                </h3>
                <p className="text-slate-800 dark:text-slate-200 font-semibold leading-relaxed text-base opacity-90">
                  {pilar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION: SERVIÇOS (Redirecionamento para Página de Detalhamento) */}
      <section id="servicos" className="py-28 bg-white dark:bg-athena-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-5">
            <h2 className="text-4xl md:text-5xl font-bold text-athena-dark dark:text-white font-heading uppercase tracking-widest text-center">Nossos Serviços</h2>
            <p className="text-xl text-slate-700 dark:text-slate-300 font-medium text-center">Benefícios pensados para cada etapa da sua jornada.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {SERVICES.map((service) => {
              const isParthenon = service.id === 'parthenon-planner';
              const isPersonalized = service.id === 'planner-personalizado';

              let btnVariant: 'primary' | 'secondary' | 'outline' = 'primary';
              let btnText = "SABER MAIS";
              let btnExtraClass = "";

              if (isPersonalized) {
                btnVariant = 'secondary';
                btnText = "Diagnóstico Inicial Gratuito";
              } else if (isParthenon) {
                btnText = "CONHECER A PLATAFORMA";
                btnExtraClass = "!bg-[#AF8F2C] hover:!bg-[#8C7123] border-none shadow-2xl shadow-gold/40 transition-all duration-300";
              }

              const handleAction = () => {
                if (isParthenon) {
                  window.open('https://parthenonplanner.vercel.app/', '_blank', 'noopener,noreferrer');
                } else {
                  navigate('/servicos');
                }
              };

              const cardBaseStyles = isParthenon 
                ? 'bg-slate-950 dark:bg-slate-950 border-[#AF8F2C] ring-[8px] ring-[#AF8F2C]/5 scale-[1.03] z-10' 
                : 'bg-white dark:bg-athena-dark border-slate-100 dark:border-slate-800';
              
              const titleColor = isParthenon 
                ? 'text-[#C5A059]' 
                : 'text-slate-900 dark:text-white';
                
              const descColor = isParthenon 
                ? 'text-slate-300' 
                : 'text-slate-700 dark:text-slate-300';
                
              const benefitColor = isParthenon 
                ? 'text-white' 
                : 'text-slate-800 dark:text-slate-200';

              return (
                <div 
                  key={service.id} 
                  className={`group relative p-10 lg:p-12 rounded-[4.5rem] border-[3px] transition-all flex flex-col h-full shadow-xl hover:shadow-2xl ${cardBaseStyles}`}
                >
                  {service.isPremium && (
                    <div className={`absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl border-2 border-white/20 whitespace-nowrap ${
                      isParthenon ? 'bg-[#AF8F2C] text-white' : 'bg-athena-pink text-white'
                    }`}>
                      {isParthenon ? 'PLATAFORMA ELITE' : 'Premium Gold'}
                    </div>
                  )}
                  
                  <div className="flex flex-col flex-grow">
                    <h3 className={`text-2xl lg:text-3xl font-bold font-heading mb-2 tracking-tight flex items-start ${titleColor}`}>
                      {service.title}
                    </h3>

                    {service.startingPrice && (
                      <div className={`text-sm font-black mb-6 uppercase tracking-wider ${isParthenon ? 'text-[#AF8F2C]' : 'text-athena-pink'}`}>
                        {service.startingPrice}
                      </div>
                    )}
                    
                    <p className={`mb-8 leading-relaxed font-semibold text-base opacity-90 min-h-[6.5rem] ${descColor}`}>
                      {service.description}
                    </p>
                    
                    <div className="space-y-4 mb-10 mt-auto">
                      {service.benefits.map((benefit, i) => (
                        <div key={i} className={`flex items-start text-sm lg:text-base font-bold gap-4 ${benefitColor}`}>
                          <CheckCircle2 size={20} className={`flex-shrink-0 mt-0.5 ${service.isPremium ? "text-[#AF8F2C]" : "text-athena-blue"}`} /> 
                          <span className="leading-tight">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <CTAButton 
                    variant={btnVariant} 
                    className={`w-full py-5 text-[13px] uppercase tracking-[0.2em] font-black mt-4 ${btnExtraClass}`}
                    onClick={handleAction}
                  >
                    {btnText}
                  </CTAButton>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};
