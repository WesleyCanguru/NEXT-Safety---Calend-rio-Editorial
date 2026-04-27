
import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { AgencyLogo } from './AgencyLogo';
import { useAuth } from '../lib/supabase';
import { useAgency } from '../contexts/AgencyContext';
import { Lock, ArrowRight, ShieldCheck, Eye, EyeOff, Sparkles, User, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LoginScreen: React.FC = () => {
  const { loginByPassword } = useAuth();
  const { agency } = useAgency();
  
  const [password, setPassword] = useState('');
  const [identifier, setIdentifier] = useState(''); // email for agency, username for client
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAgencyPath, setIsAgencyPath] = useState(false);

  useEffect(() => {
    // If not matching /cliente, show agency login (or perhaps by default)
    const path = window.location.pathname;
    if (path.startsWith('/cliente')) {
      setIsAgencyPath(false);
    } else {
      setIsAgencyPath(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await loginByPassword(password.trim(), identifier.trim(), isAgencyPath);
    
    if (!result.success) {
      setError(result.error || 'Autenticação falhou.');
      setLoading(false);
    } else {
      // Clear path to root so that AppContent sees the right state if url was /login or /cliente
      window.history.replaceState({}, document.title, '/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden" style={{ backgroundColor: '#FDFDFD' }}>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]"
          style={{ backgroundColor: agency?.primary_color ? `${agency.primary_color}20` : '#eff6ff' }}
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]"
          style={{ backgroundColor: agency?.primary_color ? `${agency.primary_color}10` : '#eef2ff' }}
        ></motion.div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center flex flex-col items-center justify-center"
        >
          <div className="relative mb-8 group">
            <div className="absolute -inset-4 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundColor: agency?.primary_color ? `${agency.primary_color}50` : '#eff6ff' }}></div>
            {agency?.logo_url ? (
               <img src={agency.logo_url} alt={agency.name} className="h-28 relative object-contain" />
            ) : (
               <h1 className="text-4xl font-bold text-gray-800">{agency?.name || 'Sistema'}</h1>
            )}
          </div>
          
          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-brand-dark font-bold text-5xl tracking-tighter serif italic"
            >
              {isAgencyPath ? 'Acesso Equipe' : 'Portal do Cliente'}
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-0.5 mx-auto opacity-20"
              style={{ backgroundColor: agency?.primary_color || '#111827' }}
            ></motion.div>
            <p className="text-gray-400 text-[10px] uppercase tracking-[0.4em] font-bold mt-4">
              {agency?.name || 'Agência'} • Gestão & Estratégia
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/[0.02] p-10 sm:p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest mb-6" style={{ backgroundColor: agency?.primary_color ? `${agency.primary_color}10` : '#eff6ff', color: agency?.primary_color || '#2563eb' }}>
                <Sparkles size={10} />
                <span>Integração Exclusiva</span>
              </div>
              
              <p className="text-[15px] text-gray-600 leading-relaxed font-medium max-w-md mx-auto">
                Estratégia, conteúdo e relatórios em um só lugar.
                Acesse tudo do seu negócio com rapidez e segurança.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Email / Username Field */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-1">
                  {isAgencyPath ? 'E-mail Corporativo' : 'Usuário (Username)'}
                </label>
                <div className="relative group">
                  {isAgencyPath ? (
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-dark transition-colors" size={18} />
                  ) : (
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-dark transition-colors" size={18} />
                  )}
                  <input
                    type={isAgencyPath ? "email" : "text"}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-dark/5 focus:border-brand-dark focus:bg-white outline-none transition-all placeholder-gray-300 text-gray-900 font-medium tracking-wide"
                    placeholder={isAgencyPath ? "Digite seu e-mail..." : "Digite o usuário..."}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-1">Senha</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-dark transition-colors" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-dark/5 focus:border-brand-dark focus:bg-white outline-none transition-all placeholder-gray-300 text-gray-900 font-medium tracking-wide"
                    placeholder="Digite sua senha..."
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 p-1 rounded-md transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-red-50 text-red-600 text-[11px] font-bold rounded-xl flex items-center justify-center gap-2 border border-red-100"
                  >
                    <ShieldCheck size={14} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white py-5 rounded-2xl font-bold transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group ${loading ? 'opacity-80 cursor-wait' : ''}`}
                style={{ backgroundColor: agency?.primary_color || '#111827' }}
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    Acessar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-10 pt-8 border-t border-gray-50 flex flex-col items-center gap-4">
               {!isAgencyPath && (
                 <p className="text-[10px] text-gray-400 font-medium">
                   Dificuldade para acessar? Contate o suporte.
                 </p>
               )}
               
               <button 
                 type="button"
                 onClick={() => {
                   const path = isAgencyPath ? '/cliente' : '/login';
                   window.history.pushState({}, '', path);
                   setIsAgencyPath(!isAgencyPath);
                   setError('');
                 }}
                 className="text-[9px] text-gray-300 hover:text-gray-600 uppercase tracking-widest font-bold transition-colors"
               >
                 {isAgencyPath ? 'Acesso do Cliente' : 'Acesso da Equipe (Agência)'}
               </button>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-center space-y-4"
        >
          <p className="text-[10px] text-gray-300 uppercase tracking-[0.4em] font-bold">
            Ambiente Seguro • {agency?.name || 'Sistema'} {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
