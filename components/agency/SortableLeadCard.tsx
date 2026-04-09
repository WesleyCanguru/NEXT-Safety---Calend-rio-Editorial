import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AgencyCRM, AgencyLead } from '../../types';
import { CRMLeadCard } from './CRMLeadCard';

interface SortableLeadCardProps {
  lead: AgencyLead;
  crm: AgencyCRM;
  onClick: () => void;
}

export const SortableLeadCard: React.FC<SortableLeadCardProps> = ({ lead, crm, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CRMLeadCard lead={lead} crm={crm} onClick={onClick} />
    </div>
  );
};
