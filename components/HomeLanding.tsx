import React from 'react';
import { Logo } from './Logo';
import { AgencyLogo } from './AgencyLogo';
import { CalendarDays, BarChart3, TrendingUp, ArrowRight, ShieldCheck, Target, Users } from 'lucide-react';

interface HomeLandingProps {
  onEnterEditorial: () => void;
}

export const HomeLanding: React.FC<HomeLandingProps> = ({ onEnterEditorial }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-brand-dark flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo size="medium" />
          <div className="flex items-center gap-3 opacity-80">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider hidden sm:block">Strategy by</span>
            <AgencyLogo />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-brand-dark text-white relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6">
              <ShieldCheck size={14} />
              <span>Ambiente Seguro • Next Safety</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Painel de Controle <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-brand-green">Estratégico 2026</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mb-10">
              Central de inteligência para monitoramento de performance, gestão de conteúdo e consolidação da autoridade técnica no mercado de segurança.
            </p>
          </div>
        </div>
      </div>

      {/* Main Actions Grid */}
      <div className="flex-grow -mt-16 relative z-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Linha Editorial */}
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-blue-200 transition-all group flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <CalendarDays size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Linha Editorial</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                Acesso restrito ao calendário de publicações, aprovação de criativos e planejamento mensal detalhado.
              </p>
              <button 
                onClick={onEnterEditorial}
                className="w-full py-3 px-4 bg-brand-dark text-white rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg"
              >
                Acessar Sistema <ArrowRight size={16} />
              </button>
            </div>

            {/* Card 2: Tráfego Orgânico */}
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-green-200 transition-all group flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tráfego Orgânico</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                Dashboard de performance de conteúdo, crescimento de seguidores e engajamento da comunidade.
              </p>
              <a 
                href="https://app.reportei.com/report/NgEMYfee91ZFGr6xheMOnLnuNChwwyw9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-white border border-gray-200 text-gray-700 rounded-lg font-bold text-sm uppercase tracking-wide hover:border-green-500 hover:text-green-600 transition-all flex items-center justify-center gap-2"
              >
                Ver Relatório <ArrowRight size={16} />
              </a>
            </div>

            {/* Card 3: Tráfego Pago */}
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-purple-200 transition-all group flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tráfego Pago (Ads)</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                Monitoramento de campanhas ativas, investimento, conversões e retorno sobre investimento (ROAS).
              </p>
              <a 
                href="https://app.reportei.com/report/NgEMYfee91ZFGr6xheMOnLnuNChwwyw9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-white border border-gray-200 text-gray-700 rounded-lg font-bold text-sm uppercase tracking-wide hover:border-purple-500 hover:text-purple-600 transition-all flex items-center justify-center gap-2"
              >
                Ver Dashboard <ArrowRight size={16} />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Strategy Pillars Section */}
      <div className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pilares da Estratégia 2026</h2>
            <div className="w-20 h-1 bg-brand-green mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center px-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 text-gray-900 mb-6">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Autoridade Técnica</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Posicionamento focado na expertise técnica, normas e segurança avançada, diferenciando a Next Safety de concorrentes generalistas.
              </p>
            </div>
            
            <div className="text-center px-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 text-gray-900 mb-6">
                <Users size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Conexão Real</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Conteúdo que fala a língua do técnico de segurança e do comprador, resolvendo dores reais do dia a dia da indústria.
              </p>
            </div>

            <div className="text-center px-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 text-gray-900 mb-6">
                <Target size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Ecossistema Integrado</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Unificação da comunicação entre redes sociais, tráfego pago e eventos presenciais (FISP, Proteminas) para maximizar o impacto.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             <Logo size="small" />
          </div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium text-center md:text-right">
            © 2026 Next Safety • Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};
