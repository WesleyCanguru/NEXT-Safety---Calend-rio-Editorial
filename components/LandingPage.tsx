import React from 'react';
import { Calendar, TrendingUp, BarChart3, ArrowRight, ShieldCheck, Target, Zap } from 'lucide-react';
import { Logo } from './Logo';
import { AgencyLogo } from './AgencyLogo';

interface LandingPageProps {
  onEnterEditorial: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterEditorial }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col font-sans text-brand-dark">
      
      {/* Header Minimalista */}
      <header className="w-full py-3 px-6 md:px-12 flex justify-between items-center bg-white/50 backdrop-blur-sm border-b border-gray-100 fixed top-0 z-50 h-14">
        <div className="scale-75 origin-left">
          <Logo size="small" />
        </div>
        <div className="flex items-center gap-3 opacity-80 scale-75 origin-right">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium hidden sm:block">Strategy by</span>
          <AgencyLogo />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 relative pt-24 pb-12">
        
        {/* Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-200/20 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>

        <div className="max-w-4xl w-full text-center mb-12 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Ambiente Seguro Next Safety</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Estratégia Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Inteligente & Integrada</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Central de controle para o posicionamento da Next Safety. 
            Acompanhe a linha editorial, monitore métricas de tráfego e visualize o crescimento da marca em tempo real.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          
          {/* Card 1: Linha Editorial (Principal) */}
          <div 
            onClick={onEnterEditorial}
            className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer overflow-hidden md:col-span-1 md:row-span-2 flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
              <Calendar size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Calendar size={24} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Linha Editorial</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Acesse o calendário completo de publicações. Visualize, aprove e acompanhe o status de cada conteúdo planejado para as redes sociais.
              </p>
              
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <ShieldCheck size={14} className="text-green-500" /> Acesso Restrito
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <Target size={14} className="text-blue-500" /> Planejamento Estratégico
                </li>
              </ul>
            </div>

            <div className="relative z-10 flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-2 transition-transform">
              Acessar Sistema <ArrowRight size={16} className="ml-2" />
            </div>
          </div>

          {/* Card 2: Tráfego Pago */}
          <a 
            href="https://app.reportei.com/report/NgEMYfee91ZFGr6xheMOnLnuNChwwyw9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <Zap size={20} />
              </div>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-green-600 transform group-hover:-rotate-45 transition-all" />
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">Tráfego Pago</h3>
            <p className="text-gray-500 text-xs leading-relaxed flex-grow">
              Dashboard de performance de anúncios. Acompanhe ROI, CPC e conversões das campanhas ativas.
            </p>
          </a>

          {/* Card 3: Tráfego Orgânico */}
          <a 
            href="https://app.reportei.com/report/NgEMYfee91ZFGr6xheMOnLnuNChwwyw9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <TrendingUp size={20} />
              </div>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-purple-600 transform group-hover:-rotate-45 transition-all" />
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">Tráfego Orgânico</h3>
            <p className="text-gray-500 text-xs leading-relaxed flex-grow">
              Relatório de crescimento orgânico. Alcance, engajamento e crescimento de seguidores.
            </p>
          </a>

          {/* Info Box */}
          <div className="md:col-span-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <BarChart3 size={150} />
             </div>
             <div className="relative z-10 max-w-lg">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2"><BarChart3 size={18} className="text-blue-400"/> Importância dos Dados</h4>
                <p className="text-gray-300 text-xs leading-relaxed">
                  A integração entre o conteúdo orgânico (Linha Editorial) e a distribuição paga (Tráfego) é o que garante a consistência da marca Next Safety. Utilize os dashboards para validar se a estratégia de conteúdo está gerando os resultados esperados no fundo do funil.
                </p>
             </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-[10px] text-gray-400 uppercase tracking-widest font-medium">
        Next Safety • 2026 • Todos os direitos reservados
      </footer>
    </div>
  );
};
