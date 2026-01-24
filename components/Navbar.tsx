
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { CTAButton } from './CTAButton';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      scrollToSection(id);
    }
  };

  useEffect(() => {
    if (location.pathname === '/' && location.state && (location.state as any).scrollTo) {
      const targetId = (location.state as any).scrollTo;
      setTimeout(() => scrollToSection(targetId), 150);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const navLinks = [
    { name: 'Início', id: 'inicio' },
    { name: 'Blog', id: 'blog' },
    { name: 'Sobre', id: 'sobre' },
    { name: 'Serviços', id: 'servicos' },
  ];

  const navBaseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-300";
  const navStateClasses = (scrolled || isOpen)
    ? 'bg-white dark:bg-athena-dark shadow-md h-16'
    : 'bg-white dark:bg-athena-dark h-20';

  return (
    <nav className={`${navBaseClasses} ${navStateClasses}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        <Link to="/" onClick={() => handleNavClick('inicio')} className="flex items-center space-x-3 group">
          <img 
            src="https://i.imgur.com/SD28FYh.png" 
            alt="Athena Logo" 
            className="w-10 h-10 object-contain rounded-xl"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.className = "bg-athena-blue w-9 h-9 rounded-xl flex items-center justify-center text-white font-heading font-black text-xl";
                fallback.innerText = "A";
                parent.prepend(fallback);
              }
            }}
          />
          <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
            Athena<span className="text-athena-pink">Studies</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleNavClick(link.id)}
              className="text-[15px] font-bold text-slate-600 dark:text-slate-300 hover:text-athena-blue transition-colors uppercase tracking-wider"
            >
              {link.name}
            </button>
          ))}
          
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
            >
              {theme === 'light' ? <Moon size={20} className="text-slate-700" /> : <Sun size={20} className="text-yellow-400" />}
            </button>
          </div>

          <CTAButton 
            variant="secondary" 
            className="text-[11px] uppercase tracking-widest px-6 py-2.5 font-black" 
            onClick={() => handleNavClick('servicos')}
          >
            EXPERIMENTE AGORA
          </CTAButton>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-600 dark:text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white dark:bg-athena-dark z-40 p-8 space-y-6 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleNavClick(link.id)} 
              className="block w-full text-left text-2xl font-bold text-slate-900 dark:text-white font-heading"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-6">
            <button onClick={toggleTheme} className="flex items-center gap-4 text-xl font-bold">
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
              <span>Alternar Tema</span>
            </button>
            <CTAButton variant="secondary" className="w-full text-lg py-4" onClick={() => handleNavClick('servicos')}>
              EXPERIMENTE AGORA
            </CTAButton>
          </div>
        </div>
      )}
    </nav>
  );
};
