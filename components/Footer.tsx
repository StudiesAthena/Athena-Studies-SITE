
import React from 'react';
import { Instagram, Mail, Shield, Music2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-athena-blue text-white py-5 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center space-x-3">
            <img 
              src="https://i.imgur.com/SD28FYh.png" 
              alt="A" 
              className="w-8 h-8 object-contain rounded-lg border border-white/20 bg-white/10"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = "bg-white/20 w-7 h-7 rounded-lg flex items-center justify-center font-heading font-black text-sm border-[1.5px] border-white/30";
                  fallback.innerText = "A";
                  parent.prepend(fallback);
                }
              }}
            />
            <span className="text-lg font-bold tracking-tight font-heading">
              Athena<span className="text-athena-pink">Studies</span>
            </span>
          </div>
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] mt-1 text-white/60">
            Domine o futuro
          </p>
        </div>

        <div className="flex items-center space-x-8">
          <a 
            href="https://www.instagram.com/studiesathena/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-athena-pink transition-all transform hover:scale-110"
            title="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a 
            href="https://www.tiktok.com/@studiesathena" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-athena-pink transition-all transform hover:scale-110"
            title="TikTok"
          >
            <TikTokIcon size={18} />
          </a>
          <a 
            href="mailto:studiesathena2025@gmail.com" 
            className="hover:text-athena-pink transition-all transform hover:scale-110"
            title="E-mail"
          >
            <Mail size={18} />
          </a>
          <Link 
            to="/admin/login" 
            className="text-white/20 hover:text-white transition-colors"
            title="Administração"
          >
            <Shield size={14} />
          </Link>
        </div>

        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
          2026 Athena
        </div>

      </div>
    </footer>
  );
};
