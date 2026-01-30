
import React from 'react';
import { SOCIAL_STRATEGY } from '../constants';
import { Instagram, Facebook, Linkedin, CalendarCheck, Lightbulb, Check } from 'lucide-react';

export const DistributionAnalysis: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 mt-16">
      
      {/* Introduction */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Análise de Distribuição</h2>
        <p className="text-gray-500 text-lg">Definição estratégica dos dias de postagem para maximizar o alcance B2B.</p>
      </div>

      {/* Strategy Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
    </div>
  );
};
