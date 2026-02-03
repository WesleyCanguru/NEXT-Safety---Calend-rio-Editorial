
import React, { useState } from 'react';
import { DETAILED_MONTHLY_PLANS } from '../constants';
import { MonthlyDetailedPlan, DailyContent, PostStatus } from '../types';
import { Instagram, Linkedin, CalendarDays, Target, BarChart3, Repeat, FileCheck, CheckCircle2, ArrowLeft, MessageCircle, List, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { PostModal } from './PostModal';
import { useAuth } from '../lib/supabase';
import { StatusLegend } from './StatusLegend';

interface MonthDetailProps {
  monthName: string;
  onBack: () => void;
}

type ViewMode = 'list' | 'calendar';

export const MonthDetail: React.FC<MonthDetailProps> = ({ monthName, onBack }) => {
  const { userRole } = useAuth();
  const [selectedDay, setSelectedDay] = useState<{content: DailyContent, key: string} | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');

  const plan = DETAILED_MONTHLY_PLANS.find(p => p.month.toLowerCase().includes(monthName.toLowerCase()));

  if (!plan) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Planejamento em desenvolvimento</h2>
        <button onClick={onBack} className="px-6 py-2 bg-gray-100 rounded-lg">Voltar</button>
      </div>
    );
  }

  // Helper para gerar a chave única do post
  const getDateKey = (day: string) => {
     return `${day.split(' ')[0].replace('/', '-')}-2026`;
  };

  // --- LÓGICA DE CORES E TRADUÇÃO ---

  const getStatusLabel = (s: PostStatus) => {
    switch(s) {
      case 'draft': return 'Em Produção';
      case 'pending_approval': return 'Em Aprovação';
      case 'changes_requested': return 'Ajustes Solicitados';
      case 'internal_review': return 'Discussão Interna';
      case 'approved': return 'Aprovado / Pronto';
      case 'published': return 'Publicado';
      default: return 'Em Produção';
    }
  };

  const getStatusColorClass = (status: PostStatus) => {
    switch(status) {
      case 'draft': return 'bg-gray-100 border-gray-200 hover:bg-gray-200'; // Fundo Cinza
      case 'pending_approval': return 'bg-orange-100 border-orange-200 hover:bg-orange-200'; // Fundo Laranja
      case 'changes_requested': return 'bg-red-100 border-red-200 hover:bg-red-200'; // Fundo Vermelho
      case 'internal_review': return 'bg-purple-100 border-purple-200 hover:bg-purple-200'; // Fundo Roxo
      case 'approved': return 'bg-blue-100 border-blue-200 hover:bg-blue-200'; // Fundo Azul
      case 'published': return 'bg-green-100 border-green-200 hover:bg-green-200'; // Fundo Verde
      default: return 'bg-gray-50 border-gray-100';
    }
  };

  // Função auxiliar para simular o status baseado nos dados (já que não temos backend real conectado neste trecho)
  const getMockStatus = (day: DailyContent, index: number): PostStatus => {
    // Regra: Se não tiver imagem (simulado aqui pelo campo initialImageUrl), é "Em Produção"
    if (!day.initialImageUrl && !day.type.toLowerCase().includes('vídeo')) return 'draft';
    
    // Simulações para visualização
    if (day.exclusive) return 'approved';
    
    // Default agora é draft (Cinza) mesmo para vídeos, até que mude de fato
    return 'draft';
  };

  // --- LÓGICA DE CALENDÁRIO ---
  const renderCalendar = () => {
    const monthMap: { [key: string]: number } = {
      'JANEIRO': 0, 'FEVEREIRO': 1, 'MARÇO': 2, 'ABRIL': 3, 'MAIO': 4, 'JUNHO': 5,
      'JULHO': 6, 'AGOSTO': 7, 'SETEMBRO': 8, 'OUTUBRO': 9, 'NOVEMBRO': 10, 'DEZEMBRO': 11
    };

    const [monthStr, yearStr] = plan.month.split(' ');
    const monthIndex = monthMap[monthStr.toUpperCase()];
    const year = parseInt(yearStr);

    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, monthIndex, 1).getDay(); 

    const allEvents: DailyContent[] = [];
    plan.weeks.forEach(week => {
      week.days.forEach(day => allEvents.push(day));
    });

    const calendarCells = [];

    // Células vazias iniciais
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarCells.push(
        <div key={`empty-start-${i}`} className="bg-gray-50/30 border-b border-r border-gray-100 min-h-[140px]"></div>
      );
    }

    // Dias do mês
    for (let d = 1; d <= daysInMonth; d++) {
      const dayString = d < 10 ? `0${d}` : `${d}`;
      const monthNum = monthIndex + 1;
      const monthString = monthNum < 10 ? `0${monthNum}` : `${monthNum}`;
      const searchKey = `${dayString}/${monthString}`;
      
      const dayEvents = allEvents.filter(e => e.day.startsWith(searchKey));

      calendarCells.push(
        <div key={`day-${d}`} className="bg-white border-b border-r border-gray-100 min-h-[140px] p-2 relative group transition-colors hover:bg-gray-50/50">
          <div className="flex justify-between items-start mb-2">
            <span className={`text-sm font-semibold ${dayEvents.length > 0 ? 'text-gray-900' : 'text-gray-400'}`}>{d}</span>
            {dayEvents.length === 0 && (
               <button className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-blue-500 transition-all">
                 <Plus size={16} />
               </button>
            )}
          </div>
          
          <div className="flex flex-col gap-2">
            {dayEvents.map((content, idx) => {
               const status = getMockStatus(content, idx);
               const statusColor = getStatusColorClass(status);

               return (
                <div 
                  key={idx}
                  onClick={() => setSelectedDay({content, key: getDateKey(content.day)})}
                  className={`
                    p-2.5 rounded-lg border shadow-sm cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md
                    ${statusColor}
                  `}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {content.platform === 'linkedin' ? (
                        <Linkedin size={12} className="text-[#0077B5]" /> 
                      ) : (
                        <Instagram size={12} className="text-[#E1306C]" />
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-wide opacity-70 text-gray-800">
                        {content.type.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-gray-900 leading-tight line-clamp-2 mb-1" title={content.theme}>
                    {content.theme}
                  </p>
                  <div className="mt-1">
                     <span className="text-[9px] font-bold uppercase text-gray-500 opacity-80 border border-black/10 px-1 rounded bg-white/40">
                       {getStatusLabel(status)}
                     </span>
                  </div>
                </div>
               );
            })}
          </div>
        </div>
      );
    }

    // Células vazias finais
    const totalCells = calendarCells.length;
    const remainingCells = 7 - (totalCells % 7);
    if (remainingCells < 7) {
      for (let i = 0; i < remainingCells; i++) {
        calendarCells.push(
          <div key={`empty-end-${i}`} className="bg-gray-50/30 border-b border-r border-gray-100 min-h-[140px]"></div>
        );
      }
    }

    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map((d, i) => (
            <div key={d} className={`py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-widest ${i === 0 || i === 6 ? 'bg-gray-100/50 text-gray-400' : ''}`}>
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {calendarCells}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {selectedDay && (
        <PostModal 
          dayContent={selectedDay.content} 
          dateKey={selectedDay.key} 
          onClose={() => setSelectedDay(null)} 
        />
      )}

      {/* Top Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-dark transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Voltar para Visão Geral
        </button>

        <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm self-start md:self-auto">
          <button 
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${
              viewMode === 'list' 
                ? 'bg-brand-dark text-white shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <List size={14} /> Lista
          </button>
          <button 
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${
              viewMode === 'calendar' 
                ? 'bg-brand-dark text-white shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <CalendarIcon size={14} /> Calendário
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
        
        {/* Header Content */}
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

        {/* Content Body */}
        <div className="p-6 md:p-10 bg-gray-50/50">
           
           <StatusLegend />

           {viewMode === 'list' ? (
             <div className="grid grid-cols-1 gap-8">
                {plan.weeks.map((week, wIdx) => (
                  <div key={wIdx} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">{week.title}</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {week.days.map((day, dIdx) => {
                        const dateKey = getDateKey(day.day);
                        const status = getMockStatus(day, dIdx);
                        const statusColor = getStatusColorClass(status);

                        return (
                          <div 
                            key={dIdx} 
                            onClick={() => setSelectedDay({content: day, key: dateKey})}
                            className={`
                              p-5 flex flex-col sm:flex-row gap-4 sm:items-start group transition-all cursor-pointer border-l-4 border-transparent
                              ${statusColor}
                            `}
                          >
                            {/* Day Badge */}
                            <div className="sm:w-48 flex-shrink-0">
                               <div className="inline-flex flex-wrap items-center gap-2 mb-1">
                                  <span className="font-bold text-gray-900 text-sm">{day.day}</span>
                                  {day.exclusive && <span className="bg-white/60 text-blue-700 border border-blue-200 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Exclusivo</span>}
                                  {day.repurposed && <span className="bg-white/60 text-amber-700 border border-amber-200 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase flex items-center gap-0.5"><Repeat size={10} /> Adaptado</span>}
                               </div>
                               <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-2">
                                  {day.platform === 'linkedin' ? (
                                    <Linkedin size={14} className="text-[#0077B5]" /> 
                                  ) : (
                                    <Instagram size={14} className="text-[#E1306C]" />
                                  )}
                                  <span className="capitalize">{day.platform === 'meta' ? 'Insta/Face' : 'LinkedIn'}</span>
                               </div>
                               <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold border border-black/10 bg-white/50 uppercase text-gray-700">
                                  {getStatusLabel(status)}
                               </span>
                            </div>

                            {/* Content Details */}
                            <div className="flex-grow">
                               <div className="flex justify-between items-start">
                                 <div className="flex items-start gap-2 mb-2">
                                    <span className="text-xs font-bold px-2 py-0.5 rounded border bg-white/50 border-black/10 text-gray-800">
                                      📌 {day.type}
                                    </span>
                                 </div>
                                 <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="flex items-center gap-1 text-xs text-gray-700 font-bold bg-white/50 border border-gray-200 px-2 py-1 rounded-full shadow-sm">
                                       <MessageCircle size={12} /> Ver Detalhes
                                    </div>
                                 </div>
                               </div>

                               <h4 className="text-gray-900 font-bold mb-2">{day.theme}</h4>
                               
                               {day.bullets && (
                                 <ul className="space-y-1">
                                    {day.bullets.map((b, bIdx) => (
                                      <li key={bIdx} className="flex items-start gap-2 text-sm text-gray-700">
                                        <span className="w-1 h-1 bg-gray-500 rounded-full mt-2 flex-shrink-0"></span>
                                        {b}
                                      </li>
                                    ))}
                                 </ul>
                               )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
             </div>
           ) : (
             renderCalendar()
           )}

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
