
import React from 'react';
import { Info } from 'lucide-react';

export const StatusLegend: React.FC = () => {
  const statuses = [
    { label: 'Em Produção', color: 'bg-gray-100 border-gray-200 text-gray-600' },
    { label: 'Em Aprovação', color: 'bg-orange-100 border-orange-200 text-orange-700' },
    { label: 'Ajustes Solicitados', color: 'bg-red-100 border-red-200 text-red-700' },
    { label: 'Pronto / Aprovado', color: 'bg-blue-100 border-blue-200 text-blue-700' },
    { label: 'Programado', color: 'bg-purple-100 border-purple-200 text-purple-700' },
    { label: 'Publicado', color: 'bg-green-100 border-green-200 text-green-700' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
        <Info size={14} /> Legenda de Status
      </div>
      <div className="flex flex-wrap gap-3">
        {statuses.map((s, idx) => (
          <div key={idx} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold ${s.color}`}>
            <div className="w-2 h-2 rounded-full bg-current opacity-50"></div>
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
};
