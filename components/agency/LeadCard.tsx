
import React from 'react';
import { motion } from 'motion/react';
import { Instagram, AlertCircle, Clock } from 'lucide-react';
import { Lead } from '../../types';
import dayjs from 'dayjs';

interface LeadCardProps {
  lead: Lead;
  onClick: () => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead, onClick }) => {
  const isOverdue = lead.next_followup_date && dayjs(lead.next_followup_date).isBefore(dayjs().add(1, 'day'), 'day');
  const isToday = lead.next_followup_date && dayjs(lead.next_followup_date).isSame(dayjs(), 'day');

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -3, shadow: '0 15px 20px -5px rgba(0, 0, 0, 0.04)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-white p-6 rounded-[2rem] border border-black/[0.03] shadow-sm text-left group transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 bg-gray-50/50 text-gray-400 text-[8px] font-bold uppercase tracking-[0.15em] rounded-full border border-black/[0.02]">
          {lead.niche}
        </span>
        {(isOverdue || isToday) && (
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${isOverdue ? 'bg-red-50/50 text-red-600 border border-red-100/50' : 'bg-amber-50/50 text-amber-600 border border-amber-100/50'}`}>
            <Clock size={10} strokeWidth={2} />
            {isOverdue ? 'Atrasado' : 'Hoje'}
          </div>
        )}
      </div>

      <h4 className="font-bold text-brand-dark mb-3 group-hover:text-blue-600 transition-colors leading-tight">{lead.name}</h4>
      
      <div className="flex items-center gap-2.5 text-gray-400">
        <div className="w-6 h-6 bg-gray-50 rounded-lg flex items-center justify-center">
          <Instagram size={12} strokeWidth={1.5} />
        </div>
        <span className="text-[10px] font-bold tracking-tight truncate">@{lead.instagram_url.split('/').pop()}</span>
      </div>

      {lead.next_followup_date && (
        <div className="mt-5 pt-5 border-t border-black/[0.02] flex items-center justify-between">
          <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-gray-300">Próximo Contato</span>
          <span className={`text-[10px] font-bold ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
            {dayjs(lead.next_followup_date).format('DD/MM')}
          </span>
        </div>
      )}
    </motion.button>
  );
};
