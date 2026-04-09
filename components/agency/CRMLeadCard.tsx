import React from 'react';
import { Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { AgencyCRM, AgencyLead } from '../../types';
import { useAgencyCRM } from '../../hooks/useAgencyCRM';

interface CRMLeadCardProps {
  lead: AgencyLead;
  crm: AgencyCRM;
  onClick: () => void;
}

export const CRMLeadCard: React.FC<CRMLeadCardProps> = ({ lead, crm, onClick }) => {
  const { moveLeadToStage } = useAgencyCRM();

  // Find the first form field that has a value to display
  const primaryField = crm.form_fields.find(f => lead.form_data[f.key]);
  const primaryValue = primaryField ? lead.form_data[primaryField.key] : null;

  const renderCountdownBadge = () => {
    if (lead.auto_advance_paused || !lead.next_stage_at) return null;

    const now = new Date();
    const nextDate = new Date(lead.next_stage_at);
    const diffTime = nextDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return (
        <div className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-100">
          <AlertCircle className="w-3 h-3" />
          Atrasado
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
        <Clock className="w-3 h-3" />
        {diffDays === 0 ? 'Avança hoje' : `Avança em ${diffDays}d`}
      </div>
    );
  };

  const handleMoveToNextStage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentStageIndex = crm.kanban_stages.findIndex(s => s.name === lead.stage);
    if (currentStageIndex !== -1 && currentStageIndex < crm.kanban_stages.length - 1) {
      const nextStage = crm.kanban_stages[currentStageIndex + 1];
      moveLeadToStage(lead, nextStage.name, crm.kanban_stages, crm.auto_advance_time);
    }
  };

  const isLastStage = crm.kanban_stages.findIndex(s => s.name === lead.stage) === crm.kanban_stages.length - 1;

  return (
    <div 
      onClick={onClick}
      className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-brand-dark/30 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-gray-900 text-sm line-clamp-2 pr-2">{lead.name}</h4>
        {!isLastStage && (
          <button 
            onClick={handleMoveToNextStage}
            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-brand-dark hover:bg-brand-dark/10 rounded transition-all shrink-0"
            title="Mover para próxima etapa"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {primaryValue && (
        <div className="text-xs text-gray-500 mb-3 line-clamp-1">
          <span className="font-medium text-gray-600">{primaryField?.label}:</span> {String(primaryValue)}
        </div>
      )}

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
        {renderCountdownBadge()}
        <div className="text-[10px] text-gray-400 ml-auto">
          {new Date(lead.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
