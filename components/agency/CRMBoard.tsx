import React, { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AgencyCRM, AgencyLead } from '../../types';
import { useAgencyCRM } from '../../hooks/useAgencyCRM';
import { CRMLeadCard } from './CRMLeadCard';
import { CRMLeadModal } from './CRMLeadModal';
import { SortableLeadCard } from './SortableLeadCard';

interface CRMBoardProps {
  crm: AgencyCRM;
}

export const CRMBoard: React.FC<CRMBoardProps> = ({ crm }) => {
  const { leads, fetchLeads, moveLeadToStage, autoAdvanceLeads, addLead, updateLead } = useAgencyCRM();
  const [activeLead, setActiveLead] = useState<AgencyLead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<AgencyLead | null>(null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lossReasonModal, setLossReasonModal] = useState<{ isOpen: boolean; lead: AgencyLead | null; newStage: string }>({ isOpen: false, lead: null, newStage: '' });
  const [lossReason, setLossReason] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const loadAndAdvance = async () => {
      const currentLeads = await fetchLeads(crm.id);
      if (currentLeads && currentLeads.length > 0) {
        await autoAdvanceLeads(currentLeads, crm.kanban_stages, crm);
      }
    };
    loadAndAdvance();
  }, [crm.id, fetchLeads, autoAdvanceLeads, crm.kanban_stages, crm.auto_advance_time]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const lead = leads.find(l => l.id === active.id);
    if (lead) setActiveLead(lead);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveLead(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeLead = leads.find(l => l.id === activeId);
    if (!activeLead) return;

    // Find which column the item was dropped in
    let newStageName = activeLead.stage;
    
    // Check if dropped directly on a column
    const stageColumn = crm.kanban_stages.find(s => s.name === overId);
    if (stageColumn) {
      newStageName = stageColumn.name;
    } else {
      // Check if dropped on another lead
      const overLead = leads.find(l => l.id === overId);
      if (overLead) {
        newStageName = overLead.stage;
      }
    }

    if (activeLead.stage !== newStageName) {
      if (newStageName.toLowerCase() === 'perdido') {
        setLossReasonModal({ isOpen: true, lead: activeLead, newStage: newStageName });
      } else {
        await moveLeadToStage(activeLead, newStageName, crm.kanban_stages, crm.auto_advance_time);
      }
    }
  };

  const handleConfirmLoss = async () => {
    if (lossReasonModal.lead) {
      await moveLeadToStage(lossReasonModal.lead, lossReasonModal.newStage, crm.kanban_stages, crm.auto_advance_time);
      await updateLead(lossReasonModal.lead.id, { loss_reason: lossReason });
      setLossReasonModal({ isOpen: false, lead: null, newStage: '' });
      setLossReason('');
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    Object.values(lead.form_data).some(val => String(val).toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getLeadsByStage = (stageName: string) => {
    return filteredLeads.filter(l => l.stage === stageName).sort((a, b) => a.kanban_position - b.kanban_position);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Board Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
        <div className="relative w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark/20 focus:border-brand-dark transition-all"
          />
        </div>
        <button
          onClick={() => {
            setSelectedLead(null);
            setIsNewLeadModalOpen(true);
          }}
          className="flex items-center gap-2 bg-brand-dark text-white px-4 py-2 rounded-lg hover:bg-brand-dark/90 transition-colors text-sm font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Novo Lead
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 h-full items-start">
            {crm.kanban_stages.map(stage => {
              const stageLeads = getLeadsByStage(stage.name);
              return (
                <div key={stage.id} className="flex-shrink-0 w-80 flex flex-col max-h-full bg-gray-100/50 rounded-2xl border border-gray-200/60">
                  {/* Column Header */}
                  <div className="p-4 flex items-center justify-between shrink-0 border-b border-gray-200/60 bg-white/50 rounded-t-2xl">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                      <h3 className="font-bold text-gray-800">{stage.name}</h3>
                    </div>
                    <span className="bg-white text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm border border-gray-100">
                      {stageLeads.length}
                    </span>
                  </div>

                  {/* Column Content */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[150px]" id={stage.name}>
                    <SortableContext
                      id={stage.name}
                      items={stageLeads.map(l => l.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {stageLeads.map(lead => (
                        <SortableLeadCard
                          key={lead.id}
                          lead={lead}
                          crm={crm}
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsModalOpen(true);
                          }}
                        />
                      ))}
                    </SortableContext>
                  </div>
                </div>
              );
            })}
          </div>

          <DragOverlay>
            {activeLead ? (
              <div className="opacity-80 rotate-2 scale-105 transition-transform cursor-grabbing">
                <CRMLeadCard lead={activeLead} crm={crm} onClick={() => {}} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Modals */}
      {(isModalOpen || isNewLeadModalOpen) && (
        <CRMLeadModal
          crm={crm}
          lead={selectedLead}
          isOpen={isModalOpen || isNewLeadModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setIsNewLeadModalOpen(false);
            setSelectedLead(null);
          }}
        />
      )}

      {/* Loss Reason Modal */}
      {lossReasonModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">Motivo da Perda</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Por favor, informe o motivo pelo qual este lead foi perdido.
              </p>
              <textarea
                value={lossReason}
                onChange={(e) => setLossReason(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 focus:border-brand-dark transition-all resize-none"
                rows={4}
                placeholder="Ex: Achou caro, fechou com concorrente..."
              />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setLossReasonModal({ isOpen: false, lead: null, newStage: '' });
                  setLossReason('');
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmLoss}
                disabled={!lossReason.trim()}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm shadow-sm disabled:opacity-50"
              >
                Confirmar Perda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
