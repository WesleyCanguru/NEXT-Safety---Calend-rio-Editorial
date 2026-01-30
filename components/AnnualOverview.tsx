
import React from 'react';
import { ANNUAL_PLAN } from '../constants';
import { MonthCard } from './MonthCard';
import { DistributionAnalysis } from './DistributionAnalysis';
import { Compass, CheckCircle2 } from 'lucide-react';

interface AnnualOverviewProps {
  onSelectMonth: (month: string) => void;
}

export const AnnualOverview: React.FC<AnnualOverviewProps> = ({ onSelectMonth }) => {
  return (
    <div className="animate-in fade-in duration-500">
      
      {/* North Star Section */}
      <div className="bg-gradient-to-r from-gray-900 to-brand-dark rounded-2xl p-8 mb-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 transform translate-x-10 -translate-y-10">
          <Compass size={300} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Compass className="text-brand-green" size={28} />
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-brand-green">Estratégia Macro</h2>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
            {ANNUAL_PLAN.northStar.title}
          </h1>
          <p className="text-xl text-gray-300 font-light max-w-3xl leading-relaxed mb-8">
            {ANNUAL_PLAN.northStar.description}
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {ANNUAL_PLAN.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <CheckCircle2 size={16} className="text-brand-green" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Distribution Analysis (Moved from separate tab) */}
      <DistributionAnalysis />

      {/* Quarters / Grid Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Calendário 2026</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ANNUAL_PLAN.months.map((monthData, index) => (
            <MonthCard 
              key={index} 
              data={monthData} 
              onClick={() => onSelectMonth(monthData.month)}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-400 text-sm">
          Planejamento estratégico sujeito a adaptações táticas conforme feedback de mercado.
        </p>
      </div>
    </div>
  );
};
