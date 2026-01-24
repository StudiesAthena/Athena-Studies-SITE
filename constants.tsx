
import React from 'react';
import { BookOpen, Calendar, GraduationCap, Crown, Target, Zap, Compass, FileText, ClipboardList } from 'lucide-react';
import { Service, Article, Product } from './types';

export const COLORS = {
  primary: '#0a6783', 
  secondary: '#fe5749', 
  gold: '#AF8F2C', 
};

export const ATHENA_IG_DM_LINK = "https://l.instagram.com/?u=https%3A%2F%2Fig.me%2Fm%2Fstudiesathena%3Ffbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGneBVfuhlkAWpzdFByYe2RwxSh2SUn9KGCaNt6FbtaHeNlmub5TzHysM2CQy4_aem_v5YRakaVMrNl7JP31bIbkg&e=AT0DhUEA9Jaq-slurCzORDczlIU76hYaukRQ6JrZhMlVJUfUhaTzeawNU0hT6UNSlj1sOzjObUUtbpkxyaxzFBq0j-ETL_fMQ9v2ve3IMw";
export const SPECIALIST_LINK = "https://l.instagram.com/?u=https%3A%2F%2Fig.me%2Fm%2Fstudiesathena%3Ffbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnkjc2PGR4DR)m9x5y-vJwAsZC7TiyCuxCS-xORGvhtfMzQmYTM_Ve16nPR5wY_aem_1QNCbxmaM-41KmANSZ9_yQ&e=AT2PLdjEr-nnEYD1pM7pka6otijsTjXAcZYjDRuUjUmeQpkRG5xzUZeIpKhWjmnYutS-KZUSVdg7Z0-qsJpugr94r4iL4aRAk_D7qkUCBg";

export const CATALOG_PRODUCTS: Product[] = [
  // Planners
  {
    id: 'p1',
    title: 'Study Planner: New Beginning',
    description: 'Uma ferramenta pronta fundamental para quem precisa de um norte imediato na organização dos estudos diários de matemática. O Study Planner: New Beginning é o material perfeito para quem não estuda a muito tempo e quer recomeçar, ou que sente que a base matemática do Ensino Fundamental está insuficiente. Nele você ter organização do mês inicial de estudos, sugestão de material, revisão semanal, exercícios sugeridos, em um design intuitivo e ordenado de uma forma fácil de compreender os conteúdos.',
    price: '12,90',
    images: [
      'https://i.imgur.com/lMCGpYK.png',
      'https://i.imgur.com/LK0oHjo.png',
      'https://i.imgur.com/OBpQfda.png',
      'https://i.imgur.com/WNJELur.png'
    ],
    category: 'planner',
    buyLink: 'https://buy.stripe.com/3cIbJ1eHi5AAfoUfoedQQ00'
  },
  {
    id: 'p2',
    title: 'Em Breve',
    description: 'Em Breve',
    price: '---',
    images: ['https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600'],
    category: 'planner',
    buyLink: '#'
  },
  {
    id: 'p3',
    title: 'Em Breve',
    description: 'Em Breve',
    price: '---',
    images: ['https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600'],
    category: 'planner',
    buyLink: '#'
  },
  // E-books
  {
    id: 'e1',
    title: 'Em Breve',
    description: 'Em Breve',
    price: '---',
    images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600'],
    category: 'ebook',
    buyLink: '#'
  },
  {
    id: 'e2',
    title: 'Em Breve',
    description: 'Em Breve',
    price: '---',
    images: ['https://images.unsplash.com/photo-1512411508733-d4fa93b3a4a7?auto=format&fit=crop&q=80&w=600'],
    category: 'ebook',
    buyLink: '#'
  },
  {
    id: 'e3',
    title: 'Em Breve',
    description: 'Em Breve',
    price: '---',
    images: ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600'],
    category: 'ebook',
    buyLink: '#'
  }
];

export const SERVICES: (Service & { isPremium?: boolean; benefits: string[]; forMe: string; startingPrice?: string })[] = [
  {
    id: 'planner-personalizado',
    title: 'Study Planner Personalizado',
    description: 'Um cronograma detalhado com diagnóstico personalizado mediante consultoria para identificar seus pontos de melhoria e criar um plano de ação estratégico.',
    icon: <Calendar className="w-6 h-6" />,
    category: 'produto',
    benefits: ['Suporte personalizado', 'Estratégia adaptada', 'Material exclusivo'],
    startingPrice: 'A partir de R$ 69,90',
    forMe: 'Ideal para estudantes que sentem dificuldade em organizar sua rotina, gerenciar seu tempo e definir uma estratégia de estudos. Nossos Study Planners traçam um plano de ação claro e um roteiro objective. Se você quer parar de se sentir perdido e performar nos seus estudos, este é o seu ponto de partida.'
  },
  {
    id: 'planner-essencial',
    title: 'Study Planner Essencial',
    description: 'Uma ferramenta pronta fundamental para quem precisa de um norte imediato na organização dos estudos diários. Entrega em até 24h após identificação do pagamento.',
    icon: <FileText className="w-6 h-6" />,
    category: 'produto',
    benefits: ['Pronto para uso', 'Organização e estrutura mensal', 'Material exclusivo'],
    startingPrice: 'A partir de R$ 12,90',
    forMe: 'Perfeito para estudantes estão em busca de mais disciplina, e querem começar de um ponto de partida pronto. Os Planners Essenciais entregam um método visual para organizar horários e tarefas sem complicação.'
  },
  {
    id: 'aulas-particulares',
    title: 'Aulas Particulares',
    description: 'Ensino individualizado com foco em clareza e performance, para você atingir os seus objetivos.',
    icon: <GraduationCap className="w-6 h-6" />,
    category: 'aula',
    benefits: ['Resolução de dúvidas', 'Material de apoio', 'Flexibilidade de horário'],
    startingPrice: 'A partir de R$ 79,90',
    forMe: 'Para quem precisa de um suporte individual e especializado para sanar em tempo real suas dúvidas e buscar aquela aprovação. Nossas aulas são para quem precisa de um apoio nos estudos ou sente que a base matemática está frágil. Atendemos Ensino Fundamental, Médio e provas de vestibulares e concurso público.'
  },
  {
    id: 'listas-exercicios',
    title: 'Listas de Exercícios',
    description: 'Seleção estratégica de questões de matemática separadas por nível de dificuldade e recorrência em provas. Escolha a quantidade de questões e os conteúdos.',
    icon: <ClipboardList className="w-6 h-6" />,
    category: 'produto',
    benefits: ['Gabarito comentado', 'Dicas de resolução', 'Foco no seu objetivo'],
    startingPrice: 'A partir de R$ 9,90',
    forMe: 'Essencial para vestibulandos, concurseiros e alunos do Ensino Fundamental e Médio em fase de provas. Treine suas estratégias resolvendo questões que realmente caem, com o suporte de gabaritos explicativos.'
  },
  {
    id: 'ebooks',
    title: 'E-Books',
    description: 'Materiais digitais sobre estratégias de estudo, técnicas e fundamentos da matemática. Entrega em até 24h após identificação do pagamento.',
    icon: <BookOpen className="w-6 h-6" />,
    category: 'produto',
    benefits: ['Acesso imediato', 'Leitura descomplicada', 'Material exclusivo'],
    startingPrice: 'A partir de R$ 12,90',
    forMe: 'Para o estudante curioso e que quer aprender técnicas de estudo, melhorando a eficiência e desempenho. Uma leitura leve para qualquer idade.'
  },
  {
    id: 'parthenon-planner',
    title: 'Parthenon Planner',
    description: 'O topo da estratégia educacional. Um ecossistema completo com ferramentas exclusivas e design superior.',
    icon: <Crown className="w-8 h-8" />,
    category: 'produto',
    isPremium: true,
    benefits: [
      'Agenda estratégica, funcional e completa',
      'Integração entre outros professores e alunos',
      'Estatística em Insights, Relatórios e Progresso'
    ],
    forMe: 'O nível máximo de organização para estudantes de alta performance no Ensino Fundamental, Médio e Superior, vestibulandos e concurseiros. Para quem não aceita menos que a excellence e quer um sistema completo de gestão de vida acadêmica.'
  }
];

export const PILARES = [
  {
    title: "Foco e Estratégia",
    desc: "Direcionamos sua energia para o que realmente faz sentido, garantindo que você organize seus estudos com máxima autonomia.",
    icon: <Target className="w-8 h-8" />,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-100 dark:border-emerald-900/30"
  },
  {
    title: "Disciplina",
    desc: "Construção de hábitos sólidos através de rotinas sustentáveis e adaptadas, que transformam seu esforço em performance.",
    icon: <Zap className="w-8 h-8" />,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-100 dark:border-purple-900/30"
  },
  {
    title: "Autonomia",
    desc: "Ajudamos você a aprender sozinho, construindo a base para que você ganhe autonomia definitiva sobre seu futuro.",
    icon: <GraduationCap className="w-8 h-8" />,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-100 dark:border-orange-900/30"
  },
  {
    title: "Direcionamento Personalizado",
    desc: "Criamos estratégias de estudo únicas e individuais que respeitam seu perfil e sua rotina, com foco nos seus objetivos, juntando esforço, desempenho e resultado.",
    icon: <Compass className="w-8 h-8" />,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-100 dark:border-amber-900/30"
  }
];

export const LATEST_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Como vencer o medo da Matemática de uma vez por todas',
    excerpt: 'A matemática não é um bicho de sete cabeças. O segredo está em como você estrutura o seu raciocínio básico.',
    date: '15 Mai 2024',
    category: 'Mentalidade',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'A técnica de estudo que vai te dar 2h extras por dia',
    excerpt: 'Organização não é sobre trabalhar mais, mas sobre trabalhar melhor com blocos estratégicos de tempo.',
    date: '10 Mai 2024',
    category: 'Organização',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Cronograma para o ENEM: O que focar em matemática?',
    excerpt: 'Descubra os assuntos mais recorrentes e como planejar sua revisão final com foco em autonomia.',
    date: '02 Mai 2024',
    category: 'Estratégia',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800'
  }
];
