
import React from 'react';
import { SOCIAL_STRATEGY, DETAILED_MONTHLY_PLANS } from '../constants';
import { Instagram, Facebook, Linkedin, CalendarCheck, Lightbulb, Check, CalendarDays, Target, BarChart3, Repeat, FileCheck, CheckCircle2 } from 'lucide-react';

export const ContentStrategy: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-12">
      
      {/* Introduction */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Análise de Distribuição</h2>
        <p className="text-gray-500 text-lg">Definição estratégica dos dias de postagem para maximizar o alcance B2B.</p>
      </div>

      {/* Strategy Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {SOCIAL_STRATEGY.map((platform) => {
          const isMeta = platform.id === 'meta';
          
          return (
            <div 
              key={platform.id} 
              className={`bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col ${isMeta ? 'border-purple-100' : 'border-blue-100'}`}
            >
              {/* Header */}
              <div className={`p-8 ${isMeta ? 'bg-gradient-to-br from-purple-50 to-pink-50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl shadow-sm bg-white text-gray-800`}>
                    {isMeta ? (
                      <div className="flex gap-1">
                        <Instagram size={24} className="text-pink-600" />
                        <Facebook size={24} className="text-blue-600" />
                      </div>
                    ) : (
                      <Linkedin size={24} className="text-[#0077B5]" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{platform.name}</h3>
                </div>
                
                <div className="flex items-start gap-2 text-sm font-medium text-gray-600 bg-white/60 p-3 rounded-lg border border-white/50">
                  <CalendarCheck size={18} className="mt-0.5 text-gray-500" />
                  <span>{platform.schedule}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-grow flex flex-col">
                <p className="text-gray-600 font-medium mb-8 italic border-l-4 pl-4 py-1 border-gray-200">
                  "{platform.description}"
                </p>

                <div className="space-y-6">
                  {platform.bestDays.map((dayData, idx) => (
                    <div key={idx} className="relative pl-6">
                       {/* Timeline-like line */}
                      <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${idx === platform.bestDays.length -1 ? 'h-2' : 'h-full'} bg-gray-100`}></div>
                      <div className={`absolute left-[-2.5px] top-1.5 w-1.5 h-1.5 rounded-full ${isMeta ? 'bg-purple-400' : 'bg-blue-400'}`}></div>

                      <h4 className="font-bold text-gray-900 text-lg mb-1.5">{dayData.day}</h4>
                      <div className="space-y-1">
                        {dayData.reason.map((r, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-2 text-sm text-gray-600">
                             <Check size={14} className={`mt-1 flex-shrink-0 ${isMeta ? 'text-purple-500' : 'text-blue-500'}`} />
                             <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tip Section (mostly for LinkedIn) */}
                {platform.tip && (
                  <div className="mt-8 bg-amber-50 rounded-xl p-5 border border-amber-100 flex gap-3">
                    <Lightbulb className="text-amber-500 flex-shrink-0" size={20} />
                    <p className="text-sm text-amber-800 font-medium">
                      <span className="font-bold block text-amber-600 text-xs uppercase tracking-wide mb-1">Dica Estratégica</span>
                      {platform.tip}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Detailed Plans */}
      <div className="space-y-16">
        {DETAILED_MONTHLY_PLANS.map((plan, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
            
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
                      <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
                        <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">{week.title}</h3>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {week.days.map((day, dIdx) => (
                          <div key={dIdx} className="p-5 flex flex-col sm:flex-row gap-4 sm:items-start group hover:bg-gray-50 transition-colors">
                            {/* Day Badge */}
                            <div className="sm:w-32 flex-shrink-0">
                               <div className="inline-flex items-center gap-2 mb-1">
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
        ))}
      </div>
    </div>
  );
};
