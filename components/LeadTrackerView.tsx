
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Briefcase, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  DollarSign,
  X,
  ThumbsUp,
  ThumbsDown,
  Phone,
  MoreVertical,
  Edit2,
  ChevronDown,
  ChevronUp,
  Instagram,
  Globe,
  MessageCircle,
  Search,
  AlertTriangle,
  FileEdit
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ClientLead, ClientLeadConfig } from '../types';
import { useLeadTracker } from '../hooks/useLeadTracker';
import { BRAZILIAN_STATES } from '../constants';

dayjs.locale('pt-br');

interface LeadTrackerViewProps {
  clientId: string;
  config: ClientLeadConfig;
  onBack: () => void;
}

const LOSS_REASONS = [
  'Sem retorno',
  'Honorários acima do esperado',
  'Escolheu outro escritório',
  'Fora da área de atuação',
  'Lead inválido',
  'Desistiu de resolver',
  'Caso sem viabilidade',
  'Localização não atendida'
];

const LEAD_SOURCES = [
  'Google Ads',
  'Instagram',
  'Indicação',
  'Site orgânico',
  'Outro'
];

export const LeadTrackerView: React.FC<LeadTrackerViewProps> = ({ clientId, config, onBack }) => {
  const { fetchLeads, addLead, updateLead, deleteLead, updateLeadStage, updateLeadsPositions } = useLeadTracker();
  const [leads, setLeads] = useState<ClientLead[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLossModalOpen, setIsLossModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
  const [leadToLose, setLeadToLose] = useState<string | null>(null);
  const [lossReason, setLossReason] = useState('');
  const [editingLead, setEditingLead] = useState<ClientLead | null>(null);

  // Drag and Drop State
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Kanban State
  const [showLost, setShowLost] = useState(false);
  const stages = config.kanban_stages || ['Novo Lead', 'Em Contato', 'Reunião Agendada', 'Proposta Enviada', 'Fechado'];
  
  // Form state for new/edit lead
  const defaultLeadState: Partial<ClientLead> = {
    lead_name: '',
    phone: '',
    source: LEAD_SOURCES[0],
    origin: config.location_options?.[0] || '',
    specialty: config.specialty_options?.[0] || '',
    potential: null,
    notes: '',
    kanban_stage: stages[0],
    quality: 'bom', // default required by db
    quote_sent: false, // default required by db
    closed: false, // default required by db
    deal_value: 0 // default required by db
  };
  
  const [formData, setFormData] = useState<Partial<ClientLead>>(defaultLeadState);

  const loadData = async () => {
    setLoading(true);
    // Fetch ALL leads for the Kanban
    const allLeads = await fetchLeads(clientId);
    setLeads(allLeads);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [clientId]);

  const stats = useMemo(() => {
    const currentMonth = dayjs().format('YYYY-MM');
    const monthLeads = leads.filter(l => l.created_at.startsWith(currentMonth));
    
    const total = monthLeads.length;
    const closedLeads = leads.filter(l => l.kanban_stage === 'Fechado');
    const closedMonth = monthLeads.filter(l => l.kanban_stage === 'Fechado').length;
    
    const revenue = closedLeads.reduce((acc, l) => acc + (Number(l.deal_value) || 0), 0);
    const conversionRate = total > 0 ? Math.round((closedMonth / total) * 100) : 0;
    
    // Loss reasons breakdown
    const lostLeads = leads.filter(l => l.kanban_stage === 'Perdido' && l.loss_reason);
    const reasonCounts = lostLeads.reduce((acc, l) => {
      acc[l.loss_reason!] = (acc[l.loss_reason!] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topReasons = Object.entries(reasonCounts)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 3);
      
    return { total, closedMonth, conversionRate, revenue, topReasons, lostCount: lostLeads.length };
  }, [leads]);

  const handleOpenAddModal = () => {
    setEditingLead(null);
    setFormData({
      ...defaultLeadState,
      origin: '',
      specialty: config.specialty_options?.[0] || '',
      kanban_stage: stages[0]
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lead: ClientLead) => {
    setEditingLead(lead);
    setFormData({
      ...lead
    });
    setIsModalOpen(true);
  };

  const handleSaveLead = async () => {
    if (!formData.lead_name?.trim()) {
      return;
    }

    try {
      if (editingLead) {
        await updateLead(editingLead.id, {
          lead_name: formData.lead_name,
          phone: formData.phone,
          source: formData.source,
          origin: formData.origin,
          specialty: formData.specialty,
          potential: formData.potential,
          notes: formData.notes
        });
      } else {
        // Get max position for the stage
        const stageLeads = leads.filter(l => l.kanban_stage === (formData.kanban_stage || stages[0]));
        const maxPos = stageLeads.length > 0 ? Math.max(...stageLeads.map(l => l.position || 0)) : -1;

        await addLead({
          client_id: clientId,
          lead_date: dayjs().format('YYYY-MM-DD'),
          lead_name: formData.lead_name,
          phone: formData.phone,
          source: formData.source,
          origin: formData.origin || '',
          specialty: formData.specialty,
          potential: formData.potential,
          notes: formData.notes,
          kanban_stage: formData.kanban_stage || stages[0],
          position: maxPos + 1,
          quality: 'bom',
          quote_sent: false,
          closed: false,
          deal_value: 0
        });
      }
      setIsModalOpen(false);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLead = (id: string) => {
    setLeadToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteLead = async () => {
    if (!leadToDelete) return;
    try {
      await deleteLead(leadToDelete);
      setIsDeleteModalOpen(false);
      setLeadToDelete(null);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeLead = leads.find(l => l.id === activeId);
    if (!activeLead) return;

    // Find the stage we are dragging over
    let overStage: string | undefined;
    if (stages.concat(['Perdido']).includes(overId)) {
      overStage = overId;
    } else {
      const overLead = leads.find(l => l.id === overId);
      overStage = overLead?.kanban_stage;
    }

    if (overStage && activeLead.kanban_stage !== overStage) {
      setLeads(prev => {
        const activeIndex = prev.findIndex(l => l.id === activeId);
        const newLeads = [...prev];
        newLeads[activeIndex] = { ...activeLead, kanban_stage: overStage };
        return newLeads;
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeLead = leads.find(l => l.id === activeId);
    if (!activeLead) return;

    // Determine the target stage
    let targetStage = overId;
    if (!stages.concat(['Perdido']).includes(overId)) {
      const overLead = leads.find(l => l.id === overId);
      targetStage = overLead?.kanban_stage || activeLead.kanban_stage;
    }

    if (targetStage === 'Perdido' && activeLead.kanban_stage !== 'Perdido') {
      setLeadToLose(activeId);
      setLossReason(LOSS_REASONS[0]);
      setIsLossModalOpen(true);
      return;
    }

    // Reorder within the same stage or move to new stage
    const stageLeads = leads.filter(l => l.kanban_stage === targetStage);
    const oldIndex = stageLeads.findIndex(l => l.id === activeId);
    const newIndex = stageLeads.findIndex(l => l.id === overId);

    if (activeLead.kanban_stage !== targetStage) {
      await updateLeadStage(activeId, targetStage);
    }

    if (newIndex !== -1 && oldIndex !== newIndex) {
      const reorderedStageLeads = arrayMove(stageLeads, oldIndex, newIndex);
      const updatedPositions = reorderedStageLeads.map((l, i) => ({
        id: l.id,
        position: i,
        kanban_stage: targetStage
      }));
      
      await updateLeadsPositions(updatedPositions);
    }

    loadData();
  };

  const handleMoveStage = async (leadId: string, newStage: string) => {
    if (newStage === 'Perdido') {
      setLeadToLose(leadId);
      setLossReason(LOSS_REASONS[0]);
      setIsLossModalOpen(true);
      return;
    }

    try {
      await updateLeadStage(leadId, newStage);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmLoss = async () => {
    if (!leadToLose || !lossReason) return;
    try {
      await updateLeadStage(leadToLose, 'Perdido', lossReason);
      setIsLossModalOpen(false);
      setLeadToLose(null);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateDealValue = async (id: string, value: number) => {
    try {
      await updateLead(id, { deal_value: value });
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const getSourceIcon = (source?: string) => {
    switch (source) {
      case 'Google Ads': return <Search size={12} />;
      case 'Instagram': return <Instagram size={12} />;
      case 'Site orgânico': return <Globe size={12} />;
      case 'Indicação': return <Users size={12} />;
      default: return <MessageCircle size={12} />;
    }
  };

  // Group leads by stage
  const leadsByStage = useMemo(() => {
    const grouped: Record<string, ClientLead[]> = {};
    stages.forEach(s => grouped[s] = []);
    grouped['Perdido'] = [];
    
    leads.forEach(lead => {
      const stage = lead.kanban_stage || stages[0];
      if (grouped[stage]) {
        grouped[stage].push(lead);
      } else {
        // Fallback if stage was removed from config
        grouped[stages[0]].push(lead);
      }
    });
    return grouped;
  }, [leads, stages]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 h-[calc(100vh-120px)] flex flex-col">
      {/* Header Actions */}
      <div className="flex items-center justify-between shrink-0">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-dark transition-colors font-medium"
        >
          <ChevronLeft size={20} />
          Voltar
        </button>
        <button 
          onClick={handleOpenAddModal}
          className="premium-button premium-button-primary"
        >
          <Plus size={20} />
          Novo Lead
        </button>
      </div>

      {/* Mini Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        <div className="premium-card p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Users size={20} />
            </div>
            <span className="premium-label">Leads no Mês</span>
          </div>
          <div className="text-4xl font-bold tracking-tighter">{stats.total}</div>
        </div>

        <div className="premium-card p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <DollarSign size={20} />
            </div>
            <span className="premium-label">Fechados & Receita</span>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold tracking-tighter text-emerald-600">
              {stats.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <div className="text-sm font-medium text-gray-400">
              {stats.closedMonth} leads fechados no mês
            </div>
          </div>
        </div>

        <div className="premium-card p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <TrendingUp size={20} />
            </div>
            <span className="premium-label">Taxa de Conversão</span>
          </div>
          <div className="text-4xl font-bold tracking-tighter">{stats.conversionRate}%</div>
          <div className="text-xs text-gray-400 mt-2">Fechados / Total do mês</div>
        </div>

        <div className="premium-card p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
              <ThumbsDown size={20} />
            </div>
            <span className="premium-label">Perdidos ({stats.lostCount})</span>
          </div>
          <div className="space-y-2">
            {stats.topReasons.length > 0 ? (
              stats.topReasons.map(([reason, count], i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <span className="text-gray-600 truncate pr-2" title={reason}>{reason}</span>
                  <span className="font-bold text-gray-400">{count}</span>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400">Nenhum lead perdido</div>
            )}
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-6 h-full min-w-max">
            {/* Active Stages */}
            {stages.map(stage => (
              <div key={stage} className="w-80 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="font-bold text-gray-700">{stage}</h3>
                  <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded-full">
                    {leadsByStage[stage]?.length || 0}
                  </span>
                </div>
                
                <SortableContext 
                  id={stage}
                  items={leadsByStage[stage]?.map(l => l.id) || []}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex-1 overflow-y-auto space-y-3 pr-2 pb-2 custom-scrollbar min-h-[100px]">
                    {leadsByStage[stage]?.map(lead => (
                      <LeadCard 
                        key={lead.id} 
                        lead={lead} 
                        stages={stages} 
                        onMove={handleMoveStage}
                        onEdit={() => handleOpenEditModal(lead)}
                        onDelete={() => handleDeleteLead(lead.id)}
                        onUpdateDealValue={handleUpdateDealValue}
                        getSourceIcon={getSourceIcon}
                      />
                    ))}
                  </div>
                </SortableContext>
              </div>
            ))}

            {/* Lost Column (Special) */}
            <div className={`flex flex-col h-full transition-all duration-300 ${showLost ? 'w-80' : 'w-16'}`}>
              <div className="flex items-center justify-between mb-4 px-2">
                {showLost ? (
                  <>
                    <h3 className="font-bold text-red-600">Perdido</h3>
                    <div className="flex items-center gap-2">
                      <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                        {leadsByStage['Perdido']?.length || 0}
                      </span>
                      <button onClick={() => setShowLost(false)} className="p-1 hover:bg-gray-100 rounded">
                        <ChevronLeft size={16} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center w-full gap-4 pt-2">
                    <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                      {leadsByStage['Perdido']?.length || 0}
                    </span>
                    <button 
                      onClick={() => setShowLost(true)}
                      className="writing-vertical-rl transform rotate-180 font-bold text-gray-400 hover:text-red-500 tracking-widest uppercase text-sm"
                    >
                      Ver Perdidos
                    </button>
                  </div>
                )}
              </div>
              
              {showLost && (
                <SortableContext 
                  id="Perdido"
                  items={leadsByStage['Perdido']?.map(l => l.id) || []}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex-1 overflow-y-auto space-y-3 pr-2 pb-2 custom-scrollbar min-h-[100px]">
                    {leadsByStage['Perdido']?.map(lead => (
                      <LeadCard 
                        key={lead.id} 
                        lead={lead} 
                        stages={stages} 
                        onMove={handleMoveStage}
                        onEdit={() => handleOpenEditModal(lead)}
                        onDelete={() => handleDeleteLead(lead.id)}
                        onUpdateDealValue={handleUpdateDealValue}
                        getSourceIcon={getSourceIcon}
                      />
                    ))}
                  </div>
                </SortableContext>
              )}
            </div>
          </div>
        </div>

        <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5',
              },
            },
          }),
        }}>
          {activeId ? (
            <LeadCard 
              lead={leads.find(l => l.id === activeId)!} 
              stages={stages} 
              onMove={() => {}} 
              onEdit={() => {}} 
              onDelete={() => {}} 
              onUpdateDealValue={() => {}} 
              getSourceIcon={getSourceIcon}
              isOverlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Modals */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] p-8 w-full max-w-lg relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold tracking-tight">{editingLead ? 'Editar Lead' : 'Novo Lead'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="premium-label mb-2 block">Nome do Lead *</label>
                  <input 
                    type="text"
                    value={formData.lead_name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, lead_name: e.target.value }))}
                    className="w-full bg-gray-50 border border-black/[0.05] rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-green/20 outline-none"
                    placeholder="Ex: João Silva"
                  />
                </div>

                <div>
                  <label className="premium-label mb-2 block">Telefone</label>
                  <input 
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-gray-50 border border-black/[0.05] rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-green/20 outline-none"
                    placeholder="Ex: 11 99999-9999"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="premium-label mb-2 block">Fonte</label>
                    <select 
                      value={formData.source || LEAD_SOURCES[0]}
                      onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                      className="w-full bg-gray-50 border border-black/[0.05] rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-green/20 outline-none"
                    >
                      {LEAD_SOURCES.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="premium-label mb-2 block">Origem (Local)</label>
                    <select 
                      value={formData.origin || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                      className="w-full bg-gray-50 border border-black/[0.05] rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-green/20 outline-none"
                    >
                      <option value="">Selecione o estado...</option>
                      {BRAZILIAN_STATES.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="premium-label mb-2 block">Especialidade</label>
                  <select 
                    value={formData.specialty || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                    className="w-full bg-gray-50 border border-black/[0.05] rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-green/20 outline-none"
                  >
                    <option value="">Selecione...</option>
                    {config.specialty_options?.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="premium-label mb-2 block">Potencial</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setFormData(prev => ({ ...prev, potential: prev.potential === 'alto' ? null : 'alto' }))}
                      className={`flex items-center justify-center gap-2 p-4 rounded-2xl border transition-all font-bold ${
                        formData.potential === 'alto' 
                          ? 'bg-green-50 border-green-200 text-green-700' 
                          : 'bg-white border-black/[0.05] text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      🔥 Alto
                    </button>
                    <button 
                      onClick={() => setFormData(prev => ({ ...prev, potential: prev.potential === 'baixo' ? null : 'baixo' }))}
                      className={`flex items-center justify-center gap-2 p-4 rounded-2xl border transition-all font-bold ${
                        formData.potential === 'baixo' 
                          ? 'bg-gray-100 border-gray-300 text-gray-600' 
                          : 'bg-white border-black/[0.05] text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      ❄️ Baixo
                    </button>
                  </div>
                </div>

                <div>
                  <label className="premium-label mb-2 block">Observações</label>
                  <textarea 
                    value={formData.notes || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full bg-gray-50 border border-black/[0.05] rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-green/20 outline-none min-h-[100px]"
                    placeholder="Alguma nota importante?"
                  />
                </div>

                <button 
                  onClick={handleSaveLead}
                  className="w-full premium-button premium-button-primary py-4 mt-4"
                >
                  Salvar Lead
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {isLossModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLossModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm relative z-10 shadow-2xl"
            >
              <h3 className="text-xl font-bold tracking-tight mb-6">Qual o motivo da perda?</h3>
              
              <select 
                value={lossReason}
                onChange={(e) => setLossReason(e.target.value)}
                className="w-full bg-gray-50 border border-black/[0.05] rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-green/20 outline-none mb-6"
              >
                {LOSS_REASONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>

              <div className="flex gap-3">
                <button 
                  onClick={() => setIsLossModalOpen(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleConfirmLoss}
                  className="flex-1 py-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm relative z-10 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-2">Excluir Lead?</h3>
              <p className="text-sm text-gray-500 mb-8">Esta ação não pode ser desfeita. Tem certeza que deseja remover este lead?</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={confirmDeleteLead}
                  className="flex-1 py-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                >
                  Excluir
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Subcomponent: Lead Card ---

interface LeadCardProps {
  lead: ClientLead;
  stages: string[];
  onMove: (id: string, stage: string) => void;
  onEdit: () => void;
  onDelete: () => void;
  onUpdateDealValue: (id: string, val: number) => void;
  getSourceIcon: (source?: string) => React.ReactNode;
}

const LeadCard: React.FC<LeadCardProps & { isOverlay?: boolean }> = ({ 
  lead, 
  stages, 
  onMove, 
  onEdit, 
  onDelete, 
  onUpdateDealValue, 
  getSourceIcon,
  isOverlay 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const isClosed = lead.kanban_stage === 'Fechado';
  const isLost = lead.kanban_stage === 'Perdido';

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lead.phone) {
      const cleanPhone = lead.phone.replace(/\D/g, '');
      window.open(`https://wa.me/55${cleanPhone}`, '_blank');
    }
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-2xl p-4 shadow-sm border border-black/[0.05] group relative hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing ${isOverlay ? 'shadow-xl rotate-2 scale-105 z-50' : ''}`}
    >
      {/* Action Buttons (Hover) */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(); }} 
          className="p-1.5 text-gray-400 hover:text-brand-dark hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Edit2 size={14} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(); }} 
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Header */}
      <div className="pr-16 mb-3">
        <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1">{lead.lead_name || 'Sem nome'}</h4>
        {lead.phone && (
          <button 
            onClick={handlePhoneClick}
            className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-medium"
          >
            <Phone size={10} />
            {lead.phone}
          </button>
        )}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {lead.potential === 'alto' && (
          <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-700 text-[10px] font-bold">🔥 Alto</span>
        )}
        {lead.potential === 'baixo' && (
          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[10px] font-bold">❄️ Baixo</span>
        )}
        {lead.specialty && (
          <span className="px-2 py-0.5 rounded-md bg-brand-dark/5 text-brand-dark text-[10px] font-bold truncate max-w-[120px]">
            {lead.specialty}
          </span>
        )}
        {lead.origin && (
          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[10px] font-bold">
            {lead.origin}
          </span>
        )}
        {lead.source && (
          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold flex items-center gap-1" title={lead.source}>
            {getSourceIcon(lead.source)}
          </span>
        )}
      </div>

      {/* Notes Snippet */}
      {lead.notes && (
        <div className="mb-3 p-2 bg-gray-50 rounded-xl border border-black/[0.03] flex gap-2 items-start">
          <FileEdit size={12} className="text-gray-400 shrink-0 mt-0.5" />
          <p className="text-[10px] text-gray-500 line-clamp-2 italic leading-relaxed">
            {lead.notes}
          </p>
        </div>
      )}

      {/* Deal Value (If Closed) */}
      {isClosed && (
        <div className="mb-3 bg-emerald-50 rounded-lg p-2 border border-emerald-100 flex items-center justify-between" onPointerDown={e => e.stopPropagation()}>
          <span className="text-[10px] font-bold text-emerald-700 uppercase">Valor do Contrato</span>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-emerald-600">R$</span>
            <input 
              type="number"
              defaultValue={lead.deal_value || 0}
              onBlur={(e) => onUpdateDealValue(lead.id, Number(e.target.value))}
              className="bg-transparent border-none p-0 w-16 text-xs font-bold text-emerald-700 focus:ring-0 text-right"
            />
          </div>
        </div>
      )}

      {/* Loss Reason (If Lost) */}
      {isLost && lead.loss_reason && (
        <div className="mb-3 bg-red-50 rounded-lg p-2 border border-red-100">
          <span className="text-[10px] font-bold text-red-700 uppercase block mb-0.5">Motivo da perda</span>
          <span className="text-xs text-red-600 font-medium">{lead.loss_reason}</span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-2 pt-3 border-t border-black/[0.05]">
        <span className="text-[10px] text-gray-400 font-medium">
          {dayjs(lead.created_at).format('DD/MM/YYYY')}
        </span>
        
        <div className="relative" onPointerDown={e => e.stopPropagation()}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:text-brand-dark transition-colors"
          >
            Mover para <ChevronDown size={12} />
          </button>
          
          {showDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
              <div className="absolute right-0 bottom-full mb-1 w-48 bg-white rounded-xl shadow-xl border border-black/[0.05] py-1 z-20 overflow-hidden">
                {stages.map(s => (
                  <button
                    key={s}
                    onClick={() => { onMove(lead.id, s); setShowDropdown(false); }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 ${lead.kanban_stage === s ? 'text-brand-green bg-green-50/50' : 'text-gray-700'}`}
                  >
                    {s}
                  </button>
                ))}
                <div className="h-px bg-gray-100 my-1" />
                <button
                  onClick={() => { onMove(lead.id, 'Perdido'); setShowDropdown(false); }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-red-50 ${lead.kanban_stage === 'Perdido' ? 'text-red-600 bg-red-50/50' : 'text-red-500'}`}
                >
                  Perdido
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
