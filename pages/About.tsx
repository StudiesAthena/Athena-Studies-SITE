
import React from 'react';
import { Target, Heart, Award, ShieldCheck } from 'lucide-react';
import { CTAButton } from '../components/CTAButton';

export const About: React.FC = () => {
  return (
    <div className="space-y-24 py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading">Transformando o ato de aprender em uma jornada leve e organizada.</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            A Athena Studies nasceu da crença de que ninguém nasce "ruim" em matemática. O que falta é método, estratégia e um ambiente acolhedor.
          </p>
        </header>
      </div>

      {/* Story Section */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/athenabout/800/800" 
                alt="História da Athena Studies" 
                className="rounded-[3.5rem] shadow-2xl relative z-10"
              />
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-100 rounded-full -z-0"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full -z-0"></div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 font-heading">Nossa História</h2>
              <p className="text-slate-600 leading-relaxed">
                Fundada por educadores apaixonados por processos cognitivos e organização, a Athena Studies surgiu ao observarmos a ansiedade crescente em estudantes diante da matemática.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Percebemos que o problema não era a falta de inteligência, mas a falta de um plano. Decidimos criar uma iniciativa que não apenas ensinasse fórmulas, mas que ensinasse a estruturar o pensamento.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-700">500+</div>
                  <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Alunos Apoiados</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-pink-600">98%</div>
                  <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Aumento de Autonomia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 font-heading">Nossos Valores</h2>
          <p className="text-slate-600">O que nos guia em cada consultoria e material produzido.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { 
              title: "Clareza", 
              desc: "Linguagem simples para assuntos complexos.",
              icon: <Award className="w-8 h-8 text-blue-600" />
            },
            { 
              title: "Praticidade", 
              desc: "Foco no que gera resultado real hoje.",
              icon: <Target className="w-8 h-8 text-pink-600" />
            },
            { 
              title: "Acolhimento", 
              desc: "Zero julgamento, foco total no crescimento.",
              icon: <Heart className="w-8 h-8 text-indigo-600" />
            },
            { 
              title: "Segurança", 
              desc: "Construindo uma base sólida para o futuro.",
              icon: <ShieldCheck className="w-8 h-8 text-blue-700" />
            }
          ].map((val, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 text-center space-y-4 hover:border-blue-100 transition-colors shadow-sm">
              <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {val.icon}
              </div>
              <h3 className="font-bold text-slate-900">{val.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        <h2 className="text-3xl font-bold text-slate-900 font-heading">Vamos começar sua nova fase?</h2>
        <p className="text-slate-600 text-lg">
          Nossa equipe está pronta para te ouvir e desenhar a estratégia perfeita para o seu sucesso.
        </p>
        <CTAButton variant="secondary" className="px-12 py-5 text-xl">
          Organize seus estudos e ganhe autonomia
        </CTAButton>
      </section>
    </div>
  );
};
