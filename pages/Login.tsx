
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle, Mail, Loader2 } from 'lucide-react';
import { CTAButton } from '../components/CTAButton';
import { supabase } from '../lib/supabase';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Lógica híbrida: Senha padrão athena123 ou Login Real via Supabase
    if (!email && password === 'athena123') {
      localStorage.setItem('athena_auth', 'true');
      onLogin();
      navigate(from, { replace: true });
      return;
    }

    if (!email) {
      setError("Por favor, insira um e-mail para login real ou use a senha mestre.");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.user) {
        localStorage.setItem('athena_auth', 'true');
        onLogin();
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setError(err.message || "Erro ao autenticar. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50 dark:bg-athena-dark">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-slate-900 rounded-[4rem] shadow-2xl p-12 border-[3px] border-slate-100 dark:border-slate-800 space-y-10">
          
          <div className="text-center space-y-4">
            <div className="bg-athena-blue w-16 h-16 rounded-3xl flex items-center justify-center text-white font-heading font-black text-3xl mx-auto shadow-lg">
              A
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">Área do Aluno</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Acesse sua jornada personalizada ou entre com a senha estratégica.</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4">E-mail</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-athena-blue">
                  <Mail size={20} />
                </div>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-[2.5px] rounded-[2rem] py-5 pl-14 pr-14 focus:outline-none transition-all font-bold border-slate-100 dark:border-slate-700 focus:border-athena-blue focus:ring-4 focus:ring-athena-blue/10 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4">Senha</label>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors ${error ? 'text-athena-pink' : 'text-slate-400 group-focus-within:text-athena-blue'}`}>
                  <Lock size={20} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha estratégica"
                  className={`w-full bg-slate-50 dark:bg-slate-800/50 border-[2.5px] rounded-[2rem] py-5 pl-14 pr-14 focus:outline-none transition-all font-bold ${
                    error 
                    ? 'border-athena-pink ring-4 ring-athena-pink/10' 
                    : 'border-slate-100 dark:border-slate-700 focus:border-athena-blue focus:ring-4 focus:ring-athena-blue/10 dark:text-white'
                  }`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {error && (
                <div className="flex items-center gap-2 text-athena-pink text-xs font-bold mt-2 ml-4 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <CTAButton 
              variant="primary" 
              className="w-full py-5 text-base uppercase tracking-[0.2em] font-black shadow-athena-blue/30 flex items-center justify-center gap-3"
              onClick={() => {}} // Form handle handles it
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'ENTRAR NA PLATAFORMA'}
            </CTAButton>
          </form>

          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Precisa de ajuda com o acesso? Entre em contato com o suporte.
            </p>
          </div>
        </div>
        
        <p className="mt-12 text-center text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">
          Athena Studies &copy; 2026
        </p>
      </div>
    </div>
  );
};