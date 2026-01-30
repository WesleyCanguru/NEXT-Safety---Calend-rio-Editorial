
import React from 'react';
import { DETAILED_MONTHLY_PLANS } from '../constants';
import { Instagram, Linkedin, CalendarDays, Target, BarChart3, Repeat, FileCheck, CheckCircle2, ArrowLeft } from 'lucide-react';

interface MonthDetailProps {
  monthName: string;
  onBack: () => void;
}

export const MonthDetail: React.FC<MonthDetailProps> = ({ monthName, onBack }) => {
  // Normalize string for comparison (ignore case)
  const plan = DETAILED_MONTHLY_PLANS.find(p => p.month.toLowerCase().includes(monthName.toLowerCase()));

  if (!plan) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Planejamento em desenvolvimento</h2>
        <p className="text-gray-500 mb-8">O detalhamento para {monthName} ainda não foi carregado.</p>
        <button 
          onClick={onBack}
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
        >
          Voltar para o Mapa Anual
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-brand-dark transition-colors mb-6 font-medium"
      >
        <ArrowLeft size={20} />
        Voltar para Visão Geral
      </button>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
        
        {/* Plan Header */}
        <div className="bg-brand-dark text-white p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <CalendarDays size={200} />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">{plan.month}</h2>
            <div className="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-[0.2em] mb-6">
              Tema: {plan.theme}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
               <div>
                  <h4 className="flex items-center gap-2 text-brand-green font-bold text-sm uppercase tracking-wider mb-2">
                    <Target size={16} /> Objetivo do Mês
                  </h4>
                  <p className="text-gray-300 leading-relaxed">{plan.objective}</p>
               </div>
               
               <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider mb-3">
                    <BarChart3 size={16} /> Visão Geral
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-purple-300 font-bold uppercase mb-1">Instagram / Facebook</p>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {plan.overview.meta.map((item, i) => <li key={i}>• {item}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs text-blue-300 font-bold uppercase mb-1">LinkedIn</p>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {plan.overview.linkedin.map((item, i) => <li key={i}>• {item}</li>)}
                      </ul>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Weeks Container */}
        <div className="p-6 md:p-10 bg-gray-50/50">
           <div className="grid grid-cols-1 gap-8">
              {plan.weeks.map((week, wIdx) => (
                <div key={wIdx} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">{week.title}</h3>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cronograma Semanal</div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {week.days.map((day, dIdx) => (
                      <div key={dIdx} className="p-5 flex flex-col sm:flex-row gap-4 sm:items-start group hover:bg-gray-50 transition-colors">
                        {/* Day Badge */}
                        <div className="sm:w-48 flex-shrink-0">
                           <div className="inline-flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-bold text-gray-900 text-sm">{day.day}</span>
                              {day.exclusive && <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Exclusivo</span>}
                              {day.repurposed && <span className="bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase flex items-center gap-0.5"><Repeat size={10} /> Adaptado</span>}
                           </div>
                           <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                              {day.platform === 'linkedin' ? (
                                <Linkedin size={14} className="text-[#0077B5]" /> 
                              ) : (
                                <Instagram size={14} className="text-purple-600" />
                              )}
                              <span className="capitalize">{day.platform === 'meta' ? 'Insta/Face' : 'LinkedIn'}</span>
                           </div>
                        </div>

                        {/* Content Details */}
                        <div className="flex-grow">
                           <div className="flex items-start gap-2 mb-2">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded border ${day.platform === 'linkedin' ? 'bg-blue-50 text-blue-800 border-blue-100' : 'bg-purple-50 text-purple-800 border-purple-100'}`}>
                                📌 {day.type}
                              </span>
                           </div>
                           <h4 className="text-gray-900 font-semibold mb-2">{day.theme}</h4>
                           
                           {day.bullets && (
                             <ul className="space-y-1">
                                {day.bullets.map((b, bIdx) => (
                                  <li key={bIdx} className="flex items-start gap-2 text-sm text-gray-600">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                    {b}
                                  </li>
                                ))}
                             </ul>
                           )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
           </div>

           {/* Results Footer */}
           <div className="mt-10 bg-green-50 rounded-2xl p-6 border border-green-100">
             <h4 className="flex items-center gap-2 text-green-800 font-bold text-sm uppercase tracking-wider mb-4">
                <FileCheck size={18} /> Resultado do Mês
             </h4>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {plan.results.map((result, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2 text-green-900 text-sm font-medium bg-white px-3 py-2 rounded-lg border border-green-100 shadow-sm">
                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                    {result}
                  </div>
                ))}
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};
