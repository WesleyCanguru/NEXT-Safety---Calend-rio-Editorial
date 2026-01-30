
import React, { useState } from 'react';
import { Logo } from './components/Logo';
import { AnnualOverview } from './components/AnnualOverview';
import { MonthDetail } from './components/MonthDetail';
import { ANNUAL_PLAN } from './constants'; // Importado para gerar o menu
import { Map, ChevronRight } from 'lucide-react';

type ViewState = 'home' | 'month-detail';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const handleSelectMonth = (month: string) => {
    setSelectedMonth(month);
    setView('month-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setView('home');
    setSelectedMonth(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-dark bg-background-light">
      
      {/* Header Fixo */}
      <header className="bg-surface-light border-b border-gray-200 sticky top-0 z-50 shadow-sm bg-opacity-95 backdrop-blur-md">
        
        {/* Linha Superior: Logo e Botão Home */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="cursor-pointer" onClick={handleBackToHome}>
              <Logo size="small" />
            </div>
            
            <button
              onClick={handleBackToHome}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                view === 'home' 
                  ? 'bg-brand-dark text-white shadow-md' 
                  : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              <Map size={14} />
              <span className="hidden sm:inline">Mapa Anual</span>
            </button>
          </div>
        </div>

        {/* Linha Inferior: Navegação dos Meses (Scroll Horizontal) */}
        <div className="border-t border-gray-100 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 sm:py-3 -mx-4 px-4 sm:mx-0 sm:px-0">
              {ANNUAL_PLAN.months.map((m) => {
                const isActive = selectedMonth === m.month;
                // Extrai apenas as 3 primeiras letras para mobile se necessário, ou usa nome completo
                // Aqui usaremos o nome completo, mas com whitespace-nowrap
                
                return (
                  <button
                    key={m.month}
                    onClick={() => handleSelectMonth(m.month)}
                    className={`
                      whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all border
                      ${isActive 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md transform scale-105' 
                        : 'bg-white border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'
                      }
                    `}
                  >
                    {m.month}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb simples visual quando estiver no detalhe */}
          {view === 'month-detail' && (
             <div className="mb-6 flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-widest">
                <span onClick={handleBackToHome} className="cursor-pointer hover:text-brand-dark transition-colors">Mapa Anual</span>
                <ChevronRight size={12} />
                <span className="text-blue-600 font-bold">{selectedMonth}</span>
             </div>
          )}

          {view === 'home' ? (
            <AnnualOverview onSelectMonth={handleSelectMonth} />
          ) : (
            <MonthDetail 
              monthName={selectedMonth || ''} 
              onBack={handleBackToHome} 
            />
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 opacity-60">
             <Logo size="small" />
          </div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
            Planejamento Editorial 2026 • Confidencial
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
