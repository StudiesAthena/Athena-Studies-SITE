
import React, { useEffect } from 'react';
import { SERVICES, ATHENA_IG_DM_LINK, SPECIALIST_LINK } from '../constants';
import { CTAButton } from '../components/CTAButton';
import { Check, Sparkles, Target, HelpCircle } from 'lucide-react';

// IDs de imagens do Unsplash selecionadas para representar cada serviço de forma única e impactante
const SERVICE_IMAGES = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3', // Study Planner Personalizado (Mentoria/Consultoria próxima)
  'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b', // Study Planner Essencial (Organização/Planejamento clássico)
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644', // Aulas Particulares
  'https://images.unsplash.com/photo-1509228468518-180dd4864904', // Listas de Exercícios
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c', // E-Books
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa'  // Parthenon Planner (Tecnologia de ponta/Futurista)
];

export const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getButtonLabel = (id: string) => {
    switch (id) {
      case 'planner-personalizado': return 'QUERO UMA CONSULTORIA';
      case 'planner-essencial': return 'VER O CATÁLOGO';
      case 'aulas-particulares': return 'AGENDAR AULA';
      case 'listas-exercicios': return 'QUERO A MINHA';
      case 'ebooks': return 'VER A BIBLIOTECA';
      case 'parthenon-planner': return 'CONFERIR A PLATAFORMA';
      default: return 'SAIBA MAIS';
    }
  };

  const handleServiceAction = (id: string) => {
    let link = ATHENA_IG_DM_LINK;
    
    switch (id) {
      case 'planner-essencial':
        link = 'https://forms.gle/g8xymNJ423T7dxe88';
        break;
      case 'parthenon-planner':
        link = 'https://parthenonplanner.vercel.app/';
        break;
      // Os outros casos (planner-personalizado, aulas-particulares, listas-exercicios, ebooks) utilizam o link do Instagram DM
    }
    
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const faqItems = [
    {
      q: "Qual a diferença entre o Study Planner Personalizado e o Study Planner Essencial?",
      a: "O Study Planner Personalizado é desenvolvido sob medida a partir de consultorias individuais. Já o Study Planner Essencial é uma ferramenta pronta com método visual para organização imediata."
    },
    {
      q: "Qual serviço é mais indicado para mim?",
      a: "A escolha depende do seu momento atual. Se você precisa de orientação próxima e um plano feito sob medida, o Study Planner Personalizado é o mais indicado. Se já busca organização clara para aplicar de forma independente, o Study Planner Essencial pode ser o ponto de partida ideal."
    },
    {
      q: "Preciso ser bom em matemática para usar os materiais da Athena?",
      a: "Não. Os materiais e serviços da Athena são pensados justamente para quem sente dificuldade ou insegurança com matemática, além de atender também estudantes que desejam melhorar desempenho e estratégia de estudo."
    },
    {
      q: "Os Study Planners funcionam para qualquer rotina?",
      a: "Sim. Tanto o Planner Essencial quanto o Personalizado foram desenvolvidos para se adaptar à rotina real dos estudantes, considerando escola, trabalho, cursos e outras responsabilidades."
    },
    {
      q: "As aulas particulares são apenas para matemática?",
      a: "Atualmente, as aulas particulares têm foco principal em matemática, com atendimento para Ensino Fundamental, Médio, vestibulares e concursos, sempre priorizando clareza, base conceitual e resolução estratégica de problemas."
    },
    {
      q: "Posso usar os Study Planners sem acompanhamento?",
      a: "Sim. O Study Planner Essencial foi criado exatamente para uso independente, oferecendo estrutura visual e organização clara. Já o Planner Personalizado inclui acompanhamento para orientar a aplicação do método."
    },
    {
      q: "Os e-books são indicados para qual faixa etária?",
      a: "Os e-books da Athena são pensados para estudantes de diferentes idades, desde o Ensino Fundamental até o Superior, com linguagem acessível e foco em estratégias de estudo e fundamentos da matemática."
    },
    {
      q: "O Parthenon Planner substitui os Study Planners?",
      a: "Não. O Parthenon Planner é um ecossistema mais completo, indicado para estudantes que buscam alto nível de organização e gestão acadêmica. Já os Study Planners são ferramentas mais diretas e objetivas, ideais para organização individual e aplicação imediata."
    },
    {
      q: "A Athena é indicada apenas para estudantes com dificuldades?",
      a: "Não. A Athena atende tanto estudantes que enfrentam dificuldades quanto aqueles que desejam melhorar desempenho, organização e autonomia nos estudos, independentemente do nível atual."
    },
    {
      q: "Os serviços da Athena funcionam para quem tem pouco tempo para estudar?",
      a: "Sim. Todos os produtos e serviços são pensados para rotinas reais, com foco em priorização, organização e uso inteligente do tempo disponível, mesmo quando ele é limitado."
    },
    {
      q: "Preciso usar todos os serviços para ter resultados?",
      a: "Não. Cada serviço funciona de forma independente. O estudante pode escolher apenas o que faz mais sentido para seu momento atual e evoluir aos poucos, conforme suas necessidades."
    },
    {
      q: "Em quanto tempo consigo perceber melhorias na organização dos estudos?",
      a: "Muitos estudantes relatam mais clareza e controle da rotina logo nos primeiros dias de uso dos planners ou após as primeiras orientações, especialmente na redução da sensação de desorganização."
    },
    {
      q: "Os materiais da Athena substituem aulas regulares da escola ou cursinho?",
      a: "Não. A proposta da Athena é complementar o ensino formal, oferecendo organização, estratégia e suporte para potencializar o aprendizado adquirido na escola ou cursinho."
    },
    {
      q: "Posso usar os Study Planners junto com aulas particulares?",
      a: "Sim. Inclusive, essa combinação costuma potencializar os resultados, pois une organização estratégica com acompanhamento e esclarecimento de dúvidas."
    },
    {
      q: "Os conteúdos são adaptados para diferentes níveis de ensino?",
      a: "Sim. A Athena atende estudantes do Ensino Fundamental, Médio, vestibulandos e concurseiros, respeitando as particularidades de cada fase."
    },
    {
      q: "Os serviços da Athena ajudam apenas em matemática?",
      a: "Apesar do foco em matemática, as estratégias de organização, planejamento e estudo propostas pela Athena podem ser aplicadas a qualquer disciplina."
    },
    {
      q: "Como sei se estou escolhendo o serviço certo para meu momento?",
      a: "Caso tenha dúvidas, a Athena oferece orientação inicial para ajudar você a entender seu ponto de partida e escolher a solução mais adequada aos seus objetivos."
    },
    {
      q: "Qual o prazo de entrega dos Planners?",
      a: "Os Planners Essenciais têm acesso imediato após a confirmação. O modelo Personalizado leva até 5 dias úteis para ser finalizado após o diagnóstico."
    },
    {
      q: "As aulas particulares são gravadas?",
      a: "Sim! Todas as nossas sessões online são gravadas para que você possa revisitar as explicações e resoluções sempre que precisar."
    },
    {
      q: "Posso mudar de serviço depois?",
      a: "Com certeza. Nossa jornada é flexível e acompanhamos sua evolução. Você pode migrar entre soluções conforme sua autonomia e necessidades mudarem."
    }
  ];

  return (
    <div className="bg-white dark:bg-athena-dark min-h-screen">
      {/* 1. HERO SERVICES */}
      <header className="pt-24 pb-10 md:pt-32 md:pb-16 bg-athena-light dark:bg-slate-900/40 relative overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-athena-blue/10 dark:bg-athena-blue/20 text-athena-blue px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] border border-athena-blue/10">
            <Sparkles size={14} /> Soluções Educacionais
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white font-heading leading-tight">
            <span className="text-athena-blue">Soluções</span> em <span className="text-athena-pink">estudo</span> e <span className="text-athena-pink">organização</span>.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed opacity-90">
            Cada ferramenta da Athena foi desenhada para ajudar você a organizar seus estudos com clareza, estratégia e autonomia, transformando sua rotina acadêmica.
          </p>
        </div>
      </header>

      {/* 2. DETAILED SERVICES LIST */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-20">
          {SERVICES.map((service, idx) => {
            const isPremium = service.isPremium;
            const isEven = idx % 2 === 0;

            return (
              <div key={service.id} className="group border-b border-slate-100 dark:border-slate-800 pb-16 last:border-0 flex flex-col">
                
                {/* Header Content Block: Image (38%) & Text (62%) */}
                <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mb-8 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Visual Image - Compacto (38%) */}
                  <div className="w-full lg:w-[38%] flex-shrink-0">
                    <div className={`relative rounded-[2.5rem] overflow-hidden shadow-lg transition-all duration-700 group-hover:scale-[1.01] border-[3px] ${isPremium ? 'border-[#AF8F2C] shadow-[0_0_30px_rgba(175,143,44,0.15)]' : 'border-slate-50 dark:border-slate-800'}`}>
                      <img 
                        src={`${SERVICE_IMAGES[idx]}?auto=format&fit=crop&q=80&w=1000`} 
                        className="w-full aspect-[16/11] object-cover" 
                        alt={service.title}
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur shadow-md">
                        <div className={`${isPremium ? 'text-[#AF8F2C]' : 'text-athena-blue'}`}>
                          {React.cloneElement(service.icon as React.ReactElement<any>, { size: 24 })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text Content Block */}
                  <div className="flex-1 space-y-6">
                    <div className="space-y-3">
                      {isPremium && (
                        <span className="inline-block bg-[#AF8F2C] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm animate-pulse">
                          Premium Elite
                        </span>
                      )}
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white font-heading leading-tight">
                        {service.title}
                      </h2>
                      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic opacity-90">
                        {service.description}
                      </p>
                    </div>

                    {/* Benefícios em lista compacta */}
                    <div className="flex flex-col gap-3 max-w-lg">
                      {service.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-4 py-2.5 px-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/40 border border-transparent hover:border-athena-blue/10 transition-all">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${isPremium ? 'bg-[#AF8F2C]/10 text-[#AF8F2C]' : 'bg-athena-blue/10 text-athena-blue'}`}>
                            <Check size={14} />
                          </div>
                          <span className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-200 leading-tight">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card "Esse produto é pra mim?" - Integrado e Compacto */}
                <div className={`w-full p-6 md:p-8 rounded-[3rem] border-[3px] bg-slate-50/50 dark:bg-slate-900/30 border-athena-blue/5 shadow-sm transition-all duration-500 hover:border-athena-pink/10 ${isPremium ? 'ring-1 ring-[#AF8F2C]/5' : ''}`}>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    
                    {/* Texto Informativo */}
                    <div className="flex items-center gap-5 flex-1">
                      <div className="bg-white dark:bg-slate-800 p-3.5 rounded-3xl text-athena-pink shadow-sm flex-shrink-0">
                        <Target size={24} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-[10px] font-black font-heading text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em]">Público-alvo</h3>
                        <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed opacity-90">
                          {service.forMe}
                        </p>
                      </div>
                    </div>

                    {/* Botão de Ação Dentro do Card */}
                    <div className="w-full md:w-auto flex-shrink-0">
                      <CTAButton 
                        variant={isPremium ? 'gold' : 'secondary'} 
                        className="w-full md:px-10 md:py-4 text-xs uppercase tracking-widest font-black shadow-lg"
                        onClick={() => handleServiceAction(service.id)}
                      >
                        {getButtonLabel(service.id)}
                      </CTAButton>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <div className="bg-athena-blue/10 dark:bg-athena-blue/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 text-athena-blue">
              <HelpCircle size={32} />
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white font-heading">Perguntas Frequentes</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic text-lg max-w-2xl mx-auto">Tudo o que você precisa saber para transformar sua jornada educacional.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, i) => (
              <div 
                key={i} 
                className="group p-8 rounded-[2.5rem] bg-white dark:bg-athena-dark border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 hover:border-athena-blue/10"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="bg-athena-blue/10 dark:bg-athena-blue/20 text-athena-blue text-[10px] font-black w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      {i + 1}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight group-hover:text-athena-blue transition-colors">
                      {item.q}
                    </h4>
                  </div>
                  <p className="text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed pl-10 border-l border-slate-100 dark:border-slate-800">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-athena-light dark:bg-slate-900/40 p-10 rounded-[3rem] border border-athena-blue/5 text-center">
            <p className="text-slate-600 dark:text-slate-300 font-bold mb-6">Ainda tem dúvidas sobre qual o melhor caminho?</p>
            <CTAButton 
              variant="outline" 
              className="px-10 py-4 text-xs font-black uppercase tracking-widest"
              onClick={() => window.open(SPECIALIST_LINK, '_blank')}
            >
              FALAR COM UM ESPECIALISTA
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
};
