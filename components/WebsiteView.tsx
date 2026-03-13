import React, { useState, useEffect } from 'react';
import { Globe, Construction, Monitor, Smartphone } from 'lucide-react';
import { useAuth } from '../lib/supabase';

export default function WebsiteView() {
  const { activeClient } = useAuth();
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  
  const isCalabres = activeClient?.id === 'e817fbf9-0985-4453-b710-34623af870d6' || activeClient?.name?.includes('Calabres');

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileDevice(isMobile);
      if (isMobile) {
        setViewMode('mobile');
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="bg-white rounded-[2.5rem] border border-black/[0.03] shadow-sm min-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="p-8 border-b border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-50/50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
          <Globe size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-brand-dark tracking-tight">Website</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Prévia e acompanhamento do site</p>
        </div>
      </div>

      {isCalabres ? (
        <div className="flex-1 p-4 sm:p-8 bg-[#FDFDFD] flex flex-col items-center">
          
          {/* Toggle (only show if not on mobile device) */}
          {!isMobileDevice && (
            <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
              <button
                onClick={() => setViewMode('desktop')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'desktop' ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-500 hover:text-brand-dark'}`}
              >
                <Monitor size={16} />
                Desktop
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'mobile' ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-500 hover:text-brand-dark'}`}
              >
                <Smartphone size={16} />
                Mobile
              </button>
            </div>
          )}

          {viewMode === 'desktop' ? (
            <div className="w-full max-w-5xl mx-auto border border-gray-200 rounded-xl overflow-hidden shadow-2xl bg-white transition-all duration-500">
              {/* Barra superior imitando um navegador */}
              <div className="bg-gray-100 border-b border-gray-200 h-10 w-full flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-4 px-3 py-1 bg-white rounded-md text-xs text-gray-500 font-mono shadow-sm flex-1 max-w-sm flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  calabreselima.adv.br
                </div>
              </div>
              
              {/* O Iframe carregando o site */}
              <iframe 
                src="https://site-calabres-lima.vercel.app/" 
                width="100%" 
                height="700px" 
                className="border-none bg-[#FCFAF8]"
                title="Prévia do Site Calabres & Lima"
              />
            </div>
          ) : (
            <div className="w-full max-w-[375px] mx-auto border-[10px] sm:border-[14px] border-gray-900 rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl bg-white relative transition-all duration-500 h-[700px] sm:h-[812px]">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-10">
                <div className="w-32 h-6 bg-gray-900 rounded-b-3xl"></div>
              </div>
              
              {/* O Iframe carregando o site */}
              <iframe 
                src="https://site-calabres-lima.vercel.app/" 
                width="100%" 
                height="100%" 
                className="border-none bg-[#FCFAF8] pt-6"
                title="Prévia do Site Calabres & Lima"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
          <div className="w-32 h-32 bg-indigo-50/50 rounded-full flex items-center justify-center mb-8 shadow-sm">
            <Construction size={64} className="text-indigo-400" />
          </div>
          <h2 className="text-4xl font-bold text-brand-dark mb-6 tracking-tight">Em breve</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Site em construção. Em breve você poderá visualizar uma prévia do seu website diretamente por aqui.
          </p>
        </div>
      )}
    </div>
  );
}



