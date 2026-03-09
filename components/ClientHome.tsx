import React from 'react';
import { useAuth } from '../lib/supabase';
import {
  Calendar,
  TrendingUp,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Target,
  Zap,
  ClipboardList,
  FolderOpen,
  Globe,
  AlertCircle
} from 'lucide-react';

interface ClientHomeProps {
  onNavigateToOnboarding: () => void;
  onNavigateToMapa: () => void;
  onNavigateToBriefings: () => void;
  onNavigateToDocuments: () => void;
  onNavigateToPaidTraffic: () => void;
  onNavigateToWebsite: () => void;
}

export const ClientHome: React.FC<ClientHomeProps> = ({
  onNavigateToOnboarding,
  onNavigateToMapa,
  onNavigateToBriefings,
  onNavigateToDocuments,
  onNavigateToPaidTraffic,
  onNavigateToWebsite,
}) => {
  const { activeClient } = useAuth();
  const clientName = activeClient?.name || 'Cliente';

  return (
    <div className="flex flex-col items-center justify-center relative pb-12">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>

      <div className="max-w-4xl w-full text-center mb-12 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-4">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Ambiente Seguro {clientName}</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-brand-dark leading-tight">
          Estratégia Digital <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Inteligente & Integrada</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Central de controle para o posicionamento da {clientName}. 
          Acompanhe a linha editorial, monitore métricas de tráfego e visualize o crescimento da marca em tempo real.
        </p>
      </div>

      {/* Cards Grid - Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
        
        {/* Card 1: Linha Editorial (Destaque) */}
        <div 
          onClick={onNavigateToMapa}
          className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer overflow-hidden md:col-span-1 md:row-span-2 flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
            <Calendar size={120} />
          </div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <Calendar size={28} />
            </div>
            
            <h3 className="text-2xl font-bold text-brand-dark mb-2">Mapa Editorial</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Acesse o calendário completo de publicações. Visualize, aprove e acompanhe o status de cada conteúdo planejado.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium bg-gray-50 p-2 rounded-lg">
                <ShieldCheck size={14} className="text-green-500" /> Acesso Restrito
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium bg-gray-50 p-2 rounded-lg">
                <Target size={14} className="text-primary" /> Planejamento Estratégico
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center text-primary font-bold text-sm group-hover:translate-x-2 transition-transform">
            Acessar Sistema <ArrowRight size={16} className="ml-2" />
          </div>
        </div>

        {/* Módulos Secundários Grid */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Tráfego Pago */}
          <div 
            onClick={onNavigateToPaidTraffic}
            className="group bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Zap size={24} />
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-primary transform group-hover:-rotate-45 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-1">Tráfego Pago</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Performance de anúncios e campanhas ativas em tempo real.
            </p>
          </div>

          {/* Tráfego Orgânico */}
          <a 
            href="https://app.reportei.com/report/NgEMYfee91ZFGr6xheMOnLnuNChwwyw9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <TrendingUp size={24} />
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-primary transform group-hover:-rotate-45 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-1">Tráfego Orgânico</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Crescimento orgânico, engajamento e relatórios de métricas.
            </p>
          </a>

          {/* Onboarding */}
          <div 
            onClick={onNavigateToOnboarding}
            className="group bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <ClipboardList size={24} />
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-primary transform group-hover:-rotate-45 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-1">Onboarding</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Etapas de configuração inicial e alinhamento estratégico.
            </p>
          </div>

          {/* Briefings */}
          <div 
            onClick={onNavigateToBriefings}
            className="group bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <AlertCircle size={24} />
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-primary transform group-hover:-rotate-45 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-1">Briefings</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Solicitações de novas demandas e aprovações pendentes.
            </p>
          </div>

          {/* Documentos */}
          <div 
            onClick={onNavigateToDocuments}
            className="group bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <FolderOpen size={24} />
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-primary transform group-hover:-rotate-45 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-1">Documentos</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Repositório de arquivos, contratos e relatórios mensais.
            </p>
          </div>

          {/* Website */}
          <div 
            onClick={onNavigateToWebsite}
            className="group bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Globe size={24} />
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-primary transform group-hover:-rotate-45 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-1">Website</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Gestão de performance e atualizações do seu site.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
