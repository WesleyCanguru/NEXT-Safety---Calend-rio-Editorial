import React from 'react';
import { Globe, Construction } from 'lucide-react';

export default function WebsiteView() {
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

      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
        <div className="w-32 h-32 bg-indigo-50/50 rounded-full flex items-center justify-center mb-8 shadow-sm">
          <Construction size={64} className="text-indigo-400" />
        </div>
        <h2 className="text-4xl font-bold text-brand-dark mb-6 tracking-tight">Em breve</h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Site em construção. Em breve você poderá visualizar uma prévia do seu website diretamente por aqui.
        </p>
      </div>
    </div>
  );
}



